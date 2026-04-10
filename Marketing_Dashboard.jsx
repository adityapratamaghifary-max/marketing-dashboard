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

// === DATA HARI INI (10 April 2026, sedang berjalan) ===
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

// === DATA KEMARIN (9 April 2026, sehari penuh) ===
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

// 14-day Instagram history (Mar 27 - Apr 9, 2026)
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
    { date: "Mar 28", f: 534705 }, { date: "Mar 29", f: 534644 }, { date: "Mar 30", f: 534659 },
    { date: "Mar 31", f: 534803 }, { date: "Apr 1", f: 534914 }, { date: "Apr 2", f: 535029 },
    { date: "Apr 3", f: 535110 }, { date: "Apr 4", f: 535149 }, { date: "Apr 5", f: 535183 },
    { date: "Apr 6", f: 535279 }, { date: "Apr 7", f: 535412 }, { date: "Apr 8", f: 535532 },
    { date: "Apr 9", f: 535579 }, { date: "Apr 10", f: 535595 },
  ],
  privatalfaiz: [
    { date: "Mar 28", f: 511719 }, { date: "Mar 29", f: 511876 }, { date: "Mar 30", f: 512416 },
    { date: "Mar 31", f: 512945 }, { date: "Apr 1", f: 513828 }, { date: "Apr 2", f: 514787 },
    { date: "Apr 3", f: 515576 }, { date: "Apr 4", f: 516227 }, { date: "Apr 5", f: 517142 },
    { date: "Apr 6", f: 518070 }, { date: "Apr 7", f: 518717 }, { date: "Apr 8", f: 519450 },
    { date: "Apr 9", f: 520184 }, { date: "Apr 10", f: 520471 },
  ],
  febriirawanfaiz: [
    { date: "Mar 28", f: 305825 }, { date: "Mar 29", f: 305801 }, { date: "Mar 30", f: 305867 },
    { date: "Mar 31", f: 305943 }, { date: "Apr 1", f: 306007 }, { date: "Apr 2", f: 306106 },
    { date: "Apr 3", f: 306165 }, { date: "Apr 4", f: 306222 }, { date: "Apr 5", f: 306301 },
    { date: "Apr 6", f: 306374 }, { date: "Apr 7", f: 306461 }, { date: "Apr 8", f: 306560 },
    { date: "Apr 9", f: 306670 }, { date: "Apr 10", f: 306677 },
  ],
  "viracun.id": [
    { date: "Mar 27", f: 253297 }, { date: "Mar 28", f: 253418 }, { date: "Mar 29", f: 253508 },
    { date: "Mar 30", f: 253668 }, { date: "Mar 31", f: 253879 }, { date: "Apr 1", f: 254046 },
    { date: "Apr 2", f: 254196 }, { date: "Apr 3", f: 254304 }, { date: "Apr 4", f: 254481 },
    { date: "Apr 5", f: 254715 }, { date: "Apr 6", f: 255019 }, { date: "Apr 7", f: 255251 },
    { date: "Apr 8", f: 255480 }, { date: "Apr 9", f: 255655 },
  ],
  vr_maghfirah: [
    { date: "Mar 27", f: 288755 }, { date: "Mar 28", f: 288789 }, { date: "Mar 29", f: 288805 },
    { date: "Mar 30", f: 288836 }, { date: "Mar 31", f: 288864 }, { date: "Apr 1", f: 288881 },
    { date: "Apr 2", f: 288929 }, { date: "Apr 3", f: 288909 }, { date: "Apr 4", f: 289002 },
    { date: "Apr 5", f: 289088 }, { date: "Apr 6", f: 289200 }, { date: "Apr 7", f: 289284 },
    { date: "Apr 8", f: 289347 }, { date: "Apr 9", f: 289413 },
  ],
};

// 14-day TikTok history (Mar 27 - Apr 9, 2026)
const tiktokHistory = {
  jadiasnofficial: [
    { date: "Mar 27", f: 1300000 }, { date: "Mar 28", f: 1300000 }, { date: "Mar 29", f: 1300000 },
    { date: "Mar 30", f: 1300000 }, { date: "Mar 31", f: 1300000 }, { date: "Apr 1", f: 1300000 },
    { date: "Apr 3", f: 1300000 }, { date: "Apr 4", f: 1300000 }, { date: "Apr 5", f: 1300000 },
    { date: "Apr 6", f: 1300000 }, { date: "Apr 7", f: 1300000 }, { date: "Apr 8", f: 1300000 },
    { date: "Apr 9", f: 1300000 }, { date: "Apr 10", f: 1300000 },
  ],
  privatalfaiz: [
    { date: "Mar 27", f: 893400 }, { date: "Mar 28", f: 893500 }, { date: "Mar 29", f: 893700 },
    { date: "Mar 30", f: 893800 }, { date: "Mar 31", f: 894600 }, { date: "Apr 2", f: 895700 },
    { date: "Apr 3", f: 896000 }, { date: "Apr 4", f: 896300 }, { date: "Apr 5", f: 896800 },
    { date: "Apr 6", f: 897300 }, { date: "Apr 7", f: 898000 }, { date: "Apr 8", f: 898400 },
    { date: "Apr 9", f: 898800 }, { date: "Apr 10", f: 899200 },
  ],
  ayocpns: [
    { date: "Mar 27", f: 135300 }, { date: "Mar 28", f: 135300 }, { date: "Mar 29", f: 135300 },
    { date: "Mar 30", f: 135300 }, { date: "Mar 31", f: 135300 }, { date: "Apr 1", f: 135300 },
    { date: "Apr 3", f: 135300 }, { date: "Apr 4", f: 135500 }, { date: "Apr 5", f: 135600 },
    { date: "Apr 6", f: 135600 }, { date: "Apr 7", f: 135600 }, { date: "Apr 8", f: 135600 },
    { date: "Apr 9", f: 135500 },
  ],
  idcpns: [
    { date: "Mar 27", f: 74000 }, { date: "Mar 28", f: 74000 }, { date: "Mar 29", f: 74000 },
    { date: "Mar 30", f: 73900 }, { date: "Mar 31", f: 73900 }, { date: "Apr 1", f: 73900 },
    { date: "Apr 3", f: 73900 }, { date: "Apr 4", f: 73900 }, { date: "Apr 5", f: 73900 },
    { date: "Apr 6", f: 73900 }, { date: "Apr 7", f: 73900 }, { date: "Apr 8", f: 73900 },
    { date: "Apr 9", f: 73900 },
  ],
  vr_maghfirah: [
    { date: "Mar 27", f: 542600 }, { date: "Mar 28", f: 542900 }, { date: "Mar 29", f: 542900 },
    { date: "Mar 30", f: 543300 }, { date: "Mar 31", f: 543500 }, { date: "Apr 1", f: 543900 },
    { date: "Apr 3", f: 544300 }, { date: "Apr 4", f: 544400 }, { date: "Apr 5", f: 544800 },
    { date: "Apr 6", f: 545500 }, { date: "Apr 7", f: 546100 }, { date: "Apr 8", f: 546600 },
    { date: "Apr 9", f: 547100 }, { date: "Apr 10", f: 547400 },
  ],
  "studicpns.id": [
    { date: "Mar 7", f: 48300 }, { date: "Apr 9", f: 54300 },
  ],
};

const formatNum = (n) => {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n?.toString() || "0";
};

const formatFull = (n) => n?.toLocaleString("id-ID") || "0";

const ChangeIndicator = ({ value }) => {
  if (value === null || value === undefined) return <span style={{ color: COLORS.textMuted, fontSize: 13 }}>0</span>;
  const color = value > 0 ? COLORS.positive : value < 0 ? COLORS.negative : COLORS.textMuted;
  const arrow = value > 0 ? "▲" : value < 0 ? "▼" : "●";
  const prefix = value > 0 ? "+" : "";
  return (
    <span style={{ color, fontWeight: 700, fontSize: 15 }}>
      {arrow} {prefix}{formatFull(value)}
    </span>
  );
};

const GradeBadge = ({ grade }) => {
  const bgMap = { "A-": "#166534", "B+": "#1e40af", "B": "#6b21a8", "C+": "#92400e" };
  return (
    <span style={{
      background: bgMap[grade] || "#374151",
      color: "#fff",
      padding: "2px 10px",
      borderRadius: 6,
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 1,
    }}>{grade}</span>
  );
};

const Card = ({ children, style = {} }) => (
  <div style={{
    background: COLORS.cardBg,
    border: `1px solid ${COLORS.cardBorder}`,
    borderRadius: 16,
    padding: 20,
    ...style,
  }}>{children}</div>
);

// Helper: get data berdasarkan period
const getData = (platform, key, period) => {
  const todayData = platform === "ig" ? igData[key] : tiktokData[key];
  if (!todayData) return null;
  if (period === "yesterday") {
    const yest = platform === "ig" ? igDataYesterday[key] : tiktokDataYesterday[key];
    if (!yest) return null;
    return { ...todayData, change: yest.change, dailyPosts: yest.dailyPosts };
  }
  return todayData;
};

