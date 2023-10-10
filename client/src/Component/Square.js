import React from "react";

function Square({ chooseSquare, val }) {
  return (
    <div style={{width:"100px",height:"100px"}}  className="bg-danger square" onClick={chooseSquare}>
      {val}
    </div>
  );
}

export default Square;
