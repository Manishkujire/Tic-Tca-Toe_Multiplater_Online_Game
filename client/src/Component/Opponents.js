import React from 'react'
import List from './List'

export default function Opponents({onlinePlayers,opponentSelected}) {
    return (<>
        <ul className="list-group overflow-auto" style={{ maxHeight: "450px" }}>
            {onlinePlayers.length > 0 ? onlinePlayers.map((ele,index) => {
                return (<List opponentSelected={opponentSelected} index={index} name={ele.name}/>)
            }) : (<li className="list-group-item bg-transparent">No Online Players</li>
            )}
        </ul></>
    )
}
