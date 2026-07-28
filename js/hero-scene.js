(() => {
  const canvas = document.getElementById('heroCanvas');
  const fallback = document.getElementById('heroFallbackDots');
  const preloader = document.getElementById('heroPreloader');
  const hero = canvas ? canvas.closest('.hero') : null;
  if (!hero) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function hidePreloader() {
    if (!preloader) return;
    preloader.classList.add('is-hidden');
    setTimeout(() => preloader.remove(), 600);
  }

  function showFallback() {
    canvas.style.display = 'none';
    if (fallback) {
      fallback.style.display = 'block';
      const count = 60;
      let dots = '';
      for (let i = 0; i < count; i++) {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = 1 + Math.random() * 2;
        const opacity = 0.3 + Math.random() * 0.5;
        dots += `<span style="left:${x}%;top:${y}%;width:${size}px;height:${size}px;opacity:${opacity};"></span>`;
      }
      fallback.innerHTML = dots;
    }
    hidePreloader();
  }

  if (typeof THREE === 'undefined' || prefersReducedMotion) {
    showFallback();
    return;
  }

  // safety net: don't let a backgrounded/inactive tab block the preloader forever
  const preloaderSafetyTimer = setTimeout(hidePreloader, 1800);

  let renderer, scene, camera, group;
  let width = hero.clientWidth, height = hero.clientHeight;

  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
  } catch (e) {
    showFallback();
    return;
  }

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
  camera.position.z = 9;

  group = new THREE.Group();
  scene.add(group);

  // ---- particle sphere (dots) ----
  const particleCount = 420;
  const positions = new Float32Array(particleCount * 3);
  const radius = 4.2;
  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius * (0.85 + Math.random() * 0.3);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.045,
    transparent: true,
    opacity: 0.6,
    depthWrite: false
  });
  const points = new THREE.Points(particleGeo, particleMat);
  group.add(points);

  // ---- orbiting ring lines (circular parallel-line motif) ----
  const rings = [];
  const ringCount = 5;
  for (let i = 0; i < ringCount; i++) {
    const ringRadius = radius * (0.55 + i * 0.16);
    const segments = 96;
    const ringPositions = new Float32Array((segments + 1) * 3);
    for (let s = 0; s <= segments; s++) {
      const a = (s / segments) * Math.PI * 2;
      ringPositions[s * 3] = Math.cos(a) * ringRadius;
      ringPositions[s * 3 + 1] = Math.sin(a) * ringRadius * 0.3;
      ringPositions[s * 3 + 2] = Math.sin(a) * ringRadius;
    }
    const ringGeo = new THREE.BufferGeometry();
    ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPositions, 3));
    const ringMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.18 + i * 0.03
    });
    const ring = new THREE.LineLoop(ringGeo, ringMat);
    ring.rotation.x = (i / ringCount) * Math.PI * 0.4;
    ring.rotation.z = (i / ringCount) * Math.PI * 0.25;
    group.add(ring);
    rings.push(ring);
  }

  function onResize() {
    width = hero.clientWidth;
    height = hero.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  window.addEventListener('resize', onResize);

  const clock = new THREE.Clock();
  let frameCount = 0;

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    group.rotation.y = t * (Math.PI * 2 / 30);
    points.rotation.y = -t * (Math.PI * 2 / 45);

    rings.forEach((ring, i) => {
      ring.rotation.z = t * (0.05 + i * 0.015) * (i % 2 === 0 ? 1 : -1);
    });

    particleMat.opacity = 0.45 + Math.sin(t * 0.5) * 0.2;

    renderer.render(scene, camera);

    frameCount++;
    if (frameCount === 3) hidePreloader();
  }
  animate();
})();
