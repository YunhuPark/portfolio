(() => {
  'use strict';

  const TAU = Math.PI * 2;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = (t) => t * t * (3 - 2 * t);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const staticMode = new URLSearchParams(window.location.search).has('static');

  class XorShift {
    constructor(seed = 912367) {
      this.state = seed >>> 0;
    }
    next() {
      let x = this.state;
      x ^= x << 13;
      x ^= x >>> 17;
      x ^= x << 5;
      this.state = x >>> 0;
      return this.state / 0x100000000;
    }
    range(min, max) {
      return min + (max - min) * this.next();
    }
  }

  function rotatePoint(point, rx, ry, rz) {
    let { x, y, z } = point;

    const cx = Math.cos(rx);
    const sx = Math.sin(rx);
    let y1 = y * cx - z * sx;
    let z1 = y * sx + z * cx;
    y = y1;
    z = z1;

    const cy = Math.cos(ry);
    const sy = Math.sin(ry);
    let x1 = x * cy + z * sy;
    z1 = -x * sy + z * cy;
    x = x1;
    z = z1;

    const cz = Math.cos(rz);
    const sz = Math.sin(rz);
    x1 = x * cz - y * sz;
    y1 = x * sz + y * cz;

    return { x: x1, y: y1, z };
  }

  class CanvasScene {
    constructor(canvas, options = {}) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d', { alpha: true });
      this.type = options.type || 'hero';
      this.mode = options.mode || 'core';
      this.modeTarget = this.mode;
      this.width = 0;
      this.height = 0;
      this.dpr = 1;
      this.time = 0;
      this.lastTime = performance.now();
      this.pointer = { x: 0, y: 0 };
      this.pointerTarget = { x: 0, y: 0 };
      this.visible = true;
      this.scrollProgress = 0;
      this.seed = new XorShift(this.type === 'hero' ? 52943 : 80417);
      this.particles = [];
      this.medicalPoints = [];
      this.starPoints = [];
      this.initPoints();
      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(canvas.parentElement || canvas);
      this.resize();
      this.bindEvents();
      this.render = this.render.bind(this);
      if (staticMode) {
        this.time = this.type === 'hero' ? 2.25 : 1.6;
        this.pointer.x = 0.12;
        this.pointer.y = -0.08;
        this.draw();
      } else {
        this.raf = requestAnimationFrame(this.render);
      }
    }

    initPoints() {
      for (let i = 0; i < 110; i += 1) {
        const theta = this.seed.range(0, TAU);
        const phi = Math.acos(this.seed.range(-1, 1));
        const radius = this.seed.range(1.15, 2.35);
        this.particles.push({
          theta,
          phi,
          radius,
          speed: this.seed.range(0.08, 0.24),
          phase: this.seed.range(0, TAU),
          size: this.seed.range(0.8, 2.3),
          tint: this.seed.next() > 0.72 ? 1 : 0,
          jitter: this.seed.range(0.05, 0.22)
        });
      }

      for (let side = -1; side <= 1; side += 2) {
        for (let i = 0; i < 72; i += 1) {
          const theta = this.seed.range(0, TAU);
          const phi = Math.acos(this.seed.range(-1, 1));
          const r = Math.pow(this.seed.next(), 0.55);
          this.medicalPoints.push({
            side,
            theta,
            phi,
            r,
            lesion: side === 1 && i < 8,
            phase: this.seed.range(0, TAU)
          });
        }
      }

      for (let i = 0; i < 44; i += 1) {
        this.starPoints.push({
          x: this.seed.range(-2.5, 2.5),
          y: this.seed.range(-1.8, 1.8),
          z: this.seed.range(-1.5, 1.5),
          size: this.seed.range(0.4, 1.3),
          alpha: this.seed.range(0.15, 0.52)
        });
      }
    }

    bindEvents() {
      const target = this.canvas.parentElement || this.canvas;
      const move = (event) => {
        const rect = target.getBoundingClientRect();
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        const clientY = event.touches ? event.touches[0].clientY : event.clientY;
        this.pointerTarget.x = clamp(((clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
        this.pointerTarget.y = clamp(((clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
      };
      target.addEventListener('pointermove', move, { passive: true });
      target.addEventListener('touchmove', move, { passive: true });
      target.addEventListener('pointerleave', () => {
        this.pointerTarget.x = 0;
        this.pointerTarget.y = 0;
      });

      if (this.type === 'hero') {
        const updateScroll = () => {
          const section = this.canvas.closest('.hero');
          if (!section) return;
          const rect = section.getBoundingClientRect();
          const total = Math.max(1, section.offsetHeight * 0.7);
          this.scrollProgress = clamp(-rect.top / total, 0, 1);
        };
        window.addEventListener('scroll', updateScroll, { passive: true });
        updateScroll();
      }

      document.addEventListener('visibilitychange', () => {
        this.visible = !document.hidden;
      });
    }

    resize() {
      const rect = this.canvas.getBoundingClientRect();
      this.width = Math.max(1, rect.width);
      this.height = Math.max(1, rect.height);
      this.dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      this.canvas.width = Math.round(this.width * this.dpr);
      this.canvas.height = Math.round(this.height * this.dpr);
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }

    setMode(mode) {
      if (!['algo', 'medi', 'insight', 'imst'].includes(mode)) return;
      this.modeTarget = mode;
      this.mode = mode;
      if (reducedMotion) this.draw();
    }

    project(point, scale = 1, camera = 5.2) {
      const z = point.z + camera;
      const perspective = camera / Math.max(0.65, z);
      return {
        x: this.width / 2 + point.x * scale * perspective,
        y: this.height / 2 + point.y * scale * perspective,
        scale: perspective,
        z: point.z
      };
    }

    clear() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }

    drawBackgroundStars(rotation) {
      const ctx = this.ctx;
      const scale = Math.min(this.width, this.height) * 0.22;
      ctx.save();
      for (const star of this.starPoints) {
        const p3 = rotatePoint(star, rotation.x * 0.25, rotation.y * 0.25, 0);
        const p = this.project(p3, scale, 7.4);
        const alpha = star.alpha * clamp((p3.z + 2.8) / 5.6, 0.25, 1);
        ctx.fillStyle = `rgba(255,253,248,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, star.size * p.scale, 0, TAU);
        ctx.fill();
      }
      ctx.restore();
    }

    drawPolyline(points, style, width = 1, closed = false) {
      if (!points.length) return;
      const ctx = this.ctx;
      ctx.save();
      ctx.strokeStyle = style;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i += 1) ctx.lineTo(points[i].x, points[i].y);
      if (closed) ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }

    drawRing(rotation, radius, scale, color, width = 1.2, segments = 92, phase = 0) {
      const front = [];
      const back = [];
      for (let i = 0; i <= segments; i += 1) {
        const angle = (i / segments) * TAU + phase;
        const point = rotatePoint({ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, z: 0 }, rotation.x, rotation.y, rotation.z);
        const projected = this.project(point, scale);
        (point.z > 0 ? front : back).push(projected);
      }
      this.drawPolyline(back, color.replace('ALPHA', '0.14'), width * 0.75, false);
      this.drawPolyline(front, color.replace('ALPHA', '0.72'), width, false);
    }

    drawCoreOrb(rotation, scale, intensity = 1) {
      const ctx = this.ctx;
      const center3 = rotatePoint({ x: 0, y: 0, z: 0.25 }, rotation.x, rotation.y, rotation.z);
      const center = this.project(center3, scale);
      const radius = scale * 0.48 * center.scale;

      const glow = ctx.createRadialGradient(center.x, center.y, radius * 0.1, center.x, center.y, radius * 1.6);
      glow.addColorStop(0, `rgba(255,247,233,${0.86 * intensity})`);
      glow.addColorStop(0.17, `rgba(239,91,53,${0.78 * intensity})`);
      glow.addColorStop(0.44, `rgba(239,91,53,${0.22 * intensity})`);
      glow.addColorStop(1, 'rgba(239,91,53,0)');
      ctx.save();
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(center.x, center.y, radius * 1.75, 0, TAU);
      ctx.fill();

      const body = ctx.createRadialGradient(center.x - radius * 0.3, center.y - radius * 0.34, radius * 0.05, center.x, center.y, radius);
      body.addColorStop(0, 'rgba(255,253,248,.96)');
      body.addColorStop(0.22, 'rgba(255,188,144,.9)');
      body.addColorStop(0.52, 'rgba(239,91,53,.66)');
      body.addColorStop(0.78, 'rgba(63,29,22,.68)');
      body.addColorStop(1, 'rgba(17,17,15,.15)');
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(center.x, center.y, radius, 0, TAU);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,253,248,.62)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.globalCompositeOperation = 'screen';
      ctx.strokeStyle = 'rgba(255,253,248,.18)';
      for (let i = 0; i < 5; i += 1) {
        ctx.beginPath();
        ctx.ellipse(center.x, center.y, radius * (0.2 + i * 0.15), radius * (0.08 + i * 0.05), rotation.z + i * 0.34, 0, TAU);
        ctx.stroke();
      }
      ctx.restore();
    }

    drawHeroScene() {
      const t = this.time;
      const progress = ease(this.scrollProgress);
      const scale = Math.min(this.width, this.height) * 0.22;
      const rotation = {
        x: -0.26 + this.pointer.y * 0.16 + Math.sin(t * 0.22) * 0.035,
        y: 0.3 + this.pointer.x * 0.22 + t * 0.08,
        z: -0.08 + Math.sin(t * 0.18) * 0.05
      };

      this.drawBackgroundStars(rotation);

      const ctx = this.ctx;
      const particlePoints = [];
      for (let i = 0; i < this.particles.length; i += 1) {
        const particle = this.particles[i];
        const drift = t * particle.speed + particle.phase;
        const chaosRadius = particle.radius + Math.sin(drift * 1.7) * particle.jitter;
        const organizedRadius = 1.38 + (i % 3) * 0.22;
        const radius = lerp(chaosRadius, organizedRadius, progress);
        const theta = particle.theta + drift * lerp(0.38, 0.12, progress);
        const phi = lerp(particle.phi + Math.sin(drift) * 0.24, Math.PI / 2 + ((i % 3) - 1) * 0.22, progress);
        const point = {
          x: Math.cos(theta) * Math.sin(phi) * radius,
          y: Math.cos(phi) * radius,
          z: Math.sin(theta) * Math.sin(phi) * radius
        };
        const rotated = rotatePoint(point, rotation.x, rotation.y, rotation.z);
        const projected = this.project(rotated, scale);
        particlePoints.push({ ...projected, tint: particle.tint, size: particle.size, depth: rotated.z });
      }

      ctx.save();
      for (const p of particlePoints) {
        const alpha = clamp((p.depth + 2.8) / 5.6, 0.1, 0.8) * (0.55 + progress * 0.18);
        ctx.fillStyle = p.tint ? `rgba(239,91,53,${alpha})` : `rgba(255,253,248,${alpha * 0.66})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.scale, 0, TAU);
        ctx.fill();
      }
      ctx.restore();

      this.drawRing({ x: 1.08, y: rotation.y * 0.55, z: 0.08 + t * 0.035 }, 1.68, scale, 'rgba(255,253,248,ALPHA)', 1.15, 100, 0);
      this.drawRing({ x: 0.2 + rotation.x, y: 1.06, z: -0.3 - t * 0.025 }, 1.32, scale, 'rgba(239,91,53,ALPHA)', 1.35, 100, 0);
      this.drawRing({ x: 0.78, y: -0.5 + rotation.y * 0.25, z: 1.2 + t * 0.018 }, 2.05, scale, 'rgba(255,253,248,ALPHA)', 0.75, 110, 0);

      const pulse = 0.9 + Math.sin(t * 1.1) * 0.06;
      this.drawCoreOrb(rotation, scale * pulse, 1);

      const axisPoints = [
        { x: -2.35, y: 0, z: 0 },
        { x: 2.35, y: 0, z: 0 }
      ].map((p) => this.project(rotatePoint(p, rotation.x, rotation.y, rotation.z), scale));
      this.drawPolyline(axisPoints, 'rgba(239,91,53,.18)', 1);
    }

    drawWireCube(center, size, rotation, scale, accent = false) {
      const vertices = [];
      for (const x of [-1, 1]) {
        for (const y of [-1, 1]) {
          for (const z of [-1, 1]) {
            const local = { x: center.x + x * size, y: center.y + y * size, z: center.z + z * size };
            const rotated = rotatePoint(local, rotation.x, rotation.y, rotation.z);
            vertices.push({ point: rotated, screen: this.project(rotated, scale) });
          }
        }
      }
      const index = (x, y, z) => ((x + 1) / 2) * 4 + ((y + 1) / 2) * 2 + ((z + 1) / 2);
      const edges = [];
      for (const y of [-1, 1]) for (const z of [-1, 1]) edges.push([index(-1, y, z), index(1, y, z)]);
      for (const x of [-1, 1]) for (const z of [-1, 1]) edges.push([index(x, -1, z), index(x, 1, z)]);
      for (const x of [-1, 1]) for (const y of [-1, 1]) edges.push([index(x, y, -1), index(x, y, 1)]);

      const ctx = this.ctx;
      ctx.save();
      ctx.strokeStyle = accent ? 'rgba(239,91,53,.92)' : 'rgba(255,253,248,.38)';
      ctx.lineWidth = accent ? 1.5 : 1;
      for (const [a, b] of edges) {
        ctx.beginPath();
        ctx.moveTo(vertices[a].screen.x, vertices[a].screen.y);
        ctx.lineTo(vertices[b].screen.x, vertices[b].screen.y);
        ctx.stroke();
      }
      if (accent) {
        const c = this.project(rotatePoint(center, rotation.x, rotation.y, rotation.z), scale);
        const glow = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, size * scale * 1.6);
        glow.addColorStop(0, 'rgba(239,91,53,.42)');
        glow.addColorStop(1, 'rgba(239,91,53,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(c.x, c.y, size * scale * 1.7, 0, TAU);
        ctx.fill();
      }
      ctx.restore();
    }

    drawAlgoScene(rotation, scale) {
      const centers = [-1.45, -0.48, 0.48, 1.45].map((x) => ({ x, y: 0, z: 0 }));
      const projected = centers.map((center) => this.project(rotatePoint(center, rotation.x, rotation.y, rotation.z), scale));
      this.drawPolyline(projected, 'rgba(255,253,248,.2)', 1.2);
      centers.forEach((center, index) => this.drawWireCube(center, index === 2 ? 0.32 : 0.26, rotation, scale, index === 2));

      const ctx = this.ctx;
      for (let i = 0; i < 12; i += 1) {
        const phase = (this.time * 0.18 + i / 12) % 1;
        const x = lerp(-1.45, 1.45, phase);
        const point = this.project(rotatePoint({ x, y: Math.sin(phase * TAU) * 0.08, z: Math.cos(phase * TAU) * 0.08 }, rotation.x, rotation.y, rotation.z), scale);
        ctx.fillStyle = phase > 0.56 && phase < 0.78 ? 'rgba(239,91,53,.9)' : 'rgba(255,253,248,.48)';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.8 * point.scale, 0, TAU);
        ctx.fill();
      }
    }

    drawMedicalScene(rotation, scale) {
      const ctx = this.ctx;
      const points = [];
      for (const point of this.medicalPoints) {
        const x = point.side * 0.52 + Math.cos(point.theta) * Math.sin(point.phi) * point.r * 0.48;
        const y = Math.cos(point.phi) * point.r * 1.1 + 0.04;
        const z = Math.sin(point.theta) * Math.sin(point.phi) * point.r * 0.55;
        const rotated = rotatePoint({ x, y, z }, rotation.x, rotation.y, rotation.z);
        const projected = this.project(rotated, scale);
        points.push({ ...projected, lesion: point.lesion, depth: rotated.z, phase: point.phase });
      }
      points.sort((a, b) => a.depth - b.depth);
      for (const p of points) {
        const alpha = clamp((p.depth + 1.5) / 3, 0.12, 0.74);
        ctx.fillStyle = p.lesion ? `rgba(239,91,53,${alpha + 0.2})` : `rgba(255,253,248,${alpha * 0.72})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, (p.lesion ? 3.2 : 1.45) * p.scale, 0, TAU);
        ctx.fill();
      }
      const centerLine = [
        this.project(rotatePoint({ x: 0, y: -1.25, z: 0 }, rotation.x, rotation.y, rotation.z), scale),
        this.project(rotatePoint({ x: 0, y: 1.3, z: 0 }, rotation.x, rotation.y, rotation.z), scale)
      ];
      this.drawPolyline(centerLine, 'rgba(255,253,248,.2)', 1);
    }

    drawInsightScene(rotation, scale) {
      const ctx = this.ctx;
      const bars = [
        { x: -0.8, height: 1.65, label: '2.1x', accent: true },
        { x: 0, height: 0.82, label: '1.0x', accent: false },
        { x: 0.8, height: 0.52, label: '0.63x', accent: false }
      ];
      const baseLine = [-1.35, 1.35].map((x) => this.project(rotatePoint({ x, y: 0.9, z: 0 }, rotation.x, rotation.y, rotation.z), scale));
      this.drawPolyline(baseLine, 'rgba(255,253,248,.2)', 1);
      bars.forEach((bar) => {
        const base = { x: bar.x, y: 0.9, z: 0 };
        const top = { x: bar.x, y: 0.9 - bar.height, z: 0 };
        const pb = this.project(rotatePoint(base, rotation.x, rotation.y, rotation.z), scale);
        const pt = this.project(rotatePoint(top, rotation.x, rotation.y, rotation.z), scale);
        ctx.strokeStyle = bar.accent ? 'rgba(239,91,53,.95)' : 'rgba(255,253,248,.48)';
        ctx.lineWidth = Math.max(7, scale * 0.09 * pt.scale);
        ctx.lineCap = 'square';
        ctx.beginPath();
        ctx.moveTo(pb.x, pb.y);
        ctx.lineTo(pt.x, pt.y);
        ctx.stroke();
        ctx.fillStyle = bar.accent ? '#ef5b35' : 'rgba(255,253,248,.72)';
        ctx.font = `700 ${Math.max(9, scale * 0.07)}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(bar.label, pt.x, pt.y - 14);
      });
      ctx.lineCap = 'butt';
    }

    drawImstScene(rotation, scale) {
      this.drawRing({ x: 1.2 + rotation.x * 0.3, y: rotation.y, z: 0.12 }, 1.62, scale, 'rgba(255,253,248,ALPHA)', 1.1, 96, this.time * 0.04);
      this.drawRing({ x: 0.25, y: 1.1 + rotation.y * 0.2, z: 0.72 }, 1.22, scale, 'rgba(239,91,53,ALPHA)', 1.45, 96, -this.time * 0.035);
      this.drawRing({ x: 0.8, y: -0.4, z: 1.4 }, 2.02, scale, 'rgba(255,253,248,ALPHA)', 0.75, 112, this.time * 0.02);
      this.drawCoreOrb(rotation, scale * 0.62, 0.82);

      const ctx = this.ctx;
      for (let state = 0; state < 3; state += 1) {
        const angle = this.time * (0.12 + state * 0.035) + state * (TAU / 3);
        const radius = 1.2 + state * 0.3;
        const point = rotatePoint({ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius * 0.38, z: Math.sin(angle) * radius }, rotation.x, rotation.y, rotation.z);
        const p = this.project(point, scale);
        ctx.fillStyle = state === 2 ? '#ef5b35' : 'rgba(255,253,248,.82)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4.5 * p.scale, 0, TAU);
        ctx.fill();
      }
    }

    drawWorkScene() {
      const scale = Math.min(this.width, this.height) * 0.23;
      const rotation = {
        x: -0.18 + this.pointer.y * 0.2 + Math.sin(this.time * 0.18) * 0.04,
        y: 0.24 + this.pointer.x * 0.24 + this.time * 0.065,
        z: Math.sin(this.time * 0.12) * 0.05
      };
      this.drawBackgroundStars(rotation);
      if (this.mode === 'medi') this.drawMedicalScene(rotation, scale);
      else if (this.mode === 'insight') this.drawInsightScene(rotation, scale);
      else if (this.mode === 'imst') this.drawImstScene(rotation, scale);
      else this.drawAlgoScene(rotation, scale);
    }

    draw() {
      this.clear();
      if (this.type === 'hero') this.drawHeroScene();
      else this.drawWorkScene();
    }

    render(now) {
      const delta = Math.min(0.05, (now - this.lastTime) / 1000);
      this.lastTime = now;
      if (this.visible) {
        this.pointer.x = lerp(this.pointer.x, this.pointerTarget.x, 1 - Math.pow(0.001, delta));
        this.pointer.y = lerp(this.pointer.y, this.pointerTarget.y, 1 - Math.pow(0.001, delta));
        if (!reducedMotion) this.time += delta;
        this.draw();
      }
      this.raf = requestAnimationFrame(this.render);
    }
  }

  const api = {
    hero: null,
    work: null,
    setWorkMode(mode) {
      if (this.work) this.work.setMode(mode);
    }
  };

  function init() {
    const heroCanvas = document.getElementById('hero-core');
    const workCanvas = document.getElementById('work-core');
    if (heroCanvas) {
      api.hero = new CanvasScene(heroCanvas, { type: 'hero' });
      document.documentElement.classList.add('has-canvas');
    }
    if (workCanvas) {
      api.work = new CanvasScene(workCanvas, { type: 'work', mode: 'algo' });
      document.documentElement.classList.add('has-work-canvas');
    }
  }

  window.Portfolio3D = api;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
