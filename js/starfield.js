/* ============================================================
   starfield.js — 背景の星空(実際の恒星配置ベース)
   ----------------------------------------------------------------
   全ページ共通の1枚の canvas(#skyCanvas)に、実在の恒星を天の北極
   (Polaris付近)を中心にした位置関係で描画する。実際の星空が地球の
   自転にあわせて天の北極を中心に回転して見えるのと同じ動き方を、
   見やすい速さに早回しして表現している(実時間では24時間で1周)。

   モードは2つ:
   - "sky"     : ホーム/メンバー/アルバム/ライブ定番曲 — 中心を画面中央に置いた、空を見上げた見え方
   - "horizon" : 曲詳細ページ — 中心を画面上部に置き、下端に地平線(シルエット)を重ねた見え方
   ============================================================ */

(function () {
  const canvas = document.getElementById("skyCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let mode = "sky";
  let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  let t = 0;
  let rafId = null;

  const stars = SKY_STARS.map(s => ({
    ...s,
    // 明るい(等級が小さい)ほど大きく・くっきり
    r: Math.max(0.6, 2.6 - s.mag * 0.55),
    baseAlpha: Math.max(0.35, 1 - (s.mag + 1.5) * 0.11),
    ph: Math.random() * Math.PI * 2
  }));
  const nameToStar = Object.fromEntries(stars.map(s => [s.name, s]));

  /* 実在の恒星(上記)に加え、密度を出すための微光星を無数に散らす。
     名前も星座線も持たない、純粋な背景の賑わい用のレイヤー。
     同じ天の北極中心の回転に乗るので、動き方は実在の星と揃っている。 */
  const DUST_COUNT = 900;
  const dustStars = Array.from({ length: DUST_COUNT }, () => ({
    ra: Math.random() * 360,
    dec: 90 - Math.random() * 180,
    r: Math.random() * 0.8 + 0.15,
    baseAlpha: Math.random() * 0.35 + 0.08,
    ph: Math.random() * Math.PI * 2
  }));

  /* 天の川(銀河面)風の帯。テカポ湖クラスの濃い星空を狙って、
     斜めの帯の中だけ微光星をさらに密集させ、淡い光の帯を重ねる。
     装飾目的の帯なので、恒星データとは独立に画面座標で回転させる。 */
  const MILKY_COUNT = 900;
  const milkyBandAngle = -32; // 度。帯の傾き
  const milkyDust = Array.from({ length: MILKY_COUNT }, () => {
    const along = (Math.random() - 0.5) * 2.3;      // 帯に沿った位置(長め)
    const across = gaussianRandom() * 0.16;          // 帯を横切る広がり(中心に集中)
    return { along, across, r: Math.random() * 0.75 + 0.15, baseAlpha: Math.random() * 0.4 + 0.15, ph: Math.random() * Math.PI * 2 };
  });

  function gaussianRandom() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    W = rect.width; H = rect.height;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener("resize", resize);
  resize();

  function project(star, cx, cy, maxR, rotationDeg) {
    // 天の北極(dec=90)からの角距離を半径に、赤経+自転角を角度に変換
    const distFromPole = (90 - star.dec) / 180; // 0(北極)〜1(南のほう)
    const radius = distFromPole * maxR;
    const angle = ((star.ra + rotationDeg) * Math.PI) / 180;
    return { x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius };
  }

  function drawMilkyWay(cx, cy, rotationDeg) {
    const span = Math.max(W, H) * 1.5;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(((milkyBandAngle + rotationDeg * 0.3) * Math.PI) / 180);

    const glow = ctx.createLinearGradient(-span / 2, 0, span / 2, 0);
    glow.addColorStop(0, "rgba(190,215,230,0)");
    glow.addColorStop(0.5, "rgba(190,215,230,0.05)");
    glow.addColorStop(1, "rgba(190,215,230,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.ellipse(0, 0, span / 2, span * 0.11, 0, 0, Math.PI * 2);
    ctx.fill();

    milkyDust.forEach(p => {
      const x = p.along * span / 2;
      const y = p.across * span / 2;
      const tw = reduceMotion ? 1 : 0.7 + 0.3 * Math.sin(t * 0.4 + p.ph);
      ctx.beginPath();
      ctx.arc(x, y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(214,228,236,${(p.baseAlpha * tw).toFixed(3)})`;
      ctx.fill();
    });
    ctx.restore();
  }

  function drawHorizonGround() {
    const groundY = H * 0.82;
    const grad = ctx.createLinearGradient(0, groundY - 40, 0, H);
    grad.addColorStop(0, "rgba(4,7,12,0)");
    grad.addColorStop(0.4, "rgba(4,7,12,0.85)");
    grad.addColorStop(1, "#04070c");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, H);
    ctx.lineTo(0, groundY + 6);
    // なだらかな丘のシルエット(装飾的な図形のみ・詳細イラストではない)
    ctx.bezierCurveTo(W * 0.18, groundY - 18, W * 0.32, groundY + 14, W * 0.5, groundY - 6);
    ctx.bezierCurveTo(W * 0.68, groundY - 22, W * 0.82, groundY + 10, W, groundY - 4);
    ctx.lineTo(W, H);
    ctx.closePath();
    ctx.fill();

    // 地平線の淡い光
    ctx.strokeStyle = "rgba(111,216,255,0.25)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(W, groundY);
    ctx.stroke();
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);

    const cx = mode === "horizon" ? W * 0.5 : W * 0.5;
    const cy = mode === "horizon" ? H * 0.08 : H * 0.42;
    const maxR = mode === "horizon" ? Math.max(W, H) * 0.95 : Math.max(W, H) * 0.62;
    const rotationDeg = reduceMotion ? 0 : t * 1.6;

    // 天の川風の帯(最背面)
    drawMilkyWay(cx, cy, rotationDeg);

    // 微光星(密度出し用の背景レイヤー)
    dustStars.forEach(s => {
      const p = project(s, cx, cy, maxR, rotationDeg);
      if (p.x < -10 || p.x > W + 10 || p.y < -10 || p.y > H + 10) return;
      const tw = reduceMotion ? 1 : 0.7 + 0.3 * Math.sin(t * 0.5 + s.ph);
      ctx.beginPath();
      ctx.arc(p.x, p.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,222,232,${(s.baseAlpha * tw).toFixed(3)})`;
      ctx.fill();
    });

    // 星座線(先に薄く描く)
    ctx.strokeStyle = "rgba(111,216,255,0.16)";
    ctx.lineWidth = 0.7;
    SKY_LINES.forEach(([a, b]) => {
      const sa = nameToStar[a], sb = nameToStar[b];
      if (!sa || !sb) return;
      const pa = project(sa, cx, cy, maxR, rotationDeg);
      const pb = project(sb, cx, cy, maxR, rotationDeg);
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x, pb.y);
      ctx.stroke();
    });

    // 恒星本体
    stars.forEach(s => {
      const p = project(s, cx, cy, maxR, rotationDeg);
      if (p.x < -10 || p.x > W + 10 || p.y < -10 || p.y > H + 10) return;
      const tw = reduceMotion ? 1 : 0.75 + 0.25 * Math.sin(t * 0.6 + s.ph);
      ctx.beginPath();
      ctx.arc(p.x, p.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232,240,245,${(s.baseAlpha * tw).toFixed(3)})`;
      ctx.fill();
      if (s.r > 1.6) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, s.r * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(111,216,255,${(0.10 * tw).toFixed(3)})`;
        ctx.fill();
      }
    });

    if (mode === "horizon") drawHorizonGround();

    if (!reduceMotion) { t += 0.05; rafId = requestAnimationFrame(frame); }
  }

  function start() {
    if (rafId) cancelAnimationFrame(rafId);
    frame();
  }

  window.setSkyMode = function (next) {
    if (next !== "sky" && next !== "horizon") return;
    mode = next;
    canvas.dataset.mode = mode;
  };

  start();
})();
