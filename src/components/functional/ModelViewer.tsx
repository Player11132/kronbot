import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  useGLTF,
  useFBX,
  Grid,
  Center,
  RandomizedLight,
  Environment
} from '@react-three/drei';
import style from './ModelViewer.module.css';

interface _props {
  src: string;
}

function Model({ src, ...props }: { src: string; [key: string]: any }) {
  let format = src.split('.')[src.split('.').length - 1];
  if (format === 'fbx') {
    const scene = useFBX(src);
    return <primitive object={scene} {...props} />;
  }

  const { scene } = useGLTF(src);
  return <primitive object={scene} {...props} />;
}

function ModelViewer({ src }: _props) {
  return (
    <div className={style.container}>
      <Canvas
        shadows
        gl={{ antialias: false, pixelRatio: window.devicePixelRatio }}
        dpr={[1, 1.5]}
        camera={{ position: [4, 3, 4], fov: 90 }}
      >
        {/* <Stage
          intensity={1}
          preset='rembrandt'
          environment='studio'
          castShadow
          shadows
          > */}
        <Center top>
          <Model
            position={[0, 3, 0]}
            castShadow
            receiveShadow
            src={src}
            scale={0.01}
          />
        </Center>
        <RandomizedLight intensity={1} count={6} radius={4} />
        <hemisphereLight args={['#2197C1', '#FFBB33', 0.5]} />
        <directionalLight
          intensity={0.4}
          position={[-10, 5, 0]}
          color={'#ffbb33'}
        />
        <directionalLight
          intensity={0.4}
          position={[10, 5, -10]}
          color={'#33e7ff '}
        />
        <Environment preset='city' />
        <Grid
          position={[0, -0.01, 0]}
          args={[10.5, 10.5]}
          infiniteGrid
          cellSize={0.6}
          cellColor={'#6f6f6f'}
          fadeDistance={25}
          followCamera={false}
          sectionColor={document.body.style.getPropertyValue('--mainColor')}
          cellThickness={1}
          sectionSize={3.3}
          sectionThickness={1.5}
        />

        {/* </Stage> */}

        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}

export default ModelViewer;
