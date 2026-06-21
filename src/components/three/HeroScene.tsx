'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import type { MotionValue } from 'framer-motion';

/* =========================================================
   HeroScene — Awwwards-level 3D WebGL hero background
   Features:
   - Crystalline wireframe icosahedron with gold edge glow
   - 3000+ floating gold particles with drift animation
   - Bloom post-processing for cinematic glow
   - Mouse-reactive camera parallax
   - Scroll-linked camera depth shift
   ========================================================= */

/* ── Custom Shader Material for Crystal Wireframe ── */
const crystalVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const crystalFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;

  void main() {
    // Fresnel-based edge glow — brighter at grazing angles
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.5);

    // Subtle shimmer based on position and time
    float shimmer = sin(vPosition.x * 2.0 + uTime * 0.5) *
                    sin(vPosition.y * 2.0 + uTime * 0.3) *
                    sin(vPosition.z * 2.0 + uTime * 0.4);
    shimmer = shimmer * 0.15 + 0.85;

    // Pulse glow
    float pulse = sin(uTime * 0.8) * 0.1 + 0.9;

    float alpha = fresnel * shimmer * pulse * 0.7;
    vec3 color = uColor * (1.0 + fresnel * 0.5);

    gl_FragColor = vec4(color, alpha);
  }
`;

/* ── Crystal Geometry ── */
function CrystalGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#B8956A') },
  }), []);

  // Wireframe edges geometry
  const edgesGeo = useMemo(() => {
    const ico = new THREE.IcosahedronGeometry(1.8, 1);
    return new THREE.EdgesGeometry(ico);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    uniforms.uTime.value = t;

    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.08;
      meshRef.current.rotation.x = t * 0.03;
      meshRef.current.rotation.z = Math.sin(t * 0.05) * 0.1;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.08;
      wireRef.current.rotation.x = t * 0.03;
      wireRef.current.rotation.z = Math.sin(t * 0.05) * 0.1;
    }
  });

  return (
    <group>
      {/* Solid icosahedron with custom shader — translucent gold faces */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.8, 1]} />
        <shaderMaterial
          vertexShader={crystalVertexShader}
          fragmentShader={crystalFragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Wireframe edges — crisp gold lines */}
      <lineSegments ref={wireRef} geometry={edgesGeo}>
        <lineBasicMaterial
          color="#B8956A"
          transparent
          opacity={0.35}
          linewidth={1}
        />
      </lineSegments>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          color="#B8956A"
          transparent
          opacity={0.08}
        />
      </mesh>
    </group>
  );
}

/* ── Floating Particle Field ── */
function ParticleField({ count = 3000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, sizes, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const ph = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute in a large sphere with some clustering
      const radius = 2 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      sz[i] = 0.008 + Math.random() * 0.035;
      ph[i] = Math.random() * Math.PI * 2;
    }

    return { positions: pos, sizes: sz, phases: ph };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const posArr = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const phase = phases[i];
      const idx = i * 3;

      // Slow orbital drift
      posArr[idx] += Math.sin(t * 0.15 + phase) * 0.001;
      posArr[idx + 1] += Math.cos(t * 0.12 + phase * 1.3) * 0.0008;
      posArr[idx + 2] += Math.sin(t * 0.1 + phase * 0.7) * 0.0006;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = t * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#B8956A"
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Camera Rig with Mouse Parallax + Scroll ── */
function CameraRig({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0, z: 6 });

  // Track mouse globally
  useFrame((state) => {
    const pointer = state.pointer;
    mouseRef.current.x = pointer.x;
    mouseRef.current.y = pointer.y;

    // Mouse parallax target
    const mx = pointer.x * 0.4;
    const my = pointer.y * 0.25;

    // Scroll-linked depth: push camera forward and tilt
    const scrollZ = 6 - scrollProgress * 3;
    const scrollY = scrollProgress * -1.5;

    targetRef.current.x = mx;
    targetRef.current.y = my + scrollY;
    targetRef.current.z = scrollZ;

    // Smooth lerp
    camera.position.x += (targetRef.current.x - camera.position.x) * 0.03;
    camera.position.y += (targetRef.current.y - camera.position.y) * 0.03;
    camera.position.z += (targetRef.current.z - camera.position.z) * 0.03;

    camera.lookAt(0, scrollProgress * -0.5, 0);
  });

  return null;
}

/* ── Ambient Dust — Very faint small particles ── */
function AmbientDust({ count = 800 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.008;
      ref.current.rotation.x = state.clock.elapsedTime * 0.005;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#F5F0E8"
        size={0.008}
        sizeAttenuation
        transparent
        opacity={0.15}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Main Scene Export ── */
interface HeroSceneProps {
  scrollProgress: number;
}

function SceneContent({ scrollProgress }: HeroSceneProps) {
  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.15} />
      
      {/* Point light from behind for rim lighting */}
      <pointLight position={[0, 0, -4]} color="#B8956A" intensity={0.8} />
      <pointLight position={[3, 2, 2]} color="#F5F0E8" intensity={0.3} />
      <pointLight position={[-3, -1, 3]} color="#B8956A" intensity={0.2} />

      {/* 3D Objects */}
      <CrystalGeometry />
      <ParticleField count={3000} />
      <AmbientDust count={800} />

      {/* Camera Controller */}
      <CameraRig scrollProgress={scrollProgress} />

      {/* Post-processing */}
      <EffectComposer multisampling={4}>
        <Bloom
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          intensity={0.8}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

export default function HeroScene({ scrollProgress }: HeroSceneProps) {
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      camera={{ position: [0, 0, 6], fov: 50, near: 0.1, far: 100 }}
      dpr={[1, 1.5]}
      style={{
        width: '100%',
        height: '100%',
        background: 'transparent',
      }}
    >
      <Suspense fallback={null}>
        <SceneContent scrollProgress={scrollProgress} />
      </Suspense>
    </Canvas>
  );
}
