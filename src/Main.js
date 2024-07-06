import React,{useState,useEffect} from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import diceImages from "./diceImages"
 

 export default function Main(){

  const [diceArray,setDiceArray] = useState(allNewDice())

  const [tenzis,setTenzis] = useState(false)

  

 useEffect(()=>{
  
  const number = diceArray[0].value
  let win = true
  for(let i=0;i<diceArray.length;i++){
    if(diceArray[i].value!==number || diceArray[i].isHeld!==true){
        win=false
    }
  }
  if(win===true){
    setTenzis(true)
  } 

 },[diceArray])  

  function generateNewDice(){
    const number = Math.floor(Math.random()*6)+1
    let imageLink = ''
    for(let i=0;i<diceImages.length;i++){
      if(diceImages[i].id===number){
        imageLink = diceImages[i].imageLink
        break
      }
    }
      return {value:number,isHeld:false,id:nanoid(),image:imageLink}
  }

  function allNewDice(){
    
    const arrayNumbers = new Array(10)
    for(let i=0;i<arrayNumbers.length;i++){
      
        arrayNumbers[i] = generateNewDice()
    }
    return arrayNumbers
  }

  function rollDice(){
    if(tenzis){
      setDiceArray(allNewDice())
      setTenzis(false)
    }
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


  const diceElements = diceArray.map(diceObject => <Die key={diceObject.id} value={diceObject.value}  isHeld={diceObject.isHeld} image={diceObject.image}  holdDice={()=>holdDice(diceObject.id)} />)
  
  const {width,height} = useWindowSize()

  
  
  return (
    <main>
       {tenzis && <Confetti width={width} height={height}/>}
      <h1 className="title">Tenzis</h1>
      <p className="details">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button onClick={rollDice}  className="roll-button">{tenzis?"New Game":"Roll"}</button>
    </main>
    
  )
}