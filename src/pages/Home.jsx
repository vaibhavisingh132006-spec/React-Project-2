import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const STATS = [
  ["Real-time", "Firebase sync"],
  ["4 options",  "Per question"],
  ["Instant",    "Live results"],
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />

      {/* Ambient glow */}
      <div style={{
        position: "fixed", top: "5%", left: "50%",
        transform: "translateX(-50%)",
        width: 700, height: 400,
        background: "radial-gradient(ellipse, rgba(124,110,240,0.1) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{
        position: "relative", zIndex: 1,
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "2rem", textAlign: "center",
      }}>

        {/* Eyebrow badge */}
        <div className="badge badge-accent" style={{ marginBottom: "1.5rem" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent2)", display: "inline-block" }} />
          Live polling · Real-time
        </div>

        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(2.4rem, 6vw, 4rem)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1.08,
          marginBottom: "1.2rem",
          maxWidth: 560,
          color: "var(--text)",
        }}>
          Polls that<br />
          <span style={{
            background: "linear-gradient(135deg, var(--accent2) 0%, var(--accent3) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            come alive
          </span>
        </h1>

        <p style={{
          fontSize: 17, color: "var(--text2)",
          maxWidth: 400, lineHeight: 1.7,
          marginBottom: "2.5rem",
        }}>
          Create a quiz room, share the 6-digit code, and watch results update live as your audience votes.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <Link to="/create" className="btn btn-primary" style={{ padding: "14px 32px", fontSize: 15, textDecoration: "none", cursor: "pointer" }}>
            Create a room
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M3 7.5h9M8 3.5l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link to="/join" className="btn btn-ghost" style={{ padding: "14px 32px", fontSize: 15, textDecoration: "none", cursor: "pointer" }}>
            Join a room
          </Link>
        </div>

        {/* Stats strip */}
        <div style={{
          display: "flex", gap: "2.5rem",
          marginTop: "4rem",
          padding: "1.25rem 2.5rem",
          background: "var(--bg2)",
          border: "1px solid var(--border)",
          borderRadius: 14,
        }}>
          {STATS.map(([title, sub]) => (
            <div key={title} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{title}</div>
              <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 3 }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}