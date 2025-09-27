import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';

const PurpleNebula = () => {
  const mountRef = useRef(null);
   const goFullscreen = () => {
    const elem = mountRef.current;
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Create particle geometry
    const particles = 10000;
    const positions = new Float32Array(particles * 3);
    const colors = new Float32Array(particles * 3);

    const colorInside = new THREE.Color(0x9b59b6); // purple
    const colorOutside = new THREE.Color(0xff6ff9); // pink

    for (let i = 0; i < particles; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      const mixedColor = colorInside.clone().lerp(colorOutside, Math.random());
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.01,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const t = clock.getElapsedTime();
      points.rotation.y = t * 0.02;
      points.rotation.x = t * 0.01;

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      controls.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
   <div style={{ position: "relative", width: "100%", height: "80vh" }}>
  <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />
   
        <button
          onClick={goFullscreen}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 999,
            background: "transparent",
            color: "#fff",
            border: "none",
            padding: "8px 12px",
           
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon icon={faExpand} />
        </button>
    
  </div>
        )
};

export default PurpleNebula;
