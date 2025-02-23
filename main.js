import { gsap } from 'gsap';
import * as THREE from 'three';

document.addEventListener('DOMContentLoaded', () => {
    const scene = new THREE.Scene();

    // Force a consistent FOV (Field of View) and Aspect Ratio
    const FIXED_WIDTH = 998;
    const FIXED_HEIGHT = 1378;
    const FIXED_ASPECT = FIXED_WIDTH / FIXED_HEIGHT;

    const camera = new THREE.PerspectiveCamera(
        69, // Keep FOV constant
        FIXED_ASPECT, // Lock aspect ratio
        0.1, 1000
    );

    const canvas = document.getElementById('three-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(FIXED_WIDTH, FIXED_HEIGHT);
    renderer.setClearColor(0x000000, 0);

    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load(
        'https://firefya.github.io/zaidazane/zz-logo.png', // Absolute URL
        () => console.log("✅ Logo Loaded"),
        undefined,
        (err) => console.error("❌ Error loading logo:", err)
    );

    const logoGeometry = new THREE.BoxGeometry(3, 3, 3);
    const logoMaterial = new THREE.MeshBasicMaterial({ map: logoTexture });
    const logoCube = new THREE.Mesh(logoGeometry, logoMaterial);
    scene.add(logoCube);

    // 🔹 LOCK Camera & Logo Position Consistently
    function adjustCameraAndCube() {
        console.log("📸 Adjusting Camera & Logo for Fixed Environment");
        
        camera.position.set(-4, 20, 6); // Move back for consistent view
        camera.lookAt(0, 0, 0);

        logoCube.position.set(13, 3, -5); // Ensure logo stays in view
        console.log("🎯 Logo Cube Position:", logoCube.position);
    }

    adjustCameraAndCube();

    function animate() {
        requestAnimationFrame(animate);
        logoCube.rotation.x += 0.01;
        logoCube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();

    // 🔹 Prevent Scaling Issues on Resize
    window.addEventListener('resize', () => {
        console.log("🔄 Resizing Window - Maintaining Fixed Aspect Ratio");
        camera.aspect = FIXED_ASPECT;
        camera.updateProjectionMatrix();
        renderer.setSize(FIXED_WIDTH, FIXED_HEIGHT);
    });
});

// Load Texture for the Sphere
const sphereTexture = new THREE.TextureLoader().load("path-to-your-texture.jpg");

// Create Sphere Geometry
const sphereGeometry = new THREE.SphereGeometry(3, 64, 64); // Radius: 3, Segments: 64 for smoothness
const sphereMaterial = new THREE.MeshBasicMaterial({ map: sphereTexture });

// Create Sphere Mesh
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// Position the Sphere
sphere.position.set(10, 5, -5); // Adjust X, Y, Z position as needed

// Animate Sphere Rotation (Optional)
function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.01; // Rotate slowly
    renderer.render(scene, camera);
}

animate();

//Sphere animation




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