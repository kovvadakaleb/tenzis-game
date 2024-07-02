import React,{useState} from "react"
import Die from "./Die"
import { nanoid } from "nanoid"

 export default function Main(){

  const [diceArray,setDiceArray] = useState(allNewDice())

  function generateNewDice(){
    return {value:Math.floor(Math.random()*6)+1,isHeld:false,id:nanoid()}
  }

  function allNewDice(){
    
    const arrayNumbers = new Array(10)
    for(let i=0;i<arrayNumbers.length;i++){
      
        arrayNumbers[i] = generateNewDice()
    }
    return arrayNumbers
  }

  function rollDice(){
    setDiceArray(oldDice => oldDice.map(dice=>{
      if(dice.isHeld){
        return dice
      }
      else{
        return generateNewDice()
      }
    }))
  }

  
  function holdDice(id){
    setDiceArray(oldDice => oldDice.map(dice => {
      return dice.id===id?{...dice,isHeld:!dice.isHeld}:dice
    }))
  }


  const diceElements = diceArray.map(diceObject => <Die key={diceObject.id} value={diceObject.value} isHeld={diceObject.isHeld} holdDice={()=>holdDice(diceObject.id)} />)
  
  return (
    <main>
      <div className="dice-container">
        {diceElements}
      </div>
      <button onClick={rollDice} className="roll-button">Roll</button>
    </main>
    
  )
}