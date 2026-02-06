import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eventos | DAI+',
  description:
    'Eventos, talleres, conferencias y capacitaciones de DAI+ para el sector financiero popular y solidario del Ecuador.',
};

export default function EventosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
