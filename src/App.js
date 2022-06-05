// Import CSS Styles
import "./App.css";
// Import Components
import Die from "./components/die";
//Import React
import React, { useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  ///Generate State
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [currentScore, setCurrentScore] = React.useState(0)
  const [highScore, setHighScore] = React.useState(0)
  // Use Effect to check for game win
  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allEqual = dice.every((die) => die.value === firstValue);
    if (allEqual && allHeld) {
      setTenzies(true);
    }
  }, [dice]);
  // Generate new die - helper function
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  // Creates 10 new die
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }
  // Roll dice - boolean controls flow of game
  function rollDice() {
    if (!tenzies) {
      setCurrentScore(currentScore => currentScore + 1)
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
      if(highScore === 0 || currentScore < highScore) {
        setHighScore(currentScore)
      }
      setCurrentScore(0)
    }
  }
  // Holds selected die
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  // Renders dice elements
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));
  // Returns game
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="game__grid">{diceElements}</div>
      <div className="bottom__features">
        <button className="roll__btn" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
        <div className="score">
          <h4>Score: {currentScore}</h4>
          <h4>High Score: {highScore}</h4>
        </div>
      </div>
    </main>
  );
}

export default App;
