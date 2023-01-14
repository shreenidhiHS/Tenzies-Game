import React from "react"

export default function Die(props){
    
     
    const style = {
        backgroundColor : props.isHeld ? "red" : "transparent"
    } 
    
    
    return(
        <div style={style} onClick={props.holdDie} className="Die-face">
            <h1 className="die-num">{props.value}</h1>
        </div>
    )
}