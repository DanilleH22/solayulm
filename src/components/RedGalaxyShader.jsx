import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';



const Testing = () => {

  const mountRef = useRef(null);

  // Fullscreen handler
  const goFullscreen = () => {
    const elem = mountRef.current;
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
  };

  useEffect(() => {
    const container = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(3, 3, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const parameters = {
      count: 20000,
      size: 0.01,
      radius: 5,
      branches: 3,
      spin: 1,
      randomness: 0.2,
      insideColor: "#ff6030",
      outsideColor: "#1b3984",
    };

    let geometry = null;
    let material = null;
    let points = null;

    const generateGalaxy = () => {
      if (points) {
        geometry.dispose();
        material.dispose();
        scene.remove(points);
      }

      geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(parameters.count * 3);
      const colors = new Float32Array(parameters.count * 3);

      const colorInside = new THREE.Color(parameters.insideColor);
      const colorOutside = new THREE.Color(parameters.outsideColor);

      for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3;

        const radius = Math.random() * parameters.radius;
        const spinAngle = radius * parameters.spin;
        const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

        const randomX = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
        const randomY = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
        const randomZ = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, radius / parameters.radius);

        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      material = new THREE.PointsMaterial({
        size: parameters.size,
        vertexColors: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      points = new THREE.Points(geometry, material);
      scene.add(points);
    };

    generateGalaxy();

    const gui = new GUI();
    gui.add(parameters, "count").min(1000).max(100000).step(1000).onFinishChange(generateGalaxy);
    gui.add(parameters, "size").min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy);
    gui.add(parameters, "radius").min(1).max(20).step(0.1).onFinishChange(generateGalaxy);

    // === Animate with drifting stars ===
    const animate = () => {
      requestAnimationFrame(animate);

      if (points) {
        // Rotate galaxy
        points.rotation.y += 0.0005;
        points.rotation.x += 0.0002;

        // Slight random drift per star
        const positions = geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.0002; // y-axis drift
        }
        geometry.attributes.position.needsUpdate = true;
      }

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
      gui.destroy();
      if (points) {
        geometry.dispose();
        material.dispose();
        scene.remove(points);
      }
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div>
    
      {/* Galaxy canvas + fullscreen button */}
      <div style={{ position: "relative", width: "100%", height: "80vh" }}>
        <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
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
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon icon={faExpand} />
        </button>
      </div>

      
     </div>
      
  );
};

export default Testing;
