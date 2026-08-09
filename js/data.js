/* ============================================================
   data.js — サイトのコンテンツデータ
   ※これはサンプルデータです。実際の運用では、ここを書き換えて
   ください(本文・画像・YouTube ID・リンクなど)。
   ============================================================ */

const BAND_INTRO = `
BUMP OF CHICKEN(バンプ・オブ・チキン)は、千葉県出身の4人組ロックバンド。
藤原基央(Vo/Gt)、増川弘明(Gt)、直井由文(Ba)、升秀夫(Dr)の幼なじみメンバーで構成されています。
そのメッセージ性や独自の世界観から、老若男女問わず多くのファンを魅了しています。励ましや道を示すような歌詞ではなく、人の脆く弱い感情を理解した上で、傍に寄り添ってくれる歌詞が特徴的です。米津玄師や野田洋次郎をはじめ、多くのアーティストに影響を与えており、今も最前線で活躍しているバンドです。
`.trim();

const MEMBERS = [
  {
    id: "fujihara",
    name: "藤原 基央",
    role: "Vocal / Guitar",
    initial: "藤",
    bio: "通称藤くん。バンドの全曲の作詞・作曲を手がける。年を重ねるごとに若くなる不思議な人。寡黙そうに見えて熱い人で、ライブでは、演奏中やMCでメンバーとファンへの愛をヒシヒシと感じる"
  },
  {
    id: "masukawa",
    name: "増川 弘明",
    role: "Guitar",
    initial: "増",
    bio: "通称ヒロ。46歳に見えないくらい若く、年を取らない男と言われている。30年経ってもライブでは口下手であり、毎回前日食べたごはんの話をする。秀ちゃんとはよくトムジェリみたいな小競り合いをしてる。"
  },
  {
    id: "naoi",
    name: "直井 由文",
    role: "Bass",
    initial: "直",
    bio: "通称チャマ。小学校時代、自販機で100円ジュースを奢った際お坊ちゃまと言われたことが名前の由来。バンド内の盛り上げ役で、他3人よりも髪色とかが派手で、メンバー１精神的に若い。"
  },
  {
    id: "masu",
    name: "升 秀夫",
    role: "Drums",
    initial: "升",
    bio: "通称秀ちゃん。ほかメンバー3人が見た目若いのに対し、見た目はイケおじ路線を走ってる。中身は癒しキャラとしての立ち位置が強く、ライブでもそんな扱い。"
  }
];

const ALBUMS = [
  {
    id: "flamevein",
    title: "FLAME VEIN",
    year: "1999",
    desc: ""
  },
  {
    id: "thelivingdead",
    title: "THE LIVING DEAD",
    year: "2000",
    desc: ""
  },
  {
    id: "jupiter",
    title: "jupiter",
    year: "2002",
    desc: ""
  },
  {
    id: "yggdrasil",
    title: "ユグドラシル",
    year: "2004",
    desc: ""
  },
  {
    id: "orbitalperiod",
    title: "orbital period",
    year: "2007",
    desc: ""
  },
  {
    id: "cosmonaut",
    title: "COSMONAUT",
    year: "2010",
    desc: ""
  },
  {
    id: "ray",
    title: "RAY",
    year: "2014",
    desc: ""
  },
  {
    id: "butterflies",
    title: "Butterflies",
    year: "2016",
    desc: ""
  },
  {
    id: "auroraarc",
    title: "aurora arc",
    year: "2019",
    desc: ""
  },
  {
    id: "iris",
    title: "Iris",
    year: "2024",
    desc: ""
  }
];

/*
  ホームタブ: バンド説明の直下に表示する1枚の画像
  例: const HOME_PHOTO = "images/home-photo.jpg";
*/
const HOME_PHOTO = "images/artist.jpg";

/*
  メンバータブ: 各メンバー紹介の上に表示する「4人の集合写真」(1枚のみ)
  例: const MEMBERS_GROUP_PHOTO = "images/members/group.jpg";
*/
const MEMBERS_GROUP_PHOTO = "images/artist_2.jpg";

/*
  メンバータブ: 集合写真の下に表示するキャプション(任意)
*/
const MEMBERS_GROUP_PHOTO_CAPTION = "左から、チャマ、ヒロ、藤くん、秀ちゃん";

/*
  曲データについて
  ----------------------------------------------------------------
  以前はこのファイルに全曲分のデータを直接書いていましたが、
  曲数が増えるたびにこの1ファイルを編集することになり、見通しが
  悪くなるため、「曲1つ = 1ファイル」の構成に変更しました。

  実際の曲データは js/songs/ フォルダの中に、1曲1ファイルで
  入っています(例: js/songs/tentai-kansoku.js)。
  各ファイルの中で SONGS.push({...}) という形で、この空配列に
  曲を追加しています。

  新しい曲を追加する手順は README.md の
  「曲を1曲追加する手順」を参照してください。
*/
const SONGS = [];
