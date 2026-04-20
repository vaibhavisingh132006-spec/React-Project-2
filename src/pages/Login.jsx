import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login }   = useAuth();
  const navigate    = useNavigate();
  const [busy, setBusy] = useState(false);
  const [err,  setErr]  = useState("");

  const handleGoogleLogin = async () => {
    setBusy(true);
    setErr("");
    try {
      await login();
      navigate("/create");
    } catch (e) {
      if (e.code !== "auth/popup-closed-by-user") {
        setErr("Sign-in failed. Please try again.");
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="page" style={{ justifyContent: "center" }}>
      <div className="page-inner" style={{ maxWidth: 420 }}>
        <div className="card" style={{ textAlign: "center" }}>

          {/* Logo mark */}
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: "var(--accent)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1.25rem",
            boxShadow: "0 0 32px rgba(124,110,240,0.4)",
          }}>
            <svg width="22" height="22" viewBox="0 0 14 14" fill="white">
              <rect x="1"   y="5" width="3" height="8" rx="1.5"/>
              <rect x="5.5" y="2" width="3" height="11" rx="1.5"/>
              <rect x="10"  y="7" width="3" height="6"  rx="1.5"/>
            </svg>
          </div>

          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
            Welcome to LivePoll
          </h2>
          <p style={{ fontSize: 14, color: "var(--text2)", marginBottom: "1.75rem" }}>
            Sign in to create and manage live polls.
          </p>

          <button
            onClick={handleGoogleLogin}
            disabled={busy}
            className="btn btn-ghost btn-full"
            style={{
              gap: 10, fontSize: 15, fontWeight: 600,
              padding: "13px 20px", cursor: busy ? "not-allowed" : "pointer",
              border: "1px solid var(--border2)",
            }}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              style={{ width: 18 }}
            />
            {busy ? "Signing in…" : "Continue with Google"}
          </button>

          {err && (
            <p style={{ marginTop: 12, fontSize: 13, color: "#f87171", marginBottom: 0 }}>{err}</p>
          )}

          <div className="divider" />
          <p style={{ fontSize: 12, color: "var(--text3)", marginBottom: 0 }}>
            Authenticated securely via Firebase
          </p>
        </div>
      </div>
    </div>
  );
}