const AccountCard = ({ acc, platform, isSelected, onClick, rank, period = "today" }) => {
  const key = platform === "ig" ? acc.ig : (acc.tiktok || acc.ig);
  const data = getData(platform, key, period);
  const isOurs = acc.ours;
  const rankEmoji = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : null;
  const rankColor = rank === 1 ? "#fbbf24" : rank === 2 ? "#cbd5e1" : rank === 3 ? "#d97706" : COLORS.textMuted;

  // Calculate momentum (IG only, based on 7-day trend)
  let momentum = "stable";
  let momentumIcon = "➡️";
  let momentumColor = "#6366f1";
  if (platform === "ig" && key in igHistory) {
    momentum = calculateMomentum(igHistory[key]);
    if (momentum === "up") {
      momentumIcon = "🔥";
      momentumColor = "#ef4444";
    } else if (momentum === "down") {
      momentumIcon = "⚠️";
      momentumColor = "#f59e0b";
    }
  }

  if (!data) return (
    <div onClick={onClick} style={{
      background: isSelected ? "#1e293b" : "#0f172a",
      border: `2px solid ${isSelected ? COLORS.accent : COLORS.cardBorder}`,
      borderRadius: 14,
      padding: "14px 16px",
      cursor: "pointer",
      opacity: 0.5,
      transition: "all 0.2s",
    }}>
      <div style={{ fontWeight: 700, fontSize: 13, color: COLORS.text }}>{acc.name}</div>
      <div style={{ color: COLORS.textMuted, fontSize: 12, marginTop: 4 }}>Tidak tersedia di TikTok</div>
    </div>
  );

  return (
    <div onClick={onClick} style={{
      background: isOurs ? (isSelected ? "#422006" : "#1c1306") : (isSelected ? "#1e293b" : "#0f172a"),
      border: `2px solid ${isOurs ? COLORS.oursBorder : (isSelected ? COLORS.accent : COLORS.cardBorder)}`,
      borderRadius: 14,
      padding: "14px 16px",
      cursor: "pointer",
      transition: "all 0.2s",
      minWidth: 0,
      boxShadow: isOurs ? "0 0 16px rgba(245, 158, 11, 0.15)" : "none",
      position: "relative",
    }}>
      {/* Momentum Badge (top-right) */}
      {platform === "ig" && (
        <div style={{
          position: "absolute",
          top: -8,
          right: -8,
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: `${momentumColor}22`,
          border: `2px solid ${momentumColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          zIndex: 2,
          boxShadow: `0 0 8px ${momentumColor}44`,
        }}>
          {momentumIcon}
        </div>
      )}

      {/* Rank badge */}
      {rank && (
        <div style={{
          position: "absolute",
          top: -10,
          left: -10,
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: rank <= 3 ? (rank === 1 ? "#854d0e" : rank === 2 ? "#374151" : "#78350f") : "#1e293b",
          border: `2px solid ${rankColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: rankEmoji ? 14 : 12,
          fontWeight: 800,
          color: rankColor,
          zIndex: 2,
          boxShadow: rank <= 3 ? `0 0 8px ${rankColor}44` : "none",
        }}>
          {rankEmoji || `#${rank}`}
        </div>
      )}
      {isOurs && (
        <div style={{
          position: "absolute",
          top: -1,
          left: -1,
          right: -1,
          height: 3,
          background: "linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b)",
          borderRadius: "14px 14px 0 0",
        }} />
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontWeight: 700, fontSize: 13, color: isOurs ? "#fbbf24" : COLORS.text }}>
          {isOurs ? "⭐ " : ""}{acc.name}
        </span>
        <GradeBadge grade={data.grade} />
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, color: isOurs ? "#fef3c7" : COLORS.text }}>{formatNum(data.followers)}</div>
      <div style={{ marginTop: 4 }}><ChangeIndicator value={data.change} /></div>
      {platform === "ig" && data.engagement !== undefined && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
          <span style={{ fontSize: 11, color: isOurs ? "#fcd34d" : COLORS.textMuted }}>
            Engagement: {data.engagement}%
          </span>
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            color: data.dailyPosts > 0 ? COLORS.positive : (isOurs ? "#fcd34d" : COLORS.textMuted),
            background: data.dailyPosts > 0 ? "rgba(34, 197, 94, 0.12)" : "transparent",
            padding: data.dailyPosts > 0 ? "1px 6px" : 0,
            borderRadius: 4,
          }}>
            📝 {data.dailyPosts > 0 ? `+${data.dailyPosts} post` : "0 post"}
          </span>
        </div>
      )}
      {platform === "tiktok" && data.likes && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
          <span style={{ fontSize: 11, color: isOurs ? "#fcd34d" : COLORS.textMuted }}>
            Total Likes: {data.likes}
          </span>
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            color: data.dailyPosts > 0 ? COLORS.positive : (isOurs ? "#fcd34d" : COLORS.textMuted),
            background: data.dailyPosts > 0 ? "rgba(34, 197, 94, 0.12)" : "transparent",
            padding: data.dailyPosts > 0 ? "1px 6px" : 0,
            borderRadius: 4,
          }}>
            🎬 {data.dailyPosts > 0 ? `+${data.dailyPosts} video` : "0 video"}
          </span>
        </div>
      )}
    </div>
  );
};

