import { useNavigate } from "react-router-dom";
import JoinForm from "../components/JoinForm";
import Navbar from "../components/Navbar";

export default function JoinQuiz() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <div className="page">
        <div className="page-inner">

          <div style={{ marginBottom: "1.75rem" }}>
            <div style={{
              width: 48, height: 48, borderRadius: 13,
              background: "rgba(124,110,240,0.1)",
              border: "1px solid rgba(124,110,240,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "1rem",
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L2 6.5v7L10 18l8-4.5v-7L10 2z" stroke="var(--accent2)" strokeWidth="1.5" strokeLinejoin="round"/>
                <circle cx="10" cy="10" r="2.5" fill="var(--accent2)"/>
              </svg>
            </div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, marginBottom: 6 }}>
              Join a room
            </h2>
            <p style={{ color: "var(--text2)", fontSize: 14, marginBottom: 0 }}>
              Enter the 6-digit code shared by your host.
            </p>
          </div>

          <div className="card">
            <JoinForm onJoin={(code) => navigate(`/room/${code}`)} />

            <div style={{
              marginTop: "1.25rem",
              padding: "11px 14px",
              background: "rgba(124,110,240,0.05)",
              border: "1px solid rgba(124,110,240,0.12)",
              borderRadius: 10,
              fontSize: 13, color: "var(--text3)",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="var(--accent)" strokeWidth="1.2"/>
                <path d="M7 6v4M7 4.5v.5" stroke="var(--accent)" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              {/* Fixed: correctly says 6 digits to match the ID generator */}
              Room codes are 6 digits, shared by the room creator.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}