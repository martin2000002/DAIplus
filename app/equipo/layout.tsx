import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nuestro Equipo | DAI+ Estrategia e Innovación',
  description: 'Conoce a los profesionales que forman DAI+. Un equipo comprometido con la transformación estratégica, la innovación y el desarrollo sostenible de organizaciones.',
};

export default function EquipoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
