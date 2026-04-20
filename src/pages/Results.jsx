import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import ResultChart from "../components/ResultChart";
import Navbar from "../components/Navbar";

export default function Results() {
  const { id } = useParams();
  const [results,  setResults]  = useState([]);
  const [options,  setOptions]  = useState([]);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    // ── FIX: return unsubscribe to prevent listener leak ────────
    return onValue(ref(db, "rooms/" + id), (snap) => {
      const data = snap.val();
      if (data) {
        setResults(data.results  || []);
        setOptions(data.options  || []); // ← was missing: needed for chart labels
        setQuestion(data.question || "");
      }
    });
  }, [id]);

  const total  = results.reduce((a, b) => a + b, 0);
  const maxIdx = total > 0 ? results.indexOf(Math.max(...results)) : -1;

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <div className="page">
        <div className="page-inner">

          {/* Header */}
          <div style={{
            display: "flex", alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "1.75rem", gap: 12,
          }}>
            <div style={{ flex: 1 }}>
              <p style={{
                fontSize: 11, color: "var(--text3)",
                textTransform: "uppercase", letterSpacing: "0.08em",
                fontWeight: 600, marginBottom: 6,
              }}>
                Live results · Room {id}
              </p>
              <h2 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em",
                color: "var(--text)",
              }}>
                {question || "Loading…"}
              </h2>
            </div>
            <div className="badge badge-live" style={{ flexShrink: 0, marginTop: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", display: "inline-block" }} />
              Live
            </div>
          </div>

          {/* Chart card */}
          <div className="card">
            <ResultChart data={results} options={options} />
          </div>

          {/* Leading option callout */}
          {maxIdx >= 0 && (
            <div style={{
              marginTop: "1rem",
              padding: "13px 16px",
              background: "rgba(124,110,240,0.06)",
              border: "1px solid rgba(124,110,240,0.15)",
              borderRadius: 12,
              display: "flex", alignItems: "center", gap: 10,
              fontSize: 14, color: "var(--text2)",
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2l1.8 3.6 4 .6-2.9 2.8.7 4L8 11l-3.6 1.9.7-4L2.2 6.2l4-.6L8 2z"
                  stroke="var(--accent2)" strokeWidth="1.3" strokeLinejoin="round"/>
              </svg>
              <span>
                Option{" "}
                <strong style={{ color: "var(--accent2)" }}>
                  {["A","B","C","D"][maxIdx]}
                </strong>{" "}
                is leading with{" "}
                <strong style={{ color: "var(--accent2)" }}>
                  {Math.round((results[maxIdx] / total) * 100)}%
                </strong>{" "}
                of votes
              </span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}