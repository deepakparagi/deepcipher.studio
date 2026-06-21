'use client';

import { memo } from 'react';

function GrainOverlay() {
  return (
    <div
      className="grain-overlay"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0.12,
        backgroundImage:
          'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.22) 0 0.5px, transparent 0.7px), radial-gradient(circle at 70% 80%, rgba(0,0,0,0.18) 0 0.6px, transparent 0.8px)',
        backgroundSize: '3px 3px, 4px 4px',
        mixBlendMode: 'overlay',
        transform: 'translate3d(0,0,0)',
      }}
    />
  );
}

export default memo(GrainOverlay);
