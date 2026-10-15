/* ============================================================
   ratio-clavis.js — ツアー「Ratio Clavis」のタブ
   ----------------------------------------------------------------
   上から「今回のライブ」→「セトリ」→「声出し・クラップのポイント」。
   曲の解説ページへのリンクは、published-songs.js で公開済みの曲だけ
   自動で付きます(公開すると、ここからも飛べるようになります)。
   ============================================================ */

const RATIO_CLAVIS = {
  intro: [
    "BUMP結成30周年のライブ。今回は特に昔の曲が多く、メッセージ性を感じられるセトリになっています。",
    "特に、この3曲が入っているのが印象的です。"
  ],
  highlights: [
    { tag: "MAJOR DEBUT", title: "ダイヤモンド", text: "メジャーデビュー後、最初にリリースした曲" },
    { tag: "2012", title: "ディアマン", text: "新たな音楽への挑戦を増やす中、自分たちの思いを歌ったであろう曲" },
    { tag: "20TH", title: "リボン", text: "20周年という節目にリリースした曲" }
  ],
  freeStyle: [
    "今回のライブは声出し曲が多いです。ただ、立ってても座っててもいいし、声を出さなくても、目をつぶってもいい。自分が最大限楽しめる姿勢で聴いてくれ、とBUMPは毎回言ってくれます。むしろ初期のBUMPは、黙って聴けと怒るようなバンドでした。",
    "大岩も疲れたら座るし、今回だと66号線とディアマンは座って聴きます。"
  ],
  /* cues: [種類, 本文] 種類は voice(声出し) / clap(クラップ) / fist(拳)。
     3つ目に true を入れると「予想」の印が付きます。
     本文の「」で囲んだ部分は歌詞として強調されます。 */
  setlist: [
    { no: "02", title: "I", id: "i", cues: [
      ["clap", "1番の「それじゃ思い出そう今日僕らで」のあとに、3回クラップ。"],
      ["fist", "たぶん、ラスサビの「さあ やっと見つけた ここまで来た もう触れるよ」で拳を掲げる。", true]
    ]},
    { no: "03", title: "ray", id: "ray-song", cues: [
      ["clap", "ブリッジの「あの透明な水星は 透明だからなくならない」のあと、ラスサビの「生きるのは最高だ」のあと、「始まりには君がいる」のあとでクラップ。"],
      ["voice", "「生きるのは最高だ」を、僕らが声に出して歌う。"]
    ]},
    { no: "04", title: "Aurora", id: "aurora", cues: [
      ["clap", "たぶん、ブリッジの「今こそ魔法に変えられる」のあとにクラップ。", true]
    ]},
    { no: "05", title: "なないろ", id: "nanairo", cues: [] },
    { no: "06", title: "Sleep Walking Orchestra", id: "sleep-walking-orchestra", cues: [
      ["voice", "ラスサビのあとの「オー」は、声を出しながら手を上げる。"]
    ]},
    { no: "07", title: "とっておきの唄", id: "totteoki-no-uta", cues: [] },
    { no: "08", title: "イノセント", id: "innocent", cues: [] },
    { no: "09", title: "リボン", id: "ribbon", cues: [] },
    { no: "10", title: "Stage of the ground", id: "stage-of-the-ground", cues: [
      ["voice", "たぶん、ラスサビのあと、「Stage of the ground」のあとの「イェイ」と「ララララーララ」を歌う。", true]
    ]},
    { no: "11", title: "天体観測", id: "tentai-kansoku", cues: [
      ["voice", "言わずもがな、「オーイェー アハーン」。"]
    ]},
    { no: "12", title: "66号線", id: "66-gousen", sit: true, cues: [] },
    { no: "13", title: "Twilight Pulse", isNew: true, cues: [] },
    { no: "14", title: "新世界", id: "shinsekai", cues: [
      ["voice", "すべての「ベイビーアイラブユーだぜ」を一緒に。"]
    ]},
    { no: "15", title: "グングニル", id: "gungnir", cues: [] },
    { no: "16", title: "ディアマン", id: "diamant", sit: true, cues: [] },
    { no: "17", title: "ダイヤモンド", id: "diamond", cues: [] },
    { no: "18", title: "アカシア", id: "acacia", cues: [
      ["voice", "1番サビ、ラスサビ前、ラスサビの最後の「オーイェー（イエィ）、オーイェー（イエィ）、アハーン」の、カッコの部分を歌う。"]
    ]}
  ]
};

