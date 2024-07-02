import React from "react"

export default function Die(props){

  const style = {
    backgroundColor:props.isHeld?"lightgreen":"white"
  }
  return(
    <div style={style} onClick={props.holdDice} className="dice">{props.value}</div>
  )
}