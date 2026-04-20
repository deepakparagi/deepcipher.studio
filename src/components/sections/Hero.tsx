'use client';

import { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import Link from 'next/link';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';

/* ========================================
   Three.js Particle Canvas (5000 Particles)
   ======================================== */

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const { size, viewport } = useThree();

  const [positions, initialPositions, velocities, sizes] = useMemo(() => {
    const count = 6000;
    const pos = new Float32Array(count * 3);
    const init = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 16 * Math.cbrt(Math.random());

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      init[i * 3] = x;
      init[i * 3 + 1] = y;
      init[i * 3 + 2] = z;

      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

      sz[i] = Math.random() * 0.04 + 0.005;
    }
    return [pos, init, vel, sz];
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * viewport.width;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * viewport.height;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [viewport]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position;

    for (let i = 0; i < positions.length / 3; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // 1. Natural Drift
      positions[ix] += velocities[ix] * Math.sin(time * 0.5);
      positions[iy] += velocities[iy] * Math.cos(time * 0.5);
      positions[iz] += velocities[iz];

      // 2. Mouse Interaction (Repulsion)
      const dx = positions[ix] - mouseRef.current.x;
      const dy = positions[iy] - mouseRef.current.y;
      const distSq = dx * dx + dy * dy;
      
      if (distSq < 4) {
        const force = (4 - distSq) / 4;
        positions[ix] += dx * force * 0.05;
        positions[iy] += dy * force * 0.05;
      }

      // 3. Subtle pull back to origin
      positions[ix] += (initialPositions[ix] - positions[ix]) * 0.01;
      positions[iy] += (initialPositions[iy] - positions[iy]) * 0.01;
      positions[iz] += (initialPositions[iz] - positions[iz]) * 0.01;
    }

    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        sizeAttenuation
        color="#FFFFFF"
        transparent
        opacity={0.3}
        size={0.025}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function DeepcipherCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Points>(null);
  const lightOrbitRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (coreRef.current) {
      // Prioritize X rotation for the "upside" feel
      coreRef.current.rotation.x = time * 0.4; 
      coreRef.current.rotation.y = time * 0.15;
      coreRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = -time * 0.12;
      wireframeRef.current.rotation.y = -time * 0.08;
      const scale = 1.0 + Math.sin(time * 1.5) * 0.02;
      wireframeRef.current.scale.setScalar(scale);
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = 1.2 + Math.sin(time * 0.3) * 0.2;
      ring1Ref.current.rotation.y = time * 0.4; // Speed up
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = 0.8 + Math.cos(time * 0.2) * 0.2;
      ring2Ref.current.rotation.x = time * 0.3; // Speed up
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = time * 0.05;
      ring3Ref.current.rotation.y = -time * 0.2;
    }
    if (lightOrbitRef.current) {
      lightOrbitRef.current.rotation.y = time * 0.8;
      lightOrbitRef.current.rotation.x = time * 0.5;
    }
  });

  return (
    <group>
      {/* Dynamic orbiting light to catch specularity */}
      <group ref={lightOrbitRef}>
        <pointLight position={[1.5, 0, 0]} intensity={4} color="#D4A853" distance={4} />
        <pointLight position={[-1.5, 0, 0]} intensity={2} color="#ffffff" distance={4} />
      </group>

      {/* Solid inner geometric crystal */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshPhysicalMaterial 
          color="#050505" 
          metalness={1.0} 
          roughness={0.15} 
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          flatShading={true}
        />
      </mesh>

      {/* Outer pulsing wireframe web */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[1.05, 2]} />
        <meshBasicMaterial 
          color="#D4A853" 
          wireframe={true} 
          transparent 
          opacity={0.08} 
        />
      </mesh>

      {/* Interlocking gyroscope rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.4, 0.002, 16, 120]} />
        <meshBasicMaterial color="#D4A853" transparent opacity={0.5} />
      </mesh>

      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.65, 0.001, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </mesh>

      {/* Outer floating particle ring */}
      <points ref={ring3Ref}>
        <torusGeometry args={[1.9, 0.05, 16, 80]} />
        <pointsMaterial color="#D4A853" size={0.012} transparent opacity={0.4} />
      </points>

      {/* Volumetric core glow */}
      <mesh scale={2.4}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#D4A853" transparent opacity={0.015} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}



interface StatItem {
  value: string;
  label: string;
}

const HERO_STATS: StatItem[] = [
  { value: '20+', label: 'WEBSITES LAUNCHED' },
  { value: '10', label: 'PROJECTS PER YEAR' },
  { value: '24hr', label: 'RESPONSE TIME' },
  { value: '95+', label: 'Lighthouse Score' },
];

/* ========================================
   Animation Config
   ======================================== */

const LOADER_DELAY = 3.2;
const SPRING_CONFIG = { type: 'spring' as const, stiffness: 80, damping: 16 };

/* ========================================
   Technical Mouse Crosshair
   ======================================== */

function MouseCrosshair() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useMotionValueEvent(mouseX, "change", (latest) => {
    setCoords(prev => ({ ...prev, x: Math.floor(latest) }));
  });

  useMotionValueEvent(mouseY, "change", (latest) => {
    setCoords(prev => ({ ...prev, y: Math.floor(latest) }));
  });

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Horizontal Line */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: mouseY,
          height: '1px',
          backgroundColor: 'rgba(184,149,106,0.1)',
        }}
      />
      {/* Vertical Line */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: mouseX,
          width: '1px',
          backgroundColor: 'rgba(184,149,106,0.1)',
        }}
      />
      {/* Coordinates label */}
      <motion.div
        style={{
          position: 'absolute',
          left: mouseX,
          top: mouseY,
          x: 20,
          y: 20,
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '9px',
          color: 'rgba(184,149,106,0.4)',
          letterSpacing: '0.1em',
        }}
      >
        [ {coords.x} : {coords.y} ]
      </motion.div>
    </div>
  );
}

