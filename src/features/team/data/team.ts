export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  credentials: string[];
  photo?: string;
  linkedin?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'diego-andrade',
    name: 'Diego Andrade',
    role: 'Consultor Principal',
    bio: 'Profesional con amplia experiencia en consultoría financiera para organizaciones, cooperativas de ahorro y crédito, y empresas. Especializado en planificación financiera, análisis estratégico y educación financiera. Su enfoque se centra en generar soluciones prácticas, adaptadas a la realidad de cada cliente, promoviendo una gestión financiera responsable y sostenible.',
    credentials: [
      'Especialista en Finanzas Corporativas',
      'Consultor de Cooperativas de Ahorro y Crédito',
      'Educador Financiero Certificado',
      'Más de 10 años de experiencia en el sector',
    ],
    linkedin: 'https://linkedin.com/in/diego-andrade',
  },
];

export const consultant = teamMembers[0];
