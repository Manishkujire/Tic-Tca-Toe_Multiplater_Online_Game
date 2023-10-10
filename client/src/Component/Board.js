import React, { useEffect, useState } from "react";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import Card from "./Card";
import { Patterns } from "../WinningPatterns";

import Result from "./Result";
function Board({setOpponentPlayerid, result,restartgame, setResult }) {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("X");
  const [turn, setTurn] = useState("X");

  const { channel } = useChannelStateContext();
  const { client } = useChatContext();

  useEffect(() => {
    checkIfTie();
    checkWin();
  }, [board]);
  const chooseSquare = async (Card) => {
    if (turn === player && board[Card] === "") {
      setTurn(player === "X" ? "O" : "X");

      await channel.sendEvent({
        type: "game-move",
        data: { Card, player },
      });
      setBoard(
        board.map((val, idx) => {
          if (idx === Card && val === "") {
            return player;
          }
          return val;
        })
      );
    }
  }
  const checkWin = () => {
    console.log(board);
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer == "") return;
      // console.log('firstPlayer: ', firstPlayer);
      let foundWinningPattern = true
      console.log("line");
      currPattern.forEach((idx) => {
        console.log('ele',idx,board[idx]);
        // console.log('currPattern: ', currPattern);
        if (board[idx] != firstPlayer) {
          foundWinningPattern = false;

        }
      });
      console.log('foundWinningPattern: ', foundWinningPattern);

      if (foundWinningPattern) {
        setResult({ winner: board[currPattern[0]], state: "won" });
      }
    });
  };

  const checkIfTie = () => {
    let filled = true;
    board.forEach((Card) => {
      if (Card == "") {
        filled = false;
      }
    });

    if (filled) {
      setResult({ winner: "none", state: "tie" });
    }
  };

  channel.on((event) => {
    if (event.type == "game-move" && event.user.id !== client.userID) {
      const currentPlayer = event.data.player === "X" ? "O" : "X";
      setPlayer(currentPlayer);
      setTurn(currentPlayer);
      setBoard(
        board.map((val, idx) => {
          if (idx === event.data.Card && val === "") {
            return event.data.player;
          }
          return val;
        })
      );
    }
  });
 console.log(result);
  return (result.state==("won"||"tie")?<Result  restartgame={restartgame} setBoard={setBoard} setResult={setResult} result={result}/>:(
    <div className="" style={{height:"100dvh"}} >
      <div className="row p-2 g-2 p-2 justify-content-center align-items-center  bg-light h-50">
       <Card
          
          val={board[0]}
          chooseSquare={() => {
            chooseSquare(0);
          }}
        />
          
        <Card
          val={board[1]}
          chooseSquare={() => {
            chooseSquare(1);
          }}
        />
        <Card
          val={board[2]}
          chooseSquare={() => {
            chooseSquare(2);
          }}
        />
    
        <Card
          val={board[3]}
          chooseSquare={() => {
            chooseSquare(3);
          }}
        />
        <Card
          val={board[4]}
          chooseSquare={() => {
            chooseSquare(4);
          }}
        />
        <Card
          val={board[5]}
          chooseSquare={() => {
            chooseSquare(5);
          }}
        />
     
        <Card
          val={board[6]}
          chooseSquare={() => {
            chooseSquare(6);
          }}
        />
        <Card
          val={board[7]}
          chooseSquare={() => {
            chooseSquare(7);
          }}
        />
        <Card
          val={board[8]}
          chooseSquare={() => {
            chooseSquare(8);
          }}
        />
      </div>
    </div>)
  );
}

export default Board;
