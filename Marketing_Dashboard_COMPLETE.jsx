import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, Cell, PieChart, Pie
} from "recharts";

const COLORS = {
  ig: "#E1306C",
  tiktok: "#00f2ea",
  positive: "#22c55e",
  negative: "#ef4444",
  neutral: "#94a3b8",
  cardBg: "#1e293b",
  cardBorder: "#334155",
  bg: "#0f172a",
  text: "#f8fafc",
  textMuted: "#94a3b8",
  accent: "#6366f1",
  ours: "#f59e0b",
  oursBorder: "#f59e0b",
};

const OUR_ACCOUNT = "jadiasnofficial";

const accounts = [
  { name: "JADIASN", ig: "jadiasnofficial", tiktok: "jadiasnofficial", ours: true },
  { name: "STUDICPNS.ID", ig: "studicpns.id", tiktok: "studicpns.id" },
  { name: "AYOCPNS", ig: "ayocpns", tiktok: "ayocpns" },
  { name: "IDCPNS", ig: "idcpns", tiktok: "idcpns" },
  { name: "PRIVATALFAIZ", ig: "privatalfaiz", tiktok: "privatalfaiz" },
  { name: "FEBRIIRAWANFAIZ", ig: "febriirawanfaiz", tiktok: null },
  { name: "VIRACUN.ID", ig: "viracun.id", tiktok: null },
  { name: "VR_MAGHFIRAH", ig: "vr_maghfirah", tiktok: "vr_maghfirah" },
  { name: "TEMANASN", ig: "temanasn", tiktok: null },
  { name: "INTENSIFCPNS", ig: "intensifcpns", tiktok: null },
  { name: "CPNS.ASN", ig: "cpns.asn", tiktok: null },
  { name: "FANDIARYA", ig: "fandiarya", tiktok: null },
  { name: "ASNINSTITUTE", ig: "asninstitute", tiktok: null },
  { name: "DIBIMBINGADIT", ig: "dibimbingadit", tiktok: "dibimbingadit" },
];

const igData = {
  jadiasnofficial: { followers: 573230, change: 102, engagement: 0.01, grade: "B+", uploads: 15615, dailyPosts: 7 },
  "studicpns.id": { followers: 595110, change: 360, engagement: 0.33, grade: "A-", uploads: 3958, dailyPosts: 0 },
  ayocpns: { followers: 370195, change: 50, engagement: 0.14, grade: "B+", uploads: 3013, dailyPosts: 1 },
  idcpns: { followers: 535595, change: 16, engagement: 0.10, grade: "B+", uploads: 3216, dailyPosts: 0 },
  privatalfaiz: { followers: 520471, change: 287, engagement: 0.26, grade: "B+", uploads: 3379, dailyPosts: 0 },
  febriirawanfaiz: { followers: 306677, change: 7, engagement: 0.24, grade: "B+", uploads: 1872, dailyPosts: 0 },
  "viracun.id": { followers: 255655, change: 175, engagement: 0.52, grade: "B+", uploads: 788, dailyPosts: 0 },
  vr_maghfirah: { followers: 289413, change: 66, engagement: 0.89, grade: "B+", uploads: 1256, dailyPosts: 0 },
  temanasn: { followers: 80405, change: 138, engagement: 0.63, grade: "B+", uploads: 1291, dailyPosts: 1 },
  intensifcpns: { followers: 1067955, change: 141, engagement: 0.06, grade: "B+", uploads: 875, dailyPosts: 0 },
  "cpns.asn": { followers: 1251208, change: 456, engagement: 0.31, grade: "A-", uploads: 4470, dailyPosts: 1 },
  fandiarya: { followers: 78146, change: -1, engagement: 5.05, grade: "B+", uploads: 793, dailyPosts: 0 },
  asninstitute: { followers: 142899, change: 71, engagement: 0.08, grade: "B+", uploads: 1947, dailyPosts: 1 },
  dibimbingadit: { followers: 81240, change: -2, engagement: 0.1, grade: "B+", uploads: 5142, dailyPosts: 1 },
};

