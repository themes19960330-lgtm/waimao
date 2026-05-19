'use client';

import { useEffect } from 'react';

export default function CrispChat() {
  useEffect(() => {
    // Crisp Chat integration placeholder
    // Replace with your actual Crisp website ID
    const CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID || '';

    if (CRISP_WEBSITE_ID && typeof window !== 'undefined') {
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = CRISP_WEBSITE_ID;

      const script = document.createElement('script');
      script.src = 'https://client.crisp.chat/l.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return null;
}

// Type declaration for Crisp
declare global {
  interface Window {
    $crisp: unknown[];
    CRISP_WEBSITE_ID: string;
  }
}
