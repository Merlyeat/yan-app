import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import styles from "./slider.module.css";

export default function Home() {
    const canvasRef = useRef(null);
    const cubeRef = useRef(null);
    const rotationSpeedRef = useRef(0.01);

    const handleSliderChange = (event) => {
        const newSize = parseFloat(event.target.value);
        if (cubeRef.current) {
            cubeRef.current.scale.set(newSize, newSize, newSize);
        }
    };

    const handleRotationSpeedChange = (event) => {
        const newSpeed = parseFloat(event.target.value);
        rotationSpeedRef.current = newSpeed;
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

        // Load the texture
        const textureLoader = new TextureLoader();
        const texture = textureLoader.load('/asasdasdasd.png');

        const material = new THREE.MeshPhongMaterial({ map: texture });

        // Create a red cube with shading
        const geometry = new THREE.BoxGeometry();
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Set the initial scale of the cube
        cube.scale.set(2, 2, 2);

        // Assign the cube to cubeRef
        cubeRef.current = cube;

        // Add a point light
        const light = new THREE.PointLight(0xffffff, 2, 100);
        light.position.set(10, 10, 10);
        scene.add(light);

        // Add an ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 1);
        scene.add(ambientLight);

        // Position the camera
        camera.position.z = 5;

        // Animation loop
        const animate = function () {
            requestAnimationFrame(animate);

            // Rotate the cube
            cube.rotation.x += rotationSpeedRef.current;
            cube.rotation.y += rotationSpeedRef.current;

            renderer.render(scene, camera);
        };

        animate();
    }, []);

    return (
        <>
            <label htmlFor="sizeSlider" className={styles.label} style={{ top: "10px" }}>
                Size
            </label>
            <input
                type="range"
                min="1"
                max="5"
                step="0.1"
                onChange={(e) => handleSliderChange(e)}
                className={styles.slider}
            />
            <label htmlFor="speedSlider" className={styles.label} style={{ top: "50px" }}>
                Speed
            </label>
            <input
                type="range"
                min="0"
                max="0.05"
                step="0.0005"
                onChange={(e) => handleRotationSpeedChange(e)}
                className={styles.slider}
                style={{ top: "50px" }} // Adjust the top property to position the new slider
            />
            <canvas ref={canvasRef} />
        </>
    );
}
