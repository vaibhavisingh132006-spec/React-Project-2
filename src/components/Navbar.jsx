import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/",       label: "Home"   },
  { to: "/create", label: "Create" },
  { to: "/join",   label: "Join"   },
];

export default function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 24px",
      background: "rgba(6,6,10,0.8)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderBottom: "1px solid var(--border)",
    }}>
      {/* Logo */}
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <div style={{
          width: 30, height: 30,
          background: "var(--accent)",
          borderRadius: 9,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 16px rgba(124,110,240,0.5)",
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
            <rect x="1"   y="5" width="3" height="8" rx="1.5"/>
            <rect x="5.5" y="2" width="3" height="11" rx="1.5"/>
            <rect x="10"  y="7" width="3" height="6"  rx="1.5"/>
          </svg>
        </div>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "var(--text)" }}>
          LivePoll
        </span>
      </Link>

      {/* Nav links */}
      <div style={{ display: "flex", gap: 4 }}>
        {links.map(({ to, label }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                color:      active ? "var(--text)"  : "var(--text2)",
                background: active ? "var(--bg3)"   : "transparent",
                transition: "all 0.15s",
              }}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {/* Auth button */}
      <div>
        {user ? (
          <button
            onClick={logout}
            className="btn btn-ghost"
            style={{ padding: "7px 16px", fontSize: 13, cursor: "pointer" }}
          >
            Sign out
          </button>
        ) : (
          <Link
            to="/login"
            className="btn btn-primary"
            style={{ padding: "7px 16px", fontSize: 13, textDecoration: "none" }}
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}