import Card from './Card'
import React, { useEffect, useState } from "react";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import Square from "./Square";
import { Patterns } from "../WinningPatterns";
export default function To() {
  return (
    <div className="" style={{height:"100dvh"}} >
      <div className="row p-2 g-2 p-2 justify-content-center align-items-center  bg-light h-50">
       <Card/>
       <Card/>
       <Card/>
       <Card/>
       <Card/>
       <Card/>
       <Card/>
       <Card/>
       <Card/>
      </div>
    </div>
  )
}