// === INSIGHT ANALYZER ===
const InsightCards = ({ period = "today" }) => {
  // Helpers
  const getIgChange = (key) => period === "yesterday" ? (igDataYesterday[key]?.change ?? 0) : (igData[key]?.change ?? 0);
  const getTtChange = (key) => period === "yesterday" ? (tiktokDataYesterday[key]?.change ?? 0) : (tiktokData[key]?.change ?? 0);

  // 1. Top Grower (IG)
  const topGrower = Object.keys(igData).reduce((best, key) => {
    const change = getIgChange(key);
    return change > best.change ? { key, change, name: accounts.find(a => a.ig === key)?.name } : best;
  }, { key: null, change: -Infinity, name: "" });

  // 2. Most Posts (IG)
  const mostPoster = period === "yesterday"
    ? Object.entries(igDataYesterday).reduce((best, [key, data]) =>
        data.dailyPosts > best.posts ? { key, posts: data.dailyPosts, name: accounts.find(a => a.ig === key)?.name } : best
      , { key: null, posts: 0, name: "" })
    : Object.entries(igData).reduce((best, [key, data]) =>
        data.dailyPosts > best.posts ? { key, posts: data.dailyPosts, name: accounts.find(a => a.ig === key)?.name } : best
      , { key: null, posts: 0, name: "" });

  // 3. Highest Engagement
  const highestEng = Object.entries(igData).reduce((best, [key, data]) => {
    const eng = data.engagement;
    return eng > best.eng ? { key, eng, name: accounts.find(a => a.ig === key)?.name } : best;
  }, { key: null, eng: 0, name: "" });

  // 4. JADIASN Analysis
  const oursIgChange = getIgChange(OUR_ACCOUNT);
  const oursPosts = period === "yesterday" ? igDataYesterday[OUR_ACCOUNT]?.dailyPosts : igData[OUR_ACCOUNT]?.dailyPosts;
  const oursEng = igData[OUR_ACCOUNT]?.engagement;

  // 5. Growth vs Posts Correlation Analysis
  const topGrowerPosts = period === "yesterday"
    ? igDataYesterday[topGrower.key]?.dailyPosts
    : igData[topGrower.key]?.dailyPosts;

  // Calculate growth per post efficiency (untuk semua akun)
  const growthPerPost = Object.keys(igData).map(key => {
    const posts = period === "yesterday" ? (igDataYesterday[key]?.dailyPosts || 0) : (igData[key]?.dailyPosts || 0);
    const growth = getIgChange(key);
    return {
      key,
      name: accounts.find(a => a.ig === key)?.name,
      posts,
      growth,
      efficiency: posts > 0 ? Math.round((growth / posts) * 100) / 100 : 0, // growth per post
    };
  }).filter(x => x.posts > 0);

  // Sort by efficiency
  const efficiencySorted = [...growthPerPost].sort((a, b) => b.efficiency - a.efficiency);
  const topEfficiency = efficiencySorted[0];
  const oursEfficiency = growthPerPost.find(x => x.key === OUR_ACCOUNT);

  // Calculate correlation: Is posting MORE = growth MORE?
  const postGrowthCorrelation = (() => {
    if (growthPerPost.length < 2) return null;
    // If top grower has low posts, quality matters more than quantity
    if (topGrowerPosts <= 1 && topGrower.change > 300) return "quality";
    // If top poster has low growth, quantity doesn't guarantee growth
    if (mostPoster.posts > 5 && getIgChange(mostPoster.key) < 200) return "quantity_fails";
    return null;
  })();

  const insights = [];

  // 1. Hot Trending
  if (topGrower.change > 400) {
    insights.push({
      type: "hot",
      icon: "🔥",
      title: `${topGrower.name} sedang trending!`,
      detail: `Growth +${topGrower.change} followers (tertinggi hari ini)`,
      color: "#ef4444",
    });
  }

  // 2. CORRELATION INSIGHT: Posting vs Growth Analysis
  if (postGrowthCorrelation === "quality") {
    insights.push({
      type: "warning",
      icon: "📊",
      title: "⚡ Posting banyak ≠ Growth besar",
      detail: `${topGrower.name}: ${topGrowerPosts} post → +${topGrower.change} growth (efficiency: +${topGrower.change}). Kualitas > Kuantitas`,
      color: "#8b5cf6",
      table: growthPerPost.slice(0, 3).map(x => `${x.name}: ${x.posts} post = +${x.growth} growth (${x.efficiency}/post)`),
    });
  }

  if (postGrowthCorrelation === "quantity_fails") {
    insights.push({
      type: "warning",
      icon: "⚠️",
      title: "Posting banyak tapi growth kecil",
      detail: `${mostPoster.name}: ${mostPoster.posts} posts → +${getIgChange(mostPoster.key)} growth saja. Perlu content quality improvement`,
      color: "#f59e0b",
    });
  }

  // 3. EFFICIENCY INSIGHT: Growth Per Post
  if (oursEfficiency && topEfficiency && oursEfficiency.key !== topEfficiency.key) {
    const efficiencyGap = topEfficiency.efficiency - oursEfficiency.efficiency;
    if (efficiencyGap > 0.2) {
      insights.push({
        type: "opportunity",
        icon: "📈",
        title: `${topEfficiency.name} paling efisien: +${topEfficiency.efficiency}/post`,
        detail: `JADIASN: +${oursEfficiency?.efficiency || 0}/post. Gap: +${efficiencyGap}/post → tiru content strategy mereka`,
        color: "#6366f1",
      });
    }
  }

  // 4. High Engagement
  if (highestEng.eng > 0.7 && highestEng.key !== OUR_ACCOUNT) {
    insights.push({
      type: "opportunity",
      icon: "💡",
      title: `${highestEng.name} engagement tinggi: ${highestEng.eng}%`,
      detail: "Potensi viral tinggi → analisis & tiru konten mereka",
      color: "#6366f1",
    });
  }

  // 5. Top Quality Performer
  if (topEfficiency && topEfficiency.efficiency > 100) {
    insights.push({
      type: "opportunity",
      icon: "⭐",
      title: `${topEfficiency.name} master content quality`,
      detail: `Setiap post → +${topEfficiency.efficiency} followers. Tiru posting style & timing mereka`,
      color: "#14b8a6",
    });
  }

  if (insights.length === 0) {
    return null;
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <h3 style={{ color: COLORS.text, fontSize: 14, fontWeight: 700, marginBottom: 12, marginTop: 0, textTransform: "uppercase", letterSpacing: 1 }}>
        📊 Auto Insights ({period === "yesterday" ? "Kemarin" : "Hari Ini"})
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 12 }}>
        {insights.map((insight, i) => (
          <Card key={i} style={{
            borderLeft: `4px solid ${insight.color}`,
            background: `linear-gradient(135deg, ${insight.color}11 0%, transparent 100%)`,
          }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: insight.table ? 12 : 0 }}>
              <div style={{ fontSize: 24, flexShrink: 0 }}>{insight.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, marginBottom: 4 }}>
                  {insight.title}
                </div>
                <div style={{ fontSize: 12, color: COLORS.textMuted }}>
                  {insight.detail}
                </div>
              </div>
            </div>
            {insight.table && (
              <div style={{ paddingTop: 8, borderTop: `1px solid ${COLORS.cardBorder}`, marginTop: 8 }}>
                <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: "monospace" }}>
                  {insight.table.map((row, j) => (
                    <div key={j} style={{ marginTop: j > 0 ? 4 : 0 }}>
                      {row}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

// Helper: Calculate momentum from 3-day trend
const calculateMomentum = (historyData = null) => {
  if (!historyData || historyData.length < 6) {
    return "stable"; // Not enough data
  }

  // Calculate daily growth for last 3 days
  const dailyGrowth3d = [];
  for (let i = historyData.length - 3; i < historyData.length; i++) {
    if (i > 0) {
      const growth = historyData[i].f - historyData[i - 1].f;
      dailyGrowth3d.push(growth);
    }
  }

  // Calculate daily growth for previous 3 days (days 3-6)
  const dailyGrowthPrev3d = [];
  for (let i = Math.max(0, historyData.length - 6); i < historyData.length - 3; i++) {
    if (i > 0) {
      const growth = historyData[i].f - historyData[i - 1].f;
      dailyGrowthPrev3d.push(growth);
    }
  }

  if (dailyGrowth3d.length === 0 || dailyGrowthPrev3d.length === 0) {
    return "stable";
  }

  // Calculate averages
  const avg3d = dailyGrowth3d.reduce((a, b) => a + b, 0) / dailyGrowth3d.length;
  const avgPrev3d = dailyGrowthPrev3d.reduce((a, b) => a + b, 0) / dailyGrowthPrev3d.length;

  // Determine momentum
  const tolerance = avgPrev3d * 0.15; // 15% tolerance for 3-day window

  if (avg3d > avgPrev3d + tolerance) {
    return "up";
  } else if (avg3d < avgPrev3d - tolerance) {
    return "down";
  } else {
    return "stable";
  }
};

const MomentumPanel = ({ period = "today" }) => {
  // Helper function to calculate 3-day momentum data
  const calculateMomentumData = (historyObj) => {
    return Object.keys(historyObj || {})
      .map(key => {
        const history = historyObj[key] || [];
        const momentum = calculateMomentum(history);

        // Calculate 3-day averages for display
        const dailyGrowth3d = [];
        for (let i = Math.max(0, history.length - 3); i < history.length; i++) {
          if (i > 0) {
            dailyGrowth3d.push(history[i].f - history[i - 1].f);
          }
        }
        const avg3d = dailyGrowth3d.length > 0 ? Math.round(dailyGrowth3d.reduce((a, b) => a + b, 0) / dailyGrowth3d.length) : 0;

        // Calculate previous 3-day average
        const dailyGrowthPrev3d = [];
        for (let i = Math.max(0, history.length - 6); i < history.length - 3; i++) {
          if (i > 0) {
            dailyGrowthPrev3d.push(history[i].f - history[i - 1].f);
          }
        }
        const avgPrev3d = dailyGrowthPrev3d.length > 0 ? Math.round(dailyGrowthPrev3d.reduce((a, b) => a + b, 0) / dailyGrowthPrev3d.length) : 0;

        const change = avg3d - avgPrev3d;
        const changePercent = avgPrev3d !== 0 ? Math.round((change / Math.abs(avgPrev3d)) * 100) : 0;

        return {
          key,
          name: accounts.find(a => a.ig === key || a.tiktok === key)?.name,
          avg3d,
          avgPrev3d,
          change,
          changePercent,
          momentum,
          isOurs: accounts.find(a => a.ig === key || a.tiktok === key)?.ours,
        };
      })
      .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent));
  };

  // IG MOMENTUM
  const igMomentumData = calculateMomentumData(igHistory);
  const igUpMomentum = igMomentumData.filter(x => x.momentum === "up");
  const igDownMomentum = igMomentumData.filter(x => x.momentum === "down");
  const igStableMomentum = igMomentumData.filter(x => x.momentum === "stable");

  // TT MOMENTUM
  const ttMomentumData = calculateMomentumData(tiktokHistory || {});
  const ttUpMomentum = ttMomentumData.filter(x => x.momentum === "up");
  const ttDownMomentum = ttMomentumData.filter(x => x.momentum === "down");
  const ttStableMomentum = ttMomentumData.filter(x => x.momentum === "stable");

  const getMomentumIcon = (status) => {
    switch(status) {
      case "up": return "🔥";
      case "down": return "⚠️";
      default: return "➡️";
    }
  };

  const getMomentumColor = (status) => {
    switch(status) {
      case "up": return "#ef4444";
      case "down": return "#f59e0b";
      default: return "#6366f1";
    }
  };

  const getMomentumLabel = (status) => {
    switch(status) {
      case "up": return "NAIK";
      case "down": return "TURUN";
      default: return "STABIL";
    }
  };

  // Get color based on growth level
  const getGrowthLevelColor = (growth, average) => {
    if (growth <= 0) return "#ef4444"; // Red = Negative/Declining
    if (growth >= average * 1.2) return "#10b981"; // Green = High growth (120%+ of avg)
    if (growth >= average * 0.8) return "#eab308"; // Yellow = Medium growth (80-120% of avg)
    return "#ef4444"; // Red = Low growth (below 80%)
  };

  const renderMomentumSection = (title, icon, color, momentumData) => {
    // Get history data based on title
    const historyData = title === "Instagram" ? igHistory : tiktokHistory;

    // Helper to extract last 3 days daily growth
    const getLast3DaysTrend = (key) => {
      const history = historyData[key];
      if (!history || history.length < 4) return null;

      const last3Days = [];
      // Skip today's incomplete data, get only 3 completed days (h-1, h-2, h-3)
      for (let i = Math.max(0, history.length - 4); i < history.length - 1; i++) {
        if (i > 0) {
          const growth = history[i].f - history[i - 1].f;
          last3Days.push({
            date: history[i].date,
            growth: growth
          });
        }
      }
      return last3Days.length >= 3 ? last3Days : null;
    };

    // Separate JADIASN from others
    const jadiasn = momentumData.find(x => x.isOurs);
    const others = momentumData.filter(x => !x.isOurs);

    // Organize others by momentum status (sorted by change within each group)
    const upAccounts = others.filter(x => x.momentum === "up").sort((a, b) => b.change - a.change).slice(0, 2);
    const stableAccounts = others.filter(x => x.momentum === "stable").sort((a, b) => b.change - a.change).slice(0, 2);
    const downAccounts = others.filter(x => x.momentum === "down").sort((a, b) => b.change - a.change).slice(0, 2);

    const renderAccountCard = (m) => {
      const momColor = getMomentumColor(m.momentum);
      const trend = getLast3DaysTrend(m.key);

      return (
        <div key={m.key} style={{
          background: `linear-gradient(135deg, ${momColor}11 0%, transparent 100%)`,
          border: `1px solid ${momColor}33`,
          borderRadius: 8,
          padding: 12,
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.text, marginBottom: 2 }}>
                {m.name}
              </div>
              <div style={{ fontSize: 10, color: COLORS.textMuted }}>
                <span style={{ color: getGrowthLevelColor(m.avg3d, m.avgPrev3d), fontWeight: 600 }}>
                  Avg Last 3d: +{m.avg3d}
                </span>
                {" | "}
                <span style={{ color: getGrowthLevelColor(m.avgPrev3d, m.avgPrev3d) }}>
                  Avg Prev 3d: +{m.avgPrev3d}
                </span>
              </div>
            </div>
            <div style={{ fontSize: 18 }}>{getMomentumIcon(m.momentum)}</div>
          </div>

          {/* Last 3 Days Daily Breakdown with Color Levels */}
          {trend && (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 6,
              marginBottom: 10,
              padding: "8px 0",
              borderBottom: `1px solid ${momColor}33`,
            }}>
              {trend.map((day, idx) => {
                const growthColor = getGrowthLevelColor(day.growth, m.avg3d);
                return (
                  <div key={idx} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 9, color: COLORS.textMuted, marginBottom: 2 }}>
                      {day.date.split(" ")[1]}
                    </div>
                    <div style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: growthColor,
                    }}>
                      +{day.growth}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            paddingTop: 8,
            fontSize: 12,
            fontWeight: 700,
          }}>
            <div style={{ color: momColor }}>
              {getMomentumLabel(m.momentum)}
            </div>
            <div style={{ color: m.change > 0 ? "#10b981" : "#ef4444", marginLeft: "auto" }}>
              {m.change > 0 ? "+" : ""}{m.change}/day avg
            </div>
          </div>
        </div>
      );
    };

    return (
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 28 }}>{icon}</span>
          <h3 style={{ color: COLORS.text, fontSize: 14, fontWeight: 700, marginTop: 0, marginBottom: 0, textTransform: "uppercase" }}>
            {title} Momentum
          </h3>
        </div>

        {/* Summary Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
          <div style={{
            background: "linear-gradient(135deg, #ef444411 0%, transparent 100%)",
            border: "1px solid #ef4444",
            borderRadius: 8,
            padding: 12,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>🔥</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#ef4444", marginBottom: 2 }}>
              {momentumData.filter(x => x.momentum === "up").length}
            </div>
            <div style={{ fontSize: 10, color: COLORS.textMuted }}>NAIK</div>
          </div>

          <div style={{
            background: "linear-gradient(135deg, #6366f111 0%, transparent 100%)",
            border: "1px solid #6366f1",
            borderRadius: 8,
            padding: 12,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>➡️</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#6366f1", marginBottom: 2 }}>
              {momentumData.filter(x => x.momentum === "stable").length}
            </div>
            <div style={{ fontSize: 10, color: COLORS.textMuted }}>STABIL</div>
          </div>

          <div style={{
            background: "linear-gradient(135deg, #f59e0b11 0%, transparent 100%)",
            border: "1px solid #f59e0b",
            borderRadius: 8,
            padding: 12,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>⚠️</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#f59e0b", marginBottom: 2 }}>
              {momentumData.filter(x => x.momentum === "down").length}
            </div>
            <div style={{ fontSize: 10, color: COLORS.textMuted }}>TURUN</div>
          </div>
        </div>

        {/* JADIASN Highlight - Always at Top */}
        {jadiasn && (
          <div key={jadiasn.key} style={{
            background: "linear-gradient(135deg, #f59e0b22 0%, #f59e0b11 50%, transparent 100%)",
            border: "2px solid #f59e0b",
            borderRadius: 10,
            padding: 14,
            marginBottom: 16,
            boxShadow: "0 0 16px rgba(245, 158, 11, 0.15)",
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fbbf24", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                  ⭐ {jadiasn.name}
                </div>
                <div style={{ fontSize: 11, color: COLORS.textMuted }}>
                  Last 3d: +{jadiasn.avg3d} | Prev 3d: +{jadiasn.avgPrev3d}
                </div>
              </div>
              <div style={{ fontSize: 20 }}>{getMomentumIcon(jadiasn.momentum)}</div>
            </div>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              paddingTop: 10,
              borderTop: "1px solid #f59e0b33",
              fontSize: 13,
              fontWeight: 700,
            }}>
              <div style={{ color: "#f59e0b" }}>
                {getMomentumLabel(jadiasn.momentum)}
              </div>
              <div style={{ color: jadiasn.change > 0 ? "#10b981" : "#ef4444", marginLeft: "auto" }}>
                {jadiasn.change > 0 ? "+" : ""}{jadiasn.change}/day
              </div>
            </div>
          </div>
        )}

        {/* UP Accounts - Section 1 */}
        {upAccounts.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#ef4444", marginBottom: 10, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6 }}>
              🔥 Momentum NAIK ({upAccounts.length})
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
              {upAccounts.map(renderAccountCard)}
            </div>
          </div>
        )}

        {/* STABIL Accounts - Section 2 */}
        {stableAccounts.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#6366f1", marginBottom: 10, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6 }}>
              ➡️ Momentum STABIL ({stableAccounts.length})
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
              {stableAccounts.map(renderAccountCard)}
            </div>
          </div>
        )}

        {/* DOWN Accounts - Section 3 */}
        {downAccounts.length > 0 && (
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#f59e0b", marginBottom: 10, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6 }}>
              ⚠️ Momentum TURUN ({downAccounts.length})
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
              {downAccounts.map(renderAccountCard)}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Generate insight: Who's UP/STABIL when others DOWN
  const generateContraTrendInsight = (igData, ttData) => {
    const getWinners = (data) => {
      const upStabil = data.filter(x => x.momentum === "up" || x.momentum === "stable");
      const down = data.filter(x => x.momentum === "down");

      if (down.length === 0 || upStabil.length === 0) return null;

      // Focus on those with highest growth/efficiency
      const topWinners = upStabil.sort((a, b) => b.change - a.change).slice(0, 2);

      return {
        total: data.length,
        downCount: down.length,
        upCount: upStabil.filter(x => x.momentum === "up").length,
        stableCount: upStabil.filter(x => x.momentum === "stable").length,
        topWinners: topWinners,
        hasJADIASN: topWinners.some(x => x.isOurs)
      };
    };

    const igInsight = getWinners(igMomentumData);
    const ttInsight = getWinners(ttMomentumData);

    return { ig: igInsight, tt: ttInsight };
  };

  const contraTrendInsight = generateContraTrendInsight(igMomentumData, ttMomentumData);
  const hasSignificantInsight = (contraTrendInsight.ig?.downCount >= 3 && contraTrendInsight.ig?.upCount >= 1) ||
                                  (contraTrendInsight.tt?.downCount >= 2 && contraTrendInsight.tt?.upCount >= 1);

  return (
    <Card style={{
      marginBottom: 24,
      background: "linear-gradient(135deg, #0f172a 0%, #1a1a2e22 50%, transparent 100%)",
      border: "2px solid #10b981",
      boxShadow: "0 0 20px rgba(16, 185, 129, 0.1)",
    }}>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ color: COLORS.text, fontSize: 15, fontWeight: 700, marginTop: 0, marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
          ⚡ <span>Momentum Indicator (3-Day Trend)</span>
        </h3>
        <div style={{ fontSize: 12, color: COLORS.textMuted }}>
          Analisis perubahan momentum: Last 3 Days vs Previous 3 Days
        </div>
      </div>

      {/* Contra-Trend Insight */}
      {hasSignificantInsight && (
        <div style={{
          background: "linear-gradient(135deg, #14b98122 0%, #10b98111 50%, transparent 100%)",
          border: "2px solid #14b981",
          borderRadius: 10,
          padding: 16,
          marginBottom: 20,
          boxShadow: "0 0 20px rgba(20, 184, 129, 0.1)",
        }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
            <div style={{ fontSize: 28, flexShrink: 0 }}>🎯</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#14b981", marginBottom: 8 }}>
                Exceptional Momentum: Rising When Market Declines
              </div>
              <div style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.6 }}>
                {contraTrendInsight.ig?.downCount >= 3 && contraTrendInsight.ig?.upCount >= 1 && (
                  <div>
                    📸 <strong>Instagram:</strong> {contraTrendInsight.ig.topWinners.map(w => w.name).join(", ")}
                    {contraTrendInsight.ig.hasJADIASN && " (including JADIASN!)"} showing {contraTrendInsight.ig.upCount > 0 ? "📈 UP" : "➡️ STABIL"} momentum while {contraTrendInsight.ig.downCount} others declining.
                  </div>
                )}
                {contraTrendInsight.tt?.downCount >= 2 && contraTrendInsight.tt?.upCount >= 1 && (
                  <div style={{ marginTop: 8 }}>
                    🎵 <strong>TikTok:</strong> {contraTrendInsight.tt.topWinners.map(w => w.name).join(", ")}
                    {contraTrendInsight.tt.hasJADIASN && " (including JADIASN!)"} showing {contraTrendInsight.tt.upCount > 0 ? "📈 UP" : "➡️ STABIL"} momentum while {contraTrendInsight.tt.downCount} others declining.
                  </div>
                )}
              </div>
              <div style={{ fontSize: 11, color: "#14b981", marginTop: 10, fontWeight: 600 }}>
                💡 Action: Scale these winning strategies immediately - they're proven to work against the trend
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div>
          {renderMomentumSection("Instagram", "📸", COLORS.ig, igMomentumData)}
        </div>
        <div>
          {renderMomentumSection("TikTok", "🎵", COLORS.tiktok, ttMomentumData)}
        </div>
      </div>
    </Card>
  );
};

const MarketSharePanel = () => {
  // Calculate market share based on GROWTH (change in followers), separated by platform

  // INSTAGRAM GROWTH SHARE
  const igTotalGrowth = Object.values(igData).reduce((sum, d) => sum + (d?.change || 0), 0);
  const igMarketShare = Object.keys(igData)
    .map(key => {
      const growth = igData[key]?.change || 0;
      const percentage = igTotalGrowth > 0 ? (growth / igTotalGrowth * 100) : 0;
      return {
        key,
        name: accounts.find(a => a.ig === key)?.name,
        growth,
        percentage: Math.round(percentage * 10) / 10,
        isOurs: key === OUR_ACCOUNT,
      };
    })
    .sort((a, b) => b.growth - a.growth);

  const oursIgShare = igMarketShare.find(x => x.isOurs);
  const topIgShare = igMarketShare.slice(0, 5);
  const igPieData = igMarketShare.map(x => ({ name: x.name, value: x.percentage }));

  // TIKTOK GROWTH SHARE
  const ttTotalGrowth = Object.entries(tiktokData)
    .filter(([, d]) => d != null)
    .reduce((sum, [, d]) => sum + (d?.change || 0), 0);

  const ttMarketShare = Object.keys(tiktokData)
    .map(key => {
      const data = tiktokData[key];
      if (!data) return null;
      const growth = data?.change || 0;
      const percentage = ttTotalGrowth > 0 ? (growth / ttTotalGrowth * 100) : 0;
      return {
        key,
        name: accounts.find(a => a.tiktok === key)?.name,
        growth,
        percentage: Math.round(percentage * 10) / 10,
        isOurs: key === OUR_ACCOUNT,
      };
    })
    .filter(x => x != null)
    .sort((a, b) => b.growth - a.growth);

  const oursTtShare = ttMarketShare.find(x => x.isOurs);
  const topTtShare = ttMarketShare.slice(0, 5);
  const ttPieData = ttMarketShare.map(x => ({ name: x.name, value: x.percentage }));

  const renderMarketPanel = (title, icon, totalGrowth, oursShare, topShare, pieData, color, bgColor) => (
    <div style={{
      background: `linear-gradient(135deg, ${bgColor}11 0%, transparent 100%)`,
      border: `1px solid ${bgColor}33`,
      borderRadius: 12,
      padding: 16,
      marginBottom: 20,
      overflow: "hidden",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <h3 style={{ color: COLORS.text, fontSize: 13, fontWeight: 700, marginTop: 0, marginBottom: 0, textTransform: "uppercase" }}>
          {title}
        </h3>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Key Metrics */}
        <div>
          <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 4, textTransform: "uppercase", fontWeight: 600 }}>
            Total Market Size
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color, marginBottom: 8 }}>
            +{totalGrowth.toLocaleString()}
          </div>
          <div style={{ fontSize: 11, color: COLORS.textMuted }}>
            Total followers growth today
          </div>

          {oursShare && (
            <div style={{
              marginTop: 12,
              paddingTop: 12,
              padding: 12,
              borderTop: `1px solid ${bgColor}33`,
              background: `linear-gradient(135deg, #f59e0b11 0%, transparent 100%)`,
              border: `2px solid #f59e0b66`,
              borderRadius: 8,
              marginLeft: -4,
              marginRight: -4,
              marginTop: 16,
              paddingLeft: 12,
              paddingRight: 12,
            }}>
              <div style={{ fontSize: 11, color: "#f59e0b", marginBottom: 4, textTransform: "uppercase", fontWeight: 700 }}>
                ⭐ JADIASN Market Share
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#f59e0b", marginBottom: 2 }}>
                {oursShare.percentage}%
              </div>
              <div style={{ fontSize: 11, color: COLORS.text }}>
                +{oursShare.growth} followers
              </div>
            </div>
          )}
        </div>

        {/* Top Performers */}
        <div>
          <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 8, textTransform: "uppercase", fontWeight: 600 }}>
            Top Growth
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {topShare.slice(0, 3).map((share, i) => (
              <div key={share.key} style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "6px 8px",
                background: share.isOurs ? `${bgColor}22` : "transparent",
                borderRadius: 4,
              }}>
                <div style={{ fontSize: 11, color: COLORS.text, fontWeight: share.isOurs ? 600 : 400 }}>
                  {share.name}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color }}>
                  {share.percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Small Pie Chart */}
      <ResponsiveContainer width="100%" height={200}>
        <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <Pie
            data={pieData}
            cx="40%"
            cy="50%"
            labelLine={true}
            label={(entry) => {
              if (entry.value > 3) {
                return `${entry.name}: ${entry.value}%`;
              }
              return null;
            }}
            outerRadius={50}
            fill="#8884d8"
            dataKey="value"
            labelStyle={{ fill: "#f8fafc", fontSize: 12, fontWeight: 600 }}
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.name === "JADIASN" ? color : (index % 2 === 0 ? COLORS.accent : COLORS.ig)}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value}%`, 'Share']}
            contentStyle={{
              background: COLORS.cardBg,
              border: `1px solid ${COLORS.cardBorder}`,
              borderRadius: 6,
              color: COLORS.text,
              padding: 10,
              fontSize: 12,
              fontWeight: 600
            }}
            labelStyle={{ color: COLORS.text }}
            cursor={{ fill: 'transparent' }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div style={{ marginTop: 16, paddingTop: 12, borderTop: `1px solid ${bgColor}33` }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.text, marginBottom: 8, textTransform: "uppercase" }}>
          Market Share Breakdown
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {pieData.map((entry, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11 }}>
              <div style={{
                width: 12,
                height: 12,
                borderRadius: 2,
                background: entry.name === "JADIASN" ? color : (index % 2 === 0 ? COLORS.accent : COLORS.ig),
                flexShrink: 0
              }} />
              <div style={{ color: COLORS.text }}>
                {entry.name}: <span style={{ fontWeight: 700, color }}>{entry.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Card style={{
      marginBottom: 24,
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e22 50%, transparent 100%)",
      border: "2px solid #14b8a6",
      boxShadow: "0 0 20px rgba(20, 184, 166, 0.1)",
    }}>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ color: COLORS.text, fontSize: 15, fontWeight: 700, marginTop: 0, marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
          👑 <span>Growth Market Share (Hari Ini)</span>
        </h3>
        <div style={{ fontSize: 12, color: COLORS.textMuted }}>
          Porsi growth followers dari total market CPNS bimbel
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {renderMarketPanel(
          "Instagram Growth",
          "📸",
          igTotalGrowth,
          oursIgShare,
          topIgShare,
          igPieData,
          COLORS.ig,
          COLORS.ig
        )}
        {renderMarketPanel(
          "TikTok Growth",
          "🎵",
          ttTotalGrowth,
          oursTtShare,
          topTtShare,
          ttPieData,
          COLORS.tiktok,
          COLORS.tiktok
        )}
      </div>
    </Card>
  );
};

const OpportunitiesPanel = ({ period = "today" }) => {
  const getIgChange = (key) => period === "yesterday" ? (igDataYesterday[key]?.change ?? 0) : (igData[key]?.change ?? 0);
  const getTtChange = (key) => {
    if (!tiktokData[key]) return null;
    return period === "yesterday" ? (tiktokDataYesterday[key]?.change ?? 0) : (tiktokData[key]?.change ?? 0);
  };

  // Analyze all IG accounts for opportunities
  const opportunities = [];

  // 1. HIGH ENGAGEMENT + LOW POSTS = "PUSH POSTING"
  const highEngagementLowPosts = Object.keys(igData)
    .map(key => {
      const posts = period === "yesterday" ? (igDataYesterday[key]?.dailyPosts || 0) : (igData[key]?.dailyPosts || 0);
      const eng = igData[key]?.engagement || 0;
      const growth = getIgChange(key);
      return {
        key,
        name: accounts.find(a => a.ig === key)?.name,
        posts,
        engagement: eng,
        growth,
        score: eng * 100, // Higher engagement is the priority
      };
    })
    .filter(x => x.engagement > 0.4 && x.posts <= 1) // High engagement but NOT posting much
    .sort((a, b) => b.score - a.score);

  if (highEngagementLowPosts.length > 0) {
    const top = highEngagementLowPosts[0];
    opportunities.push({
      type: "push",
      emoji: "🚀",
      title: `${top.name} engagement tinggi`,
      metric: `${top.engagement}% engagement`,
      action: "→ PUSH POSTING",
      detail: `Dengan engagement ${top.engagement}%, mereka punya potensi viral tinggi. Naikkan posting frequency untuk maksimalkan reach.`,
      color: "#f59e0b",
      priority: 1,
    });
  }

  // 2. CONSISTENT/HIGH GROWTH = "SCALE"
  const highGrowth = Object.keys(igData)
    .map(key => {
      const growth = getIgChange(key);
      const posts = period === "yesterday" ? (igDataYesterday[key]?.dailyPosts || 0) : (igData[key]?.dailyPosts || 0);
      const eng = igData[key]?.engagement || 0;
      return {
        key,
        name: accounts.find(a => a.ig === key)?.name,
        growth,
        posts,
        engagement: eng,
        score: growth, // Growth is the metric
      };
    })
    .filter(x => x.growth > 250) // Significant growth
    .sort((a, b) => b.score - a.score);

  if (highGrowth.length > 0) {
    const top = highGrowth[0];
    opportunities.push({
      type: "scale",
      emoji: "📈",
      title: `${top.name} growth stabil tinggi`,
      metric: `+${top.growth} followers`,
      action: "→ SCALE",
      detail: `Dengan pertumbuhan +${top.growth} followers, strategi mereka TERBUKTI efektif. Tiru content strategy & scale posting.`,
      color: "#10b981",
      priority: 2,
    });
  }

  // 3. HIGH POSTS BUT LOWER EFFICIENCY = "OPTIMIZE QUALITY"
  const highPostsLowEng = Object.keys(igData)
    .map(key => {
      const posts = period === "yesterday" ? (igDataYesterday[key]?.dailyPosts || 0) : (igData[key]?.dailyPosts || 0);
      const growth = getIgChange(key);
      const eng = igData[key]?.engagement || 0;
      const efficiency = posts > 0 ? growth / posts : 0;
      return {
        key,
        name: accounts.find(a => a.ig === key)?.name,
        posts,
        growth,
        engagement: eng,
        efficiency,
        score: posts, // Posting frequency is the metric
      };
    })
    .filter(x => x.posts >= 3 && x.efficiency < 50) // Posting a lot but low efficiency
    .sort((a, b) => b.score - a.score);

  if (highPostsLowEng.length > 0) {
    const top = highPostsLowEng[0];
    opportunities.push({
      type: "quality",
      emoji: "✨",
      title: `${top.name} posting banyak`,
      metric: `${top.posts} posts, +${top.growth} growth`,
      action: "→ OPTIMASI KUALITAS",
      detail: `Posting ${top.posts}x tapi hanya +${top.growth} growth. Fokus pada content quality & relevance untuk meningkatkan efficiency.`,
      color: "#8b5cf6",
      priority: 3,
    });
  }

  // If we don't have exactly 3, add more diverse opportunities
  if (opportunities.length < 3) {
    // Find TikTok growing account
    const ttGrowth = Object.entries(tiktokData)
      .filter(([, d]) => d != null)
      .map(([key, d]) => ({
        key,
        name: accounts.find(a => a.tiktok === key)?.name,
        growth: getTtChange(key) || 0,
      }))
      .filter(x => x.growth > 200)
      .sort((a, b) => b.growth - a.growth);

    if (ttGrowth.length > 0 && !opportunities.find(o => o.key === ttGrowth[0].key)) {
      opportunities.push({
        type: "crossplatform",
        emoji: "🎵",
        title: `${ttGrowth[0].name} TikTok trending`,
        metric: `+${ttGrowth[0].growth} followers`,
        action: "→ REPURPOSE CONTENT",
        detail: `Success di TikTok: +${ttGrowth[0].growth}. Repurpose best performing content ke Instagram Reels.`,
        color: "#06b6d4",
        priority: 4,
      });
    }
  }

  // Sort by priority and take top 3
  const topOpportunities = opportunities
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 3);

  if (topOpportunities.length === 0) {
    return null;
  }

  return (
    <Card style={{
      marginBottom: 24,
      background: "linear-gradient(135deg, #1e3a8a 0%, #1e3a8a22 50%, transparent 100%)",
      border: "2px solid #6366f1",
      boxShadow: "0 0 20px rgba(99, 102, 241, 0.15)",
    }}>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ color: COLORS.text, fontSize: 15, fontWeight: 700, marginTop: 0, marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
          🎯 <span>Top 3 Opportunities ({period === "yesterday" ? "Kemarin" : "Hari Ini"})</span>
        </h3>
        <div style={{ fontSize: 12, color: COLORS.textMuted }}>
          Strategic recommendations untuk memaksimalkan growth
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {topOpportunities.map((opp, i) => (
          <div key={i} style={{
            background: `linear-gradient(135deg, ${opp.color}11 0%, transparent 100%)`,
            border: `1px solid ${opp.color}33`,
            borderRadius: 8,
            padding: 12,
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
              <div style={{ fontSize: 28, flexShrink: 0 }}>{opp.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.text, marginBottom: 2 }}>
                  {opp.title}
                </div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 6 }}>
                  {opp.metric}
                </div>
              </div>
            </div>
            <div style={{
              fontSize: 13,
              fontWeight: 700,
              color: opp.color,
              marginBottom: 8,
              paddingBottom: 8,
              borderBottom: `1px solid ${opp.color}33`,
            }}>
              {opp.action}
            </div>
            <div style={{ fontSize: 11, color: COLORS.textMuted, lineHeight: 1.5 }}>
              {opp.detail}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const SummaryRow = ({ period = "today" }) => {
  // Build effective data based on period
  const getIgChange = (key) => period === "yesterday" ? (igDataYesterday[key]?.change ?? 0) : (igData[key]?.change ?? 0);
  const getTtChange = (key) => {
    if (!tiktokData[key]) return null;
    return period === "yesterday" ? (tiktokDataYesterday[key]?.change ?? 0) : (tiktokData[key]?.change ?? 0);
  };

  const totalIg = Object.keys(igData).reduce((s, k) => s + getIgChange(k), 0);
  const totalTiktok = Object.entries(tiktokData).filter(([,d]) => d != null).reduce((s, [k]) => s + (getTtChange(k) ?? 0), 0);

  const igEntries = Object.keys(igData).map(k => [k, getIgChange(k)]).sort((a,b) => b[1] - a[1]);
  const ttEntries = Object.entries(tiktokData).filter(([,d]) => d != null).map(([k]) => [k, getTtChange(k)]).sort((a,b) => b[1] - a[1]);

  const bestIg = igEntries[0];
  const bestTiktok = ttEntries[0];

  const oursIg = igData[OUR_ACCOUNT];
  const oursIgChange = getIgChange(OUR_ACCOUNT);
  const oursTiktok = tiktokData[OUR_ACCOUNT];
  const oursTtChange = getTtChange(OUR_ACCOUNT);
  const igRank = igEntries.findIndex(([k]) => k === OUR_ACCOUNT) + 1;
  const tiktokRank = ttEntries.findIndex(([k]) => k === OUR_ACCOUNT) + 1;
  const tiktokTotal = ttEntries.length;

  const periodLabel = period === "yesterday" ? "Performa kemarin (9 Apr)" : "Performa hari ini (10 Apr)";

  const cards = [
    { label: "Total IG Growth", value: totalIg, icon: "📸" },
    { label: "Total TikTok Growth", value: totalTiktok, icon: "🎵" },
    { label: "Best IG Performer", value: bestIg[0], sub: `+${bestIg[1]}`, icon: "🏆" },
    { label: "Best TikTok Performer", value: bestTiktok?.[0] || "-", sub: bestTiktok ? `+${bestTiktok[1]}` : "", icon: "🏆" },
  ];

  return (
    <>
    {/* JADIASN Highlight Banner */}
    <Card style={{
      marginBottom: 20,
      background: "linear-gradient(135deg, #1c1306 0%, #422006 50%, #1c1306 100%)",
      border: "2px solid #f59e0b",
      boxShadow: "0 0 24px rgba(245, 158, 11, 0.12)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 22 }}>⭐</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: "#fbbf24" }}>JADIASN</span>
          </div>
          <div style={{ fontSize: 12, color: "#fcd34d" }}>{periodLabel}</div>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#fcd34d", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>IG Followers</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#fef3c7" }}>{formatFull(oursIg.followers)}</div>
            <div style={{ marginTop: 2 }}><ChangeIndicator value={oursIgChange} /></div>
            <div style={{ marginTop: 4, fontSize: 11, color: "#fcd34d" }}>Engagement: {oursIg.engagement}%</div>
          </div>
          <div style={{ width: 1, height: 64, background: "#f59e0b44" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#fcd34d", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>TikTok Followers</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#fef3c7" }}>{formatFull(oursTiktok?.followers || 0)}</div>
            <div style={{ marginTop: 2 }}><ChangeIndicator value={oursTtChange} /></div>
            <div style={{ marginTop: 4, fontSize: 11, color: "#fcd34d" }}>Likes: {oursTiktok?.likes || "0"}</div>
          </div>
          <div style={{ width: 1, height: 64, background: "#f59e0b44" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#fcd34d", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Ranking IG</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#fef3c7" }}>#{igRank} <span style={{ fontSize: 12, color: "#fcd34d" }}>dari 14</span></div>
          </div>
          <div style={{ width: 1, height: 64, background: "#f59e0b44" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#fcd34d", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Ranking TikTok</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#fef3c7" }}>#{tiktokRank} <span style={{ fontSize: 12, color: "#fcd34d" }}>dari {tiktokTotal}</span></div>
          </div>
        </div>
      </div>
    </Card>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
      {cards.map((c, i) => (
        <Card key={i} style={{ textAlign: "center" }}>
          <div style={{ fontSize: 28 }}>{c.icon}</div>
          <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 6, textTransform: "uppercase", letterSpacing: 1 }}>{c.label}</div>
          {typeof c.value === "number" ? (
            <div style={{ fontSize: 28, fontWeight: 800, marginTop: 4 }}>
              <ChangeIndicator value={c.value} />
            </div>
          ) : (
            <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, marginTop: 4 }}>
              {c.value}
              {c.sub && <span style={{ color: COLORS.positive, fontSize: 13, marginLeft: 6 }}>{c.sub}</span>}
            </div>
          )}
        </Card>
      ))}
    </div>
    </>
  );
};

const ComparisonChart = ({ platform, period = "today" }) => {
  const data = accounts.map((acc) => {
    const key = platform === "ig" ? acc.ig : (acc.tiktok || acc.ig);
    const d = getData(platform, key, period);
    return {
      name: acc.name.length > 12 ? acc.name.slice(0, 10) + "…" : acc.name,
      fullName: acc.name,
      change: d?.change ?? 0,
      followers: d?.followers ?? 0,
      available: d !== null && d !== undefined,
      ours: acc.ours,
    };
  }).filter(d => d.available).sort((a, b) => b.change - a.change);

  const chartLabel = period === "yesterday" ? "Kemarin" : "Hari Ini";

  return (
    <Card>
      <h3 style={{ color: COLORS.text, fontSize: 16, fontWeight: 700, marginBottom: 16, marginTop: 0 }}>
        {platform === "ig" ? "📸 Instagram" : "🎵 TikTok"} — Pertumbuhan {chartLabel} (Tertinggi → Terendah)
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="name" tick={{ fill: COLORS.textMuted, fontSize: 11 }} />
          <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} />
          <Tooltip
            contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#fff" }}
            itemStyle={{ color: "#fff" }}
            labelStyle={{ color: "#94a3b8" }}
            formatter={(val, name, entry) => [`${val > 0 ? "+" : ""}${val}`, entry.payload.fullName]}
            labelFormatter={() => ""}
          />
          <Bar dataKey="change" radius={[6, 6, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.ours ? "#f59e0b" : (entry.change > 0 ? COLORS.positive : entry.change < 0 ? COLORS.negative : COLORS.neutral)} stroke={entry.ours ? "#fbbf24" : "none"} strokeWidth={entry.ours ? 2 : 0} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

const TrendChart = ({ platform, selectedAccount }) => {
  const history = platform === "ig" ? igHistory : tiktokHistory;
  const key = selectedAccount?.ig || "";
  const tKey = platform === "tiktok" ? (selectedAccount?.tiktok || selectedAccount?.ig || "") : key;
  const accountHistory = history[tKey];

  if (!accountHistory) {
    return (
      <Card>
        <h3 style={{ color: COLORS.text, fontSize: 16, fontWeight: 700, marginTop: 0 }}>
          {platform === "ig" ? "📸" : "🎵"} Tren 14 Hari — {selectedAccount?.name || "Pilih akun"}
        </h3>
        <div style={{ color: COLORS.textMuted, textAlign: "center", padding: 40 }}>
          {selectedAccount ? "Data tidak tersedia untuk akun ini" : "Pilih akun untuk melihat tren"}
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h3 style={{ color: COLORS.text, fontSize: 16, fontWeight: 700, marginTop: 0 }}>
        {platform === "ig" ? "📸" : "🎵"} Tren 14 Hari — {selectedAccount.name}
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={accountHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="date" tick={{ fill: COLORS.textMuted, fontSize: 10 }} />
          <YAxis
            tick={{ fill: COLORS.textMuted, fontSize: 10 }}
            domain={["dataMin - 100", "dataMax + 100"]}
            tickFormatter={formatNum}
          />
          <Tooltip
            contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#fff" }}
            itemStyle={{ color: "#fff" }}
            labelStyle={{ color: "#94a3b8" }}
            formatter={(val) => [formatFull(val), "Followers"]}
          />
          <Line
            type="monotone"
            dataKey="f"
            stroke={platform === "ig" ? COLORS.ig : COLORS.tiktok}
            strokeWidth={3}
            dot={{ fill: platform === "ig" ? COLORS.ig : COLORS.tiktok, r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

const RankingTable = ({ platform, period = "today" }) => {
  const ranked = accounts
    .map((acc) => {
      const key = platform === "ig" ? acc.ig : (acc.tiktok || acc.ig);
      const d = getData(platform, key, period);
      return { name: acc.name, data: d, ours: acc.ours };
    })
    .filter((r) => r.data)
    .sort((a, b) => (b.data.change ?? -Infinity) - (a.data.change ?? -Infinity));

  const rankLabel = period === "yesterday" ? "Kemarin" : "Hari Ini";

  return (
    <Card>
      <h3 style={{ color: COLORS.text, fontSize: 16, fontWeight: 700, marginTop: 0, marginBottom: 12 }}>
        {platform === "ig" ? "📸 Instagram" : "🎵 TikTok"} — Ranking Pertumbuhan {rankLabel}
      </h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${COLORS.cardBorder}` }}>
            <th style={{ textAlign: "left", padding: "8px 6px", color: COLORS.textMuted, fontSize: 11, fontWeight: 600 }}>#</th>
            <th style={{ textAlign: "left", padding: "8px 6px", color: COLORS.textMuted, fontSize: 11, fontWeight: 600 }}>Akun</th>
            <th style={{ textAlign: "right", padding: "8px 6px", color: COLORS.textMuted, fontSize: 11, fontWeight: 600 }}>Pertumbuhan</th>
            <th style={{ textAlign: "right", padding: "8px 6px", color: COLORS.textMuted, fontSize: 11, fontWeight: 600 }}>Followers</th>
            <th style={{ textAlign: "center", padding: "8px 6px", color: COLORS.textMuted, fontSize: 11, fontWeight: 600 }}>Grade</th>
          </tr>
        </thead>
        <tbody>
          {ranked.map((r, i) => (
            <tr key={i} style={{
              borderBottom: `1px solid ${COLORS.cardBorder}22`,
              background: r.ours ? "rgba(245, 158, 11, 0.08)" : "transparent",
              borderLeft: r.ours ? "3px solid #f59e0b" : "3px solid transparent",
            }}>
              <td style={{ padding: "10px 6px", color: i === 0 ? "#fbbf24" : COLORS.textMuted, fontSize: 14, fontWeight: 700 }}>{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}</td>
              <td style={{ padding: "10px 6px", color: r.ours ? "#fbbf24" : COLORS.text, fontSize: 14, fontWeight: 600 }}>
                {r.ours ? "⭐ " : ""}{r.name}
              </td>
              <td style={{ padding: "10px 6px", textAlign: "right" }}><ChangeIndicator value={r.data.change} /></td>
              <td style={{ padding: "10px 6px", textAlign: "right", color: r.ours ? "#fef3c7" : COLORS.text, fontSize: 14 }}>{formatFull(r.data.followers)}</td>
              <td style={{ padding: "10px 6px", textAlign: "center" }}><GradeBadge grade={r.data.grade} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default function MarketingDashboard() {
  const [selectedIgAccount, setSelectedIgAccount] = useState(accounts[0]);
  const [selectedTiktokAccount, setSelectedTiktokAccount] = useState(accounts[0]);
  const [activeTab, setActiveTab] = useState("overview");
  const [period, setPeriod] = useState("today");

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "instagram", label: "📸 Instagram" },
    { key: "tiktok", label: "🎵 TikTok" },
  ];

  const periods = [
    { key: "today", label: "📊 Hari Ini", sub: "10 Apr" },
    { key: "yesterday", label: "📅 Kemarin", sub: "9 Apr (Full)" },
  ];

  // CEO MODE - Executive Summary Analysis
  const analyzeCEOInsights = (period) => {
    const igScores = [];
    const ttScores = [];

    // Analyze Instagram accounts
    accounts.forEach(acc => {
      if (acc.ig) {
        const data = period === "today" ? igData[acc.ig] : igDataYesterday[acc.ig];
        if (data) {
          igScores.push({
            name: acc.name,
            key: acc.ig,
            platform: "ig",
            growth: data.change || 0,
            engagement: data.engagement || 0,
            isOurs: acc.ours,
            dailyPosts: data.dailyPosts || 0,
          });
        }
      }
    });

    // Analyze TikTok accounts
    accounts.forEach(acc => {
      if (acc.tiktok) {
        const data = period === "today" ? tiktokData[acc.tiktok] : tiktokDataYesterday[acc.tiktok];
        if (data) {
          ttScores.push({
            name: acc.name,
            key: acc.tiktok,
            platform: "tt",
            growth: data.change || 0,
            engagement: 0.5, // Placeholder
            isOurs: acc.ours,
            dailyPosts: data.dailyPosts || 0,
          });
        }
      }
    });

    const allScores = [...igScores, ...ttScores];

    // Find insights
    const winner = allScores.reduce((a, b) => (a.growth > b.growth ? a : b), allScores[0]);
    const threat = allScores.filter(s => s.growth < 0).sort((a, b) => a.growth - b.growth)[0] ||
                   allScores.reduce((a, b) => (a.growth < b.growth ? a : b), allScores[0]);
    const opportunity = allScores.filter(s => s.engagement > 0.3).sort((a, b) => b.engagement - a.engagement)[0] ||
                        allScores[1];

    // Attention: JADIASN if growth is low, or lowest performer
    const jadiasn = allScores.find(s => s.isOurs);
    const attention = jadiasn && jadiasn.growth < 100 ? jadiasn :
                      allScores.filter(s => !s.isOurs).reduce((a, b) => (a.growth < b.growth ? a : b), allScores[0]);

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
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0, letterSpacing: -0.5 }}>
          Marketing Dashboard
        </h1>
        <p style={{ color: COLORS.textMuted, fontSize: 14, margin: "6px 0 0" }}>
          Data SocialBlade — 10 April 2026 | 14 Akun | Instagram & TikTok
        </p>
      </div>

      {/* Tabs + Period Toggle */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", gap: 4, background: COLORS.cardBg, borderRadius: 12, padding: 4, width: "fit-content" }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            style={{
              padding: "10px 20px",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
              background: activeTab === t.key ? COLORS.accent : "transparent",
              color: activeTab === t.key ? "#fff" : COLORS.textMuted,
              transition: "all 0.2s",
            }}
          >
            {t.label}
          </button>
        ))}
        </div>

        {/* Period Toggle */}
        <div style={{ display: "flex", gap: 4, background: COLORS.cardBg, borderRadius: 12, padding: 4 }}>
          {periods.map((p) => (
            <button
              key={p.key}
              onClick={() => setPeriod(p.key)}
              style={{
                padding: "8px 16px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                background: period === p.key ? (p.key === "today" ? "#166534" : "#1e40af") : "transparent",
                color: period === p.key ? "#fff" : COLORS.textMuted,
                transition: "all 0.2s",
              }}
            >
              {p.label} <span style={{ fontSize: 10, opacity: 0.7 }}>({p.sub})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <>
          {/* CEO MODE */}
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", marginBottom: 12, marginTop: 0, letterSpacing: 0.5 }}>
              📊 Kesimpulan {period === "today" ? "Hari Ini" : "Kemarin"}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
              <CEOCard
                title="Pemenang"
                emoji="🏆"
                name={winner.name}
                value={`+${winner.growth}`}
                subtitle={`${winner.platform.toUpperCase()} | Growth tertinggi`}
                color="#10b981"
              />
              <CEOCard
                title="Ancaman"
                emoji="⚠️"
                name={threat.name}
                value={`${threat.growth}`}
                subtitle={`${threat.platform.toUpperCase()} | ${threat.growth < 0 ? 'Menurun' : 'Terendah'}`}
                color="#ef4444"
              />
              <CEOCard
                title="Peluang"
                emoji="💡"
                name={opportunity.name}
                value={opportunity.engagement > 0 ? `${(opportunity.engagement * 100).toFixed(1)}%` : "Posting aktif"}
                subtitle={`${opportunity.platform.toUpperCase()} | Engagement tinggi`}
                color="#3b82f6"
              />
              <CEOCard
                title="Perlu Perhatian"
                emoji="🔔"
                name={attention.name}
                value={`${attention.growth >= 0 ? '+' : ''}${attention.growth}`}
                subtitle={`${attention.isOurs ? '⭐ Platform utama' : 'Performa rendah'}`}
                color={attention.isOurs ? "#f59e0b" : "#ef4444"}
              />
            </div>
          </div>

          <MomentumPanel period={period} />
          <MarketSharePanel />
          <OpportunitiesPanel period={period} />
          <InsightCards period={period} />
          <SummaryRow period={period} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
            <ComparisonChart platform="ig" period={period} />
            <ComparisonChart platform="tiktok" period={period} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <RankingTable platform="ig" period={period} />
            <RankingTable platform="tiktok" period={period} />
          </div>
        </>
      )}

      {/* Instagram Tab */}
      {activeTab === "instagram" && (
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, marginTop: 0 }}>Instagram — Diurutkan Pertumbuhan {period === "yesterday" ? "Kemarin" : "Hari Ini"}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24, paddingTop: 10, paddingLeft: 10 }}>
            {[...accounts].sort((a, b) => {
              const dA = getData("ig", a.ig, period);
              const dB = getData("ig", b.ig, period);
              return (dB?.change ?? -Infinity) - (dA?.change ?? -Infinity);
            }).map((acc, i) => (
              <AccountCard
                key={i}
                acc={acc}
                platform="ig"
                rank={i + 1}
                period={period}
                isSelected={selectedIgAccount?.name === acc.name}
                onClick={() => setSelectedIgAccount(acc)}
              />
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
            <TrendChart platform="ig" selectedAccount={selectedIgAccount} />
            <ComparisonChart platform="ig" period={period} />
          </div>
          <RankingTable platform="ig" period={period} />
        </>
      )}

      {/* TikTok Tab */}
      {activeTab === "tiktok" && (
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, marginTop: 0 }}>TikTok — Diurutkan Pertumbuhan {period === "yesterday" ? "Kemarin" : "Hari Ini"}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24, paddingTop: 10, paddingLeft: 10 }}>
            {(() => {
              const sorted = [...accounts].sort((a, b) => {
                const dA = getData("tiktok", a.tiktok || a.ig, period);
                const dB = getData("tiktok", b.tiktok || b.ig, period);
                return (dB?.change ?? -Infinity) - (dA?.change ?? -Infinity);
              });
              let rankCounter = 0;
              return sorted.map((acc, i) => {
                const d = getData("tiktok", acc.tiktok || acc.ig, period);
                const hasData = d !== null && d !== undefined;
                if (hasData) rankCounter++;
                return (
                  <AccountCard
                    key={i}
                    acc={acc}
                    platform="tiktok"
                    rank={hasData ? rankCounter : null}
                    period={period}
                    isSelected={selectedTiktokAccount?.name === acc.name}
                    onClick={() => setSelectedTiktokAccount(acc)}
                  />
                );
              });
            })()}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
            <TrendChart platform="tiktok" selectedAccount={selectedTiktokAccount} />
            <ComparisonChart platform="tiktok" period={period} />
          </div>
          <RankingTable platform="tiktok" period={period} />
        </>
      )}

      {/* Footer */}
      <div style={{ textAlign: "center", color: COLORS.textMuted, fontSize: 11, marginTop: 32, padding: "16px 0", borderTop: `1px solid ${COLORS.cardBorder}` }}>
        Sumber data: SocialBlade.com | Terakhir diperbarui: 10 April 2026 (Refreshed) | Dashboard dibuat otomatis
      </div>
    </div>
  );
}
