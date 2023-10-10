import React, { useState } from 'react'
import { useChannelStateContext, useChatContext } from "stream-chat-react";

export default function Result({ restartgame, setBoard, setResult, result }) {
    const { channel } = useChannelStateContext();
    const { client } = useChatContext();
    const [playAgain, setPlayAgain] = useState(false)
    const [oppplayAgain, oppsetPlayAgain] = useState(false)
    const toggleplay = () => {
        setPlayAgain(!playAgain)
    }
    const btnPlayAgain = async () => {
        toggleplay()

        await channel.sendEvent({
            type: "game-restart",
            data: { playAgain }
        });
    }
    channel.on((event) => {
        if (event.type == "game-restart" && event.user.id !== client.userID) {
            const opp = event.data.playAgain
            oppsetPlayAgain(!opp)
           

        }

    });
    if (playAgain == true && oppplayAgain == true) {
        setBoard(["", "", "", "", "", "", "", "", ""])
        setResult({ winner: "none", state: "none" })
        setPlayAgain(false)
        oppsetPlayAgain(false)
        restartgame()
    }
    return (
        <div>
            <label>status</label><span>{result.state}</span>
            <span className={playAgain ? "bg-success" : "bg-danger"}>X</span>
            <span className={oppplayAgain ? "bg-success" : "bg-danger"} >y</span>
            <button onClick={btnPlayAgain} className='btn bt-primary'>restatrt?</button>
        </div>
    )
}
