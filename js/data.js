/* ============================================================
   data.js — サイトのコンテンツデータ
   ※これはサンプルデータです。実際の運用では、ここを書き換えて
   ください(本文・画像・YouTube ID・リンクなど)。
   ============================================================ */

const BAND_INTRO = `
BUMP OF CHICKEN(バンプ・オブ・チキン)は、千葉県出身の4人組ロックバンド。
藤原基央(Vo/Gt)、増川弘明(Gt)、直井由文(Ba)、升秀夫(Dr)の幼なじみメンバーで構成されている。
中学・高校時代からの活動を経て、メジャーデビュー以降「天体観測」「K」「supernova」など、
誰かの孤独や弱さに寄り添う歌詞と、エモーショナルなギターロックで広い世代の支持を集めてきた。
このページでは、楽曲・アルバム・メンバー情報を「観測ログ」としてまとめている。
※本文は紹介用のサンプルです。実際の運用では最新の公式プロフィールに置き換えてください。
`.trim();

const MEMBERS = [
  {
    id: "fujihara",
    name: "藤原 基央",
    role: "Vocal / Guitar",
    initial: "藤",
    bio: "バンドの全曲の作詞・作曲を手がけるフロントマン。少年的な視点と痛みへの想像力を行き来する歌詞世界が特徴。"
  },
  {
    id: "masukawa",
    name: "増川 弘明",
    role: "Guitar",
    initial: "増",
    bio: "リードギターを担当。骨太なリフと繊細なフレーズの両方を使い分け、楽曲の輪郭を支える。"
  },
  {
    id: "naoi",
    name: "直井 由文",
    role: "Bass",
    initial: "直",
    bio: "低音でバンドのグルーヴを作るベーシスト。安定したリズム隊として楽曲の土台を支える。"
  },
  {
    id: "masu",
    name: "升 秀夫",
    role: "Drums",
    initial: "升",
    bio: "幼なじみ4人の中で最後に加入したドラマー。手数の多いドラミングでライブの熱量を引き上げる。"
  }
];

const ALBUMS = [
  {
    id: "flamevein",
    title: "FLAME VEIN",
    year: "2001",
    desc: "メジャーデビュー作。粗削りながら剥き出しの衝動が詰まった、初期バンプの原点となる一枚。"
  },
  {
    id: "jupiter",
    title: "jupiter",
    year: "2002",
    desc: "「天体観測」を収録した2ndアルバム。広い世代に名前が知れ渡るきっかけとなった作品。"
  },
  {
    id: "thelivingdead",
    title: "THE LIVING DEAD",
    year: "2003",
    desc: "生と死、孤独といったテーマに正面から向き合った、重厚なロックサウンドが際立つ作品。"
  },
  {
    id: "yggdrasil",
    title: "ユグドラシル",
    year: "2004",
    desc: "北欧神話の世界樹をモチーフにした、物語性の強いコンセプト色の濃いアルバム。"
  },
  {
    id: "orbitalperiod",
    title: "orbital period",
    year: "2007",
    desc: "「カルマ」「ガラスのブルース」などを収録。バンドの活動の節目を象徴する代表作。"
  },
  {
    id: "cosmonaut",
    title: "COSMONAUT",
    year: "2009",
    desc: "宇宙飛行士(コスモノート)をテーマに、旅と帰還のイメージが全体を貫くアルバム。"
  },
  {
    id: "ray",
    title: "RAY",
    year: "2014",
    desc: "「ray」「BUTTERFLY」など、希望と再生をテーマにした楽曲が並ぶミドル期の代表作。"
  },
  {
    id: "auroraarc",
    title: "aurora arc",
    year: "2019",
    desc: "オーロラの弧(アーク)のように、過去と現在をつなぐ楽曲群で構成されたアルバム。"
  },
  {
    id: "pathfinder",
    title: "PATHFINDER",
    year: "2022",
    desc: "道を切り開く者(パスファインダー)をテーマにしたミニアルバム。短い収録時間の中に、これまでの歩みを振り返るような曲が並ぶ。"
  }
];

