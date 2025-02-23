// main.js
import { gsap } from 'gsap';
import * as THREE from 'three';
// Removed CSS import to avoid MIME type issues
// import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  // --- Video Overlay Logic (disabled) ---
  /*
  const videoOverlay = document.getElementById('video-overlay');
  const closeVideoButton = document.getElementById('close-video');
  const introVideo = document.getElementById('intro-video');

  closeVideoButton.addEventListener('click', () => {
    introVideo.pause();
    // Remove the overlay element from the DOM entirely.
    videoOverlay.remove();
  });
  */

// --- Three.js Rotating Logo Cube ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    65, window.innerWidth / window.innerHeight, 0.1, 1000
);

// Adjust camera to properly view the cube from the top-left perspective
camera.position.set(10, 8, 16);
camera.lookAt(0, 0, 0);

const canvas = document.getElementById('three-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Ensure transparent background

// Load logo texture
const textureLoader = new THREE.TextureLoader();
const logoTexture = textureLoader.load('zz-logo.png');

// Create the rotating logo cube
const logoGeometry = new THREE.BoxGeometry(3, 3, 3);
const logoMaterial = new THREE.MeshBasicMaterial({ map: logoTexture });
const logoCube = new THREE.Mesh(logoGeometry, logoMaterial);

// Position cube towards top-left, adjusting for visibility
logoCube.position.set(10, 8, 0);
scene.add(logoCube);

function animate() {
  requestAnimationFrame(animate);
  logoCube.rotation.x += 0.01;
  logoCube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Ensure proper resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

  // --- DOM Background and Menu Transitions with GSAP ---
  const backgrounds = {
    HOME: 'Still-03.png',
    MUSIC: 'Still-02.png',
    DATES: 'Still-01.png',
    BLOG: 'Still-04.png',
    BOOKING: 'Still-05.png'
  };

  const content = {
    HOME: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.",
    MUSIC: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    DATES: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti.",
    BLOG: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi.",
    BOOKING: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit."
  };

  function glitchTransition(newBgUrl) {
    const bgContainer = document.getElementById('bg-container');
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
});
