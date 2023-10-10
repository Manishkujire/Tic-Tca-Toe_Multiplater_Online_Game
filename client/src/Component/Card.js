import React from 'react'
import xMark from '../img/X_modified-100x100.png'
import oMark from '../img/o_modified-100x100.png'
import blank from '../img/100x100_black_and_white_pixels.png'
import "../App.css"
export default function Card({ chooseSquare, val }) {
  return (
    <div className='col-4'>
        {/* <div className='box' style={{minHeight:"100%"}}></div> */}
        <img className='box border rounded-5' src={val=="O"?oMark:val=="X"?xMark:blank} style={{boxShadow: "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;"}} onClick={chooseSquare}/>
    </div>)
}
