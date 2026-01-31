'use client';

import { Header } from '@/src/features/header';
import { HeroSection } from '@/src/features/hero';
import { InsightsSection } from '@/src/features/insights';
import { ServicesSection } from '@/src/features/services';
import { SocialProofSection } from '@/src/features/social-proof';
import { TeamSection } from '@/src/features/team';
import { ContactSection } from '@/src/features/contact';
import { Footer } from '@/src/features/footer';

export default function Home() {
  return (
    <>
      {/* Fixed Header */}
      <Header />
      
      {/* Main Content */}
      <main>
        {/* Hero Section - Full viewport height */}
        <HeroSection />
        
        {/* Insights Section - Strategic points */}
        <InsightsSection />
        
        {/* Services Section - Core offerings */}
        <ServicesSection />
        
        {/* Social Proof - Logos and testimonials */}
        <SocialProofSection />
        
        {/* Team Section - Consultant presentation */}
        <TeamSection />
        
        {/* Contact Section - Form and info */}
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
}
