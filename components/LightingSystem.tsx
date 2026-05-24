export default function LightingSystem() {
  return (
    <>
      <ambientLight color="#877a78" intensity={0.34} />
      <spotLight
        angle={0.3}
        color="#f0e6da"
        decay={1.6}
        intensity={88}
        penumbra={0.9}
        position={[0.7, 6.4, 3.3]}
      />
      <spotLight
        angle={0.42}
        color="#8e211f"
        decay={1.8}
        intensity={64}
        penumbra={0.92}
        position={[-4.6, 3.3, 1.8]}
      />
      <pointLight color="#bea99c" intensity={9} position={[3.7, 0.3, -2.2]} />
      <rectAreaLight
        color="#e3ddd6"
        height={4}
        intensity={2.2}
        position={[0, 2.2, -4.4]}
        rotation={[0, Math.PI, 0]}
        width={2.2}
      />
    </>
  );
}
