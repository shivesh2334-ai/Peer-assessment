// Dependency-free SVG radar chart for the four domain scores (0-5).
export default function RadarChart({ domains, size = 300 }) {
  const c = size / 2;
  const r = size / 2 - 52;
  const n = domains.length;
  const angle = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const pt = (i, v) => [c + r * (v / 5) * Math.cos(angle(i)), c + r * (v / 5) * Math.sin(angle(i))];
  const ring = (v) => domains.map((_, i) => pt(i, v).join(",")).join(" ");
  const shape = domains.map((d, i) => pt(i, d.score).join(",")).join(" ");

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={`Radar chart. ${domains.map((d) => `${d.title} ${d.score.toFixed(1)} out of 5`).join(". ")}`}
      style={{ width: "100%", maxWidth: size, height: "auto" }}
    >
      {[1, 2, 3, 4, 5].map((v) => (
        <polygon key={v} points={ring(v)} fill="none" stroke="currentColor" strokeOpacity={v === 5 ? 0.35 : 0.14} />
      ))}
      {domains.map((_, i) => {
        const [x, y] = pt(i, 5);
        return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke="currentColor" strokeOpacity="0.14" />;
      })}
      <polygon points={shape} fill="#2F5BD8" fillOpacity="0.2" stroke="#2F5BD8" strokeWidth="2" strokeLinejoin="round" />
      {domains.map((d, i) => {
        const [x, y] = pt(i, d.score);
        return <circle key={d.id} cx={x} cy={y} r="4.5" fill={d.color} stroke="#fff" strokeWidth="1.5" />;
      })}
      {domains.map((d, i) => {
        const [x, y] = pt(i, 5.9);
        const anchor = Math.abs(x - c) < 6 ? "middle" : x > c ? "start" : "end";
        return (
          <text key={d.id} x={x} y={y} textAnchor={anchor} dominantBaseline="middle" fontSize="12" fill="currentColor">
            {d.title}
          </text>
        );
      })}
    </svg>
  );
}
