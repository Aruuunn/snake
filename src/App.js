import React from "react";
import { CookiesProvider } from 'react-cookie';
import SnakeGame from "./snake";

function App() {
  return (
    <CookiesProvider>
     <SnakeGame />
    </CookiesProvider>
  );
}

export default App;
