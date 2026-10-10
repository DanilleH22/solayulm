import React, { useMemo } from 'react';
import '../../styles/Homepage2.module.css';

function DustField({ count = 40 }) {
  const dust = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const size = (1 + Math.random() * 2.5).toFixed(1);
      return {
        id: i,
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 100}vh`,
        width: `${size}px`,
        height: `${size}px`,
        opacity: (0.15 + Math.random() * 0.5).toFixed(2),
        animationDelay: `${Math.random() * 20}s`,
        animationDuration: `${14 + Math.random() * 18}s`,
      };
    });
  }, [count]);

  return (
    <div className="cosmic-dust-layer">
      {dust.map((d) => (
        <div
          key={d.id}
          className="cosmic-dust"
          style={{
            left: d.left,
            top: d.top,
            width: d.width,
            height: d.height,
            opacity: d.opacity,
            animationDelay: d.animationDelay,
            animationDuration: d.animationDuration,
          }}
        />
      ))}
    </div>
  );
}

export default function CosmicBackground({ children }) {
  return (
    <div className="cosmic-space">
      {/* Nebula clouds */}
      <div className="cosmic-nebula n1" />
      <div className="cosmic-nebula n2" />
      <div className="cosmic-nebula n3" />
      <div className="cosmic-nebula n4" />

      {/* Soft cosmic mist */}
      <div className="cosmic-mist" />

      {/* Shooting stars */}
      <div className="cosmic-shooting-star s1" />
      <div className="cosmic-shooting-star s2" />
      <div className="cosmic-shooting-star s3" />

      {/* Planet */}
      <div className="cosmic-planet-wrap">
        <div className="cosmic-planet-glow" />
        <div className="cosmic-planet" />
      </div>

      {/* Cosmic dust */}
      <DustField count={40} />

      {/* Vignette for readability */}
      <div className="cosmic-vignette" />

      {/* Optional page content on top */}
      {children && <div className="cosmic-content">{children}</div>}
    </div>
  );
}