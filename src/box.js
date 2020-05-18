import React from "react";
import ReactHtmlParser from "react-html-parser";
const is_snake = (x, y, corrd) => {
  for (let i = 0; i < corrd.length; i++) {
    if (corrd[i][0] === x && corrd[i][1] === y) {
      return true;
    }
  }
  return false;
};
const Box = (props) => {
  const snake = props.snake;
  const food = props.food;
  let p = "";
  for (let i = 0; i < props.height; i++) {
    p += "<div class='row justify-content-center'>";
    for (let j = 0; j < props.width; j++) {
        if(food && i===food[0] && j===food[1]){
          p += '<div style="width:30px;height:30px;border:1px solid black;background-color:yellow;" ></div>'

        }
     else if (is_snake(i, j, snake)) {
        p +=
          '<div style="width:30px;height:30px;background-color:red;"></div>';
      } else {
        p +=
          '<div style="width:30px;height:30px;border:1px solid black;background-color:black;"></div>';
      }
    }
    p += "</div>";
  }
  return <div className="p-4">{ReactHtmlParser(p)}</div>;
};

export default Box;