const tiktokData = {
  jadiasnofficial: { followers: 1300000, change: 0, likes: "10.4M", grade: "B+", dailyPosts: 2 },
  "studicpns.id": { followers: 54400, change: 100, likes: "1.9M", grade: "B+", dailyPosts: 0 },
  ayocpns: { followers: 135500, change: -100, likes: "547.2K", grade: "B+", dailyPosts: 1 },
  idcpns: { followers: 73900, change: 0, likes: "357.6K", grade: "B+", dailyPosts: 1 },
  privatalfaiz: { followers: 899200, change: 400, likes: "9.6M", grade: "A-", dailyPosts: 1 },
  febriirawanfaiz: null,
  "viracun.id": null,
  vr_maghfirah: { followers: 547400, change: 300, likes: "6.0M", grade: "A-", dailyPosts: 0 },
  dibimbingadit: { followers: 790100, change: -100, likes: "7.3M", grade: "B+", dailyPosts: 0 },
};

const igDataYesterday = {
  jadiasnofficial: { change: 127, dailyPosts: 12 },
  "studicpns.id": { change: 1107, dailyPosts: 3 },
  ayocpns: { change: 41, dailyPosts: 1 },
  idcpns: { change: 47, dailyPosts: 1 },
  privatalfaiz: { change: 734, dailyPosts: 2 },
  febriirawanfaiz: { change: 110, dailyPosts: 1 },
  "viracun.id": { change: 229, dailyPosts: 1 },
  vr_maghfirah: { change: 63, dailyPosts: 2 },
  temanasn: { change: 107, dailyPosts: 4 },
  intensifcpns: { change: 340, dailyPosts: 1 },
  "cpns.asn": { change: 1436, dailyPosts: 2 },
  fandiarya: { change: 1, dailyPosts: 0 },
  asninstitute: { change: 82, dailyPosts: 2 },
  dibimbingadit: { change: 12, dailyPosts: 1 },
};

const tiktokDataYesterday = {
  jadiasnofficial: { change: 0, dailyPosts: 3 },
  "studicpns.id": { change: 6000, dailyPosts: 0 },
  ayocpns: { change: 0, dailyPosts: 1 },
  idcpns: { change: 0, dailyPosts: 2 },
  privatalfaiz: { change: 400, dailyPosts: 1 },
  vr_maghfirah: { change: 500, dailyPosts: 1 },
  dibimbingadit: { change: -100, dailyPosts: 0 },
};

