import React from "react"
import Die from "./Die.js"
import Navbar from "./Navbar.js"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


export default function App() {
    
    const [die , setDie] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    
    
    React.useEffect(() => {
        const allHeld = die.every(die => die.isHeld)
        const firstDie = die[0].value
        const allValue = die.every(die =>die.value === firstDie)
        if (allHeld && allValue)
        {
            setTenzies(true)
            console.log("you won")
        }
    }, [die])
    
    
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
        
    
    
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    
    
    
    function rollDie(){
        setDie(oldDie => oldDie.map(die => {
            return die.isHeld ?
                die :
                generateNewDie()
        }))
    }
    
    
    
    
    const dieElements = die.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDie={() => holdDie(die.id)} 
        /> 
    ))
    
    
    
    
    function holdDie(id){
        setDie(oldDie => oldDie.map(die =>{
            return die.id === id ?
                    {...die, isHeld : !die.isHeld} :
                    die
        }))
    }
    
    
    
    return (
        <>
        {tenzies && <Confetti />}
        <div className="nav-bar">
            <Navbar />
        </div>
        <main>
            <h1>Tenzies Game</h1>
            <p className="die-text">Roll untill are dies are same , Click the each die for change in number</p>
            <div className="die-container">
                {dieElements}
            </div>
            <button 
                onClick={rollDie} 
                className="button"
                >
                {tenzies ? "NewGame" : "Roll"}
                </button>
        </main>
        </>
    )
}