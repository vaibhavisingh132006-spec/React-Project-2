const LABELS = ["A", "B", "C", "D"];
const COLORS = ["#7c6ef0", "#4ade80", "#fb923c", "#f472b6"];
const BG     = [
  "rgba(124,110,240,0.12)", "rgba(74,222,128,0.12)",
  "rgba(251,146,60,0.12)",  "rgba(244,114,182,0.12)",
];

export default function ResultChart({ data = [], options = [] }) {
  const total  = data.reduce((a, b) => a + b, 0);
  const maxVal = Math.max(...data);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {data.map((val, i) => {
        const pct     = total === 0 ? 0 : Math.round((val / total) * 100);
        const isWinner = total > 0 && val === maxVal && maxVal > 0;

        return (
          <div key={i}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: 7,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{
                  width: 26, height: 26, borderRadius: 7,
                  background: BG[i],
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700, color: COLORS[i],
                  fontFamily: "'DM Mono', monospace",
                  flexShrink: 0,
                }}>
                  {LABELS[i]}
                </span>
                <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text2)" }}>
                  {options[i] || `Option ${LABELS[i]}`}
                </span>
                {isWinner && (
                  <span style={{
                    fontSize: 10, fontWeight: 700,
                    color: COLORS[i], letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    background: BG[i],
                    padding: "2px 8px", borderRadius: 100,
                  }}>
                    Leading
                  </span>
                )}
              </div>
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 13, color: isWinner ? COLORS[i] : "var(--text3)",
                fontWeight: isWinner ? 600 : 400,
              }}>
                {pct}% <span style={{ opacity: 0.5 }}>({val})</span>
              </span>
            </div>

            {/* Bar track */}
            <div style={{
              height: 8, borderRadius: 100,
              background: "var(--bg3)",
              overflow: "hidden",
            }}>
              <div style={{
                height: "100%",
                width: `${pct}%`,
                background: COLORS[i],
                borderRadius: 100,
                transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: isWinner ? `0 0 8px ${COLORS[i]}` : "none",
              }} />
            </div>
          </div>
        );
      })}

      {total > 0 && (
        <p style={{ fontSize: 12, color: "var(--text3)", textAlign: "right", marginTop: 4 }}>
          {total} vote{total !== 1 ? "s" : ""} total
        </p>
      )}
    </div>
  );
}