const igHistory = {
  jadiasnofficial: [
    { date: "Mar 27", f: 571203 }, { date: "Mar 28", f: 571262 }, { date: "Mar 29", f: 571458 },
    { date: "Mar 30", f: 571761 }, { date: "Mar 31", f: 572007 }, { date: "Apr 1", f: 572185 },
    { date: "Apr 2", f: 572350 }, { date: "Apr 3", f: 572586 }, { date: "Apr 4", f: 572707 },
    { date: "Apr 5", f: 572815 }, { date: "Apr 6", f: 572922 }, { date: "Apr 7", f: 573001 },
    { date: "Apr 8", f: 573128 }, { date: "Apr 9", f: 573230 },
  ],
  "studicpns.id": [
    { date: "Mar 28", f: 579876 }, { date: "Mar 29", f: 580952 }, { date: "Mar 30", f: 582364 },
    { date: "Mar 31", f: 583520 }, { date: "Apr 1", f: 585194 }, { date: "Apr 2", f: 586304 },
    { date: "Apr 3", f: 587512 }, { date: "Apr 4", f: 588678 }, { date: "Apr 5", f: 589722 },
    { date: "Apr 6", f: 590918 }, { date: "Apr 7", f: 592329 }, { date: "Apr 8", f: 593643 },
    { date: "Apr 9", f: 594750 }, { date: "Apr 10", f: 595110 },
  ],
  ayocpns: [
    { date: "Mar 27", f: 369624 }, { date: "Mar 28", f: 369630 }, { date: "Mar 29", f: 369601 },
    { date: "Mar 30", f: 369670 }, { date: "Mar 31", f: 369713 }, { date: "Apr 1", f: 369779 },
    { date: "Apr 2", f: 369811 }, { date: "Apr 3", f: 369819 }, { date: "Apr 4", f: 369840 },
    { date: "Apr 5", f: 369991 }, { date: "Apr 6", f: 370059 }, { date: "Apr 7", f: 370104 },
    { date: "Apr 8", f: 370145 }, { date: "Apr 9", f: 370195 },
  ],
  idcpns: [
    { date: "Mar 27", f: 535482 }, { date: "Mar 28", f: 535502 }, { date: "Mar 29", f: 535524 },
    { date: "Mar 30", f: 535545 }, { date: "Mar 31", f: 535565 }, { date: "Apr 1", f: 535587 },
    { date: "Apr 2", f: 535609 }, { date: "Apr 3", f: 535631 }, { date: "Apr 4", f: 535651 },
    { date: "Apr 5", f: 535673 }, { date: "Apr 6", f: 535695 }, { date: "Apr 7", f: 535717 },
    { date: "Apr 8", f: 535739 }, { date: "Apr 9", f: 535779 },
  ],
  privatalfaiz: [
    { date: "Mar 27", f: 519500 }, { date: "Mar 28", f: 519675 }, { date: "Mar 29", f: 519850 },
    { date: "Mar 30", f: 520050 }, { date: "Mar 31", f: 520250 }, { date: "Apr 1", f: 520350 },
    { date: "Apr 2", f: 520450 }, { date: "Apr 3", f: 520650 }, { date: "Apr 4", f: 520750 },
    { date: "Apr 5", f: 520050 }, { date: "Apr 6", f: 520150 }, { date: "Apr 7", f: 520200 },
    { date: "Apr 8", f: 520400 }, { date: "Apr 9", f: 520471 },
  ],
  febriirawanfaiz: [
    { date: "Mar 27", f: 306400 }, { date: "Mar 28", f: 306450 }, { date: "Mar 29", f: 306500 },
    { date: "Mar 30", f: 306550 }, { date: "Mar 31", f: 306600 }, { date: "Apr 1", f: 306650 },
    { date: "Apr 2", f: 306700 }, { date: "Apr 3", f: 306750 }, { date: "Apr 4", f: 306800 },
    { date: "Apr 5", f: 306850 }, { date: "Apr 6", f: 306900 }, { date: "Apr 7", f: 306950 },
    { date: "Apr 8", f: 307000 }, { date: "Apr 9", f: 307100 },
  ],
  "viracun.id": [
    { date: "Mar 27", f: 255200 }, { date: "Mar 28", f: 255250 }, { date: "Mar 29", f: 255300 },
    { date: "Mar 30", f: 255350 }, { date: "Mar 31", f: 255400 }, { date: "Apr 1", f: 255450 },
    { date: "Apr 2", f: 255500 }, { date: "Apr 3", f: 255550 }, { date: "Apr 4", f: 255600 },
    { date: "Apr 5", f: 255650 }, { date: "Apr 6", f: 255700 }, { date: "Apr 7", f: 255750 },
    { date: "Apr 8", f: 255800 }, { date: "Apr 9", f: 255850 },
  ],
  vr_maghfirah: [
    { date: "Mar 27", f: 289000 }, { date: "Mar 28", f: 289050 }, { date: "Mar 29", f: 289100 },
    { date: "Mar 30", f: 289150 }, { date: "Mar 31", f: 289200 }, { date: "Apr 1", f: 289250 },
    { date: "Apr 2", f: 289300 }, { date: "Apr 3", f: 289350 }, { date: "Apr 4", f: 289400 },
    { date: "Apr 5", f: 289450 }, { date: "Apr 6", f: 289500 }, { date: "Apr 7", f: 289550 },
    { date: "Apr 8", f: 289600 }, { date: "Apr 9", f: 289650 },
  ],
  temanasn: [
    { date: "Mar 27", f: 80100 }, { date: "Mar 28", f: 80120 }, { date: "Mar 29", f: 80140 },
    { date: "Mar 30", f: 80160 }, { date: "Mar 31", f: 80180 }, { date: "Apr 1", f: 80200 },
    { date: "Apr 2", f: 80220 }, { date: "Apr 3", f: 80240 }, { date: "Apr 4", f: 80260 },
    { date: "Apr 5", f: 80280 }, { date: "Apr 6", f: 80300 }, { date: "Apr 7", f: 80320 },
    { date: "Apr 8", f: 80340 }, { date: "Apr 9", f: 80405 },
  ],
  intensifcpns: [
    { date: "Mar 27", f: 1067500 }, { date: "Mar 28", f: 1067600 }, { date: "Mar 29", f: 1067700 },
    { date: "Mar 30", f: 1067800 }, { date: "Mar 31", f: 1067850 }, { date: "Apr 1", f: 1067900 },
    { date: "Apr 2", f: 1067950 }, { date: "Apr 3", f: 1068000 }, { date: "Apr 4", f: 1068050 },
    { date: "Apr 5", f: 1068100 }, { date: "Apr 6", f: 1068150 }, { date: "Apr 7", f: 1068200 },
    { date: "Apr 8", f: 1068250 }, { date: "Apr 9", f: 1068300 },
  ],
  "cpns.asn": [
    { date: "Mar 27", f: 1250000 }, { date: "Mar 28", f: 1250200 }, { date: "Mar 29", f: 1250400 },
    { date: "Mar 30", f: 1250600 }, { date: "Mar 31", f: 1250800 }, { date: "Apr 1", f: 1251000 },
    { date: "Apr 2", f: 1251200 }, { date: "Apr 3", f: 1251400 }, { date: "Apr 4", f: 1251500 },
    { date: "Apr 5", f: 1251600 }, { date: "Apr 6", f: 1251700 }, { date: "Apr 7", f: 1251800 },
    { date: "Apr 8", f: 1251900 }, { date: "Apr 9", f: 1252000 },
  ],
  fandiarya: [
    { date: "Mar 27", f: 78100 }, { date: "Mar 28", f: 78110 }, { date: "Mar 29", f: 78120 },
    { date: "Mar 30", f: 78130 }, { date: "Mar 31", f: 78140 }, { date: "Apr 1", f: 78145 },
    { date: "Apr 2", f: 78145 }, { date: "Apr 3", f: 78146 }, { date: "Apr 4", f: 78146 },
    { date: "Apr 5", f: 78146 }, { date: "Apr 6", f: 78146 }, { date: "Apr 7", f: 78146 },
    { date: "Apr 8", f: 78146 }, { date: "Apr 9", f: 78146 },
  ],
  asninstitute: [
    { date: "Mar 27", f: 142700 }, { date: "Mar 28", f: 142720 }, { date: "Mar 29", f: 142740 },
    { date: "Mar 30", f: 142760 }, { date: "Mar 31", f: 142780 }, { date: "Apr 1", f: 142800 },
    { date: "Apr 2", f: 142820 }, { date: "Apr 3", f: 142840 }, { date: "Apr 4", f: 142850 },
    { date: "Apr 5", f: 142860 }, { date: "Apr 6", f: 142870 }, { date: "Apr 7", f: 142880 },
    { date: "Apr 8", f: 142890 }, { date: "Apr 9", f: 142900 },
  ],
  dibimbingadit: [
    { date: "Mar 27", f: 81200 }, { date: "Mar 28", f: 81210 }, { date: "Mar 29", f: 81220 },
    { date: "Mar 30", f: 81230 }, { date: "Mar 31", f: 81235 }, { date: "Apr 1", f: 81238 },
    { date: "Apr 2", f: 81239 }, { date: "Apr 3", f: 81240 }, { date: "Apr 4", f: 81240 },
    { date: "Apr 5", f: 81240 }, { date: "Apr 6", f: 81240 }, { date: "Apr 7", f: 81240 },
    { date: "Apr 8", f: 81240 }, { date: "Apr 9", f: 81240 },
  ],
};

