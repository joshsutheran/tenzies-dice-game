// Import CSS Styles
import './App.css';
// Import Components
import Die from './components/die';
//Import React
import React, { useState } from 'react'
import {nanoid} from 'nanoid'

function App() {
  const [dice, setDice] = useState(allNewDice())

  function allNewDice() {
    let newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: true,
        id: nanoid()
      })
    }
    return newDice
  }

  function handleRollClick() {
    setDice(allNewDice())
  }

  function holdDice(id) {
  }

  const diceElements = dice.map(die => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
))

  return (
    <main>
      <div className='game__grid'>
        {diceElements}
      </div>
      <button onClick={handleRollClick} className='roll__btn'>Roll</button>
    </main>
  );
}

export default App;
