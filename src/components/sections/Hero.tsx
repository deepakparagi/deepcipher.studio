'use client';

import { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import Link from 'next/link';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';

const ShaderGradientComponent = ShaderGradient as any;

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
  const [btnHover, setBtnHover] = useState(false);
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
        minHeight: 'calc(100svh - 72px)',
        backgroundColor: '#0A0A0A',
        perspective: '1200px', // Enable section-level 3D depth
      }}
    >
      {/* ── Background WebGL ── */}
      <div className="absolute inset-0 z-0">
        <ShaderGradientCanvas
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          <ShaderGradientComponent
            animate="on"
            axesHelper="off"
            bgColor1="#000000"
            bgColor2="#050505"
            brightness={1.1}
            cAzimuthAngle={170}
            cDistance={4.4}
            cPolarAngle={70}
            cameraZoom={1}
            color1="#0a0a0a"
            color2="#8a8a8a"
            color3="#e8e8e8"
            destination="onCanvas"
            embedMode="off"
            envPreset="city"
            format="gif"
            fov={45}
            frameRate={10}
            gizmoHelper="hide"
            grain="off"
            lightType="3d"
            pixelDensity={1}
            positionX={0}
            positionY={0.9}
            positionZ={-0.3}
            range="disabled"
            rangeEnd={40}
            rangeStart={0}
            reflection={0.1}
            rotationX={45}
            rotationY={0}
            rotationZ={0}
            shader="defaults"
            type="waterPlane"
            uAmplitude={0}
            uDensity={1.2}
            uFrequency={0}
            uSpeed={0.2}
            uStrength={3.4}
            uTime={0}
            wireframe={false}
          />
        </ShaderGradientCanvas>
      </div>

      {/* ── Dark scrim so text stays readable over bright gradient areas ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 60% 40%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.65) 100%)',
        }}
      />

      {/* ── Mouse glow ── */}
      <div className="hero-mouse-glow" />





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
        className="relative z-10 w-full flex-1 flex flex-col justify-center items-center text-center"
        style={{
          paddingTop: 'clamp(60px, 8vh, 120px)',
          paddingBottom: 'clamp(24px, 4vh, 60px)',
          paddingLeft: 'clamp(16px, 4vw, 80px)',
          paddingRight: 'clamp(16px, 4vw, 80px)',
        }}
      >
        {/* Headline */}
        <h1
          className="m-0 text-center"
          style={{
            fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(44px, 11vw, 110px)',
            lineHeight: 0.84,
            letterSpacing: '-0.02em',
            color: '#fff',
            width: '100%',
          }}
        >
          {/* Line 1 — WHERE VISION */}
          <span className="block overflow-hidden">
            <motion.span
              className="block text-center"
              initial={{ y: '110%', filter: 'blur(20px)', opacity: 0 }}
              animate={{ y: '0%', filter: 'blur(0px)', opacity: 1 }}
              transition={{ ...SPRING_CONFIG, delay: LOADER_DELAY }}
            >
              WHERE VISION
            </motion.span>
          </span>

          {/* Line 2 — MEETS (gold) */}
          <span className="block overflow-hidden">
            <motion.span
              className="block text-center"
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
              className="block text-center"
              initial={{ y: '110%', filter: 'blur(20px)', opacity: 0 }}
              animate={{ y: '0%', filter: 'blur(0px)', opacity: 1 }}
              transition={{ ...SPRING_CONFIG, delay: LOADER_DELAY + 0.4 }}
            >
              EXECUTION<span style={{ color: '#B8956A' }}>.</span>
            </motion.span>
          </span>
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: LOADER_DELAY + 0.8 }}
          className="m-0 text-center"
          style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontWeight: 300,
            fontSize: 'clamp(13px, 3.5vw, 17px)',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '520px',
            lineHeight: 1.6,
            marginTop: 'clamp(24px, 4vh, 48px)',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Most businesses have the vision. Few have the digital presence to match it.
          We close that gap — with custom websites and brand identities engineered to
          convert, built to endure, and impossible to ignore.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex items-center justify-center"
          style={{ gap: '16px', marginTop: 'clamp(24px, 4vh, 36px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: LOADER_DELAY + 1.1 }}
        >
          <Link
            href="/start-a-project"
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            className="block transition-all duration-300 hover:scale-[0.98] active:scale-[0.96]"
            style={{
              fontFamily: 'var(--dm-mono), monospace',
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              backgroundColor: btnHover ? '#F5F0E8' : 'transparent',
              color: btnHover ? '#0A0A0A' : '#F5F0E8',
              border: '1px solid rgba(245, 240, 232, 0.2)',
              padding: '16px 32px',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            START YOUR PROJECT &rarr;
          </Link>
          
          <Link
            href="/work"
            className="hidden sm:inline-block group relative pb-1 select-none"
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '13px',
              color: '#6B6560',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#B8956A'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#6B6560'; }}
          >
            Explore our work &rarr;
            <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#B8956A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />
          </Link>
        </motion.div>

        {/* Stats row */}
        <div
          className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center select-none gap-y-6 gap-x-4 md:gap-0"
          style={{ marginTop: 'clamp(32px, 5vh, 48px)' }}
        >
          {HERO_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center text-center md:border-r last:border-r-0 border-[rgba(245,240,232,0.1)]"
              style={{ 
                gap: '8px',
                padding: '0 clamp(16px, 2.5vw, 40px)',
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: LOADER_DELAY + 1.3 + i * 0.1 }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display), serif',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  fontSize: 'clamp(28px, 8vw, 64px)',
                  color: '#F5F0E8',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '9px',
                  color: '#B8956A',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Vertical Side Text (far right edge, fixed & vertically centered) ── */}
      <div 
        className="hidden lg:flex fixed z-30 pointer-events-none items-center justify-center"
        style={{
          right: '24px',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--dm-mono), monospace',
            fontSize: '9px',
            color: 'rgba(245,240,232,0.2)',
            writingMode: 'vertical-rl',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
          }}
        >
          WEB &amp; BRAND STUDIO
        </span>
      </div>
    </section>
  );
}
