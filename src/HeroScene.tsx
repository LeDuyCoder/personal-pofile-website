import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html, OrbitControls, Stars } from '@react-three/drei'
import { useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import * as THREE from 'three'
import './scene.css'

const screens = [
  <div className="screen-code"><div><i /> <i /> <i /><span>studio.tsx</span></div><pre><b>01</b> <em>const</em> <strong>create</strong> = <em>() =&gt;</em> {'{'}<br/><b>02</b> &nbsp; <em>return</em> {'{'}<br/><b>03</b> &nbsp;&nbsp; idea: <strong>'something useful'</strong>,<br/><b>04</b> &nbsp;&nbsp; craft: <strong>'with intention'</strong>,<br/><b>05</b> &nbsp; {'}'}<br/><b>06</b> {'}'}</pre></div>,
  <div className="screen-terminal"><span>duykr@studio <i>~</i> %</span><p>$ npm run build</p><b>build complete</b><p>$ _</p></div>,
  <div className="screen-dash"><div className="dash-label">SYSTEM / 01</div><div className="dash-bars"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div><div className="dash-foot"><span>DESIGN</span><span>ENGINEERING</span><span>DETAIL</span></div></div>,
]

function Workstation({ mode, onChange, reduceMotion }: { mode: number; onChange: () => void; reduceMotion: boolean }) {
  const group = useRef<THREE.Group>(null)
  const screenRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  useFrame(({ pointer, clock }) => {
    if (group.current) {
      if (!reduceMotion) {
        group.current.rotation.y += ((pointer.x * 0.12) - group.current.rotation.y) * 0.025
        group.current.rotation.x += ((-pointer.y * 0.06) - group.current.rotation.x) * 0.025
        group.current.position.y = Math.sin(clock.elapsedTime * 0.65) * 0.075
      }
    }
    if (screenRef.current) screenRef.current.scale.setScalar(hovered ? 1.025 : 1)
  })
  return <group ref={group}>
    <mesh position={[0, -0.78, 0]} castShadow><boxGeometry args={[2.55, 0.09, 1.08]} /><meshStandardMaterial color="#555b6d" metalness={0.62} roughness={0.3} /></mesh>
    <mesh position={[0, -0.7, -0.05]}><boxGeometry args={[0.36, 0.12, 0.42]} /><meshStandardMaterial color="#73798b" metalness={0.72} roughness={0.26} /></mesh>
    <mesh position={[0, -0.57, -0.05]}><boxGeometry args={[0.98, 0.07, 0.55]} /><meshStandardMaterial color="#62697b" metalness={0.68} roughness={0.3} /></mesh>
    <mesh position={[0, 0.13, -0.38]} castShadow><boxGeometry args={[2.55, 1.62, 0.12]} /><meshStandardMaterial color="#303544" metalness={0.58} roughness={0.3} /></mesh>
    <mesh ref={screenRef} position={[0, 0.13, -0.308]} onClick={onChange} onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer' }} onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto' }}>
      <planeGeometry args={[2.37, 1.43]} /><meshBasicMaterial color="#18202b" />
      <Html transform center position={[0, 0, 0.008]} distanceFactor={1.43} occlude>
        <div className="scene-screen" onClick={onChange}>{screens[mode]}</div>
      </Html>
    </mesh>
    <mesh position={[0, 0.98, -0.31]}><boxGeometry args={[0.06, 0.025, 0.015]} /><meshBasicMaterial color="#353947" /></mesh>
    <Float speed={reduceMotion ? 0 : 1.4} rotationIntensity={reduceMotion ? 0 : 0.4} floatIntensity={reduceMotion ? 0 : 0.45}><mesh position={[-1.65, 0.9, 0.15]}><icosahedronGeometry args={[0.28, 1]} /><meshStandardMaterial color="#8b5cf6" metalness={0.72} roughness={0.2} wireframe /></mesh></Float>
    <Float speed={reduceMotion ? 0 : 1.1} rotationIntensity={reduceMotion ? 0 : 0.25} floatIntensity={reduceMotion ? 0 : 0.35}><mesh position={[1.62, -0.28, 0.18]}><octahedronGeometry args={[0.2, 0]} /><meshStandardMaterial color="#22d3ee" metalness={0.6} roughness={0.18} /></mesh></Float>
    <Float speed={reduceMotion ? 0 : 0.8} rotationIntensity={reduceMotion ? 0 : 0.2} floatIntensity={reduceMotion ? 0 : 0.3}><mesh position={[1.55, 1.12, -0.2]}><torusGeometry args={[0.18, 0.025, 12, 48]} /><meshStandardMaterial color="#6366f1" metalness={0.55} roughness={0.2} /></mesh></Float>
    {Array.from({ length: 12 }, (_, i) => <mesh key={i} position={[(i % 4 - 1.5) * 0.5, -0.665, (Math.floor(i / 4) - 1) * 0.12]}><boxGeometry args={[0.38, 0.018, 0.075]} /><meshStandardMaterial color="#83899a" metalness={0.42} roughness={0.36} /></mesh>)}
  </group>
}

export default function HeroScene() {
  const [mode, setMode] = useState(0)
  const reduceMotion = useReducedMotion() ?? false
  return <div className="scene-wrap" aria-label="Interactive 3D developer workstation. Click the monitor to change its display.">
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5.5], fov: 36 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={1.05} /><directionalLight position={[3, 5, 4]} intensity={2.8} color="#e6e0ff" /><pointLight position={[-3, 1, 2]} intensity={20} color="#8b5cf6" /><pointLight position={[3, -1, 1]} intensity={14} color="#22d3ee" />
      <Stars radius={24} depth={30} count={reduceMotion ? 0 : 360} factor={1.2} saturation={0} fade speed={reduceMotion ? 0 : 0.3} />
      <Workstation mode={mode} onChange={() => setMode((mode + 1) % 3)} reduceMotion={reduceMotion} />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
    <div className="scene-caption"><span className="live-dot" /> CLICK TO INTERACT <span>DISPLAY / 0{mode + 1}</span></div>
    <span className="scene-orbit orbit-one"/><span className="scene-orbit orbit-two"/>
  </div>
}
