import React, { useContext } from "react";
import { AppContext } from "../App";

function GameOver() {
  const { gameOver, correctWord, currAttempt, handleReset } =
    useContext(AppContext);
  return (
    <div className="gameOver">
      <h3>{gameOver.guessedWord ? "You correctly guessed" : "You failed"}</h3>
      <h1> Correct Word: {correctWord.toUpperCase()}</h1>
      {gameOver.guessedWord && (
        <h3> You guessed in {currAttempt.attempt} attempts</h3>
      )}
      <button onClick={handleReset}>Try new word!</button>
    </div>
  );
}

export default GameOver;
