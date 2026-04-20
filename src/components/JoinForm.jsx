import { useState } from "react";

export default function JoinForm({ onJoin }) {
  const [code, setCode]   = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const trimmed = code.trim();
    if (trimmed.length !== 6 || !/^\d{6}$/.test(trimmed)) {
      setError("Please enter a valid 6-digit room code.");
      return;
    }
    setError("");
    onJoin(trimmed);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        Room Code
      </label>
      <input
        className="input"
        placeholder="Enter 6-digit code…"
        value={code}
        maxLength={6}
        onChange={(e) => {
          setCode(e.target.value.replace(/\D/g, ""));
          setError("");
        }}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        style={{ fontFamily: "'DM Mono', monospace", fontSize: 22, letterSpacing: "0.15em", textAlign: "center" }}
      />
      {error && (
        <p style={{ fontSize: 13, color: "#f87171", margin: 0 }}>{error}</p>
      )}
      <button
        className="btn btn-primary btn-full"
        onClick={handleSubmit}
        style={{ marginTop: 4, cursor: "pointer" }}
      >
        Join Room →
      </button>
    </div>
  );
}