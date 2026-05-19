import type { Metadata } from 'next';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CrispChat from '@/components/CrispChat';
import FluidBackground from '@/components/FluidBackground';
import './globals.css';

export const metadata: Metadata = {
  title: 'WAM Visuals — Wait a Minute Visuals',
  description: 'Great design takes a little longer. We craft visual identities and digital experiences for brands that refuse to blend in.',
  keywords: ['design studio', 'visual identity', 'branding', 'graphic design', 'WAM Visuals', '晚一点视觉设计'],
  openGraph: {
    title: 'WAM Visuals — Wait a Minute Visuals',
    description: 'Great design takes a little longer. We craft visual identities and digital experiences for brands that refuse to blend in.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-cream text-ink antialiased">
        <LanguageProvider>
          <FluidBackground />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
          <CrispChat />
        </LanguageProvider>
      </body>
    </html>
  );
}
