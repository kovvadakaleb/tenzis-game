import React,{useState,useEffect} from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import diceImages from "./diceImages"
import diceSound from './sounds/dice-sound.wav'
import winSound from './sounds/winnig-sound.wav'
 
const winAudio = new Audio(winSound)

const audio = new Audio(diceSound)

 export default function Main(){

  const [diceArray,setDiceArray] = useState(allNewDice())

  const [tenzis,setTenzis] = useState(false)

  const [rollEffect,setRollEffect] = useState(false)

  const [timer,setTimer] = useState(0)

  const [hours,setHours] = useState(0)

  const [minutes,setMinutes] = useState(0)

  const [seconds,setSeconds] = useState(0)
  

  useEffect(()=>{
    let interval;
    if(!tenzis){
      interval = setInterval(()=>{
        setTimer(prevTimer => prevTimer+1)
      },1000)
    }
    return ()=>clearInterval(interval)
  },[tenzis])

  useEffect(()=>{
      const hours = Math.floor(timer/3600)
      const minutes = Math.floor((timer%3600)/60)
      const seconds = timer%60

      setHours(hours)
      setMinutes(minutes)
      setSeconds(seconds)

      
      
  },[timer])
  

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
    
    winAudio.loop=true
    winAudio.play()
   
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
      
      winAudio.loop = false
      winAudio.pause()
      winAudio.currentTime = 0

      setTimer(0)
    }
    else{
        setRollEffect(true)

        
        audio.currentTime = 0
        audio.play()
        setTimeout(()=>{

          setDiceArray(oldDice => oldDice.map(dice=>{
              if(dice.isHeld){
              return dice
              }
              else{
              return generateNewDice()
              }
          }))
          audio.pause()
          setRollEffect(false)

        },1000)
  }
  }

  
  function holdDice(id){
    setDiceArray(oldDice => oldDice.map(dice => {
      return dice.id===id?{...dice,isHeld:!dice.isHeld}:dice
    }))
  }


  const diceElements = diceArray.map(diceObject => <Die key={diceObject.id} value={diceObject.value}  isHeld={diceObject.isHeld} image={diceObject.image}  holdDice={()=>holdDice(diceObject.id)}  rollEffect={rollEffect} />)
  
  const {width,height} = useWindowSize()

  
  
  return (
    <main>
       {tenzis && <Confetti width={width} height={height}/>}
          <h1 className="title">Tenzis</h1>
          <div className="timer"><h2>Timer</h2>:{String(hours).padStart(2,'0')}:{String(minutes).padStart(2,'0')}:{String(seconds).padStart(2,'0')}s</div>
          <p className="details">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="dice-container">
            {diceElements}
          </div>
          <button onClick={rollDice}  className="roll-button">{tenzis?"New Game":"Roll"}</button>
      
    </main>
    
  )
}