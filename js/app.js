/* ============================================================
   app.js — 表示ロジック(ルーティング・検索・ページネーション)
   フレームワーク不使用。location.hash で画面を切り替える
   シンプルなSPA構成。
   ============================================================ */

const PAGE_SIZE = 10;
let currentPage = 1;
let searchTerm = "";

/* 公開対象の曲だけに絞り込んだ一覧。表示に使う曲一覧は
   すべてこの VISIBLE_SONGS を参照する(js/published-songs.js で管理)。 */
const VISIBLE_SONGS = SONGS.filter(s => PUBLISHED_SONG_IDS.includes(s.id));

const viewRoot   = document.getElementById("view-root");
const songGrid   = document.getElementById("songGrid");
const emptyState = document.getElementById("emptyState");
const pagination = document.getElementById("pagination");
const searchMeta = document.getElementById("searchMeta");
const recentList = document.getElementById("recentList");
const searchInput = document.getElementById("searchInput");
const tabNav = document.getElementById("tabNav");
const navIndicator = document.getElementById("navIndicator");
const tabButtons = [...tabNav.querySelectorAll(".tab-btn")];
const breadcrumbsEl = document.getElementById("breadcrumbs");

const TAB_LABELS = { home: "ホーム", members: "メンバー", album: "アルバム", live: "ライブ定番曲" };

function renderBreadcrumbs(trail) {
  // trail: 配列 [{label, href}] 最後の要素は現在地(リンクなし)
  breadcrumbsEl.innerHTML = trail.map((c, i) => {
    const isLast = i === trail.length - 1;
    const sep = i === 0 ? "" : `<span class="bc-sep" aria-hidden="true">›</span>`;
    return sep + (isLast || !c.href
      ? `<span class="bc-current">${c.label}</span>`
      : `<a href="${c.href}">${c.label}</a>`);
  }).join("");
}

/* ---------------------------------------------------------
   サイドバー: 観測ログ(最近のアップロード 最大10件)
--------------------------------------------------------- */
function renderRecentList() {
  const recent = [...VISIBLE_SONGS]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 10);

  recentList.innerHTML = recent.map(song => `
    <li class="log-item">
      <a href="#song-${song.id}">
        <span class="dot" aria-hidden="true"></span>
        <span class="meta">
          <span class="ttl">${song.title}</span>
          <span class="date">${song.date}</span>
        </span>
      </a>
    </li>
  `).join("");
}

/* ---------------------------------------------------------
   下部固定: 検索 + 全曲カタログ + ページネーション
--------------------------------------------------------- */
function getFilteredSongs() {
  const term = searchTerm.trim().toLowerCase();
  const sorted = [...VISIBLE_SONGS].sort((a, b) => a.catNo.localeCompare(b.catNo));
  if (!term) return sorted;
  return sorted.filter(s =>
    s.title.toLowerCase().includes(term) ||
    (s.album || "").toLowerCase().includes(term) ||
    (s.subtitle || "").toLowerCase().includes(term)
  );
}

function renderCatalog() {
  const filtered = getFilteredSongs();
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  songGrid.hidden = pageItems.length === 0;
  emptyState.hidden = pageItems.length !== 0;

  songGrid.innerHTML = pageItems.map(song => `
    <a class="song-card" href="#song-${song.id}">
      <span class="cat-no">${song.catNo}</span>
      <span class="s-title">${song.title}</span>
      <span class="s-sub">${song.album || ""}${song.releaseDate ? " · " + song.releaseDate : ""}</span>
      ${song.liveStandard ? '<span class="s-tag">LIVE定番</span>' : ""}
    </a>
  `).join("");

  searchMeta.textContent = filtered.length
    ? `全 ${filtered.length} 曲中 ${pageItems.length} 曲を表示（${currentPage} / ${totalPages} ページ）`
    : "";

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  if (totalPages <= 1) { pagination.innerHTML = ""; return; }

  let dots = "";
  for (let i = 1; i <= totalPages; i++) {
    dots += `<button class="page-dot ${i === currentPage ? "active" : ""}" data-page="${i}" aria-label="${i}ページ目"></button>`;
  }

  pagination.innerHTML = `
    <button class="page-arrow" id="prevPage" aria-label="前のページ" ${currentPage === 1 ? "disabled" : ""}>‹</button>
    <span class="page-dots">${dots}</span>
    <button class="page-arrow" id="nextPage" aria-label="次のページ" ${currentPage === totalPages ? "disabled" : ""}>›</button>
  `;

  document.getElementById("prevPage")?.addEventListener("click", () => goToPage(currentPage - 1));
  document.getElementById("nextPage")?.addEventListener("click", () => goToPage(currentPage + 1));
  pagination.querySelectorAll(".page-dot").forEach(dot => {
    dot.addEventListener("click", () => goToPage(Number(dot.dataset.page)));
  });
}