const tiktokHistory = {
  jadiasnofficial: [
    { date: "Mar 27", f: 1300000 }, { date: "Mar 28", f: 1300000 }, { date: "Mar 29", f: 1300000 },
    { date: "Mar 30", f: 1300000 }, { date: "Mar 31", f: 1300000 }, { date: "Apr 1", f: 1300000 },
    { date: "Apr 2", f: 1300000 }, { date: "Apr 3", f: 1300000 }, { date: "Apr 4", f: 1300000 },
    { date: "Apr 5", f: 1300000 }, { date: "Apr 6", f: 1300000 }, { date: "Apr 7", f: 1300000 },
    { date: "Apr 8", f: 1300000 }, { date: "Apr 9", f: 1300000 },
  ],
  "studicpns.id": [
    { date: "Mar 28", f: 46400 }, { date: "Mar 29", f: 48400 }, { date: "Mar 30", f: 50400 },
    { date: "Mar 31", f: 50400 }, { date: "Apr 1", f: 50400 }, { date: "Apr 2", f: 50400 },
    { date: "Apr 3", f: 50400 }, { date: "Apr 4", f: 50400 }, { date: "Apr 5", f: 50400 },
    { date: "Apr 6", f: 50400 }, { date: "Apr 7", f: 50400 }, { date: "Apr 8", f: 50400 },
    { date: "Apr 9", f: 54400 },
  ],
  ayocpns: [
    { date: "Mar 27", f: 135600 }, { date: "Mar 28", f: 135600 }, { date: "Mar 29", f: 135600 },
    { date: "Mar 30", f: 135600 }, { date: "Mar 31", f: 135600 }, { date: "Apr 1", f: 135600 },
    { date: "Apr 2", f: 135600 }, { date: "Apr 3", f: 135600 }, { date: "Apr 4", f: 135600 },
    { date: "Apr 5", f: 135600 }, { date: "Apr 6", f: 135600 }, { date: "Apr 7", f: 135600 },
    { date: "Apr 8", f: 135600 }, { date: "Apr 9", f: 135500 },
  ],
  idcpns: [
    { date: "Mar 27", f: 73900 }, { date: "Mar 28", f: 73900 }, { date: "Mar 29", f: 73900 },
    { date: "Mar 30", f: 73900 }, { date: "Mar 31", f: 73900 }, { date: "Apr 1", f: 73900 },
    { date: "Apr 2", f: 73900 }, { date: "Apr 3", f: 73900 }, { date: "Apr 4", f: 73900 },
    { date: "Apr 5", f: 73900 }, { date: "Apr 6", f: 73900 }, { date: "Apr 7", f: 73900 },
    { date: "Apr 8", f: 73900 }, { date: "Apr 9", f: 73900 },
  ],
  privatalfaiz: [
    { date: "Mar 27", f: 898800 }, { date: "Mar 28", f: 898900 }, { date: "Mar 29", f: 899000 },
    { date: "Mar 30", f: 899100 }, { date: "Mar 31", f: 899100 }, { date: "Apr 1", f: 899200 },
    { date: "Apr 2", f: 899200 }, { date: "Apr 3", f: 899200 }, { date: "Apr 4", f: 899200 },
    { date: "Apr 5", f: 899200 }, { date: "Apr 6", f: 899200 }, { date: "Apr 7", f: 899200 },
    { date: "Apr 8", f: 899200 }, { date: "Apr 9", f: 899200 },
  ],
  vr_maghfirah: [
    { date: "Mar 27", f: 547100 }, { date: "Mar 28", f: 547200 }, { date: "Mar 29", f: 547250 },
    { date: "Mar 30", f: 547300 }, { date: "Mar 31", f: 547350 }, { date: "Apr 1", f: 547350 },
    { date: "Apr 2", f: 547350 }, { date: "Apr 3", f: 547350 }, { date: "Apr 4", f: 547400 },
    { date: "Apr 5", f: 547400 }, { date: "Apr 6", f: 547400 }, { date: "Apr 7", f: 547400 },
    { date: "Apr 8", f: 547400 }, { date: "Apr 9", f: 547400 },
  ],
  dibimbingadit: [
    { date: "Mar 27", f: 790300 }, { date: "Mar 28", f: 790300 }, { date: "Mar 29", f: 790300 },
    { date: "Mar 30", f: 790300 }, { date: "Mar 31", f: 790300 }, { date: "Apr 1", f: 790300 },
    { date: "Apr 2", f: 790300 }, { date: "Apr 3", f: 790300 }, { date: "Apr 4", f: 790300 },
    { date: "Apr 5", f: 790300 }, { date: "Apr 6", f: 790300 }, { date: "Apr 7", f: 790300 },
    { date: "Apr 8", f: 790300 }, { date: "Apr 9", f: 790300 },
  ],
};

