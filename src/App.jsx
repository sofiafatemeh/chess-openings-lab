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

function WinBar({ move }) {
  const pct = Math.round(move.score * 100);
  const color = pct >= 55 ? "#22c55e" : pct >= 45 ? "#eab308" : "#ef4444";
  return (
    <div className="winbar">
      <div className="winbar-fill" style={{ width: `${pct}%`, background: color }} />
      <span>{pct}% Blancs</span>
    </div>
  );
}

export default function App() {
  const [cat, setCat] = useState("openings");
  const [lineIdx, setLineIdx] = useState(0);
  const [moves, setMoves] = useState([]); // SAN moves of current session line
  const [topMoves, setTopMoves] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [boardW, setBoardW] = useState(Math.min(420, (typeof window !== "undefined" ? window.innerWidth : 480) - 40));

  useEffect(() => {
    const onResize = () => setBoardW(Math.min(420, window.innerWidth - 40));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const lines = LINES[cat];
  const line = lines[lineIdx];

  const game = useMemo(() => {
    const g = new Chess();
    for (const san of moves) {
      if (!g.move(san)) break;
    }
    return g;
  }, [moves]);

  const fen = game.fen();
  const turn = game.turn();
  const isOver = game.isGameOver();

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

  function selectCat(c) { setCat(c); setLineIdx(0); setMoves(LINES[c][0].moves ? LINES[c][0].moves.split(" ") : []); }
  function selectLine(i) {
    setLineIdx(i);
    const l = LINES[cat][i];
    setMoves(l.moves ? l.moves.split(" ") : []);
  }
  function resetLine() {
    const l = LINES[cat][lineIdx];
    setMoves(l.moves ? l.moves.split(" ") : []);
  }
  function playSan(san) {
    const g = new Chess(fen);
    const mv = g.move(san);
    if (mv) setMoves([...moves, mv.san]);
  }
  function onDrop(source, target) {
    const g = new Chess(fen);
    const mv = g.move({ from: source, to: target, promotion: "q" });
    if (!mv) return false;
    setMoves([...moves, mv.san]);
    return true;
  }

  return (
    <div className="app">
      <header>
        <h1>♟ Chess Openings Lab</h1>
        <p>Top 10 ouvertures · défenses · systèmes — meilleurs coups à chaque position (données masters Lichess). Bouge les pièces librement ou clique un coup conseillé.</p>
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

          <Chessboard
            position={fen}
            boardWidth={boardW}
            onPieceDrop={onDrop}
            customBoardStyle={{ borderRadius: "10px", boxShadow: "0 6px 18px rgba(0,0,0,0.5)" }}
          />

          <div className="controls">
            <button onClick={() => setMoves(moves.slice(0, Math.max(0, moves.length - 1)))} title="Annuler">↩</button>
            <button onClick={resetLine} title="Rejouer la ligne">↺</button>
            <span className="plycount">
              {isOver ? (game.isCheckmate() ? "Échec et mat !" : "Partie finie") : `Coup ${Math.ceil(moves.length / 2)} — ${turn === "w" ? "Blancs" : "Noirs"} jouent`}
            </span>
          </div>
          <p className="sanline">{moves.join(" ")}</p>
        </main>

        <aside className="moves-panel">
          <h2>Meilleurs coups ici</h2>
          {loading && <p className="muted">Chargement…</p>}
          {error && <p className="error">{error} <button onClick={loadTop}>Réessayer</button></p>}
          {topMoves && topMoves.length === 0 && <p className="muted">Position hors base masters.</p>}
          {topMoves && topMoves.map((m, i) => (
            <div key={m.san} className={i === 0 ? "movecard best" : "movecard"} onClick={() => playSan(m.san)} role="button" tabIndex={0}>
              <div className="movehead">
                <span className="rank">#{i + 1}</span>
                <strong className="san">{m.san}</strong>
                <span className="games">{m.total.toLocaleString("fr-FR")} parties</span>
                <span className="playhint">jouer ▸</span>
              </div>
              <WinBar move={m} />
            </div>
          ))}
          <p className="muted small">Score = % (Blancs) sur parties maîtres. Source : explorateur Lichess.</p>
        </aside>
      </div>
    </div>
  );
}
