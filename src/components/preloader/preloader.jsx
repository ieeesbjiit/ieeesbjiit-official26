import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

import orcaModel from './orca.glb';
import { preloadMedia } from '../../utils/mediaLoader';
import { getAllMediaSources } from '../../utils/collectMedia';
import './preloader.css';

const ORBIT_PERIOD = 4.167;
const ORBIT_OMEGA = (2 * Math.PI) / ORBIT_PERIOD;
const ORBIT_PHASE0 = 1.611;
const ROLL_OFFSET = 0.122;
const ORBIT_DIRECTION = -1;
const MODEL_REST_ALIGNMENT = 0;
const ORBIT_RADIUS_CAMERA_CALIBRATION = 2.4;
const ORBIT_RADIUS_WORLD = ORBIT_RADIUS_CAMERA_CALIBRATION * 0.75;
const TARGET_HALF_HEIGHT_FRACTION = 0.7237;
const CAMERA_FOV_DEG = 32;

// Minimum circles the fish must complete before preloader can end
const MIN_CIRCLES = 2;

function Preloader({ onComplete }) {
  const canvasWrapRef = useRef(null);
  const percentRef = useRef(null);
  const fillRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const wrap = canvasWrapRef.current;
    if (!wrap) return;

    let rafId;
    let disposed = false;

    // ---------- Progress state ----------
    let modelDone = false;
    let mediaDone = false;
    let modelLoadedTime = null;
    let allLoadedTime = null;
    let completed = false; // Once true, bar stays locked at 100%

    let rawModelProgress = 0;
    let rawMediaProgress = 0;

    const updateProgressDisplay = (percent) => {
      const capped = Math.min(100, Math.max(0, percent));
      const rounded = Math.round(capped);
      if (percentRef.current) percentRef.current.textContent = rounded + '%';
      if (fillRef.current) fillRef.current.style.width = capped + '%';
    };

    // ---------- Scene setup ----------
    const scene = new THREE.Scene();
    const fovRad = THREE.MathUtils.degToRad(CAMERA_FOV_DEG);
    const cameraDistance =
      ORBIT_RADIUS_CAMERA_CALIBRATION /
      (TARGET_HALF_HEIGHT_FRACTION * Math.tan(fovRad / 2));

    const camera = new THREE.PerspectiveCamera(
      CAMERA_FOV_DEG,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, cameraDistance);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    wrap.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04
    ).texture;

    // ---------- Lighting ----------
    scene.add(new THREE.AmbientLight(0x0e1a2a, 0.55));
    const keyLight = new THREE.DirectionalLight(0xdff6fb, 1.6);
    keyLight.position.set(2, 4, 5);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0x6fd8ea, 2.2);
    rimLight.position.set(-3, -1, -4);
    scene.add(rimLight);

    // ---------- Post-processing ----------
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(1, 1),
      0.23,
      0.45,
      0.55
    );
    composer.addPass(bloomPass);

    // ---------- Particles ----------
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleAspect = window.innerWidth / window.innerHeight;
    const particleHalfH = cameraDistance * Math.tan(fovRad / 2) * 1.08;
    const particleHalfW = particleHalfH * particleAspect;
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2 * particleHalfW;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2 * particleHalfH;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    particleGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    const particleMat = new THREE.PointsMaterial({
      color: 0x8fe4f0,
      size: 0.012,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ---------- Resize ----------
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      composer.setSize(w, h);
    };
    resize();
    window.addEventListener('resize', resize);

    // ---------- Model loading manager ----------
    const manager = new THREE.LoadingManager();
    manager.onProgress = (url, loaded, total) => {
      rawModelProgress = Math.min(100, (loaded / total) * 100);
    };

    // ---------- Clock ----------
    const clock = new THREE.Clock();

    const checkAllLoaded = () => {
      if (modelDone && mediaDone && allLoadedTime === null) {
        allLoadedTime = clock.getElapsedTime();
      }
    };

    // ---------- Start media preload AFTER model finishes ----------
    const startMediaPreload = () => {
      if (disposed) return;
      const mediaSources = getAllMediaSources();

      if (mediaSources.length === 0) {
        mediaDone = true;
        rawMediaProgress = 100;
        checkAllLoaded();
        return;
      }

      preloadMedia(mediaSources, (percent) => {
        rawMediaProgress = percent;
      }).then(() => {
        mediaDone = true;
        rawMediaProgress = 100;
        checkAllLoaded();
      });
    };

    // ---------- Swim-bend shader ----------
    const swimmer = new THREE.Group();
    scene.add(swimmer);
    let model;
    let mixer;
    const meshMaterials = [];
    const bendUniformsList = [];

    function addSwimBend(material, localMinY, localMaxY) {
      const uniforms = {
        uTime: { value: 0 },
        uMinY: { value: localMinY },
        uSpanY: { value: Math.max(1e-4, localMaxY - localMinY) },
        uAmplitude: { value: 0.24 * (localMaxY - localMinY) },
        uWavelengths: { value: 1.3 },
        uFreqHz: { value: 2.0 },
      };
      material.onBeforeCompile = (shader) => {
        Object.assign(shader.uniforms, uniforms);
        shader.vertexShader = shader.vertexShader
          .replace(
            '#include <common>',
            `#include <common>
             uniform float uTime, uMinY, uSpanY, uAmplitude, uWavelengths, uFreqHz;`
          )
          .replace(
            '#include <begin_vertex>',
            `#include <begin_vertex>
             float uAxis = clamp((uMinY + uSpanY - position.y) / uSpanY, 0.0, 1.0);
             float uFalloff = 0.03 + 0.97 * pow(uAxis, 1.5);
             float uPhase = uAxis * uWavelengths * 6.28318 - uTime * uFreqHz * 6.28318;
             float uWave = sin(uPhase);
             transformed.z += uWave * uAmplitude * uFalloff;`
          );
      };
      bendUniformsList.push(uniforms);
    }

    // ---------- Load model FIRST ----------
    const loader = new GLTFLoader(manager);
    loader.setMeshoptDecoder(MeshoptDecoder);
    loader.load(
      orcaModel,
      (gltf) => {
        if (disposed) return;
        try {
          model = gltf.scene;

          model.traverse((child) => {
            if (child.isMesh) {
              const old = child.material;
              const mat = new THREE.MeshPhysicalMaterial({
                map: old.map,
                normalMap: old.normalMap,
                roughnessMap: old.roughnessMap,
                metalnessMap: old.metalnessMap,
                color: 0x1f242c,
                metalness: 0.85,
                roughness: 0.28,
                clearcoat: 1,
                clearcoatRoughness: 0.05,
                envMapIntensity: 3,
                transmission: 0.55,
                thickness: 0.6,
                ior: 1.45,
                emissive: 0x00d9ff,
                emissiveIntensity: 0.08,
              });
              child.material = mat;
              meshMaterials.push(mat);

              if (!child.isSkinnedMesh) {
                child.geometry.computeBoundingBox();
                const bb = child.geometry.boundingBox;
                addSwimBend(mat, bb.min.y, bb.max.y);
              }
            }
          });

          const box = new THREE.Box3().setFromObject(model);
          const size = new THREE.Vector3();
          box.getSize(size);
          const maxDim = Math.max(size.x, size.y, size.z);
          const targetLength = 0.41 * (2 * ORBIT_RADIUS_CAMERA_CALIBRATION);
          const scale = targetLength / maxDim;
          model.scale.setScalar(scale);
          const center = box.getCenter(new THREE.Vector3());
          model.position.sub(center.multiplyScalar(scale));

          swimmer.add(model);

          if (gltf.animations && gltf.animations.length > 0) {
            mixer = new THREE.AnimationMixer(model);
            const action = mixer.clipAction(gltf.animations[0]);
            action.timeScale = 0.7;
            action.play();
          }

          modelDone = true;
          rawModelProgress = 100;
          modelLoadedTime = clock.getElapsedTime();
          checkAllLoaded();

          startMediaPreload();
        } catch (setupErr) {
          console.error('Post-load setup error:', setupErr);
          modelDone = true;
          rawModelProgress = 100;
          modelLoadedTime = clock.getElapsedTime();
          checkAllLoaded();
          startMediaPreload();
        }
      },
      undefined,
      (err) => {
        console.error('Model failed to load:', err);
        modelDone = true;
        rawModelProgress = 100;
        modelLoadedTime = clock.getElapsedTime();
        checkAllLoaded();
        startMediaPreload();
      }
    );

    // ---------- Animation loop ----------
    const EASE_AMOUNT = 0.06;

    // Track fish's cumulative angle to detect real circle completion
    let cumulativeAngle = 0;
    let lastTheta = null;
    let angleAtLoadComplete = null;
    let angleTargetForFinish = null;

    function animate() {
      if (disposed) return;
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const dt = clock.getDelta();

      // ---------- Fish orbit ----------
      const eased_t =
        t + (EASE_AMOUNT / ORBIT_OMEGA) * Math.sin(t * ORBIT_OMEGA);
      const theta = ORBIT_PHASE0 + ORBIT_DIRECTION * ORBIT_OMEGA * eased_t;

      const x = ORBIT_RADIUS_WORLD * Math.cos(theta);
      const y = -ORBIT_RADIUS_WORLD * Math.sin(theta);
      swimmer.position.set(x, y, 0);
      swimmer.rotation.z = -(theta + ROLL_OFFSET) + MODEL_REST_ALIGNMENT;

      // Track cumulative angle traveled (unwrapped, always increasing)
      if (lastTheta === null) {
        lastTheta = theta;
      } else {
        let delta = theta - lastTheta;
        while (delta > Math.PI) delta -= 2 * Math.PI;
        while (delta < -Math.PI) delta += 2 * Math.PI;
        cumulativeAngle += Math.abs(delta);
        lastTheta = theta;
      }

      if (mixer) mixer.update(dt);

      for (let i = 0; i < bendUniformsList.length; i++) {
        bendUniformsList[i].uTime.value = t;
      }

      const pulse = 0.14 + Math.sin(t * 0.9) * 0.033;
      for (let i = 0; i < meshMaterials.length; i++) {
        meshMaterials[i].emissiveIntensity = pulse;
      }
      bloomPass.strength = 0.23 + Math.sin(t * 0.6) * 0.021;

      particles.rotation.y += dt * 0.02;

      // ============================================
      // PROGRESS BAR
      // ============================================

      let percent;

      // If already completed — keep at 100% forever
      if (completed) {
        updateProgressDisplay(100);
        composer.render();
        return;
      }

      if (allLoadedTime !== null) {
        // Setup: mark starting angle and target angle when loading finishes
        if (angleAtLoadComplete === null) {
          angleAtLoadComplete = cumulativeAngle;
          const circlesSoFar = cumulativeAngle / (2 * Math.PI);
          const circlesNeeded = Math.max(MIN_CIRCLES, Math.ceil(circlesSoFar));
          angleTargetForFinish = circlesNeeded * 2 * Math.PI;
        }

        if (cumulativeAngle >= angleTargetForFinish) {
          // Fish reached target — LOCK at 100% and fade
          completed = true;
          updateProgressDisplay(100);
          setFadeOut(true);
          setTimeout(() => {
            if (!disposed && onComplete) onComplete();
          }, 1200);
          composer.render();
          return;
        }

        // Progress ratio based on fish's actual angular travel
        const angleFromLoad = cumulativeAngle - angleAtLoadComplete;
        const totalAngleDuringFinish = angleTargetForFinish - angleAtLoadComplete;
        const angleRatio = angleFromLoad / totalAngleDuringFinish;

        const eased = 1 - Math.pow(1 - angleRatio, 3);
        percent = eased * 98;
      } else {
        // ---- STILL LOADING ----
        const realProgress = rawModelProgress * 0.2 + rawMediaProgress * 0.8;
        const timeSinceStart = t;
        const timeBasedProgress = Math.min(85, (timeSinceStart / 8) * 85);
        percent = Math.min(realProgress, timeBasedProgress);
        percent = Math.min(85, percent);
      }

      updateProgressDisplay(percent);

      composer.render();
    }
    animate();

    // ---------- Cleanup ----------
    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);

      renderer.dispose();
      composer.dispose?.();
      pmremGenerator.dispose();

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });

      if (wrap.contains(renderer.domElement)) {
        wrap.removeChild(renderer.domElement);
      }
    };
  }, [onComplete]);

  return (
    <div className={`preloader ${fadeOut ? 'preloader--fade-out' : ''}`}>
      <div className="preloader__brandmark">
        IEEE&nbsp;·&nbsp;STUDENT&nbsp;BRANCH&nbsp;JIIT
      </div>

      <div className="preloader__canvas-wrap" ref={canvasWrapRef} />

      <div className="preloader__loading-block">
        <div className="preloader__loading-label">
          LOADING&nbsp;&nbsp;
          <span className="preloader__percent" ref={percentRef}>
            0%
          </span>
        </div>
        <div className="preloader__progress-track">
          <div className="preloader__progress-fill" ref={fillRef} />
        </div>
      </div>
    </div>
  );
}

export default Preloader;