import React, { useState } from "react";
import GuessControl from "./GuessControl";
import GuessMessage from "./GuessMessage";
import GameOver from "./GameOver";

const NumberGuessingGame = () => {
  const initialGuessData = {
    numberToGuess: getRandomNumber(),
    numberOfGuesses: 0,
    latestGuess: null,
  };
  // Returns a random integer number from 1-100 inclusive
  function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }
  const MAX_ATTEMPTS = 5;

  // When you have similar and many related states
  //you could create a unique state with an object shape:
  const [guessData, setGuessData] = useState(initialGuessData);

  const handleGuess = (guess) => {
    setGuessData({
      ...guessData,
      latestGuess: Number(guess),
      numberOfGuesses: guessData.numberOfGuesses + 1,
    });
  };

  const handleReset = () => {
    setGuessData(initialGuessData);
  };

  const isCorrectGuess = guessData.latestGuess === guessData.numberToGuess;

  const isGameOver =
    isCorrectGuess || guessData.numberOfGuesses === MAX_ATTEMPTS;

  return (
    <div>
      <h2>I'm thinking of a number from 1 to 100.</h2>
      <h2>
        Can you guess the number I am thinking of in {MAX_ATTEMPTS} tries?
      </h2>
      <GuessControl onGuess={handleGuess} />
      {isGameOver && <GameOver hasWon={isCorrectGuess} onReset={handleReset} />}
      {!isGameOver && (
        <GuessMessage
          guess={guessData.latestGuess}
          numberToGuess={guessData.numberToGuess}
          numberOfGuesses={guessData.numberOfGuesses}
        />
      )}
    </div>
  );
};

export default NumberGuessingGame;
