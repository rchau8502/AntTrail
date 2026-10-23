'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            console.log('[AntTrail] PWA Service Worker registered successfully:', reg.scope);
          })
          .catch((err) => {
            console.warn('[AntTrail] PWA Service Worker registration failed:', err);
          });
      });
    }
  }, []);

  return null;
}
