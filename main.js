// main.js
// Import GSAP and Three.js from CDNs that support ES modules.
import { gsap } from 'https://cdn.skypack.dev/gsap';
import * as THREE from 'https://unpkg.com/three@0.150.1/build/three.module.js';

document.addEventListener('DOMContentLoaded', () => {
  // ---------------------
  // Three.js: Centered Rotating Cube
  // ---------------------
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
  );
  // Position the camera so that the cube (at the origin) is centered.
  camera.position.set(0, -1, 8);
  
  const canvas = document.getElementById('three-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0); // Transparent background
  
  // Load the logo texture and create the cube.
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(
    'zz-logo.png',
    (texture) => {
      const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
      const cubeMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 1
      });
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      // Position the cube.
      cube.position.set(3, 2, 1);
      scene.add(cube);
      
      // Animation loop.
      function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      }
      animate();
    },
    undefined,
    (err) => {
      console.error('Error loading texture:', err);
    }
  );
  
  // Update renderer and camera on window resize.
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  // ---------------------
  // Menu Interactions: Backgrounds & Content
  // ---------------------
  const backgrounds = {
    HOME: "Still-01.png",
    MUSIC: "Still-02.png",
    DATES: "Still-03.png",
    BLOG: "Still-04.png",
    BOOKING: "Still-05.png"
  };

  // Glitch transition for background change.
  function glitchTransition(newBgUrl) {
    const bgContainer = document.getElementById('bg-container');
    gsap.timeline()
      .to(bgContainer, { duration: 0.1, opacity: 0.5, filter: "blur(5px)", ease: "power2.in" })
      .set(bgContainer, { backgroundImage: `url(${newBgUrl})` })
      .to(bgContainer, { duration: 0.3, opacity: 1, filter: "blur(0px)", ease: "power2.out" });
  }

  // Menu click event handling.
  const menuItems = document.querySelectorAll('#menu li');
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const key = item.getAttribute('data-key');
      // If there's a background defined for this key, perform the glitch transition.
      if (backgrounds[key]) {
        glitchTransition(backgrounds[key]);
      }
      // For the "DATES" key, perform a redirect.
      if (key === "DATES") {
        window.location.href = "https://ra.co/dj/zaidazane";
      } else if (content[key]) {
        // Otherwise, update the text overlay.
        document.getElementById('text-overlay').innerText = content[key];
      }
    });
  });
});
