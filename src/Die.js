import React from "react"

export default function Die(props){

  const style = {
    backgroundColor:props.isHeld?"lightgreen":"white"
  }
  return(
    <div style={style} onClick={props.holdDice} className="dice"><img src={props.image} alt={'Dice Image'+props.value}/></div>
  )
}