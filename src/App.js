import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import GameOver from "./components/GameOver";
import Modal from "./components/Modal";
import { boardDefault, generateWordSet } from "./Words";
import { useState, createContext, useEffect } from "react";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({
    attempt: 0,
    letterPos: 0,
  });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctWord, setCorrectWord] = useState("");
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.correctWord);
    });
  }, []);

  const handleReset = () => {
    window.location.reload(false);
  };

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  };

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  };

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;
    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    } else {
      alert("Word Not Found");
      return;
    }

    if (currWord.toLowerCase() === correctWord.toLowerCase()) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }

    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
  };

  return (
    <div className="App">
      <nav>
        <h1>CWRUDLE</h1>
      </nav>
      <div className="game">
        <AppContext.Provider
          value={{
            board,
            setBoard,
            currAttempt,
            setCurrAttempt,
            onSelectLetter,
            onEnter,
            onDelete,
            correctWord,
            wordSet,
            setWordSet,
            disabledLetters,
            setDisabledLetters,
            gameOver,
            setGameOver,
            handleReset,
          }}
        >
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </AppContext.Provider>
        <Modal />
      </div>
    </div>
  );
}

export default App;