/*
  メンバー間の仲の良さを伝えるエピソード欄(メンバータブ用)
  - message: フリーテキスト(改行は \n で区切ると段落になります)
  - photo: 集合写真などを使う場合のパス(任意。空ならプレースホルダー表示)
*/
const MEMBER_EPISODE = {
  message: `
4人は中学・高校時代からの幼なじみで、デビューから20年以上が経った今も当時とほぼ同じメンバーで活動を続けている。
インタビューでは、お互いを下の名前や呼び名で呼び合う様子や、ライブ前に楽屋で他愛のない話で盛り上がる様子がよく語られる。
ステージ上での息の合った掛け合いも、長年の積み重ねがあるからこそのもの。
※本文は紹介用のサンプルです。実際のエピソードや写真に置き換えてご利用ください。
`.trim(),
  photo: ""
};

/*
  曲データ
  - id: 一意のID(URLの #song-xxx に使われる)
  - catNo: カタログ番号(表示用)
  - title / subtitle: 曲名 / サブタイトル
  - album, lyricist, composer, releaseDate: 基本情報
  - youtubeId: YouTubeの動画ID(11文字)。サンプルのため空にしています。
  - bullets: 箇条書きの説明
  - liveStandard: true の場合、ライブ定番曲一覧に表示される
  - date: 並び替え用の日付(YYYY-MM-DD) — 新しい順に「最近のアップロード」に出ます
*/
const SONGS = [
  { id: "tentai-kansoku", catNo: "No.001", title: "天体観測", subtitle: "見上げた夜空に、君を見つける歌", album: "jupiter", lyricist: "藤原基央", composer: "藤原基央", releaseDate: "2001-11", youtubeId: "", liveStandard: true, date: "2026-06-18",
    bullets: ["バンドの代表曲のひとつで、ライブでは合唱が起こる定番曲。", "望遠鏡で星を観測する行為と、大切な人を想う気持ちを重ねた歌詞が特徴。", "イントロのギターリフから始まる構成は、多くのカバーでも引用される。"] },
  { id: "k", catNo: "No.002", title: "K", subtitle: "—", album: "シングル", lyricist: "藤原基央", composer: "藤原基央", releaseDate: "2003-09", youtubeId: "", liveStandard: true, date: "2026-06-15",
    bullets: ["疾走感のあるギターロックで、ライブの中盤を盛り上げる定番曲。", "シンプルな構成ながら、サビでの一体感が魅力。"] },
  { id: "supernova", catNo: "No.003", title: "supernova", subtitle: "—", album: "ユグドラシル", lyricist: "藤原基央", composer: "藤原基央", releaseDate: "2004-09", youtubeId: "", liveStandard: true, date: "2026-06-10",
    bullets: ["超新星(supernova)をテーマにした、爆発的なエネルギーを感じさせる一曲。", "間奏のギターソロが印象的で、ライブでは大きな見せ場になる。"] },
  { id: "glass-no-blues", catNo: "No.004", title: "ガラスのブルース", subtitle: "—", album: "orbital period", lyricist: "藤原基央", composer: "藤原基央", releaseDate: "2007-03", youtubeId: "", liveStandard: true, date: "2026-06-08",
    bullets: ["割れやすく、それでも光を通すガラスを人の心に重ねた歌詞が特徴。", "テンポの良いロックサウンドで、ライブでは手拍子が起こる。"] },
  { id: "lostman", catNo: "No.005", title: "ロストマン", subtitle: "—", album: "orbital period", lyricist: "藤原基央", composer: "藤原基央", releaseDate: "2007-03", youtubeId: "", liveStandard: true, date: "2026-06-05",
    bullets: ["道に迷う者(ロストマン)を肯定するような、力強いメッセージ性のある楽曲。", "ライブの終盤に演奏されることが多い定番曲。"] },
  { id: "mayday", catNo: "No.006", title: "メーデー", subtitle: "—", album: "COSMONAUT", lyricist: "藤原基央", composer: "藤原基央", releaseDate: "2009-03", youtubeId: "", liveStandard: true, date: "2026-06-02",
    bullets: ["遭難信号「メーデー」をモチーフにした、緊迫感のあるロックチューン。", "ライブでは照明と連動した演出が映える一曲。"] },
  { id: "acacia", catNo: "No.007", title: "アカシア", subtitle: "—", album: "COSMONAUT", lyricist: "藤原基央", composer: "藤原基央", releaseDate: "2009-03", youtubeId: "", liveStandard: true, date: "2026-05-28",
    bullets: ["静かな導入から徐々に盛り上がっていく、ドラマチックな構成が特徴。", "歌詞に登場する木「アカシア」が、別れと再生の象徴として描かれる。"] },
  { id: "hello-world", catNo: "No.008", title: "Hello,world!", subtitle: "—", album: "RAY", lyricist: "藤原基央", composer: "藤原基央", releaseDate: "2014-06", youtubeId: "", liveStandard: true, date: "2026-05-20",
    bullets: ["プログラミングの入門でおなじみの一節をタイトルに据えた一曲。", "世界に向けた挨拶のような、開放的なサビが印象的。"] },
  { id: "hananona", catNo: "No.009", title: "花の名", subtitle: "—", album: "aurora arc", lyricist: "藤原基央", composer: "藤原基央", releaseDate: "2018-10", youtubeId: "", liveStandard: true, date: "2026-05-12",
    bullets: ["名前のない花に名前をつけるように、ありふれた日常を見つめ直す歌詞。", "落ち着いたミディアムテンポで、しっかりと聴かせる一曲。"] },
  { id: "ray-song", catNo: "No.010", title: "ray", subtitle: "—", album: "RAY", lyricist: "藤原基央", composer: "藤原基央", releaseDate: "2014-01", youtubeId: "", liveStandard: true, date: "2026-05-01",
    bullets: ["一筋の光(ray)を頼りに前へ進むことを歌った、応援歌的な一曲。", "アルバム表題曲として、バンドの転換期を象徴する楽曲。"] },
  { id: "fighter", catNo: "No.011", title: "ファイター", subtitle: "—", album: "シングル", lyricist: "藤原基央", composer: "藤原基央", releaseDate: "2015-09", youtubeId: "", liveStandard: false, date: "2026-04-22",
    bullets: ["戦う者(ファイター)に向けた、力強いエールのような楽曲。"] },
  { id: "st-elmo", catNo: "No.012", title: "セントエルモの灯火", subtitle: "—", album: "シングル", lyricist: "藤原基央", composer: "藤原基央", releaseDate: "2018-01", youtubeId: "", liveStandard: false, date: "2026-04-10",
    bullets: ["航海中に見える発光現象をモチーフにした、希望を歌う楽曲。"] },
  { id: "karma", catNo: "No.013", title: "カルマ", subtitle: "—", album: "orbital period", lyricist: "藤原基央", composer: "藤原基央", releaseDate: "2007-03", youtubeId: "", liveStandard: false, date: "2026-03-30",
    bullets: ["行いが巡るという「カルマ」の概念を題材にした、メッセージ性の強い楽曲。"] },
  { id: "butterfly", catNo: "No.014", title: "BUTTERFLY", subtitle: "—", album: "RAY", lyricist: "藤原基央", composer: "藤原基央", releaseDate: "2014-01", youtubeId: "", liveStandard: false, date: "2026-03-18",
    bullets: ["蝶(butterfly)の変化と再生を、人の成長に重ねた一曲。"] },
  { id: "answer", catNo: "No.015", title: "アンサー", subtitle: "—", album: "シングル", lyricist: "藤原基央", composer: "藤原基央", releaseDate: "2012-05", youtubeId: "", liveStandard: false, date: "2026-02-25",
    bullets: ["問いに対する自分なりの「答え」を探していく内容の楽曲。"] },
  { id: "stage-of-the-ground", catNo: "No.016", title: "ステージオブザグラウンド", subtitle: "—", album: "シングル", lyricist: "藤原基央", composer: "藤原基央", releaseDate: "2010-05", youtubeId: "", liveStandard: false, date: "2026-02-14",
    bullets: ["大地(グラウンド)を舞台に見立てた、スケールの大きい楽曲。"] },
  { id: "tampopo", catNo: "No.017", title: "たんぽぽ", subtitle: "—", album: "THE LIVING DEAD", lyricist: "藤原基央", composer: "藤原基央", releaseDate: "2003-10", youtubeId: "", liveStandard: false, date: "2026-01-30",
    bullets: ["どこにでも咲く花「たんぽぽ」を通して、ありのままの生き方を描く。"] },
  { id: "glass-live", catNo: "No.018", title: "ガラスのブルース(Live ver.)", subtitle: "—", album: "ライブ盤", lyricist: "藤原基央", composer: "藤原基央", releaseDate: "2009-12", youtubeId: "", liveStandard: false, date: "2026-01-15",
    bullets: ["スタジオ版とは違う、ライブならではのアレンジを楽しめる一曲。"] },
  { id: "only-lonely-glory", catNo: "No.019", title: "オンリーロンリーグローリー", subtitle: "—", album: "シングル", lyricist: "藤原基央", composer: "藤原基央", releaseDate: "2011-09", youtubeId: "", liveStandard: false, date: "2025-12-20",
    bullets: ["孤独(ロンリー)と栄光(グローリー)を対比させた、疾走感のある楽曲。"] },
  { id: "umineko", catNo: "No.020", title: "ウミネコ", subtitle: "—", album: "シングル", lyricist: "藤原基央", composer: "藤原基央", releaseDate: "2013-02", youtubeId: "", liveStandard: false, date: "2025-12-05",
    bullets: ["海猫(ウミネコ)を題材に、自由と孤独を同時に描く楽曲。"] },
  { id: "shooting-star", catNo: "No.021", title: "なんでもないよ、流れ星", subtitle: "—", album: "PATHFINDER", lyricist: "藤原基央", composer: "藤原基央", releaseDate: "2022-11", youtubeId: "", liveStandard: false, date: "2025-11-22",
    bullets: ["流れ星に願いを託すような、さりげなくも切ない楽曲。"] },
  { id: "seaglass", catNo: "No.022", title: "シーグラス", subtitle: "—", album: "PATHFINDER", lyricist: "藤原基央", composer: "藤原基央", releaseDate: "2022-11", youtubeId: "", liveStandard: false, date: "2025-11-10",
    bullets: ["波に削られたガラスの欠片(シーグラス)に、時間の積み重ねを見る楽曲。"] },
  { id: "voyager", catNo: "No.023", title: "voyager", subtitle: "—", album: "シングル", lyricist: "藤原基央", composer: "藤原基央", releaseDate: "2016-07", youtubeId: "", liveStandard: false, date: "2025-10-28",
    bullets: ["未知の旅(voyage)に出る者の心情を描いた楽曲。"] },
  { id: "starlight", catNo: "No.024", title: "スターライト", subtitle: "—", album: "シングル", lyricist: "藤原基央", composer: "藤原基央", releaseDate: "2017-03", youtubeId: "", liveStandard: false, date: "2025-10-12",
    bullets: ["星の光(スターライト)を道しるべに見立てた、静かな佳曲。"] },
  { id: "orbit", catNo: "No.025", title: "軌道", subtitle: "—", album: "orbital period", lyricist: "藤原基央", composer: "藤原基央", releaseDate: "2007-03", youtubeId: "", liveStandard: false, date: "2025-09-30",
    bullets: ["決まった軌道を巡る星のように、人と人の距離感を描いた楽曲。"] }
];
