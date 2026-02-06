import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Biblioteca | DAI+ Estrategia e Innovación',
  description:
    'Accede a recursos, análisis y publicaciones sobre estrategia cooperativa, sostenibilidad financiera y educación.',
};

export default function BibliotecaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
