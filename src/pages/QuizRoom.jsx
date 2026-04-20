import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { ref, onValue, runTransaction } from "firebase/database";
import { useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import Navbar from "../components/Navbar";

export default function QuizRoom() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const [room,   setRoom]   = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [voted,  setVoted]  = useState(false);
  const [voteErr, setVoteErr] = useState("");

  useEffect(() => {
    // onValue returns unsubscribe — returning it cleans up on unmount
    return onValue(ref(db, "rooms/" + id), (snap) => {
      const data = snap.val();
      if (!data) {
        setNotFound(true); // room doesn't exist
      } else {
        setRoom(data);
        setNotFound(false);
      }
    });
  }, [id]);

  const handleVote = async (index) => {
    setVoteErr("");
    try {
      await runTransaction(ref(db, `rooms/${id}/results/${index}`), (count) => (count || 0) + 1);
      setVoted(true);
    } catch (err) {
      console.error("Vote failed:", err);
      setVoteErr("Vote failed — please try again.");
    }
  };

  // ── Room not found ───────────────────────────────────────────
  if (notFound) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <Navbar />
        <div className="page" style={{ justifyContent: "center" }}>
          <div className="page-inner" style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", marginBottom: 12 }}>Room not found</h2>
            <p style={{ color: "var(--text2)", marginBottom: "1.5rem" }}>
              The code <span style={{ fontFamily: "'DM Mono', monospace", color: "var(--accent2)" }}>{id}</span> doesn't match any active room.
            </p>
            <button className="btn btn-primary" style={{ cursor: "pointer" }} onClick={() => navigate("/join")}>
              Try another code
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Loading ──────────────────────────────────────────────────
  if (!room) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <Navbar />
        <div className="page" style={{ justifyContent: "center" }}>
          <div className="page-inner" style={{ textAlign: "center" }}>
            <p style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 12, letterSpacing: "0.15em",
              color: "var(--accent2)", textTransform: "uppercase",
            }}>
              ✦ Loading room…
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Room loaded ──────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />

      <style>{`
        .pulse-dot {
          width: 6px; height: 6px;
          background: var(--green);
          border-radius: 50%;
          animation: pulse 2s ease infinite;
        }
        @keyframes pulse {
          0%  { box-shadow: 0 0 0 0   rgba(74,222,128,0.7); }
          60% { box-shadow: 0 0 0 8px rgba(74,222,128,0);   }
          100%{ box-shadow: 0 0 0 0   rgba(74,222,128,0);   }
        }
      `}</style>

      <main className="page">
        <div className="page-inner">

          {/* Header row */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: "1.5rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid var(--border)",
          }}>
            <div>
              <span style={{ fontSize: 10, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.12em", display: "block", marginBottom: 3 }}>
                Room code
              </span>
              <span className="mono" style={{ fontSize: 20, color: "var(--text)", fontWeight: 600 }}>
                {id}
              </span>
            </div>
            <div className="badge badge-live">
              <span className="pulse-dot" />
              Live
            </div>
          </div>

          {/* Main card */}
          <div className="card">
            {!voted ? (
              <QuestionCard
                question={room.question}
                options={room.options}
                onVote={handleVote}
              />
            ) : (
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: "rgba(74,222,128,0.1)",
                  border: "1px solid rgba(74,222,128,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1rem",
                }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <circle cx="11" cy="11" r="10" stroke="var(--green)" strokeWidth="1.5"/>
                    <path d="M6.5 11l3 3 6-6" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 8 }}>
                  Vote recorded!
                </h2>
                <p style={{ fontSize: 14, color: "var(--text2)", marginBottom: "1.5rem" }}>
                  Results are updating live.
                </p>
                <button
                  className="btn btn-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/results/${id}`)}
                >
                  View live results →
                </button>
              </div>
            )}
            {voteErr && (
              <p style={{ marginTop: 12, fontSize: 13, color: "#f87171", textAlign: "center" }}>{voteErr}</p>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}