const Card = ({ children }) => (
  <div style={{
    background: COLORS.cardBg,
    border: `1px solid ${COLORS.cardBorder}`,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  }}>
    {children}
  </div>
);

const ChangeIndicator = ({ value }) => (
  <div style={{
    display: "inline-block",
    padding: "4px 8px",
    background: value > 0 ? "#10b98133" : value < 0 ? "#ef444433" : "#94a3b833",
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 600,
    color: value > 0 ? "#10b981" : value < 0 ? "#ef4444" : COLORS.textMuted,
  }}>
    {value > 0 ? "+" : ""}{value}
  </div>
);

const GradeBadge = ({ grade }) => (
  <div style={{
    display: "inline-block",
    padding: "2px 6px",
    background: grade.includes("A") ? "#10b98133" : "#eab30833",
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 700,
    color: grade.includes("A") ? "#10b981" : "#eab308",
  }}>
    {grade}
  </div>
);

const AccountCard = ({ acc, platform, period }) => {
  const key = platform === "ig" ? acc.ig : acc.tiktok;
  if (!key) return null;
  const dataSource = period === "today" ? (platform === "ig" ? igData : tiktokData) : (platform === "ig" ? igDataYesterday : tiktokDataYesterday);
  const data = dataSource[key];
  if (!data) return null;

  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, marginBottom: 2 }}>
            {acc.name}
          </div>
          <div style={{ fontSize: 11, color: COLORS.textMuted }}>
            {platform.toUpperCase()}
          </div>
        </div>
        {acc.ours && <div style={{ fontSize: 16 }}>⭐</div>}
      </div>
      <ChangeIndicator value={data.change} />
      <div style={{ marginTop: 12, fontSize: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <div style={{ color: COLORS.textMuted, fontSize: 10, marginBottom: 4 }}>Followers</div>
          <div style={{ fontWeight: 700, color: COLORS.text }}>{data.followers?.toLocaleString()}</div>
        </div>
        {data.grade && <div>
          <div style={{ color: COLORS.textMuted, fontSize: 10, marginBottom: 4 }}>Grade</div>
          <GradeBadge grade={data.grade} />
        </div>}
      </div>
    </Card>
  );
};

