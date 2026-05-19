'use client';

import { useEffect, useState } from 'react';

export default function FluidBackground() {
  const [dawn, setDawn] = useState(false);

  useEffect(() => {
    // Listen for dawn transition from SplashScreen
    const handleDawn = () => setDawn(true);
    window.addEventListener('dawn-transition', handleDawn);
    return () => window.removeEventListener('dawn-transition', handleDawn);
  }, []);

  return (
    <div className="fluid-bg">
      {/* Fluid blobs with dawn stagger */}
      <div className={`fluid-blob fluid-blob-1 ${dawn ? 'fluid-dawn-1' : ''}`} />
      <div className={`fluid-blob fluid-blob-2 ${dawn ? 'fluid-dawn-2' : ''}`} />
      <div className={`fluid-blob fluid-blob-3 ${dawn ? 'fluid-dawn-3' : ''}`} />
      <div className={`fluid-blob fluid-blob-4 ${dawn ? 'fluid-dawn-4' : ''}`} />

      {/* Frost glass overlay */}
      <div className="fluid-frost" />

      {/* Vignette mask - darker edges, brighter center */}
      <div className="fluid-vignette" />
    </div>
  );
}
