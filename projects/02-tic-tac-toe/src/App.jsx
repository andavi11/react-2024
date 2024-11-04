import './App.css'
import {useState} from "react";
import confetti from "canvas-confetti"
import {Square} from "./components/Square.jsx";
import {TURNS} from "./constants.js";
import {checkWinnerFrom, checkEndGame} from "./logic/board.js";
import {WinnerModal} from "./components/WinnerModal.jsx";
import {Tablero} from "./components/Tablero.jsx";
import {Turno} from "./components/Turno.jsx";

function App() {

    const [board, setBoard] = useState(Array(9).fill(null))
    const [turn, setTurn] = useState(TURNS.X)
    const [winner, setWinner] = useState(null)

    const updateBoard = (index) => {
        if (board[index] || winner) return

        const newBoard = [... board]
        newBoard[index] =  turn
        setBoard(newBoard)

        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        setTurn(newTurn)

        const newWinner = checkWinnerFrom(newBoard)
        if (newWinner) {
            confetti()
            setWinner(newWinner)
        } else if (checkEndGame(newBoard)){
            setWinner(false)
        }
    }

    const resetGame = () => {
        setBoard(Array(9).fill(null))
        setTurn(TURNS.X)
        setWinner(null)
    }

    return (
        <main className='board'>
            <h1>Tic Tac Toe</h1>
            <button onClick={resetGame}>Reiniciar</button>
            <Tablero board={board} updateBoard={updateBoard}></Tablero>
            <Turno turn={turn}></Turno>
            <WinnerModal winner={winner} resetGame={resetGame}/>
        </main>
    )
}

export default App
