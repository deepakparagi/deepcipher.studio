"use client"

import { useEffect, useRef } from "react"

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const vertSrc = `#version 300 es
precision highp float;
layout(location=0) in vec2 a_pos;
void main(){ gl_Position = vec4(a_pos,0.0,1.0); }`

const fragSrc = `#version 300 es
precision highp float;
out vec4 fragColor;

uniform vec2  u_res;
uniform float u_time;

// robust tanh fallback
float tanh1(float x){ float e = exp(2.0*x); return (e-1.0)/(e+1.0); }
vec4 tanh4(vec4 v){ return vec4(tanh1(v.x), tanh1(v.y), tanh1(v.z), tanh1(v.w)); }

void main(){
  vec3 FC = vec3(gl_FragCoord.xy, 0.0);
  vec3 r  = vec3(u_res, max(u_res.x, u_res.y));
  float t = u_time;

  vec4 o = vec4(0.0);

  // === your code with safe inits & valid mat2 multiply, tanh replacement ===
  vec3 p = vec3(0.0);
  vec3 v = vec3(1.0, 2.0, 6.0);
  float i = 0.0, z = 1.0, d = 1.0, f = 1.0;

  for ( ; i++ < 5e1;
        o.rgb += (cos((p.x + z + v) * 0.1) + 1.0) / d / f / z )
  {
    // True 3D object-fit: cover - use min() for Z to ensure wide FOV on all screens
    vec3 ray = vec3(FC.xy * 2.0 - u_res.xy, -min(u_res.x, u_res.y));
    
    // Tilt the camera up on portrait screens to push the black void (floor) down
    if (u_res.x < u_res.y) {
        ray.y += u_res.y * 0.55; 
    }
    
    p = z * normalize(ray);

    vec4 m = cos((p + sin(p)).y * 0.4 + vec4(0.0, 33.0, 11.0, 0.0));
    p.xz = mat2(m) * p.xz;

    p.x += t / 0.2;

    z += ( d = length(cos(p / v) * v + v.zxx / 7.0) /
           ( f = 2.0 + d / exp(p.y * 0.2) ) );
  }

  // Adjust output color specifically for deepcipher branding (gold-ish hue)
  o = tanh4(0.2 * o);
  o.rgb = o.rgb * vec3(0.8, 0.6, 0.4); // Tint it
  o.a = 1.0;
  fragColor = o;
}`

export default function ShaderDemo_ATC({ className }: { className?: string }){
  const ref = useRef<HTMLCanvasElement>(null)
  const preRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    const canvas = ref.current!, pre = preRef.current!
    const gl = canvas.getContext("webgl2", { premultipliedAlpha:false })
    if (!gl) { pre.textContent = "WebGL2 not available"; return }

    const compile = (type:number, src:string) => {
      const sh = gl.createShader(type)!; gl.shaderSource(sh, src); gl.compileShader(sh)
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS))
        throw new Error(gl.getShaderInfoLog(sh) || "compile error")
      return sh
    }
    const link = (vs:string, fs:string) => {
      const p = gl.createProgram()!
      gl.attachShader(p, compile(gl.VERTEX_SHADER, vs))
      gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fs))
      gl.linkProgram(p)
      if (!gl.getProgramParameter(p, gl.LINK_STATUS))
        throw new Error(gl.getProgramInfoLog(p) || "link error")
      return p
    }

    let prog: WebGLProgram
    try { prog = link(vertSrc, fragSrc) }
    catch(e:any){ (pre.textContent as any) = "Shader error:\n"+e.message; return }

    gl.useProgram(prog)

    const buf = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1,-1,  1,-1, -1, 1,  -1, 1,  1,-1,  1, 1,
    ]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0)

    const uRes  = gl.getUniformLocation(prog, "u_res")
    const uTime = gl.getUniformLocation(prog, "u_time")

    const resize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio||1))
      // Use parent wrapper's width/height to fill container
      const w = Math.floor((canvas.clientWidth)*dpr)
      const h = Math.floor((canvas.clientHeight)*dpr)
      if (canvas.width!==w || canvas.height!==h){ canvas.width=w; canvas.height=h }
      gl.viewport(0,0,w,h)
      gl.uniform2f(uRes, w, h)
    }
    const onResize = () => { resize() }
    window.addEventListener("resize", onResize, {passive:true})
    resize()

    let raf = 0
    const t0 = performance.now()
    const draw = () => {
      const t = (performance.now()-t0)/1000
      gl.uniform1f(uTime, t)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize) }
  }, [])

  return (
    <div className={cn("absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40", className)}>
      <canvas ref={ref} className="block w-full h-full bg-[#0A0A0A]" />
      <pre ref={preRef} className="hidden" />
    </div>
  )
}
