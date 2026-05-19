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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-cream text-ink antialiased">
        <LanguageProvider>
          <FluidBackground />
          {/* Global diamond grid texture layer — above fluid bg, below content */}
          <div
            className="fixed inset-0 z-[3] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 30 L30 55 L5 30 Z' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
              opacity: 0.08,
            }}
          />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
          <CrispChat />
        </LanguageProvider>
      </body>
    </html>
  );
}
