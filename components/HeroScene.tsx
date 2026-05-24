"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshReflectorMaterial,
  Sparkles,
  useTexture,
} from "@react-three/drei";
import { MutableRefObject, Suspense, useMemo } from "react";
import * as THREE from "three";
import FashionFigure from "@/components/FashionFigure";
import LightingSystem from "@/components/LightingSystem";

type HeroSceneProps = {
  scrollProgress: MutableRefObject<number>;
};

const archivePanels = [
  {
    url: "/archive/stone-veil.jpg",
    position: [-3.8, 1.45, -2.75] as [number, number, number],
    rotation: [0.03, 0.31, -0.04] as [number, number, number],
    scale: [1.28, 2.26] as [number, number],
  },
  {
    url: "/archive/cathedral-final.png",
    position: [3.72, 2.18, -3.45] as [number, number, number],
    rotation: [-0.05, -0.42, 0.03] as [number, number, number],
    scale: [1.56, 2.06] as [number, number],
  },
  {
    url: "/archive/translucent-train.jpg",
    position: [2.55, 0.7, -1.62] as [number, number, number],
    rotation: [0, -0.48, 0.04] as [number, number, number],
    scale: [0.9, 1.72] as [number, number],
  },
  {
    url: "/archive/pleated-muse.jpg",
    position: [-2.35, 0.38, -1.18] as [number, number, number],
    rotation: [0, 0.46, -0.04] as [number, number, number],
    scale: [0.82, 1.54] as [number, number],
  },
  {
    url: "/archive/phantom-new.png",
    position: [4, -1, -2] as [number, number, number],
    rotation: [0, -0.18, 0] as [number, number, number],
    scale: [3, 4] as [number, number],
  },
  {
    url: "/archive/future-new.jpg",
    position: [4.6, 1.7, -2.6] as [number, number, number],
    rotation: [0, -0.22, 0.02] as [number, number, number],
    scale: [2.4, 3.8] as [number, number],
  },
];

function CameraRig({ scrollProgress }: HeroSceneProps) {
  const { camera, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const travel = scrollProgress.current;
    target.set(
      pointer.x * 0.36 + travel * 0.44,
      1.02 + pointer.y * 0.18 + travel * 0.26,
      6.8 - travel * 1.7,
    );
    camera.position.lerp(target, 1 - Math.exp(-delta * 2.2));
    camera.lookAt(pointer.x * 0.2, 0.98 + travel * 0.14, -0.7);
    state.scene.rotation.y = THREE.MathUtils.lerp(
      state.scene.rotation.y,
      -pointer.x * 0.018,
      1 - Math.exp(-delta * 1.4),
    );
  });

  return null;
}

function ArchiveArchitecture() {
  return (
    <>
      <mesh position={[0, -1.82, -0.7]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15, 15]} />
        <MeshReflectorMaterial
          blur={[620, 180]}
          color="#070606"
          depthScale={0.72}
          metalness={0.52}
          mirror={0.82}
          mixBlur={1.18}
          mixStrength={2.8}
          roughness={0.34}
        />
      </mesh>
      {[-5.1, -2.1, 2.1, 5.1].map((x, index) => (
        <mesh key={x} position={[x, 1.5, -4.7]} scale={[1, 1, 1]}>
          <boxGeometry args={[0.34 + index * 0.02, 6.8, 0.48]} />
          <meshStandardMaterial color="#090807" metalness={0.42} roughness={0.22} />
        </mesh>
      ))}
      <mesh position={[0, 2.42, -5.15]}>
        <boxGeometry args={[10.9, 0.22, 0.6]} />
        <meshStandardMaterial color="#120d0d" metalness={0.6} roughness={0.28} />
      </mesh>
      <mesh position={[0, -0.05, -4.94]}>
        <planeGeometry args={[10.6, 4.9]} />
        <meshStandardMaterial
          color="#0b0808"
          emissive="#240c0b"
          emissiveIntensity={0.22}
          metalness={0.42}
          roughness={0.72}
        />
      </mesh>
      <mesh position={[0, -1.2, -0.88]}>
        <cylinderGeometry args={[1.62, 1.86, 0.24, 64]} />
        <meshStandardMaterial color="#11100f" metalness={0.74} roughness={0.2} />
      </mesh>
    </>
  );
}

function ArchivePanels() {
  return (
    <>
      {archivePanels.map((panel, index) => (
        <Float
          key={panel.url}
          floatIntensity={0.16 + index * 0.02}
          rotationIntensity={0.045}
          speed={0.72 + index * 0.1}
        >
          <group position={panel.position} rotation={panel.rotation}>
            <mesh position={[0, 0, -0.025]} scale={[panel.scale[0] + 0.08, panel.scale[1] + 0.08, 1]}>
              <planeGeometry />
              <meshStandardMaterial
                color="#0d0b0a"
                metalness={0.46}
                roughness={0.24}
              />
            </mesh>
            <ArchivePanelImage scale={panel.scale} url={panel.url} />
          </group>
        </Float>
      ))}
    </>
  );
}

function ArchivePanelImage({
  scale,
  url,
}: {
  scale: [number, number];
  url: string;
}) {
  const texture = useTexture(url);

  return (
    <mesh scale={[scale[0], scale[1], 1]}>
      <planeGeometry />
      <meshBasicMaterial
        color="#b7aaa1"
        map={texture}
        opacity={url.includes("phantom") ? 0.62 : 0.74}
        blending={url.includes("phantom") ? THREE.AdditiveBlending : THREE.NormalBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

function GhostCathedral() {
  const cathedral = useTexture("/archive/cathedral-final.png");

  return (
    <group position={[0.2, 0.15, -3.4]}>
      <mesh scale={[8, 6.92, 1]}>
        <planeGeometry />
        <meshBasicMaterial
          alphaTest={0.015}
          blending={THREE.NormalBlending}
          color="#d0ccc5"
          depthWrite={false}
          map={cathedral}
          toneMapped
          opacity={0.60}
          transparent
        />
      </mesh>
      <mesh position={[0, -1.8, -3.8]}>
        <planeGeometry args={[10, 3]} />
        <meshBasicMaterial
          color="#d6c2a3"
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, -1.72, 0.018]} scale={[6.8, 2.42, 1]}>
        <planeGeometry />
        <meshBasicMaterial color="#080606" opacity={0.7} />
      </mesh>
    </group>
  );
}

function HeroWorld({ scrollProgress }: HeroSceneProps) {
  return (
    <>
      <color attach="background" args={["#020202"]} />
      <fogExp2 attach="fog" args={["#080505", 0.098]} />
      <CameraRig scrollProgress={scrollProgress} />
      <LightingSystem />
      <ArchiveArchitecture />
      <Suspense fallback={null}>
        <GhostCathedral />
        <ArchivePanels />
      </Suspense>
      <FashionFigure scrollProgress={scrollProgress} />
      <Sparkles
        color="#ead5c7"
        count={35}
        opacity={0.55}
        scale={[9, 5.5, 7]}
        size={1.65}
        speed={0.22}
      />
      <Environment preset="night" environmentIntensity={0.24} />
    </>
  );
}

const scrollTo = (target: number) => {
  window.dispatchEvent(new CustomEvent("scrollTo", { detail: target }));
};

export default function HeroScene({ scrollProgress }: HeroSceneProps) {
  return (
    <div className="absolute inset-0">
      <Canvas
        frameloop="always"
        camera={{ fov: 36, near: 0.1, far: 50, position: [0, 1.02, 6.8] }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <HeroWorld scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}