import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Servicios | DAI+ Estrategia e Innovación',
  description: 'Conoce nuestros servicios de consultoría, asesoría estratégica y capacitación para cooperativas, empresas y personas.',
};

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
