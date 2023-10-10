import React from 'react'

export default function List({opponentSelected,name,index}) {
    
  return (
    <li onClick={()=>{opponentSelected(index)}} className="list-group-item bg-transparent">{name}</li>
  )
}