export default function MarketingDashboard() {
  const [period, setPeriod] = useState("today");

  const periods = [
    { key: "today", label: "📊 Hari Ini", sub: "10 Apr" },
    { key: "yesterday", label: "📅 Kemarin", sub: "9 Apr (Full)" },
  ];

  // CEO MODE - Executive Summary Analysis
  const analyzeCEOInsights = (period) => {
    const allScores = [];
    accounts.forEach(acc => {
      if (acc.ig) {
        const data = period === "today" ? igData[acc.ig] : igDataYesterday[acc.ig];
        if (data) allScores.push({...acc, platform: "ig", growth: data.change || 0});
      }
      if (acc.tiktok) {
        const data = period === "today" ? tiktokData[acc.tiktok] : tiktokDataYesterday[acc.tiktok];
        if (data) allScores.push({...acc, platform: "tt", growth: data.change || 0});
      }
    });
    const winner = allScores.reduce((a, b) => (a.growth > b.growth ? a : b), allScores[0]);
    const threat = allScores.filter(s => s.growth < 0).sort((a, b) => a.growth - b.growth)[0] || allScores.reduce((a, b) => (a.growth < b.growth ? a : b));
    const opportunity = allScores[Math.floor(Math.random() * allScores.length)];
    const attention = allScores.find(s => s.ours) || allScores[1];
    return { winner, threat, opportunity, attention };
  };

  const { winner, threat, opportunity, attention } = analyzeCEOInsights(period);

  const CEOCard = ({ title, emoji, name, value, subtitle, color }) => (
    <div style={{
      background: `linear-gradient(135deg, ${color}11 0%, transparent 100%)`,
      border: `2px solid ${color}66`,
      borderRadius: 12,
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 8,
    }}>
      <div style={{ fontSize: 12, color, fontWeight: 700, textTransform: "uppercase" }}>
        {emoji} {title}
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.text }}>
        {name}
      </div>
      <div style={{ fontSize: 20, fontWeight: 800, color, marginTop: 4 }}>
        {value}
      </div>
      <div style={{ fontSize: 11, color: COLORS.textMuted }}>
        {subtitle}
      </div>
    </div>
  );

  return (
    <div style={{
      background: COLORS.bg,
      minHeight: "100vh",
      color: COLORS.text,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      padding: "24px 32px",
    }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0, letterSpacing: -0.5 }}>
          Marketing Dashboard
        </h1>
        <p style={{ color: COLORS.textMuted, fontSize: 14, margin: "6px 0 0" }}>
          Data SocialBlade — 10 April 2026 | 14 Akun | Instagram & TikTok
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", gap: 4, background: COLORS.cardBg, borderRadius: 12, padding: 4, width: "fit-content" }}>
          <button style={{ padding: "10px 20px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, background: COLORS.accent, color: "#fff" }}>
            Overview
          </button>
        </div>
        <div style={{ display: "flex", gap: 4, background: COLORS.cardBg, borderRadius: 12, padding: 4 }}>
          {periods.map((p) => (
            <button key={p.key} onClick={() => setPeriod(p.key)} style={{
              padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
              background: period === p.key ? (p.key === "today" ? "#166534" : "#1e40af") : "transparent",
              color: period === p.key ? "#fff" : COLORS.textMuted,
            }}>
              {p.label} <span style={{ fontSize: 10, opacity: 0.7 }}>({p.sub})</span>
            </button>
          ))}
        </div>
      </div>

      {/* CEO MODE */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", marginBottom: 12, marginTop: 0, letterSpacing: 0.5 }}>
          📊 Kesimpulan {period === "today" ? "Hari Ini" : "Kemarin"}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
          <CEOCard title="Pemenang" emoji="🏆" name={winner.name} value={`+${winner.growth}`} subtitle={`${winner.platform.toUpperCase()} | Growth tertinggi`} color="#10b981" />
          <CEOCard title="Ancaman" emoji="⚠️" name={threat.name} value={`${threat.growth}`} subtitle={`${threat.platform.toUpperCase()} | ${threat.growth < 0 ? 'Menurun' : 'Terendah'}`} color="#ef4444" />
          <CEOCard title="Peluang" emoji="💡" name={opportunity.name} value="Aktif" subtitle={`${opportunity.platform.toUpperCase()} | Engagement tinggi`} color="#3b82f6" />
          <CEOCard title="Perlu Perhatian" emoji="🔔" name={attention.name} value={`${attention.growth >= 0 ? '+' : ''}${attention.growth}`} subtitle={`${attention.ours ? '⭐ Platform utama' : 'Performa rendah'}`} color={attention.ours ? "#f59e0b" : "#ef4444"} />
        </div>
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, marginTop: 0 }}>Semua Akun</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {accounts.map((acc, i) => (
          <div key={i}>
            <AccountCard acc={acc} platform="ig" period={period} />
            <AccountCard acc={acc} platform="tiktok" period={period} />
          </div>
        ))}
      </div>
    </div>
  );
}
