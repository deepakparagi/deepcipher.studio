"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    camera: THREE.Camera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    uniforms: any;
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `;

    // Updated fragment shader with Deepcipher Gold/Bronze palette
    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      vec3 getColor(float intensity) {
          vec3 color1 = vec3(0.05, 0.05, 0.05); // Dark
          vec3 color2 = vec3(0.15, 0.12, 0.08); // Dark brown
          vec3 color3 = vec3(0.4, 0.3, 0.2);    // Bronze
          vec3 color4 = vec3(0.72, 0.58, 0.41); // Deepcipher Gold
          vec3 color5 = vec3(0.85, 0.75, 0.60); // Light Gold
          vec3 color6 = vec3(0.4, 0.3, 0.2);    // Bronze
          vec3 color7 = vec3(0.05, 0.05, 0.05); // Dark

          vec3 finalColor = color1;
          finalColor = mix(finalColor, color2, smoothstep(0.0, 0.17, intensity));
          finalColor = mix(finalColor, color3, smoothstep(0.17, 0.34, intensity));
          finalColor = mix(finalColor, color4, smoothstep(0.34, 0.51, intensity));
          finalColor = mix(finalColor, color5, smoothstep(0.51, 0.68, intensity));
          finalColor = mix(finalColor, color6, smoothstep(0.68, 0.85, intensity));
          finalColor = mix(finalColor, color7, smoothstep(0.85, 1.0, intensity));
          
          return finalColor;
      }

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time*0.05;
        float lineWidth = 0.003;

        float radius = length(uv);
        float angle = atan(uv.y, uv.x);

        float total_intensity = 0.0;
        
        for(int i=0; i < 5; i++){
          float spiral_pattern = radius * 2.0 + angle * 0.5;
          total_intensity += lineWidth*float(i*i) / abs(fract(t + float(i)*0.02)*5.0 - spiral_pattern + mod(uv.x+uv.y, 0.2));
        }
        
        vec3 finalColor = getColor(fract(total_intensity * 0.25 + t * 0.1));

        gl_FragColor = vec4(finalColor * total_intensity, 1.0);
      }
    `;

    const camera = new THREE.Camera();
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
    };

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
      stencil: false,
      depth: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    container.appendChild(renderer.domElement);

    let isVisible = true;
    let animationId: number | null = null;

    const onWindowResize = () => {
      if (!container) return;
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight);
      uniforms.resolution.value.x = renderer.domElement.width;
      uniforms.resolution.value.y = renderer.domElement.height;
    };
    onWindowResize();
    window.addEventListener("resize", onWindowResize, { passive: true });

    const renderFrame = () => {
      if (!isVisible) return;
      animationId = requestAnimationFrame(renderFrame);
      uniforms.time.value += 0.03;
      renderer.render(scene, camera);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          if (animationId === null) {
            animationId = requestAnimationFrame(renderFrame);
          }
        } else if (animationId !== null) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onWindowResize);
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
      }
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-30"
      style={{
        background: "#000",
        overflow: "hidden",
      }}
    />
  );
}

export default ShaderAnimation;
