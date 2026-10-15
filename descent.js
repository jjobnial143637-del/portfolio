// Hero visual: momentum gradient descent over a two-basin toy loss surface.
window.initDescent = function (canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const RX = 3.2;
  const BANDS = 14;

  const f = (x, y) =>
    0.28 * (x * x + y * y)
    - 1.3 * Math.exp(-((x - 1.1) ** 2 + (y - 0.7) ** 2) / 0.9)
    - 0.9 * Math.exp(-((x + 1.4) ** 2 + (y + 0.9) ** 2) / 0.6)
    + 0.12 * Math.sin(1.7 * x) * Math.cos(1.4 * y);
  const grad = (x, y, h = 1e-3) => [
    (f(x + h, y) - f(x - h, y)) / (2 * h),
    (f(x, y + h) - f(x, y - h)) / (2 * h)
  ];

  let W = 0, H = 0, RY = 0, field = null, colors = null;
  let p, v, trail, start, steps, done, restartAt = 0, visible = true, raf = 0;

  const toPx = (x, y) => [(x + RX) / (2 * RX) * W, (RY - y) / (2 * RY) * H];
  const toWorld = (px, py) => [px / W * 2 * RX - RX, RY - py / H * 2 * RY];

  const hex = (s) => {
    s = s.trim().replace("#", "");
    return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16));
  };
  const readColors = () => {
    const cs = getComputedStyle(document.documentElement);
    colors = {
      surface: hex(cs.getPropertyValue("--surface")),
      line: hex(cs.getPropertyValue("--line")),
      accent: hex(cs.getPropertyValue("--accent")),
      text: cs.getPropertyValue("--text").trim(),
      accentCss: cs.getPropertyValue("--accent").trim()
    };
  };

  function renderField() {
    const w = Math.max(1, Math.round(W)), h = Math.max(1, Math.round(H));
    const vals = new Float32Array(w * h);
    let lo = Infinity, hi = -Infinity;
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
      const [x, y] = toWorld(i + 0.5, j + 0.5);
      const val = f(x, y);
      vals[j * w + i] = val;
      if (val < lo) lo = val;
      if (val > hi) hi = val;
    }
    const band = new Uint8Array(w * h);
    for (let k = 0; k < vals.length; k++) band[k] = Math.min(BANDS - 1, Math.floor((vals[k] - lo) / (hi - lo) * BANDS));

    const img = ctx.createImageData(w, h);
    const { surface: s, line: l, accent: a } = colors;
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
      const k = j * w + i;
      const edge = (i < w - 1 && band[k] !== band[k + 1]) || (j < h - 1 && band[k] !== band[k + w]);
      const t = 0.22 * (1 - band[k] / (BANDS - 1)) ** 2.5;
      const base = s.map((c, n) => c + (a[n] - c) * t);
      const out = edge ? l.map((c, n) => (c + base[n]) / 2 + (c - base[n]) * 0.4) : base;
      img.data.set([out[0], out[1], out[2], 255], k * 4);
    }
    field = document.createElement("canvas");
    field.width = w; field.height = h;
    field.getContext("2d").putImageData(img, 0, 0);
  }

  function reset(x, y) {
    if (x === undefined) {
      do { x = (Math.random() * 2 - 1) * RX * 0.85; y = (Math.random() * 2 - 1) * RY * 0.85; }
      while (Math.hypot(x - 1.1, y - 0.7) < 1.2 || Math.hypot(x + 1.4, y + 0.9) < 1);
    }
    p = [x, y]; v = [0, 0]; start = [x, y]; trail = [[x, y]]; steps = 0; done = false;
  }

  function step() {
    const g = grad(p[0], p[1]);
    v = [0.9 * v[0] - 0.03 * g[0], 0.9 * v[1] - 0.03 * g[1]];
    p = [p[0] + v[0], p[1] + v[1]];
    trail.push([p[0], p[1]]);
    steps++;
    const out = Math.abs(p[0]) > RX || Math.abs(p[1]) > RY;
    if (out || steps > 600 || (steps > 30 && Math.hypot(v[0], v[1]) < 2e-4)) done = true;
  }

  function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(field, 0, 0);
    ctx.lineWidth = 2;
    ctx.lineJoin = ctx.lineCap = "round";
    ctx.strokeStyle = colors.accentCss;
    ctx.beginPath();
    trail.forEach(([x, y], i) => { const [px, py] = toPx(x, y); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); });
    ctx.stroke();

    const [sx, sy] = toPx(start[0], start[1]);
    ctx.beginPath(); ctx.arc(sx, sy, 5, 0, Math.PI * 2);
    ctx.strokeStyle = colors.text; ctx.lineWidth = 1.5; ctx.stroke();

    const [cx, cy] = toPx(p[0], p[1]);
    ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fillStyle = colors.accentCss; ctx.fill();
  }

  function loop(now) {
    raf = 0;
    if (!visible) return;
    if (!done) { step(); step(); }
    else if (!restartAt) restartAt = now + 1800;
    else if (now > restartAt) { restartAt = 0; reset(); }
    draw();
    raf = requestAnimationFrame(loop);
  }

  function runStatic() {
    while (!done) step();
    draw();
  }

  function play() {
    if (reduce) return runStatic();
    if (!raf) raf = requestAnimationFrame(loop);
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    W = canvas.width; H = canvas.height;
    RY = RX * H / W;
    renderField();
    if (!p) reset();
    draw();
  }

  canvas.addEventListener("click", (ev) => {
    const r = canvas.getBoundingClientRect();
    const [x, y] = toWorld((ev.clientX - r.left) / r.width * W, (ev.clientY - r.top) / r.height * H);
    restartAt = 0;
    reset(x, y);
    play();
  });

  document.addEventListener("themechange", () => { readColors(); renderField(); draw(); });

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) play();
  }).observe(canvas);

  let resizeTimer;
  new ResizeObserver(() => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 120); }).observe(canvas);

  readColors();
  resize();
  play();
};
