import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://daiplus.net'),
  title: {
    default: "DAI+",
    template: "%s | DAI+"
  },
  description: "DAI+ - Desarrollo, Asesoría e Innovación. Consultoría financiera especializada para cooperativas, empresas y personas. Planificación financiera, análisis estratégico y educación financiera en Quito, Ecuador.",
  keywords: [
    "consultoría financiera",
    "cooperativas de ahorro y crédito",
    "planificación financiera",
    "asesoría empresarial",
    "educación financiera",
    "Quito",
    "Ecuador",
    "DAI+",
    "Diego Andrade",
  ],
  authors: [{ name: "DAI+" }],
  creator: "DAI+",
  publisher: "DAI+",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: "https://daiplus.com",
    siteName: "DAI+",
    title: "DAI+ | Consultoría Financiera Especializada",
    description: "Desarrollo, Asesoría e Innovación. Acompañamos a organizaciones, cooperativas y personas a tomar decisiones financieras más informadas y sostenibles.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DAI+ - Consultoría Financiera",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DAI+ | Consultoría Financiera Especializada",
    description: "Desarrollo, Asesoría e Innovación. Consultoría financiera para cooperativas, empresas y personas.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes when ready
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/svg+xml" href="/svgs/icon.svg" />
        <link rel="apple-touch-icon" href="/images/icon.png" />
        <meta name="theme-color" content="#1F4F73" data-color="primary" />
        <script dangerouslySetInnerHTML={{
          __html: `
            try {
              const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#1F4F73';
              document.querySelector('meta[name="theme-color"]').setAttribute('content', primaryColor);
            } catch(e) {}
          `
        }} />
      </head>
      <body
        className={`${montserrat.variable} ${openSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
