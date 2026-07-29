/* ============================================================
   star-data.js — 実際の恒星データ(輝星表ベースの概略値)
   ----------------------------------------------------------------
   背景の星空アニメーションに使う、実在の恒星の赤経(ra, 度)・
   赤緯(dec, 度)・実視等級(mag, 小さいほど明るい)を集めたもの。
   歌詞や創作物ではなく天文学的な事実(恒星の位置)のみを扱っている。

   SKY_LINES は、伝統的な星座線(アステリズム)を恒星名でつないだもの。
   北斗七星(おおぐま座)・カシオペヤ座・オリオン座・はくちょう座(北十字)・
   さそり座の尾、という有名で見分けやすい形だけを抜粋している。
   ============================================================ */

const SKY_STARS = [
  // おおぐま座(北斗七星)
  { name: "Dubhe",   ra: 165.93, dec: 61.75, mag: 1.79 },
  { name: "Merak",   ra: 165.45, dec: 56.38, mag: 2.37 },
  { name: "Phecda",  ra: 178.45, dec: 53.69, mag: 2.44 },
  { name: "Megrez",  ra: 183.86, dec: 57.03, mag: 3.31 },
  { name: "Alioth",  ra: 193.50, dec: 55.96, mag: 1.77 },
  { name: "Mizar",   ra: 200.98, dec: 54.93, mag: 2.23 },
  { name: "Alkaid",  ra: 206.88, dec: 49.31, mag: 1.86 },

  // カシオペヤ座
  { name: "Schedar",  ra: 10.13, dec: 56.54, mag: 2.24 },
  { name: "Caph",     ra: 2.29,  dec: 59.15, mag: 2.28 },
  { name: "GammaCas", ra: 14.18, dec: 60.72, mag: 2.47 },
  { name: "Ruchbah",  ra: 21.45, dec: 60.24, mag: 2.68 },
  { name: "Segin",    ra: 28.60, dec: 63.67, mag: 3.35 },

  // オリオン座
  { name: "Betelgeuse", ra: 88.80, dec: 7.41,  mag: 0.50 },
  { name: "Bellatrix",  ra: 81.28, dec: 6.35,  mag: 1.64 },
  { name: "Mintaka",    ra: 83.00, dec: -0.30, mag: 2.23 },
  { name: "Alnilam",    ra: 84.05, dec: -1.20, mag: 1.69 },
  { name: "Alnitak",    ra: 85.20, dec: -1.94, mag: 1.74 },
  { name: "Saiph",      ra: 86.94, dec: -9.67, mag: 2.06 },
  { name: "Rigel",      ra: 78.63, dec: -8.20, mag: 0.13 },

  // はくちょう座(北十字)
  { name: "Deneb",     ra: 310.35, dec: 45.28, mag: 1.25 },
  { name: "Sadr",      ra: 305.55, dec: 40.26, mag: 2.23 },
  { name: "Albireo",   ra: 292.68, dec: 27.96, mag: 3.18 },
  { name: "GienahCyg", ra: 311.55, dec: 33.97, mag: 2.46 },
  { name: "DeltaCyg",  ra: 296.25, dec: 45.13, mag: 2.87 },

  // さそり座
  { name: "Antares", ra: 247.35, dec: -26.43, mag: 1.06 },
  { name: "Shaula",  ra: 263.40, dec: -37.10, mag: 1.63 },
  { name: "Sargas",  ra: 264.33, dec: -42.99, mag: 1.87 },

  // その他の一等星(単独)
  { name: "Vega",      ra: 279.23, dec: 38.78,  mag: 0.03 },
  { name: "Polaris",   ra: 37.95,  dec: 89.26,  mag: 1.98 },
  { name: "Regulus",   ra: 152.10, dec: 11.97,  mag: 1.35 },
  { name: "Arcturus",  ra: 213.90, dec: 19.18,  mag: -0.05 },
  { name: "Aldebaran", ra: 68.98,  dec: 16.51,  mag: 0.85 },
  { name: "Capella",   ra: 79.17,  dec: 45.998, mag: 0.08 },
  { name: "Sirius",    ra: 101.28, dec: -16.72, mag: -1.46 },
  { name: "Procyon",   ra: 114.83, dec: 5.22,   mag: 0.34 },
  { name: "Spica",     ra: 201.30, dec: -11.16, mag: 1.04 }
];

const SKY_LINES = [
  ["Dubhe","Merak"], ["Merak","Phecda"], ["Phecda","Megrez"], ["Megrez","Dubhe"],
  ["Megrez","Alioth"], ["Alioth","Mizar"], ["Mizar","Alkaid"],

  ["Caph","Schedar"], ["Schedar","GammaCas"], ["GammaCas","Ruchbah"], ["Ruchbah","Segin"],

  ["Betelgeuse","Bellatrix"], ["Bellatrix","Mintaka"], ["Mintaka","Alnilam"],
  ["Alnilam","Alnitak"], ["Alnitak","Saiph"], ["Betelgeuse","Alnilam"], ["Rigel","Alnitak"], ["Rigel","Saiph"],

  ["Deneb","Sadr"], ["Sadr","Albireo"], ["Sadr","GienahCyg"], ["Sadr","DeltaCyg"],

  ["Antares","Sargas"], ["Sargas","Shaula"]
];
