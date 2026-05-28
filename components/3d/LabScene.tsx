"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Orb() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.4;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
      <Sphere ref={ref} args={[1.2, 64, 64]}>
        <MeshDistortMaterial color="#1D9E75" wireframe roughness={0.2} metalness={0.4} distort={0.25} speed={1.2} />
      </Sphere>
    </Float>
  );
}

export default function LabScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4] }} dpr={[1, 2]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 3]} intensity={1.1} color="#7F77DD" />
      <Orb />
    </Canvas>
  );
}
