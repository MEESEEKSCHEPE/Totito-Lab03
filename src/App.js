import { useState } from "react";

function Square({ value, click, isLastMove }) {
  return (
    <button
      className={`square ${isLastMove ? "highlight" : ""}`}
      onClick={click}
    >
      {value}
    </button>
  );
}

export default function Board() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [lastMove, setLastMove] = useState(null);

  const winner = calculateWinner(currentSquares);
  let status;
  if (winner) {
    status = "Ganador: " + winner;
  } else {
    status = "Siguiente jugador: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    if (currentSquares[i] || calculateWinner(currentSquares)) {
      return;
    }
    const nextSquares = currentSquares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    const newHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
    setLastMove(i);
  }

  function jumpTo(move) {
    setCurrentMove(move);
    setLastMove(null); // Reset last move highlight when jumping to a previous move
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={currentSquares[0]}
          click={() => handleClick(0)}
          isLastMove={lastMove === 0}
        />
        <Square
          value={currentSquares[1]}
          click={() => handleClick(1)}
          isLastMove={lastMove === 1}
        />
        <Square
          value={currentSquares[2]}
          click={() => handleClick(2)}
          isLastMove={lastMove === 2}
        />
      </div>
      <div className="board-row">
        <Square
          value={currentSquares[3]}
          click={() => handleClick(3)}
          isLastMove={lastMove === 3}
        />
        <Square
          value={currentSquares[4]}
          click={() => handleClick(4)}
          isLastMove={lastMove === 4}
        />
        <Square
          value={currentSquares[5]}
          click={() => handleClick(5)}
          isLastMove={lastMove === 5}
        />
      </div>
      <div className="board-row">
        <Square
          value={currentSquares[6]}
          click={() => handleClick(6)}
          isLastMove={lastMove === 6}
        />
        <Square
          value={currentSquares[7]}
          click={() => handleClick(7)}
          isLastMove={lastMove === 7}
        />
        <Square
          value={currentSquares[8]}
          click={() => handleClick(8)}
          isLastMove={lastMove === 8}
        />
      </div>
      <div className="history">
        <h3>Historial de movimientos</h3>
        <ul>
          {history.map((_, move) => (
            <li key={move}>
              <button onClick={() => jumpTo(move)}>
                {move === 0 ? "Reiniciar" : `Ir al movimiento #${move}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
