import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { db } from "../firebase";
import { ref, set } from "firebase/database";

const THEMES = [
  { bg: "#f3e8ff", border: "#d8b4fe", text: "#7e22ce" },
  { bg: "#ecfdf5", border: "#a7f3d0", text: "#059669" },
  { bg: "#fff7ed", border: "#fed7aa", text: "#ea580c" },
  { bg: "#fdf2f8", border: "#fbcfe8", text: "#db2777" },
];

export default function CreateQuiz() {
  const [question, setQuestion] = useState("");
  const [options, setOptions]   = useState(["", "", "", ""]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const navigate = useNavigate();

  const createRoom = async () => {
    // ── Validation ──────────────────────────────────────────────
    const filteredOptions = options.filter((o) => o.trim() !== "");
    if (!question.trim()) { setError("Please enter a question."); return; }
    if (filteredOptions.length < 2) { setError("Please enter at least 2 options."); return; }

    setError("");
    setLoading(true);

    // ── Generate 6-digit room ID ─────────────────────────────────
    const id = Math.floor(100000 + Math.random() * 900000).toString();

    try {
      // ── FIX: results length matches filtered options length ─────
      await set(ref(db, "rooms/" + id), {
        question: question.trim(),
        options:  filteredOptions,
        results:  filteredOptions.map(() => 0), // ← was options.map (wrong length)
      });
      navigate(`/room/${id}`);
    } catch (err) {
      console.error("Firebase write failed:", err);
      setError("Failed to create room. Check your connection and try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0c",
      backgroundImage: "radial-gradient(circle at 50% 40%, rgba(124,110,240,0.1) 0%, transparent 60%)",
    }}>
      <Navbar />

      <main style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "80px 20px 40px",
      }}>
        <div style={{ width: "100%", maxWidth: 780 }}>

          {/* Eyebrow */}
          <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11, letterSpacing: "0.2em",
              color: "var(--accent2)", fontWeight: 500,
              textTransform: "uppercase",
            }}>
              ✦ Poll Creator
            </span>
          </div>

          {/* Question textarea */}
          <div style={{ marginBottom: "1.25rem" }}>
            <textarea
              placeholder="Ask your question…"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              style={{
                width: "100%", height: "clamp(100px, 18vh, 160px)",
                background: "white", color: "#111",
                border: "none", borderRadius: 14,
                padding: "20px 24px",
                fontSize: "clamp(16px, 2.5vh, 24px)",
                fontWeight: 700,
                fontFamily: "'Syne', sans-serif",
                textAlign: "center",
                resize: "none", outline: "none",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
            />
          </div>

          {/* Options grid */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: 10, marginBottom: "1.25rem",
          }}>
            {options.map((opt, i) => {
              const t = THEMES[i];
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center",
                  background: t.bg, borderRadius: 12,
                  padding: "6px 8px",
                  height: "clamp(56px, 8vh, 72px)",
                  border: `2px solid ${t.border}`,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}>
                  <div style={{
                    minWidth: 34, height: 34,
                    background: "white", borderRadius: 8,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: t.text, fontWeight: 900, fontSize: 15,
                    marginRight: 10, flexShrink: 0,
                  }}>
                    {String.fromCharCode(65 + i)}
                  </div>
                  <input
                    placeholder={`Option ${i + 1}…`}
                    value={opt}
                    onChange={(e) => {
                      const next = [...options];
                      next[i] = e.target.value;
                      setOptions(next);
                    }}
                    style={{
                      flex: 1, border: "none", background: "transparent",
                      fontSize: 14, fontWeight: 600, color: "#222",
                      outline: "none", cursor: "text",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Error */}
          {error && (
            <p style={{
              fontSize: 13, color: "#f87171",
              marginBottom: "0.75rem", textAlign: "center",
            }}>
              {error}
            </p>
          )}

          {/* Launch button */}
          <button
            onClick={createRoom}
            disabled={loading}
            style={{
              width: "100%", height: 54,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "#fff", border: "none", borderRadius: 12,
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
              opacity: loading ? 0.7 : 1,
              transition: "opacity 0.2s",
            }}
          >
            <span style={{
              paddingLeft: 24, color: "#000",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800, fontSize: 13,
              letterSpacing: "0.12em", textTransform: "uppercase",
            }}>
              {loading ? "Creating room…" : "Launch Live Poll"}
            </span>
            <div style={{
              background: "#000", color: "#fff",
              width: 56, height: "100%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18,
              borderTopRightRadius: 12, borderBottomRightRadius: 12,
            }}>
              →
            </div>
          </button>

        </div>
      </main>
    </div>
  );
}