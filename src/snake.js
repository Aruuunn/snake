/* eslint-disable no-loop-func */
import React, { Component } from "react";
import Box from "./box";
import { withCookies } from 'react-cookie';
 
export class SnakeGame extends Component {
  constructor(props){
    super(props);
    const { cookies } = props;
    
    this.state = {
      score: 0,
      food: [0,0],
      height: 20,
      width: 30,
      dir: null,
      flag: true,
      snake: [[10, 15]],
      lose:false,
      speed:100,
      highScore: cookies.get('HighScore') || 0
    };
  }
 calcHighScore = () => {
   if(this.state.score > this.state.highScore){
    const { cookies } = this.props;
   this.setState({highScore:this.state.score})
    cookies.set('HighScore',this.state.score , { path: '/' });
  }
 }
  generateFood = () => {
    let x = Math.floor(Math.random()*this.state.width);
    let y = Math.floor(Math.random()*this.state.height);
    
    while(this.state.snake.reduce((t,c)=>{
      if(c[0]===y && c[1]===x){
        return true;
      }
      else return t;
    },false)) {
      // eslint-disable-next-line no-lone-blocks
      {
        x = Math.floor(Math.random()*this.state.width);
       y = Math.floor(Math.random()*this.state.height);
     }
    }
   this.setState({food:[y,x]})
   
  }
  componentDidMount() {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 38) {
        if (this.state.dir !== "DOWN") {
          this.setState({ dir: "UP" });
        }
      } else if (e.keyCode === 37) {
        // console.log("you pushed left");
        if (this.state.dir !== "RIGHT") {
          this.setState({ dir: "LEFT" });
        }
      } else if (e.keyCode === 39) {
        //  console.log("you pushed right");
        if (this.state.dir !== "LEFT") {
          this.setState({ dir: "RIGHT" });
        }
      } else if (e.keyCode === 40) {
        //  console.log("you pushed down");
        if (this.state.dir !== "UP") {
          this.setState({ dir: "DOWN" });
        }
      }
    });
    this.generateFood();
  }
  is_snake = (y,x) => {
    return this.state.snake.reduce((t,c)=>{
      if(c[0]===y&&c[1]===x){
        return true
      }
      else return t;
    },false)
  }

  componentDidUpdate(prevProps, prevState) {
    
   
    if (this.state.dir && this.state.flag && !this.state.lose) {
      if (this.state.dir === "UP") {
        setTimeout(() => {
          let newSnake = [...this.state.snake];
          newSnake.pop();
          if (this.state.snake[0][0] === 0) {
            newSnake.unshift([this.state.height - 1, this.state.snake[0][1]]);
          } else {
            newSnake.unshift([
              this.state.snake[0][0] - 1,
              this.state.snake[0][1],
            ]);
          }
          if (
            this.state.food[0] === newSnake[0][0] &&
            this.state.food[1] === newSnake[0][1]
          ) {
            newSnake.push([newSnake[newSnake.length-1][0]+1,newSnake[newSnake.length-1][1]])
            this.generateFood();
            this.setState(state => ({ snake: newSnake, flag: true,score:state.score+10 }));
          } 
          else if(this.is_snake(...newSnake[0])){
             this.setState({lose:true})
           }
           else this.setState({ snake: newSnake, flag: true });
          
        }, this.state.speed);
        this.setState({ flag: false });
      } else if (this.state.dir === "DOWN") {
        setTimeout(() => {
          let newSnake = [...this.state.snake];
          newSnake.pop();
          if (this.state.snake[0][0] === this.state.height - 1) {
            newSnake.unshift([0, this.state.snake[0][1]]);
          } else {
            newSnake.unshift([
              this.state.snake[0][0] + 1,
              this.state.snake[0][1],
            ]);
          }
          if (
            this.state.food[0] === newSnake[0][0] &&
            this.state.food[1] === newSnake[0][1]
          ) {
            newSnake.push([newSnake[newSnake.length-1][0]-1,newSnake[newSnake.length-1][1]])
            this.generateFood();
            this.setState(state => ({ snake: newSnake, flag: true,score:state.score+10 }));
          } 
           else if(this.is_snake(...newSnake[0])){
            this.setState({lose:true})
          }
          else this.setState({ snake: newSnake, flag: true });
        }, this.state.speed);
        this.setState({ flag: false });
      } else if (this.state.dir === "LEFT") {
        setTimeout(() => {
          let newSnake = [...this.state.snake];
          newSnake.pop();
          if (this.state.snake[0][1] === 0) {
            newSnake.unshift([this.state.snake[0][0], this.state.width - 1]);
          } else {
            newSnake.unshift([
              this.state.snake[0][0],
              this.state.snake[0][1] - 1,
            ]);
          }
          if (
            this.state.food[0] === newSnake[0][0] &&
            this.state.food[1] === newSnake[0][1]
          ) {
            newSnake.push([newSnake[newSnake.length-1][0],newSnake[newSnake.length-1][1]+1])
            this.generateFood();
            this.setState(state => ({ snake: newSnake, flag: true,score:state.score+10 }));
          } 
          else if(this.is_snake(...newSnake[0])){
            this.setState({lose:true})
          }
          else this.setState({ snake: newSnake, flag: true });
        }, this.state.speed);
        this.setState({ flag: false });
      } else if (this.state.dir === "RIGHT") {
        setTimeout(() => {
          let newSnake = [...this.state.snake];
          newSnake.pop();
          if (this.state.snake[0][1] === this.state.width - 1) {
            newSnake.unshift([this.state.snake[0][0], 0]);
          } else {
            newSnake.unshift([
              this.state.snake[0][0],
              this.state.snake[0][1] + 1,
            ]);
          }
          if (
            this.state.food[0] === newSnake[0][0] &&
            this.state.food[1] === newSnake[0][1]
          ) {
            newSnake.push([newSnake[newSnake.length-1][0],newSnake[newSnake.length-1][1]-1])
            this.generateFood();
            this.setState(state => ({ snake: newSnake, flag: true,score:state.score+10 }));
          } 
         else  if(this.is_snake(...newSnake[0])){
            this.setState({lose:true})
          }
          else this.setState({ snake: newSnake, flag: true });
        }, this.state.speed);
        this.setState({ flag: false });
      }
    }
  }
  render() {
    if(this.state.lose){
      this.calcHighScore()
    }
    return (
      <div>
        <h1>
          Score  : {this.state.score}
          <br/>
          High Score : {this.state.highScore}
        </h1>
        <Box
          snake={this.state.snake}
          width={this.state.width}
          height={this.state.height}
          food={this.state.food}
        />
      </div>
    );
  }
}

export default withCookies(SnakeGame);
