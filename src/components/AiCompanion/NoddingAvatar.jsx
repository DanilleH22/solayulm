import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls, FBXLoader } from "three-stdlib";

const NoddingAvatar = () => {
  const mountRef = useRef(null);



useEffect(() => {
  if (!mountRef.current) return;

  // ✅ Create scene only once
const scene = new THREE.Scene();


  const camera = new THREE.PerspectiveCamera(
    50,
    mountRef.current.clientWidth / mountRef.current.clientHeight,
    0.9,
    1000
  );
  camera.position.set(0, 0.7, 1.8);
  
// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true  });
renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
renderer.setClearColor(0x000000, 0); // black with 0 alpha (fully transparent)

// ✅ Clear old canvas if it exists
mountRef.current.innerHTML = "";
mountRef.current.appendChild(renderer.domElement);


  const controls = new OrbitControls(camera, renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 10, 10);
  scene.add(light);

  let mixer;
  const clock = new THREE.Clock();
  let model; // ✅ track model reference

  const loader = new FBXLoader();
  loader.load(
    "/models/Thoughtful Head Nod.fbx",
    (object) => {
      if (model) {
        // ✅ avoid duplicate adds
        scene.remove(model);
      }
      model = object;
      model.scale.set(0.01, 0.01, 0.01);
      object.position.y = -1;
      scene.add(model);

      if (object.animations.length > 0) {
        mixer = new THREE.AnimationMixer(object);
        const action = mixer.clipAction(object.animations[0]);
        action.play();
      }
    }
  );

  const animate = () => {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();

  return () => {
    if (renderer && renderer.domElement && mountRef.current) {
      mountRef.current.removeChild(renderer.domElement);
    }
    renderer.dispose();
    

    // ✅ Clean scene on unmount
    scene.traverse((child) => {
      if (child.isMesh) {
        child.geometry.dispose();
        if (child.material.isMaterial) {
          child.material.dispose();
        } else {
          for (const mat of child.material) mat.dispose();
        }
      }
    });
  };
}, []);



  return <div ref={mountRef} style={{ width: "80%", height: "700px" }} />;
};

export default NoddingAvatar;
