import React from 'react'
import Opponents from './Opponents';
import WaitingOpponent from './WaitingOpponent';
import refresh from "../img/refresh.png"
import cancel from "../img/cancel.png"
export default function Join({onlinePlayers,toggleOpponetPlayerState,opponentSelected,opponentPlayer,refreshPlayers}) {
    return (
        <><div className='d-flex justify-content-center align-items-center' style={{ backgroundColor: "#edf8ff", height: "100dvh" }}>
            <div className='w-75 h-75 rounded-4' style={{ boxShadow: "0.6em 0.6em 1.2em #d2dce9, -0.5em -0.5em 1em #ffffff" }}>
                <div className='row'  >
                    <div className="col-sm-12 ">
                        <div className="rounded  h-100 p-4">
                            <div className='d-flex pb-3'>
                                <div className="w-75"><h5 className='text-center'>Select Opponent</h5></div>
                                <div className='w-25'>
                                    <div className='align-items-center justify-content-center w-100 d-flex'>
                                        {opponentPlayer ? (<img width={50} onClick={toggleOpponetPlayerState} className='btn-danger  border btn' src={cancel} alt="refresh--v1" />) : (<img onClick={refreshPlayers} className='border btn btn-success' width={50} src={refresh} alt="refresh--v1" />)}

                                    </div>
                                </div>
                            </div>
                            {opponentPlayer ? <WaitingOpponent /> :
                                <Opponents onlinePlayers={onlinePlayers}
                                opponentSelected={opponentSelected} />}
                        </div>
                    </div>
                </div>
            </div>
        </div></>
    )
}