function goToPage(n) {
  currentPage = n;
  renderCatalog();
  document.querySelector(".catalog-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

searchInput.addEventListener("input", e => {
  searchTerm = e.target.value;
  currentPage = 1;
  renderCatalog();
});

/* ---------------------------------------------------------
   タブごとのビュー
--------------------------------------------------------- */
function viewHome() {
  return `
    <span class="section-eyebrow">HOME</span>
    <h2 class="section-title">BUMP OF CHICKEN について</h2>
    <div class="intro-card">
      ${BAND_INTRO.split("\n").map(line => `<p>${line}</p>`).join("")}
    </div>

    <div class="feature-photo">
      ${HOME_PHOTO ? `<img src="${HOME_PHOTO}" alt="BUMP OF CHICKEN">` : "PHOTO"}
    </div>
  `;
}

function viewMembers() {
  return `
    <span class="section-eyebrow">MEMBERS</span>
    <h2 class="section-title">メンバー紹介</h2>
    <div class="intro-card">${BAND_INTRO.split("\n").slice(0, 2).map(l => `<p>${l}</p>`).join("")}</div>

    <div class="feature-photo">
      ${MEMBERS_GROUP_PHOTO ? `<img src="${MEMBERS_GROUP_PHOTO}" alt="メンバー集合写真">` : "PHOTO"}
    </div>

    <div class="member-detail-grid">
      ${MEMBERS.map(m => `
        <div class="member-detail-card">
          <h3>${m.name}</h3>
          <span class="role">${m.role}</span>
          <p>${m.bio}</p>
        </div>
      `).join("")}
    </div>
  `;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/*
  好きな歌詞のセットを1つ描画する。表示順は 引用 → comment → image → commentAfter。
  item = {
    quotes: ["歌詞の一節", ...],
    comment: "画像の前に置くコメント",
    image: "images/...",              // 任意
    imageCaption: "画像の説明(任意)",
    commentAfter: "画像の後に置く追加コメント(任意)"
  }
  quotes を複数入れると、1番とラスサビのような複数引用を1つの解説で並べられる。
  image・commentAfter はどちらも任意。画像のあとにもう一段コメントを続けたい場合は
  commentAfter を使う。
*/
function renderLyricSet(item) {
  const quotes = (item.quotes || []).map(q => `<blockquote class="lyric-quote">${escapeHtml(q)}</blockquote>`).join("");
  const comment = item.comment ? `<p class="lyric-comment">${escapeHtml(item.comment)}</p>` : "";
  const image = item.image ? `
    <img class="lyric-image" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.imageCaption || "")}" loading="lazy">
    ${item.imageCaption ? `<span class="lyric-image-caption">${escapeHtml(item.imageCaption)}</span>` : ""}
  ` : "";
  const commentAfter = item.commentAfter ? `<p class="lyric-comment">${escapeHtml(item.commentAfter)}</p>` : "";
  return `<div class="lyric-set"><div class="lyric-set-inner">${quotes}${comment}${image}${commentAfter}</div></div>`;
}

/*
  好きな歌詞を「1番」「2番」「Cメロ+大サビ」のようなブロック単位でまとめて描画する。
  block = { label: "1番", items: [ {quotes, comment}, {quotes, comment}, ... ] }
  1ブロックの中に、quotes+comment のセットを何個でも並べられる。
*/
function renderLyricBlock(block) {
  const items = (block.items || []).map(renderLyricSet).join("");
  return `
    <div class="lyric-block">
      <p class="lyric-block-label">${escapeHtml(block.label || "")}</p>
      ${items || `<p class="lyric-comment" style="opacity:0.6;">(このブロックはまだ未入力です)</p>`}
    </div>
  `;
}

function findAlbumById(id) {
  return ALBUMS.find(a => a.id === id);
}
function findAlbumByTitle(title) {
  return ALBUMS.find(a => a.title === title);
}
function songsOfAlbum(album) {
  return VISIBLE_SONGS.filter(s => s.album === album.title).sort((a, b) => a.catNo.localeCompare(b.catNo));
}

let albumViewMode = "grid";
let solarRafId = null;
function stopAlbumSolar() {
  if (solarRafId) { cancelAnimationFrame(solarRafId); solarRafId = null; }
}

function viewAlbum() {
  return `
    <div class="album-head-row">
      <div>
        <span class="section-eyebrow">DISCOGRAPHY</span>
        <h2 class="section-title">アルバム</h2>
      </div>
      <button class="solar-toggle" id="solarToggleBtn" type="button">
        ${albumViewMode === "grid" ? "🪐 太陽系で見る" : "🗂 一覧で見る"}
      </button>
    </div>
    ${albumViewMode === "grid" ? renderAlbumGrid() : renderAlbumSolar()}
  `;
}

function renderAlbumGrid() {
  return `
    <div class="album-grid">
      ${ALBUMS.map((a, i) => `
        <a class="album-card" href="#album-${a.id}">
          <div class="album-art" style="--i:${i}" aria-hidden="true">
            ${a.photo
              ? `<img src="${a.photo}" alt="">`
              : `<span class="jacket-title">${escapeHtml(a.title)}</span>`}
          </div>
          <div class="album-body">
            <span class="a-year">${a.year}</span>
            <h3>${a.title}</h3>
            <p>${a.desc}</p>
          </div>
        </a>
      `).join("")}
    </div>
  `;
}

function renderAlbumSolar() {
  return `
    <div class="solar-stage">
      <canvas id="albumSolarCanvas"></canvas>
      <div class="solar-hint">惑星(アルバム)をクリックすると収録曲一覧に移動します</div>
    </div>
  `;
}

function initAlbumView() {
  const btn = document.getElementById("solarToggleBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      albumViewMode = albumViewMode === "grid" ? "solar" : "grid";
      stopAlbumSolar();
      viewRoot.innerHTML = viewAlbum();
      initAlbumView();
    });
  }
  if (albumViewMode === "solar") drawAlbumSolar();
}

function drawAlbumSolar() {
  const cv = document.getElementById("albumSolarCanvas");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const rect = cv.getBoundingClientRect();
  const w = rect.width, h = rect.height;
  cv.width = w * dpr;
  cv.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const cx = w / 2, cy = h / 2;
  const maxR = Math.min(w, h) / 2 - 30;
  const planets = ALBUMS.map((a, i) => ({
    album: a,
    r: 26 + (maxR - 26) * (i / (ALBUMS.length - 1)),
    size: i % 3 === 0 ? 6.5 : 4.5,
    speed: 0.5 + i * 0.05,
    angle: (i / ALBUMS.length) * Math.PI * 2
  }));
  const hitAreas = [];
  let ang = 0;

  function frame() {
    ctx.clearRect(0, 0, w, h);

    const sunR = 10;
    const sg = ctx.createRadialGradient(cx, cy, 0, cx, cy, sunR * 3.4);
    sg.addColorStop(0, "rgba(167,235,255,0.85)");
    sg.addColorStop(1, "rgba(167,235,255,0)");
    ctx.fillStyle = sg;
    ctx.beginPath(); ctx.arc(cx, cy, sunR * 3.4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#a7ebff";
    ctx.beginPath(); ctx.arc(cx, cy, sunR, 0, Math.PI * 2); ctx.fill();

    hitAreas.length = 0;
    planets.forEach(p => {
      ctx.strokeStyle = "rgba(111,216,255,0.16)";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.ellipse(cx, cy, p.r, p.r * 0.4, 0, 0, Math.PI * 2); ctx.stroke();

      const a = p.angle + (reduceMotion ? 0 : ang * p.speed);
      const px = cx + Math.cos(a) * p.r, py = cy + Math.sin(a) * p.r * 0.4;
      ctx.beginPath(); ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fillStyle = "#6fd8ff";
      ctx.fill();

      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(231,242,245,0.78)";
      ctx.fillText(p.album.title, px + p.size + 6, py + 3);

      hitAreas.push({ x: px, y: py, r: p.size + 8, id: p.album.id });
    });

    if (!reduceMotion) { ang += 0.006; solarRafId = requestAnimationFrame(frame); }
  }
  frame();

  cv.style.cursor = "pointer";
  cv.onclick = e => {
    const r = cv.getBoundingClientRect();
    const mx = e.clientX - r.left, my = e.clientY - r.top;
    const hit = hitAreas.find(ha => Math.hypot(ha.x - mx, ha.y - my) <= ha.r);
    if (hit) location.hash = `album-${hit.id}`;
  };
}

function viewAlbumDetail(id) {
  const album = findAlbumById(id);
  if (!album) {
    return `
      <a class="back-link" href="#" onclick="history.back();return false;">‹ 戻る</a>
      <div class="empty-state">このアルバムの観測記録は見つかりませんでした。</div>
    `;
  }
  const tracks = songsOfAlbum(album);

  return `
    <a class="back-link" href="#album">‹ アルバム一覧に戻る</a>
    <div class="song-detail-head">
      <span class="cat-no">ALBUM · ${album.year}</span>
      <h1>${album.title}</h1>
    </div>
    <div class="album-art" style="max-width:220px;margin-bottom:18px;${album.photo ? `background-image:url('${album.photo}');background-size:cover;background-position:center;` : ""}" aria-hidden="true"></div>
    <p style="color:var(--mist);margin-bottom:22px;">${album.desc}</p>

    <span class="section-eyebrow">TRACKLIST</span>
    <h2 class="section-title" style="font-size:1.05rem;">収録曲</h2>
    ${tracks.length ? `
      <ol class="track-list">
        ${tracks.map((s, i) => `
          <li>
            <a href="#song-${s.id}">
              <span class="rank">${String(i + 1).padStart(2, "0")}</span>
              <span class="ttl">${s.title}</span>
              <span class="arrow">→</span>
            </a>
          </li>
        `).join("")}
      </ol>
    ` : `<div class="empty-state">このアルバムにはまだ曲が登録されていません。</div>`}
  `;
}

function viewLive() {
  const liveSongs = VISIBLE_SONGS.filter(s => s.liveStandard).sort((a, b) => a.catNo.localeCompare(b.catNo));
  return `
    <span class="section-eyebrow">LIVE STANDARD</span>
    <h2 class="section-title">ライブ定番曲</h2>
    <p style="margin-top:-8px;color:var(--mist-dim);font-size:0.86rem;">ライブで演奏される機会が多い楽曲をまとめています。曲名をクリックすると詳細ページに移動します。</p>
    <ol class="live-list">
      ${liveSongs.map((s, i) => `
        <li>
          <a href="#song-${s.id}">
            <span class="rank">${String(i + 1).padStart(2, "0")}</span>
            <span class="ttl">${s.title}</span>
            <span class="arrow">→</span>
          </a>
        </li>
      `).join("")}
    </ol>
  `;
}

function viewSongDetail(id) {
  const song = VISIBLE_SONGS.find(s => s.id === id);
  if (!song) {
    return `
      <p class="back-link" onclick="history.back()">‹ 戻る</p>
      <div class="empty-state">この曲の観測記録は見つかりませんでした。</div>
    `;
  }

  const videoBlock = song.youtubeId
    ? `<iframe src="https://www.youtube.com/embed/${song.youtubeId}" title="${escapeHtml(song.title)}" allowfullscreen loading="lazy"></iframe>`
    : `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--mist-dim);font-family:var(--font-mono);font-size:0.78rem;text-align:center;padding:0 20px;">
         動画未設定 — data.js の youtubeId に動画IDを設定すると、ここにYouTube動画が表示されます
       </div>`;

  const parentAlbum = findAlbumByTitle(song.album);
  const backHref = parentAlbum ? `#album-${parentAlbum.id}` : "#album";
  const backLabel = parentAlbum ? `‹ ${parentAlbum.title} に戻る` : "‹ 一覧に戻る";

  const interpBlock = song.interpretation ? `
    <span class="section-eyebrow" style="display:block;margin-top:8px;">◇ ほかの人の解釈</span>
    <div class="interp-box">
      <span class="interp-note">${escapeHtml(song.interpretation.note || "")}</span>
      <a href="${song.interpretation.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(song.interpretation.label || "記事を読む")} ↗</a>
    </div>
  ` : "";

  const lyricsBlock = (song.favoriteLyrics && song.favoriteLyrics.length) ? `
    <span class="section-eyebrow" style="display:block;margin-top:28px;">◇ 歌詞考察</span>
    ${song.favoriteLyrics.map(renderLyricBlock).join("")}
  ` : "";

  return `
    <a class="back-link" href="${backHref}">${backLabel}</a>
    <div class="song-detail-head">
      <span class="cat-no">${song.catNo}${song.liveStandard ? " · LIVE定番曲" : ""}</span>
      <h1>${song.title}</h1>
      <p class="subtitle">${song.subtitle && song.subtitle !== "—" ? song.subtitle : ""}</p>
    </div>

    <dl class="info-table">
      <div><dt>収録アルバム</dt><dd>${song.album || "—"}</dd></div>
      <div><dt>リリース</dt><dd>${song.releaseDate || "—"}</dd></div>
      <div><dt>作詞</dt><dd>${song.lyricist || "—"}</dd></div>
      <div><dt>作曲</dt><dd>${song.composer || "—"}</dd></div>
    </dl>

    <div class="video-frame">${videoBlock}</div>

    <ul class="desc-list">
      ${(song.bullets || []).map(b => `<li>${b}</li>`).join("")}
    </ul>

    ${interpBlock}
    ${lyricsBlock}
  `;
}

/* ---------------------------------------------------------
   ルーター
--------------------------------------------------------- */
const ROUTE_RENDERERS = {
  home: viewHome,
  members: viewMembers,
  album: viewAlbum,
  live: viewLive
};

function updateIndicator(routeKey) {
  const activeBtn = tabButtons.find(b => b.dataset.route === routeKey);
  tabButtons.forEach(b => {
    const isActive = b === activeBtn;
    b.classList.toggle("active", isActive);
    if (isActive) b.setAttribute("aria-current", "page");
    else b.removeAttribute("aria-current");
  });
  if (activeBtn) {
    navIndicator.style.opacity = "1";
    navIndicator.style.left = activeBtn.offsetLeft + "px";
    navIndicator.style.width = activeBtn.offsetWidth + "px";
  } else {
    navIndicator.style.opacity = "0";
  }
}

function router() {
  const hash = location.hash.replace("#", "") || "home";
  window.scrollTo(0, 0);
  stopAlbumSolar();
  window.setSkyMode?.(hash.startsWith("song-") ? "horizon" : "sky");

  // 曲詳細
  if (hash.startsWith("song-")) {
    const songId = hash.slice(5);
    const song = VISIBLE_SONGS.find(s => s.id === songId);
    viewRoot.innerHTML = viewSongDetail(songId);
    updateIndicator(null);
    const album = song ? findAlbumByTitle(song.album) : null;
    if (album) {
      renderBreadcrumbs([
        { label: "ホーム", href: "#" },
        { label: "アルバム", href: "#album" },
        { label: album.title, href: `#album-${album.id}` },
        { label: song ? song.title : "曲が見つかりません" }
      ]);
    } else {
      renderBreadcrumbs([
        { label: "ホーム", href: "#" },
        { label: "曲一覧", href: "#" },
        { label: song ? song.title : "曲が見つかりません" }
      ]);
    }
    return;
  }

  // アルバム詳細
  if (hash.startsWith("album-")) {
    const albumId = hash.slice(6);
    const album = findAlbumById(albumId);
    viewRoot.innerHTML = viewAlbumDetail(albumId);
    updateIndicator("album");
    renderBreadcrumbs([
      { label: "ホーム", href: "#" },
      { label: "アルバム", href: "#album" },
      { label: album ? album.title : "アルバムが見つかりません" }
    ]);
    return;
  }

  // 通常タブ(ホーム/メンバー/アルバム/ライブ定番曲)
  const renderer = ROUTE_RENDERERS[hash] || viewHome;
  const routeKey = ROUTE_RENDERERS[hash] ? hash : "home";
  viewRoot.innerHTML = renderer();
  updateIndicator(routeKey);
  if (routeKey === "album") initAlbumView();

  if (routeKey === "home") {
    renderBreadcrumbs([{ label: "ホーム" }]);
  } else {
    renderBreadcrumbs([{ label: "ホーム", href: "#" }, { label: TAB_LABELS[routeKey] }]);
  }
}

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const r = btn.dataset.route;
    location.hash = r === "home" ? "" : r;
  });
});

window.addEventListener("hashchange", router);
window.addEventListener("resize", () => {
  const active = tabButtons.find(b => b.classList.contains("active"));
  if (active) updateIndicator(active.dataset.route);
});

/* ---------------------------------------------------------
   初期化
--------------------------------------------------------- */
renderRecentList();
renderCatalog();
router();
