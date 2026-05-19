'use client';

import { useEffect, useState, useRef, useMemo } from 'react';

export default function FluidBackground() {
  const [dawn, setDawn] = useState(false);
  const [pixelRatio, setPixelRatio] = useState(2);
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const blobRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);

  // Detect low-end devices and adjust pixel ratio
  useEffect(() => {
    const cores = navigator.hardwareConcurrency;
    const ratio = Math.min(window.devicePixelRatio, cores < 4 ? 1 : 2);
    setPixelRatio(ratio);
  }, []);

  // 120Hz-aware animation loop using requestAnimationFrame + delta time
  useEffect(() => {
    const blobs = blobRefs.current;
    const speeds = [0.15, 0.12, 0.18, 0.10]; // radians per second
    const phases = [0, Math.PI / 3, Math.PI / 2, Math.PI / 4];
    const amplitudes = [
      { x: 6, y: 4, s: 0.03 },
      { x: 7, y: 5, s: 0.05 },
      { x: 8, y: 3, s: 0.06 },
      { x: 3, y: 8, s: 0.07 },
    ];

    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = (now - startTimeRef.current) / 1000; // seconds with high precision

      blobs.forEach((blob, i) => {
        if (!blob) return;
        const amp = amplitudes[i];
        const speed = speeds[i];
        const phase = phases[i];
        const t = elapsed * speed + phase;

        const tx = Math.sin(t) * amp.x;
        const ty = Math.cos(t * 0.8) * amp.y;
        const scale = 1 + Math.sin(t * 0.5) * amp.s;

        blob.style.transform = `translate(${tx}%, ${ty}%) scale(${scale})`;
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Dawn transition listener
  useEffect(() => {
    const handleDawn = () => setDawn(true);
    window.addEventListener('dawn-transition', handleDawn);
    return () => window.removeEventListener('dawn-transition', handleDawn);
  }, []);

  // Memoize dawn class to avoid re-renders
  const dawnClass = useMemo(() => (dawn ? 'opacity-100' : 'opacity-0'), [dawn]);

  return (
    <div className="fluid-bg">
      {/* Fluid blobs with JS-driven animation for 120Hz precision */}
      <div
        ref={(el) => { blobRefs.current[0] = el; }}
        className={`fluid-blob fluid-blob-1 transition-opacity duration-[2500ms] ${dawnClass}`}
      />
      <div
        ref={(el) => { blobRefs.current[1] = el; }}
        className={`fluid-blob fluid-blob-2 transition-opacity duration-[2500ms] ${dawnClass}`}
      />
      <div
        ref={(el) => { blobRefs.current[2] = el; }}
        className={`fluid-blob fluid-blob-3 transition-opacity duration-[2500ms] ${dawnClass}`}
      />
      <div
        ref={(el) => { blobRefs.current[3] = el; }}
        className={`fluid-blob fluid-blob-4 transition-opacity duration-[2500ms] ${dawnClass}`}
      />

      {/* Frost glass overlay */}
      <div className="fluid-frost" />

      {/* Vignette mask - darker edges, brighter center */}
      <div className="fluid-vignette" />
    </div>
  );
}
