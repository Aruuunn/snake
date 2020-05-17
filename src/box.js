import React from 'react'
import ReactHtmlParser from 'react-html-parser';
const is_snake = (x,y,corrd) => {
    for(let i=0;i<corrd.length;i++){
        if(corrd[i][0]==x && corrd[i][1]==y){
            return true
        }
    }
    return false;
} 
const Box = (props) => {
    const snake = [[6,10],[7,10],[8,10],[9,10],[9,11],[9,12],[10,12],[11,12]]
    const food = [5,10];
    let p = "";
  for(let i=0;i<20;i++){
   p += "<div class='row'>"
      for(let j=0;j<30;j++){
        
          if(i===food[0] && j===food[1]){
            p += '<div style="width:30px;height:30px;border:1px solid black;background-color:yellow;" ></div>'
  
          }
          else if(is_snake(i,j,snake)){
            p += '<div style="width:30px;height:30px;background-color:red;"></div>'
  
          }
          else
{   p += '<div style="width:30px;height:30px;border:1px solid green;background-color:black;"></div>'
}    }
      p += "</div>";
  }
  return (
        <div className="container p-4">
           {  ReactHtmlParser(p)}
    
        </div>
    )
}

export default Box;
