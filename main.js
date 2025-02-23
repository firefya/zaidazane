import { gsap } from 'gsap';
import * as THREE from 'three';

document.addEventListener('DOMContentLoaded', () => {

    // --- Three.js Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        26, window.innerWidth / window.innerHeight, 0.1, 1000
    );

    // Set up canvas
    const canvas = document.getElementById('three-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Ensure transparency

    // Load logo texture
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load(
        'zz-logo.png', // Fallback to direct path
        () => console.log("✅ Logo Loaded"),
        undefined,
        (err) => console.error("❌ Error loading logo:", err)
    );

    // Create the rotating logo cube
    const logoGeometry = new THREE.BoxGeometry(3, 3, 3);
    const logoMaterial = new THREE.MeshBasicMaterial({ map: logoTexture });
    const logoCube = new THREE.Mesh(logoGeometry, logoMaterial);
    scene.add(logoCube);

    // Normalize scaling for both environments
    function adjustCameraAndCube() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const aspectRatio = viewportWidth / viewportHeight;
        const DPR = window.devicePixelRatio;

        console.log("Viewport:", viewportWidth, viewportHeight, "DPR:", DPR);

        // Adjust camera distance dynamically based on resolution
        const cameraDistance = Math.max(25, viewportWidth / 40);
        const cubeX = viewportWidth > 900 ? 8 : 6; // Adjust for different screens
        const cubeY = 6;
        const cubeZ = -6;

        camera.position.set(cameraDistance, cubeY, cameraDistance);
        camera.lookAt(0, 0, 0);

        logoCube.position.set(cubeX, cubeY, cubeZ);
    }

    // Adjust camera & cube dynamically **AFTER** cube creation
    adjustCameraAndCube();

    function animate() {
        requestAnimationFrame(animate);
        logoCube.rotation.x += 0.01;
        logoCube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();

    // Ensure proper resizing
    window.addEventListener('resize', () => {
        adjustCameraAndCube();
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

});

// --- GSAP Background and Menu Transitions ---
const backgrounds = {
    HOME: 'Still-03.png',
    MUSIC: 'Still-02.png',
    DATES: 'Still-01.png',
    BLOG: 'Still-04.png',
    BOOKING: 'Still-05.png'
};

const content = {
    HOME: "Welcome to the Home Page!",
    MUSIC: "Explore the world of music.",
    DATES: "Find out about upcoming events.",
    BLOG: "Read our latest posts and updates.",
    BOOKING: "Contact us for bookings."
};

function glitchTransition(newBgUrl) {
    const bgContainer = document.getElementById('bg-container');
    if (!bgContainer) {
        console.warn("⚠️ Warning: bg-container not found");
        return;
    }
    gsap.timeline()
      .to(bgContainer, { duration: 0.1, opacity: 0.5, filter: "blur(5px)", ease: "power2.in" })
      .set(bgContainer, { backgroundImage: `url(${newBgUrl})` })
      .to(bgContainer, { duration: 0.3, opacity: 1, filter: "blur(0px)", ease: "power2.out" });
}

const menuItems = document.querySelectorAll('#menu li');
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const key = item.getAttribute('data-key');
        if (backgrounds[key]) {
            glitchTransition(backgrounds[key]);
        }
        if (content[key]) {
            document.getElementById('text-overlay').innerText = content[key];
        }
    });
});
