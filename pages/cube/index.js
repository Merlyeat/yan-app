import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { TextureLoader, CubeTextureLoader } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Link from "next/link";
import styles from "./slider.module.css";
import MusicPlayer from './components/MusicPlayer';

export default function Home() {
    const canvasRef = useRef(null);
    const cubeRef = useRef(null);
    const rotationSpeedRef = useRef(0.01);
    const [initialSize, setInitialSize] = useState(2); // Initial value for size
    const [initialSpeed, setInitialSpeed] = useState(rotationSpeedRef.current * 200); // Initial value for speed
    const audioSrc = '/audio.mp3';

    const handleSliderChange = (event) => {
        const newSize = parseFloat(event.target.value);
        if (cubeRef.current) {
            cubeRef.current.scale.set(newSize, newSize, newSize);
        }
        setInitialSize(newSize);
    };

    const handleRotationSpeedChange = (event) => {
        const newSpeed = parseFloat(event.target.value);
        rotationSpeedRef.current = newSpeed / 1;  // Adjust the division as per your requirement
        setInitialSpeed(newSpeed);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Create a scene, camera and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

        // Set the canvas size
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Load the HDRI cube texture
        const loader = new CubeTextureLoader();
        const texture = loader.load([
            '/px.png',
            '/nx.png',
            '/py.png',
            '/ny.png',
            '/pz.png',
            '/nz.png'
        ]);

        // Set the scene's environment map to the loaded texture
        scene.background = texture;

        // Load the texture
        const textureLoader = new TextureLoader();
        const cubeTexture = textureLoader.load('/asasdasdasd.png');

        const material = new THREE.MeshStandardMaterial({
            map: cubeTexture,
            envMap: texture,
            roughness: 0.5
        });

        // Create a cube
        const geometry = new THREE.BoxGeometry();
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Set the initial scale of the cube
        cube.scale.set(initialSize, initialSize, initialSize);

        // Assign the cube to cubeRef
        cubeRef.current = cube;

        // Add a point light
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(10, 10, 10);
        scene.add(light);

        // Add an ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 1);
        scene.add(ambientLight);

        // Add orbit controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.autoRotate = true;
        controls.autoRotateSpeed = rotationSpeedRef.current;
        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        controls.dampingFactor = 0.04;


        // Position the camera
        camera.position.z = 5;

        // Animation loop
        const animate = function () {
            requestAnimationFrame(animate);

            // Update the controls
            controls.autoRotateSpeed = rotationSpeedRef.current;
            controls.update();

            renderer.render(scene, camera);
        };

        animate();
    }, []);

    return (
        <>
            <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                <Link href="/">
                    <button className={`${styles.btn} ${styles.btn_red}`}>
                        BACK
                    </button>
                </Link>
            </div>
            <div style={{ position: "absolute", top: "80px", right: "10px" }}>
                <label>Volume</label>
                <MusicPlayer src={audioSrc} />
            </div>
            <label htmlFor="sizeSlider" className={styles.label} style={{ top: "0px" }}>
                Size
            </label>
            <input
                type="range"
                min="1"
                max="5"
                step="0.1"
                value={initialSize}
                onChange={(e) => handleSliderChange(e)}
                className={styles.slider}
            />
            {/* <div className={styles.label} style={{ top: "30px" }}>
                Current size: {initialSize}
            </div> */}

            <label htmlFor="speedSlider" className={styles.label} style={{ top: "45px" }}>
                Speed
            </label>
            <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={initialSpeed}
                onChange={(e) => handleRotationSpeedChange(e)}
                className={styles.slider}
                style={{ top: "70px" }}
            />
            {/* <div className={styles.label} style={{ top: "90px" }}>
                Current speed: {initialSpeed.toFixed(1)}
            </div> */}
            <canvas ref={canvasRef} />
        </>
    );
}
