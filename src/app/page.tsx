'use client';

import { useState } from 'react';
import SplashScreen from '@/components/SplashScreen';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import Pricing from '@/components/Pricing';
import Contact from '@/components/Contact';

export default function Home() {
  const [entered, setEntered] = useState(false);

  if (!entered) {
    return <SplashScreen onEnter={() => setEntered(true)} />;
  }

  return (
    <>
      <Hero />
      <Gallery />
      <Pricing />
      <Contact />
    </>
  );
}
