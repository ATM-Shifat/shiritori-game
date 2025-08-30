import { useEffect, useState } from "react"
import axios from "axios"
import clsx from "clsx"

export default function PlayerInput({playerName,turn, changeTurn, disabled = false, currentletter="", data=[]}){
    const [inputText, setInputText] = useState("")

    useEffect(() => {
        setInputText(currentletter)
    }, [currentletter])

    const handleSubmit = () => {
        if(inputText.trim()){
            const index = data.findIndex(item => item.toLowerCase() === inputText.toLowerCase())
            if(index === -1){
                changeTurn({
                    text: inputText.charAt(0).toUpperCase() + inputText.slice(1), 
                    next: turn === 0 ? 1 : 0
                })
                setInputText("")
            }

        }
        
    }

    return(
        <div className={clsx(
            "text-gray-500 text-[1rem] w-[25rem] h-fit bg-gray-200 flex flex-col gap-5 p-[2rem] rounded-[0.5rem]",
            disabled ? "opacity-[0.5]" : " opacity-[1]"
        )}>
            <div className="flex justify-between">
                <p>{playerName}</p>
                <p>{data.length}</p>
            </div>
            <form action={handleSubmit}
                className="flex flex-col gap-4 items-start"
                >
                <label> Enter Text</label>
                <input 
                value={inputText}
                disabled={disabled}
                autoFocus={true}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full px-[0.5rem] border rounded-[0.5rem] h-[3rem] border-gray-400 focus:outline-none focus:border-blue-400"
                name="text" type="Text"/>
                <button type="submit"
                    disabled={disabled}
                    className="h-[3rem] px-[2rem] rounded-[0.5rem] text-[1rem] text-gray-500 bg-white"
                 >
                    Click
                </button>
            </form>
            <div className="h-[100px] overflow-y-auto flex flex-col gap-[0.5rem]">
                {data.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>

        </div>
    )
}