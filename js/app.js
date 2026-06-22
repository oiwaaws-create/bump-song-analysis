/* ============================================================
   app.js — 表示ロジック(ルーティング・検索・ページネーション)
   フレームワーク不使用。location.hash で画面を切り替える
   シンプルなSPA構成。
   ============================================================ */

const PAGE_SIZE = 10;
let currentPage = 1;
let searchTerm = "";

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

/* ---------------------------------------------------------
   サイドバー: 観測ログ(最近のアップロード 最大10件)
--------------------------------------------------------- */
function renderRecentList() {
  const recent = [...SONGS]
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
  const sorted = [...SONGS].sort((a, b) => a.catNo.localeCompare(b.catNo));
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

    <span class="section-eyebrow">MEMBERS</span>
    <h2 class="section-title" style="font-size:1.2rem;">メンバー</h2>
    <div class="member-strip">
      ${MEMBERS.map(m => `
        <a class="member-chip" href="#members">
          <span class="member-photo">${m.photo ? `<img src="${m.photo}" alt="${m.name}">` : m.initial}</span>
          <span class="m-name">${m.name}</span>
          <span class="m-role">${m.role}</span>
        </a>
      `).join("")}
    </div>
  `;
}

function viewMembers() {
  return `
    <span class="section-eyebrow">MEMBERS</span>
    <h2 class="section-title">メンバー紹介</h2>
    <div class="intro-card">${BAND_INTRO.split("\n").slice(0, 2).map(l => `<p>${l}</p>`).join("")}</div>
    <div class="member-detail-grid">
      ${MEMBERS.map(m => `
        <div class="member-detail-card">
          <span class="member-detail-photo">${m.photo ? `<img src="${m.photo}" alt="${m.name}">` : m.initial}</span>
          <div>
            <h3>${m.name}</h3>
            <span class="role">${m.role}</span>
            <p>${m.bio}</p>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function viewAlbum() {
  return `
    <span class="section-eyebrow">DISCOGRAPHY</span>
    <h2 class="section-title">アルバム</h2>
    <div class="album-grid">
      ${ALBUMS.map(a => `
        <div class="album-card">
          <div class="album-art" ${a.photo ? `style="background-image:url('${a.photo}');background-size:cover;background-position:center;"` : ""} aria-hidden="true"></div>
          <div class="album-body">
            <span class="a-year">${a.year}</span>
            <h3>${a.title}</h3>
            <p>${a.desc}</p>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function viewLive() {
  const liveSongs = SONGS.filter(s => s.liveStandard).sort((a, b) => a.catNo.localeCompare(b.catNo));
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
  const song = SONGS.find(s => s.id === id);
  if (!song) {
    return `
      <p class="back-link" onclick="history.back()">‹ 戻る</p>
      <div class="empty-state">この曲の観測記録は見つかりませんでした。</div>
    `;
  }

  const videoBlock = song.youtubeId
    ? `<iframe src="https://www.youtube.com/embed/${song.youtubeId}" title="${song.title}" allowfullscreen loading="lazy"></iframe>`
    : `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--mist-dim);font-family:var(--font-mono);font-size:0.78rem;text-align:center;padding:0 20px;">
         動画未設定 — data.js の youtubeId に動画IDを設定すると、ここにYouTube動画が表示されます
       </div>`;

  return `
    <a class="back-link" href="#" onclick="history.back();return false;">‹ 一覧に戻る</a>
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

  if (hash.startsWith("song-")) {
    viewRoot.innerHTML = viewSongDetail(hash.slice(5));
    updateIndicator(null);
    return;
  }

  const renderer = ROUTE_RENDERERS[hash] || viewHome;
  const routeKey = ROUTE_RENDERERS[hash] ? hash : "home";
  viewRoot.innerHTML = renderer();
  updateIndicator(routeKey);
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
