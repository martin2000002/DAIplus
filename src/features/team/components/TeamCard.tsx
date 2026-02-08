'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { Linkedin } from 'lucide-react';
import { type TeamMember } from '../data/team';
import { cn } from '@/src/lib/utils';

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleHover = (isEntering: boolean) => {
    const card = cardRef.current;
    if (!card) return;

    const avatar = card.querySelector('.team-avatar');
    const ring = card.querySelector('.photo-ring');

    gsap.to(card, {
      y: isEntering ? -6 : 0,
      boxShadow: isEntering
        ? '0 20px 40px -10px rgba(31, 79, 115, 0.25)'
        : '0 4px 20px -2px rgba(31, 79, 115, 0.12)',
      duration: 0.3,
      ease: 'power2.out',
    });

    if (avatar) {
      gsap.to(avatar, {
        scale: isEntering ? 1.04 : 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    }

    if (ring) {
      gsap.to(ring, {
        scale: isEntering ? 1.06 : 1,
        opacity: isEntering ? 0.7 : 0.4,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  const isAccent = member.accentColor === 'accent';
  const strokeColor = isAccent
    ? 'rgba(245,166,35,0.35)'
    : 'rgba(31,79,115,0.25)';

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      className="team-member-card bg-white rounded-2xl p-6 md:p-8 text-center shadow-card cursor-default"
    >
      {/* Avatar with animated ring */}
      <div className="relative w-32 h-32 md:w-36 md:h-36 mx-auto mb-5">
        {/* SVG dashed rotating ring — longer dashes, wider gap, more spacing */}
        <svg
          className="photo-ring absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          style={{ opacity: 0.4 }}
        >
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeDasharray="12 8"
            strokeLinecap="round"
          />
        </svg>

        {/* Initials avatar */}
        <div className="team-avatar absolute inset-3 md:inset-3.5 rounded-full overflow-hidden border-3 border-white shadow-lg bg-linear-to-br from-primary-light to-primary flex items-center justify-center">
          <span className="text-3xl md:text-4xl font-bold text-white/90 font-heading select-none">
            {member.initials}
          </span>
        </div>

        {/* Top-right accent dot */}
        <div
          className={cn(
            'absolute -top-1 -right-0.5 w-4 h-4 rounded-full shadow-sm',
            isAccent ? 'bg-accent' : 'bg-primary-light'
          )}
        />

        {/* Bottom-left accent dot */}
        <div
          className={cn(
            'absolute -bottom-1 -left-0.5 w-3 h-3 rounded-full shadow-sm',
            isAccent ? 'bg-primary-light' : 'bg-accent'
          )}
        />
      </div>

      {/* Name & Role */}
      <h3 className="text-lg font-bold text-primary font-heading mb-1">
        {member.name}
      </h3>

      <p
        className={cn(
          'text-sm font-semibold mb-3 font-heading',
          isAccent ? 'text-accent' : 'text-primary-light'
        )}
      >
        {member.role}
      </p>

      {/* Short Bio */}
      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
        {member.shortBio}
      </p>

      {/* LinkedIn pill */}
      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all font-heading',
          isAccent
            ? 'bg-accent/10 text-accent hover:bg-accent/20'
            : 'bg-primary/10 text-primary hover:bg-primary/20'
        )}
      >
        <Linkedin className="w-3.5 h-3.5" />
        LinkedIn
      </a>
    </div>
  );
}
