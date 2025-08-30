import { useState } from 'react'
import './App.css'
import PlayerInput from './components/playerInput'
import axios from 'axios'

function App() {
  const [turn, setTurn] = useState(0)
  const [current, setCurrent] = useState("")
  const [winner, setWinner] = useState("none")

  const [firstData, setFirstData] = useState([])
  const [secondData, setsecondData] = useState([])
  

  const submit = async (data) => {
    console.log(data)

    try{
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${data.text}`)
      console.log(response)
      if(data.next === 1){
        setFirstData([...firstData, data.text])
      }else{
        setsecondData([...secondData, data.text])
      }
      setCurrent(data.text)
      setTurn(data.next)
    }catch(err){
      if(err?.status === 404){
        setWinner(turn !== 0 ? "First Player" : "Second Player")
        setTurn(3)
      }
      console.error(err)
    }
  }

  return (
    <div
      className='flex gap-[3rem] items-center'
    >
      <PlayerInput 
        playerName = "Player 1" 
        changeTurn={submit} 
        turn={turn} 
        disabled={turn != 0} 
        data={firstData} 
        currentletter={ turn === 0 ?  current.charAt(current.length-1).toUpperCase() : ""}/>
      <div className='w-[10rem] h-[10rem] p-[1rem] bg-blue-100 rounded-[1rem] flex flex-col gap-[0.5rem] justify-center'>
        <p className='text-[1rem] text-gray-700'>{winner === "none" ? "no one won": `${winner} is the winner`}</p>
      </div>
      <PlayerInput 
        playerName = "Player 2" 
        changeTurn={submit} 
        turn={turn} 
        disabled={turn != 1} 
        data={secondData} 
        currentletter={turn === 1 ? current.charAt(current.length-1).toUpperCase() : ""}/>
    </div>
  )
}

export default App
