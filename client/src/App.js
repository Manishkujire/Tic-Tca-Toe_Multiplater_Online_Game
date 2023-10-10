import "./App.css";

import React, { useEffect, useState } from 'react'
import axios, { all } from "axios";
import { Chat, Channel } from "stream-chat-react";
import { StreamChat } from "stream-chat";

import Join from './Component/Join';
import Board from './Component/Board';
export default function App() {
  // const token = localStorage.getItem('token')
  // console.log('token: ', token);
  // if (!token) {
  // window.location.replace('https://codefrontend.com');
  // }
  const [result, setResult] = useState({ winner: "none", state: "none" });

  const [allPlayersJoined, setAllPlayersJoined] = useState(false)
  const [onlinePlayers, setOnlinePlayers] = useState([""])
  const [client,setClient] =useState(null) 

  const [opponentPlayer, setOpponentPlayer] = useState(false)
  const [opponentPlayerid, setOpponentPlayerid] = useState("")

  const toggleOpponetPlayerState = () => {
    setChannel(null);
    setOpponentPlayer(!opponentPlayer)
  }
  const logOut = () => {
    client.disconnectUser();
  };
  // console.log('onlinePlayers: ',onlinePlayers);
  const [userId,setUserid] = useState("s")
  const [api_key,setapi_key] = useState("sss")
  const [token,settoken] = useState("")
  let userName=localStorage.getItem("userName")
  useEffect(() => {
    axios.post("http://localhost:5001/create").then((res) => {
      let { api_key,
      userId,
       token} = res.data
       setUserid(userId)
       setapi_key(api_key)
       let client=StreamChat.getInstance(api_key)
       setClient(client)
       settoken(token)
       client
      .connectUser(
        {
          id: userId,
          name: userName,
        },
        token
      )

    })
    axios.get("http://localhost:5001/onlineplayers").then((res) => {
      let onlinePlayers  = res.data
      setOnlinePlayers(onlinePlayers)
      // console.log('onlinePlayers:',onlinePlayers);

    })
  }, [])
  const [channel, setChannel] = useState(null);

  if (client!=null) {
    console.log("toc",token);
    
  }
  const refreshPlayers = () => {

    axios.get("http://localhost:5001/onlineplayers").then((res) => {
      let  onlinePlayers  = res.data
      console.log('onlinePlayers: ', onlinePlayers);

      setOnlinePlayers(onlinePlayers)
      // console.log('onlinePlayers:',onlinePlayers);

    })
  }

const restartgame=async()=>{
  try {
    toggleOpponetPlayerState()

    const newChannel = await client.channel("messaging", {
      members: [client.userID, opponentPlayerid]
    });
    await newChannel.watch();
    setChannel(newChannel)
    setAllPlayersJoined(Channel.state.watcher_count == 2);
    console.log(allPlayersJoined);
  } catch (err) {
    console.log(err);
  }
}
  const opponentSelected = async (index) => {
    try {
      console.log("opp");
      toggleOpponetPlayerState()
      setOpponentPlayerid(onlinePlayers[index].id)
      const newChannel = await client.channel("messaging", {
        members: [client.userID, onlinePlayers[index].id]
      });
      console.log('newChannel: ', newChannel);
      console.log('user: ', client);
      await newChannel.watch();
      setChannel(newChannel);
      setAllPlayersJoined(newChannel.state.watcher_count == 2);
      console.log(allPlayersJoined);
    } catch (err) {
      console.log(err);
    }
  }

  console.log('channel: ', channel);
  if (channel != null) {
    console.log("in");
    channel.on("user.watching.start", (event) => {
      setAllPlayersJoined(event.watcher_count == 2);
      console.log(allPlayersJoined);
    });
  }
  return (
    <>{allPlayersJoined ? <Chat client={client}>
    <Channel client={client} channel={channel}>
      <Board  restartgame={restartgame} result={result} setResult={setResult} />
    </Channel> </Chat>  :
      <Join refreshPlayers={refreshPlayers} opponentSelected={opponentSelected} toggleOpponetPlayerState={toggleOpponetPlayerState} onlinePlayers={onlinePlayers} opponentPlayer={opponentPlayer} />}
    </>
  )
}
