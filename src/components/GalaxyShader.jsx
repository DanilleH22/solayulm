import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const StarsAndGalaxy = () => {
  const mountRef = useRef(null);

  const goFullscreen = () => {
    const elem = mountRef.current;
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
  };

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 1);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Shader uniforms
    const uniforms = {
      iTime: { value: 0 },
      iResolution: { 
        value: new THREE.Vector2(
          container.clientWidth,
          container.clientHeight
        ) 
      },
      iMouse: { value: new THREE.Vector2(0, 0) }
    };

    // Fixed shader code
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        #define PI 3.14159265359
        #define TAU (2.0*PI)
        
        uniform vec2 iResolution;
        uniform float iTime;
        uniform vec2 iMouse;
        varying vec2 vUv;
        
        // Simple hash function for float
        float hash(float p) {
          return fract(sin(p * 591.32) * 43758.5357);
        }

        // Simple hash function for vec2 - FIXED
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }

        // Simple noise function - FIXED
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f*f*(3.0-2.0*f);
          
          // Use the vec2 hash function
          float a = hash(i + vec2(0.0,0.0));
          float b = hash(i + vec2(1.0,0.0));
          float c = hash(i + vec2(0.0,1.0));
          float d = hash(i + vec2(1.0,1.0));
          
          return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
        }

        // Black body color approximation
        vec3 blackBodyColor(float temp) {
          vec3 color;
          temp *= 4000.0;
          
          if (temp < 1000.0) {
            color = vec3(1.0, 0.0, 0.0);
          } else if (temp < 2000.0) {
            color = vec3(1.0, 0.5, 0.0);
          } else if (temp < 3000.0) {
            color = vec3(1.0, 0.8, 0.2);
          } else if (temp < 4000.0) {
            color = vec3(1.0, 1.0, 0.5);
          } else if (temp < 5000.0) {
            color = vec3(1.0, 1.0, 0.8);
          } else if (temp < 6000.0) {
            color = vec3(0.8, 0.9, 1.0);
          } else {
            color = vec3(0.6, 0.8, 1.0);
          }
          
          return color;
        }

        // Create stars
        vec3 stars(vec2 uv, float time) {
          vec3 color = vec3(0.0);
          
          // Create a grid of points
          vec2 grid = floor(uv * 300.0);
          vec2 cell = fract(uv * 300.0);
          
          for (int i = 0; i < 4; i++) {
            // Get a random position for this cell
            vec2 rand = vec2(hash(grid.x + float(i) * 59.0), hash(grid.y));
            vec2 starPos = vec2(0.5) + 0.5 * sin(rand * TAU);
            
            // Calculate distance to star
            float dist = length(cell - starPos);
            
            // Create a twinkling star
            float brightness = 0.02 / dist * sin(time * 2.0 + rand.x * TAU) * 0.5;
            
            // Add some color variation based on temperature
            vec3 starColor = blackBodyColor(rand.x);
            
            color += starColor * brightness;
          }
          
          return color;
        }

        // Create spiral galaxy
        vec3 galaxy(vec2 uv, float time) {
          // Center and scale the UV coordinates
          vec2 pos = uv - 0.5;
          pos.x *= iResolution.x / iResolution.y;
          
          // Create spiral arms
          float angle = atan(pos.y, pos.x);
          float radius = length(pos);
          
          // Create spiral pattern
          float spiral = sin(angle * 5.0 + radius * 20.0 - time * 0.5);
          
          // Add some color variation
          vec3 color = mix(
            vec3(0.3, 0.1, 0.5),
            vec3(0.8, 0.6, 1.0),
            smoothstep(0.2, 0.8, spiral * radius)
          );
          
          // Add a bright center
          color += vec3(1.0, 0.9, 0.7) * exp(-radius * 10.0);
          
          return color;
        }

        // Create nebula clouds
        vec3 nebula(vec2 uv, float time) {
          vec2 pos = uv * 2.0 - 1.0;
          pos.x *= iResolution.x / iResolution.y;
          
          // Create swirling patterns
          float n = noise(pos * 2.0 + time * 0.1);
          n += noise(pos * 4.0 + time * 0.2) * 0.5;
          n += noise(pos * 8.0 + time * 0.3) * 0.25;
          
          // Add color
          vec3 color = mix(
            vec3(0.2, 0.1, 0.4),
            vec3(0.8, 0.3, 0.6),
            n
          );
          
          return color * 0.5;
        }

        void main() {
          vec2 uv = vUv;
          
          // Create a starfield
          vec3 starColor = stars(uv, iTime);
          
          // Create a galaxy
          vec3 galaxyColor = galaxy(uv, iTime);
          
          // Create nebula clouds
          vec3 nebulaColor = nebula(uv, iTime);
          
          // Combine them
          vec3 color = starColor + galaxyColor + nebulaColor;
          
          // Add some vignetting
          vec2 center = uv - 0.5;
          float vignette = 1.0 - dot(center, center);
          color *= vignette;
          
          // Output the final color
          gl_FragColor = vec4(color, 1.0);
        }
      `
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const clock = new THREE.Clock();
    const animate = () => {
      uniforms.iTime.value = clock.getElapsedTime();
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      uniforms.iResolution.value.set(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      controls.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
      <button
        onClick={goFullscreen}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 10,
          background: "rgba(30, 30, 60, 0.7)",
          color: "#fff",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          padding: "10px 15px",
          borderRadius: "8px",
          cursor: "pointer",
          backdropFilter: "blur(5px)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          transition: "all 0.3s ease"
        }}
        onMouseOver={(e) => e.target.style.background = "rgba(60, 60, 100, 0.8)"}
        onMouseOut={(e) => e.target.style.background = "rgba(30, 30, 60, 0.7)"}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 3H5C3.89543 3 3 3.89543 3 5V8M21 8V5C21 3.89543 20.1046 3 19 3H16M16 21H19C20.1046 21 21 20.1046 21 19V16M3 16V19C3 20.1046 3.89543 21 5 21H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Fullscreen
      </button>
    </div>
  );
};

export default StarsAndGalaxy;