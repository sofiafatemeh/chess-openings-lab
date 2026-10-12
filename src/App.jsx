import { useState, useEffect, useMemo, useCallback } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { CATEGORIES, LINES } from "./data/lines";

const API = "https://explorer.lichess.ovh/masters";

async function fetchTopMoves(fen) {
  const res = await fetch(`${API}?fen=${encodeURIComponent(fen)}&topGames=0`);
  if (!res.ok) throw new Error("explorer " + res.status);
  const data = await res.json();
  return data.moves
    .filter((m) => m.white + m.draws + m.black > 0)
    .map((m) => {
      const total = m.white + m.draws + m.black;
      const score = (m.white + m.draws * 0.5) / total;
      return { san: m.san, total, score };
    })
    .slice(0, 5);
}

function WinBar({ move, perspective }) {
  // perspective: fraction favorable to the side to play the app user follows (simplify: white)
  const pct = Math.round(move.score * 100);
  const isWhite = perspective === "white";
  const shown = isWhite ? pct : 100 - pct;
  const color = shown >= 55 ? "#22c55e" : shown >= 45 ? "#eab308" : "#ef4444";
  return (
    <div className="winbar">
      <div className="winbar-fill" style={{ width: `${shown}%`, background: color }} />
      <span>{shown}%</span>
    </div>
  );
}

export default function App() {
  const [cat, setCat] = useState("openings");
  const [lineIdx, setLineIdx] = useState(0);
  const [ply, setPly] = useState(0);
  const [topMoves, setTopMoves] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const lines = LINES[cat];
  const line = lines[lineIdx];
  const sanMoves = useMemo(() => (line.moves ? line.moves.split(" ") : []), [line]);

  const game = useMemo(() => {
    const g = new Chess();
    for (const san of sanMoves.slice(0, ply)) {
      const ok = g.move(san);
      if (!ok) break;
    }
    return g;
  }, [sanMoves, ply]);

  const fen = game.fen();
  const turn = game.turn();

  const loadTop = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      setTopMoves(await fetchTopMoves(fen));
    } catch (e) {
      setError("Impossible de contacter l'explorateur Lichess.");
      setTopMoves(null);
    } finally {
      setLoading(false);
    }
  }, [fen]);

  useEffect(() => { loadTop(); }, [loadTop]);

  function selectCat(c) { setCat(c); setLineIdx(0); setPly(0); }
  function selectLine(i) { setLineIdx(i); setPly(0); }

  return (
    <div className="app">
      <header>
        <h1>♟ Chess Openings Lab</h1>
        <p>Top 10 ouvertures · défenses · systèmes — meilleurs coups à chaque position (données masters Lichess)</p>
      </header>

      <nav className="tabs">
        {CATEGORIES.map((c) => (
          <button key={c.id} className={cat === c.id ? "tab active" : "tab"} onClick={() => selectCat(c.id)}>
            {c.label}
          </button>
        ))}
      </nav>

      <div className="layout">
        <aside className="sidebar">
          <h2>{CATEGORIES.find((c) => c.id === cat).label}</h2>
          <ol>
            {lines.map((l, i) => (
              <li key={l.name}>
                <button className={i === lineIdx ? "linebtn active" : "linebtn"} onClick={() => selectLine(i)}>
                  <strong>{l.name}</strong>
                  <span className="eco">{l.eco}</span>
                </button>
              </li>
            ))}
          </ol>
        </aside>

        <main className="board-area">
          <div className="line-info">
            <h3>{line.name} <span className="eco">{line.eco}</span></h3>
            <p>{line.desc}</p>
          </div>

          <Chessboard position={fen} boardWidth={Math.min(420, window.innerWidth - 40)} />

          <div className="controls">
            <button onClick={() => setPly(0)}>⏮</button>
            <button onClick={() => setPly((p) => Math.max(0, p - 1))}>◀</button>
            <span className="plycount">Coup {Math.ceil(ply / 2) || 0} — {turn === "w" ? "Blancs jouent" : "Noirs jouent"}</span>
            <button onClick={() => setPly((p) => Math.min(sanMoves.length, p + 1))}>▶</button>
            <button onClick={() => setPly(sanMoves.length)}>⏭</button>
          </div>
          <p className="sanline">{sanMoves.slice(0, ply).join(" ")}</p>
        </main>

        <aside className="moves-panel">
          <h2>Meilleurs coups ici</h2>
          {loading && <p className="muted">Chargement…</p>}
          {error && <p className="error">{error} <button onClick={loadTop}>Réessayer</button></p>}
          {topMoves && topMoves.length === 0 && <p className="muted">Position hors base.</p>}
          {topMoves && topMoves.map((m, i) => (
            <div key={m.san} className={i === 0 ? "movecard best" : "movecard"}>
              <div className="movehead">
                <span className="rank">#{i + 1}</span>
                <strong className="san">{m.san}</strong>
                <span className="games">{m.total.toLocaleString("fr-FR")} parties</span>
              </div>
              <WinBar move={m} perspective={turn} />
            </div>
          ))}
          <p className="muted small">Score = % (Blancs) sur parties maîtres. Source : explorateur Lichess.</p>
        </aside>
      </div>
    </div>
  );
}
