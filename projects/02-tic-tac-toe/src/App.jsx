import './App.css'
import {useState} from "react";
import confetti from "canvas-confetti"
import {TURNS} from "./constants.js";
import {checkWinnerFrom, checkEndGame} from "./logic/board.js";
import {WinnerModal} from "./components/WinnerModal.jsx";
import {Tablero} from "./components/Tablero.jsx";
import {Turno} from "./components/Turno.jsx";
import {resetGameStorage, saveGameStorage} from "./logic/storage.js";

function App() {

    //const [board, setBoard] = useState(Array(9).fill(null))
    const [board, setBoard] = useState(() => {
        const boardFromStorage = window.localStorage.getItem('board')
        return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
    })

    //const [turn, setTurn] = useState(TURNS.X)
    const [turn, setTurn] = useState(() => {
        const turnFromStorage = window.localStorage.getItem('turn')
        return turnFromStorage ? turnFromStorage : TURNS.X
    })

    const [winner, setWinner] = useState(null)

    const updateBoard = (index) => {
        if (board[index] || winner) return

        const newBoard = [... board]
        newBoard[index] =  turn
        setBoard(newBoard)

        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        setTurn(newTurn)

        // GUARDAR PARTIDA
        saveGameStorage({board: newBoard, turn: newTurn})

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
        //BORRAR PARTIDA DEL STORAGE
        resetGameStorage()
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