function viewRatioClavis() {
  const T = RATIO_CLAVIS;
  const CUE = { voice: "声出し", clap: "クラップ", fist: "拳" };
  const kinds = s => [...new Set(s.cues.map(c => c[0]))];
  const isPublished = id => id && VISIBLE_SONGS.some(s => s.id === id);
  // 「」で囲んだ歌詞部分を強調する
  const lyric = text => escapeHtml(text).replace(/「([^」]*)」/g, '<q class="rc-lyric">$1</q>');
  const marks = s => kinds(s).map(k => `<span class="rc-mark rc-${k}" title="${CUE[k]}"></span>`).join("")
    + (s.sit ? `<span class="rc-mark rc-sit" title="大岩は座って聴く"></span>` : "");

  return `
    <span class="section-eyebrow">TOUR · BUMP OF CHICKEN 結成30周年</span>
    <h2 class="section-title rc-title">Ratio Clavis</h2>

    <div class="intro-card rc-intro">
      ${T.intro.map(p => `<p>${escapeHtml(p)}</p>`).join("")}
      <div class="rc-trio">
        ${T.highlights.map(h => `
          <div>
            <span class="rc-trio-tag">${h.tag}</span>
            <b>${escapeHtml(h.title)}</b>
            <span>${escapeHtml(h.text)}</span>
          </div>`).join("")}
      </div>
    </div>

    <div class="rc-free">
      <p class="rc-free-lead">楽しみ方は自由。</p>
      ${T.freeStyle.map(p => `<p>${escapeHtml(p)}</p>`).join("")}
    </div>

    <span class="section-eyebrow rc-gap">SETLIST</span>
    <h3 class="section-title">セトリ</h3>
    <div class="rc-legend">
      <span class="rc-tag rc-voice">声出し</span>
      <span class="rc-tag rc-clap">クラップ</span>
      <span class="rc-tag rc-fist">拳</span>
      <span class="rc-tag rc-sit">大岩は座って聴く</span>
    </div>
    <ol class="live-list rc-setlist">
      ${T.setlist.map(s => `
        <li>
          <a href="#" data-rc-jump="rc-${s.no}">
            <span class="rank">${s.no}</span>
            <span class="ttl">${escapeHtml(s.title)}</span>
            <span class="rc-marks">${marks(s)}</span>
          </a>
        </li>`).join("")}
    </ol>

    <span class="section-eyebrow rc-gap">CALL &amp; RESPONSE</span>
    <h3 class="section-title">声出し・クラップのポイント</h3>
    <p class="rc-note">「予想」と付いているものは、当日の雰囲気に合わせてください。</p>
    <div class="rc-songs">
      ${T.setlist.map(s => {
        const tags = kinds(s).map(k => `<span class="rc-tag rc-${k}">${CUE[k]}</span>`).join("")
          + (s.sit ? `<span class="rc-tag rc-sit">大岩は座って聴く</span>` : "")
          + (s.isNew ? `<span class="rc-tag rc-new">初披露</span>` : "");
        const more = isPublished(s.id) ? `<a class="rc-more" href="#song-${s.id}">解説を読む →</a>` : "";
        const body = s.cues.length
          ? `<ul class="rc-cues">${s.cues.map(([k, text, guess]) => `
              <li><span class="rc-tag rc-${k}">${CUE[k]}</span><p>${lyric(text)}${guess ? ` <span class="rc-tag rc-guess">予想</span>` : ""}</p></li>`).join("")}</ul>`
          : `<p class="rc-note">${s.isNew ? "初披露の新曲。まずはじっくり聴こう。" : s.sit ? "声出しはなし。大岩は座って、じっくり聴きます。" : "声出しはなし。じっくり聴こう。"}</p>`;
        return `
          <article class="rc-song${s.cues.length ? "" : " rc-quiet"}" id="rc-${s.no}">
            <div class="rc-song-head">
              <span class="rank">${s.no}</span>
              <h4>${escapeHtml(s.title)}</h4>
              <span class="rc-tags">${tags}</span>
              ${more}
            </div>
            ${body}
          </article>`;
      }).join("")}
    </div>
  `;
}

/* セトリの曲名をクリックすると、その曲のポイントまでスクロール(URLのハッシュは変えない) */
document.addEventListener("click", e => {
  const a = e.target.closest("[data-rc-jump]");
  if (!a) return;
  e.preventDefault();
  const el = document.getElementById(a.dataset.rcJump);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
});
