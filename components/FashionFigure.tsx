"use client";

import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { MutableRefObject, useMemo, useRef } from "react";
import * as THREE from "three";

type FashionFigureProps = {
  scrollProgress: MutableRefObject<number>;
};

type VeilProps = {
  width: number;
  length: number;
  offset: [number, number, number];
  rotation: [number, number, number];
  phase: number;
};

function createRibbon(width: number, length: number, phase: number) {
  const segments = 72;
  const vertices: number[] = [];
  const indices: number[] = [];
  const center = new THREE.Vector3();

  for (let point = 0; point <= segments; point += 1) {
    const progress = point / segments;
    center.set(
      Math.sin(progress * 4.2 + phase) * width * (0.16 + progress * 0.38),
      -progress * length,
      Math.cos(progress * 3.1 + phase) * (0.08 + progress * 0.28),
    );
    const openWidth = width * (0.18 + Math.sin(progress * Math.PI) * 0.62 + progress * 0.32);
    vertices.push(center.x - openWidth, center.y, center.z);
    vertices.push(center.x + openWidth, center.y, center.z + Math.sin(progress * 5 + phase) * 0.05);

    if (point < segments) {
      const base = point * 2;
      indices.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function FlowingVeil({ width, length, offset, rotation, phase }: VeilProps) {
  const geometry = useMemo(() => createRibbon(width, length, phase), [length, phase, width]);
  const veil = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    if (!veil.current) return;
    veil.current.rotation.z =
      rotation[2] + Math.sin(clock.elapsedTime * 0.56 + phase) * 0.045 + pointer.x * 0.022;
    veil.current.rotation.x =
      rotation[0] + Math.cos(clock.elapsedTime * 0.42 + phase) * 0.024 - pointer.y * 0.018;
  });

  return (
    <mesh
      ref={veil}
      geometry={geometry}
      position={offset}
      rotation={rotation}
      renderOrder={3}
    >
      <meshPhysicalMaterial
        color="#eee5dd"
        depthWrite={false}
        opacity={0.18}
        roughness={0.88}
        side={THREE.DoubleSide}
        transparent
        transmission={0.76}
        thickness={0.12}
      />
    </mesh>
  );
}

function FigurePlane() {
  const figureTexture = useTexture("/archive/couture-figure.png");

  return (
    <>
      <mesh position={[0.08, -0.08, -0.045]} scale={[2.18, 4.92, 1]}>
        <planeGeometry />
        <meshBasicMaterial
          color="#2a1715"
          depthWrite={false}
          map={figureTexture}
          opacity={0.28}
          transparent
        />
      </mesh>
      <mesh position={[0, 0, 0]} scale={[2.18, 4.92, 1]} renderOrder={2}>
        <planeGeometry />
        <meshBasicMaterial
          alphaTest={0.02}
          color="#f2e9df"
          map={figureTexture}
          toneMapped={false}
          transparent
        />
      </mesh>
    </>
  );
}

export default function FashionFigure({
  scrollProgress,
}: {
  scrollProgress: React.MutableRefObject<number>;
}) {
  const figure = useRef<THREE.Group>(null);
  const { size } = useThree();

  useFrame(({ clock, pointer }, delta) => {
    if (!figure.current) return;
    const travel = scrollProgress.current;
    console.log("travel:", travel); 
    const compact = size.width < 640;
    const damping = 1 - Math.exp(-delta * 1.8);

    // Page 1 resting position
    let targetX = compact ? 0.18 : 0.92;

    // Drift right only after page 2 is in view (~travel 0.45+)
    // Small multiplier + low cap = composed, cinematic slide, not a launch
    if (travel > 0.71) {
      const drift = Math.min((travel - 0.71) * 6, 1.2);
      targetX += drift;
    }

    figure.current.position.x = THREE.MathUtils.lerp(
      figure.current.position.x,
      targetX,
      damping,
    );
    figure.current.position.y = THREE.MathUtils.lerp(
      figure.current.position.y,
      0.08 + Math.sin(clock.elapsedTime * 0.54) * 0.04 + travel * 0.12,
      damping,
    );
    const figureScale = compact ? 0.84 : 0.94;
    figure.current.scale.x = THREE.MathUtils.lerp(figure.current.scale.x, figureScale, damping);
    figure.current.scale.y = THREE.MathUtils.lerp(figure.current.scale.y, figureScale, damping);
    figure.current.scale.z = THREE.MathUtils.lerp(figure.current.scale.z, figureScale, damping);
    figure.current.rotation.y = THREE.MathUtils.lerp(
      figure.current.rotation.y,
      -0.08 + pointer.x * 0.08 - travel * 0.1,
      1 - Math.exp(-delta * 1.5),
    );
    figure.current.rotation.z = Math.sin(clock.elapsedTime * 0.3) * 0.006;
  });

  return (
    // Static starting position — useFrame drives all movement, no scroll baked into JSX
    <group
      ref={figure}
      position={[0.92, 0.08, -0.9]}
      scale={0.94}
    >
      <mesh position={[0, -2.34, -0.12]} rotation={[-Math.PI / 2, 0, 0]} scale={[1.35, 0.72, 1]}>
        <circleGeometry args={[1, 64]} />
        <meshBasicMaterial color="#3f1d19" opacity={0.28} transparent />
      </mesh>
      <FigurePlane />
      <FlowingVeil
        length={3.26}
        offset={[-0.34, 1.8, 0.12]}
        phase={0.8}
        rotation={[0.08, 0.24, 0.18]}
        width={0.64}
      />
      <FlowingVeil
        length={2.82}
        offset={[0.48, 1.02, 0.18]}
        phase={2.2}
        rotation={[0.22, -0.42, -0.54]}
        width={0.58}
      />
    </group>
  );
}