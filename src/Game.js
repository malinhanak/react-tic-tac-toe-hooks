import React, { useState } from 'react'
import Board from './Board'

function calculateAWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function Game() {
  const initialHistory = [{ squares: Array(9).fill(null) }]
  const [history, setHistory] = useState(initialHistory)
  const [xIsNext, setXIsNext] = useState(true)
  const [stepNumber, setStep] = useState(0)

  const handleClick = value => {
    const gameHistory = history.slice(0, stepNumber + 1)
    const historySlice = gameHistory[gameHistory.length - 1]
    const gameSquares = [...historySlice.squares]
    if (calculateAWinner(gameSquares) || gameSquares[value]) return

    gameSquares[value] = xIsNext ? 'X' : 'O'
    const newHistory = [...history, { squares: gameSquares }]
    setHistory(newHistory)
    setXIsNext(!xIsNext)
    setStep(history.length)
  }

  const jumpToMove = step => {
    setStep(step)
    setXIsNext(step % 2 === 0)
  }

  const current = history[stepNumber]
  const winner = calculateAWinner(current.squares)
  let status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : `Go to game start`

    return (
      <li key={move}>
        <button onClick={() => jumpToMove(move)}>{desc}</button>
      </li>
    )
  })

  return (
    <div className='game'>
      <div className='game-board'>
        <Board squares={current.squares} onClick={i => handleClick(i)} />
      </div>
      <div className='game-info'>
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

export default Game
