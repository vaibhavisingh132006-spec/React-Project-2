import { useState } from "react";

const LABELS  = ["A", "B", "C", "D"];
const COLORS  = ["var(--accent)", "var(--green)", "var(--orange)", "var(--pink)"];
const BG      = [
  "rgba(124,110,240,0.08)", "rgba(74,222,128,0.08)",
  "rgba(251,146,60,0.08)",  "rgba(244,114,182,0.08)",
];
const BORDERS = [
  "rgba(124,110,240,0.25)", "rgba(74,222,128,0.25)",
  "rgba(251,146,60,0.25)",  "rgba(244,114,182,0.25)",
];

export default function QuestionCard({ question, options = [], onVote = () => {} }) {
  const [selected, setSelected] = useState(null);

  const handleVote = (i) => {
    if (selected !== null) return;
    setSelected(i);
    onVote(i);
  };

  return (
    <div>
      <h2 style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: 22, fontWeight: 700,
        letterSpacing: "-0.02em", lineHeight: 1.35,
        marginBottom: "1.5rem", color: "var(--text)",
      }}>
        {question}
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {options.map((opt, i) => {
          const isSelected = selected === i;
          const isDisabled = selected !== null && !isSelected;
          return (
            <button
              key={i}
              onClick={() => handleVote(i)}
              disabled={selected !== null}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                width: "100%", padding: "13px 16px",
                borderRadius: 12, textAlign: "left",
                border: `1px solid ${isSelected ? BORDERS[i] : "var(--border)"}`,
                background: isSelected ? BG[i] : isDisabled ? "transparent" : "var(--bg3)",
                cursor: selected !== null ? "default" : "pointer",
                opacity: isDisabled ? 0.4 : 1,
                transform: isSelected ? "scale(1.01)" : "scale(1)",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{
                width: 32, height: 32, flexShrink: 0,
                borderRadius: 8,
                background: BG[i],
                border: `1px solid ${BORDERS[i]}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, color: COLORS[i],
                fontFamily: "'DM Mono', monospace",
              }}>
                {isSelected ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke={COLORS[i]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : LABELS[i]}
              </div>
              <span style={{
                fontSize: 15, fontWeight: 500,
                color: isSelected ? "var(--text)" : isDisabled ? "var(--text3)" : "var(--text2)",
              }}>
                {opt}
              </span>
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div style={{
          marginTop: "1rem",
          padding: "11px 14px",
          background: "rgba(74,222,128,0.06)",
          border: "1px solid rgba(74,222,128,0.18)",
          borderRadius: 10,
          fontSize: 13, color: "var(--green)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="var(--green)" strokeWidth="1.2"/>
            <path d="M4 7l2 2 4-4" stroke="var(--green)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Vote submitted! Results update live.
        </div>
      )}
    </div>
  );
}