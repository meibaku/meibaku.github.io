"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Icosahedron, OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function FloatingCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.18;
    meshRef.current.rotation.x += delta * 0.04;
    meshRef.current.position.x += (pointer.current.x * 0.45 - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (-pointer.current.y * 0.3 - meshRef.current.position.y) * 0.05;

    pointer.current.x = state.pointer.x;
    pointer.current.y = state.pointer.y;
  });

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#7F77DD",
        wireframe: true,
      }),
    [],
  );

  return <Icosahedron ref={meshRef} args={[1.8, 0]} material={material} />;
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 48 }}
      dpr={[1, 1.6]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      performance={{ min: 0.6 }}
    >
      <color attach="background" args={["#080810"]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[2, 3, 4]} intensity={4} color="#7F77DD" />
      <FloatingCore />
      <EffectComposer>
        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={0.65} />
      </EffectComposer>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
    </Canvas>
  );
}