/* ========================================
   Section 1 — Hero Component
   ======================================== */

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scrollRotateX = useTransform(scrollYProgress, [0, 0.2], [0, 45]);
  const scrollYOffset = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative w-full flex flex-col overflow-hidden"
      style={{
        minHeight: '100svh',
        backgroundColor: '#0A0A0A',
        perspective: '1200px', // Enable section-level 3D depth
      }}
    >
      {/* ── Background WebGL ── */}
      <div className="absolute inset-0 z-0">
        {mounted && (
          <Canvas
            camera={{ position: [0, 0, 18], fov: 45 }}
            gl={{ antialias: false, alpha: false }}
            dpr={[1, 1.5]}
          >
            <fog attach="fog" args={['#0A0A0A', 10, 25]} />
            <ParticleField />
            
            <EffectComposer multisampling={0}>
              <Bloom 
                intensity={1.5} 
                luminanceThreshold={0.2} 
                luminanceSmoothing={0.9} 
                height={300} 
              />
              <Noise opacity={0.03} />
              <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
          </Canvas>
        )}
      </div>

      {/* ── Mouse glow ── */}
      <div className="hero-mouse-glow" />

      {/* ── Decorative hairlines ── */}
      <div className="hero-hairline hero-hairline--left" />
      <div className="hero-hairline hero-hairline--right" />



      {/* ── 3D Planet DC Badge — right center ── */}
      <motion.div 
        className="hidden lg:flex absolute z-20 pointer-events-none flex-col items-center"
        style={{ 
          right: 'clamp(48px, 5vw, 80px)', 
          top: '28%', 
          y: scrollYOffset,
          rotateX: scrollRotateX,
          transformStyle: 'preserve-3d'
        }}
        initial={{ opacity: 0, scale: 0.7, y: '50%', rotateX: 60 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: 0, // This is combined with scrollYOffset via framer-motion props
          rotateX: 0,
        }}
        transition={{ 
          duration: 2.2, 
          delay: LOADER_DELAY + 0.3, 
          ease: [0.16, 1, 0.3, 1] 
        }}
      >
        {/* 3D Planet container */}
        <div
          className="relative"
          style={{ width: '240px', height: '240px' }}
        >
          {/* Three.js Planet Canvas */}
          {mounted && (
            <Canvas
              camera={{ position: [0, 0, 3.2], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 2]}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '300px',
                height: '300px',
              }}
            >
              <ambientLight intensity={0.15} />
              <directionalLight position={[3, 2, 4]} intensity={0.8} color="#FFFFFF" />
              <directionalLight position={[-2, -1, -2]} intensity={0.3} color="#B8956A" />
              <pointLight position={[0, 0, 3]} intensity={0.4} color="#B8956A" />
              <DeepcipherCore />
            </Canvas>
          )}

          {/* DC text overlay — positioned strictly centered */}
          <div
            className="absolute flex flex-col items-center justify-center z-10 w-full h-full"
            style={{ 
              pointerEvents: 'none', 
              top: 0, 
              left: 0, 
              marginTop: '-4px' // Counter-balance the EST text below 
            }}
          >
            <motion.span
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: LOADER_DELAY + 0.8, duration: 1.2 }}
              style={{
                fontFamily: 'var(--dm-sans), sans-serif',
                fontWeight: 200,
                fontStyle: 'normal',
                fontSize: '48px',
                color: '#ffffff',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                marginRight: '-0.04em', // Fixes optical shifting from letter-spacing
                textShadow: '0 4px 24px rgba(184,149,106,0.3), 0 0 40px rgba(0,0,0,0.6)',
              }}
            >
              DC
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: LOADER_DELAY + 1.2, duration: 0.8 }}
              style={{
                fontFamily: 'var(--dm-mono), monospace',
                fontSize: '8px',
                color: 'rgba(184,149,106,0.8)',
                letterSpacing: '0.4em',
                marginRight: '-0.4em', // Fix optical shift
                marginTop: '10px',
                textTransform: 'uppercase',
              }}
            >
              EST. 2025
            </motion.span>
          </div>

          {/* Atmospheric outer glow */}
          <div
            className="absolute w-full h-full"
            style={{
              top: 0,
              left: 0,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(184,149,106,0.06) 0%, rgba(184,149,106,0.02) 40%, transparent 70%)',
              pointerEvents: 'none',
              transform: 'scale(1.2)',
            }}
          />
        </div>

        {/* Vertical line below badge */}
        <div
          style={{
            width: '1px',
            height: '140px',
            background: 'linear-gradient(to bottom, rgba(184,149,106,0.4), transparent)',
            marginTop: '20px',
          }}
        />

        {/* Studio label */}
        <span
          style={{
            fontFamily: 'var(--dm-mono), monospace',
            fontSize: '9px',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.35em',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            marginTop: '16px',
            textTransform: 'uppercase',
          }}
        >
          WEB & BRAND STUDIO
        </span>
      </motion.div>

      {/* ── Scroll indicator — bottom right ── */}
      <div
        className="absolute z-20 pointer-events-none flex flex-col items-center"
        style={{ bottom: '40px', right: '40px' }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: LOADER_DELAY + 1.5 }}
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '9px',
            color: 'rgba(255,255,255,0.2)',
            writingMode: 'vertical-rl',
            letterSpacing: '0.2em',
            marginBottom: '12px',
          }}
        >
          SCROLL
        </motion.span>
        <div className="relative" style={{ width: '1px', height: '48px' }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)',
            }}
          />
          <motion.div
            animate={{ y: [0, 44, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              top: 0,
              left: '-1.5px',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: 'rgba(184,149,106,0.6)',
            }}
          />
        </div>
      </div>

      {/* ── Technical Crosshairs ── */}
      <MouseCrosshair />

      {/* ── Main content — flex flex-col justify-end ── */}
      <div
        className="relative z-10 w-full flex-1 flex flex-col justify-end"
        style={{
          paddingTop: 'clamp(120px, 15vh, 160px)',
          paddingBottom: 'clamp(48px, 6vw, 80px)',
          paddingLeft: 'clamp(24px, 6vw, 80px)',
          paddingRight: 'clamp(24px, 6vw, 80px)',
        }}
      >
        {/* Headline */}
        <h1
          className="m-0"
          style={{
            fontFamily: 'var(--font-display), serif',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(64px, 8vw, 132px)',
            lineHeight: 0.84,
            letterSpacing: '-0.02em',
            color: '#fff',
          }}
        >
          {/* Line 1 — WHERE VISION */}
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: '110%', filter: 'blur(20px)', opacity: 0 }}
              animate={{ y: '0%', filter: 'blur(0px)', opacity: 1 }}
              transition={{ ...SPRING_CONFIG, delay: LOADER_DELAY }}
            >
              WHERE VISION
            </motion.span>
          </span>

          {/* Line 2 — MEETS (gold + indented) */}
          <span className="block overflow-hidden" style={{ marginLeft: 'clamp(48px, 6vw, 120px)' }}>
            <motion.span
              className="block"
              style={{ color: '#B8956A' }}
              initial={{ y: '110%', filter: 'blur(20px)', opacity: 0 }}
              animate={{ y: '0%', filter: 'blur(0px)', opacity: 1 }}
              transition={{ ...SPRING_CONFIG, delay: LOADER_DELAY + 0.2 }}
            >
              MEETS
            </motion.span>
          </span>

          {/* Line 3 — EXECUTION. (gold period) */}
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: '110%', filter: 'blur(20px)', opacity: 0 }}
              animate={{ y: '0%', filter: 'blur(0px)', opacity: 1 }}
              transition={{ ...SPRING_CONFIG, delay: LOADER_DELAY + 0.4 }}
            >
              EXECUTION<span style={{ color: '#B8956A' }}>.</span>
            </motion.span>
          </span>
        </h1>

        {/* 1px rule */}
        <motion.div
          className="w-full origin-left"
          style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.1)', marginTop: '32px' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: LOADER_DELAY + 0.6, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: LOADER_DELAY + 0.8 }}
          className="m-0"
          style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontWeight: 300,
            fontSize: '17px',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '520px',
            lineHeight: 1.85,
            marginTop: '24px',
          }}
        >
          Most businesses have the vision. Few have the digital presence to match it.
          We close that gap — with custom websites and brand identities engineered to
          convert, built to endure, and impossible to ignore.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex items-center"
          style={{ gap: '24px', marginTop: '36px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: LOADER_DELAY + 1.1 }}
        >
          <Link
            href="/start-a-project"
            className="block transition-transform duration-200 hover:scale-[0.98] active:scale-[0.96]"
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              backgroundColor: '#fff',
              color: '#0A0A0A',
              padding: '20px 40px',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            START YOUR PROJECT →
          </Link>
          <Link
            href="/work"
            className="hidden sm:inline-block group"
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '10px',
              color: 'rgba(255,255,255,0.45)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.2)',
              paddingBottom: '2px',
              transition: 'color 300ms ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.9)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
          >
            Explore our work
          </Link>
        </motion.div>

        {/* Stats row */}
        <div
          className="flex flex-wrap"
          style={{ gap: 'clamp(24px, 4vw, 56px)', marginTop: '48px' }}
        >
          {HERO_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col"
              style={{ gap: '8px' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: LOADER_DELAY + 1.3 + i * 0.1 }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display), serif',
                  fontWeight: 300,
                  fontSize: 'clamp(36px, 4.5vw, 64px)',
                  color: '#fff',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '9px',
                  color: 'rgba(255,255,255,0.35)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
