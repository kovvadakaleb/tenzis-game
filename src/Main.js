import React,{useState} from "react"
import Die from "./Die"

 export default function Main(){

  const [diceArray,setDiceArray] = useState(allNewDice())

  

  function allNewDice(){
    
    const arrayNumbers = new Array(10)
    for(let i=0;i<arrayNumbers.length;i++){
      let number = Math.floor(Math.random()*6)+1
        arrayNumbers[i] = number
    }
    return arrayNumbers
  }

  function rollDice(){
    setDiceArray(allNewDice())
  }


  const diceElements = diceArray.map(value => <Die value={value} />)
  
  return (
    <main>
      <div className="dice-container">
        {diceElements}
      </div>
      <button onClick={rollDice} className="roll-button">Roll</button>
    </main>
    
  )
}