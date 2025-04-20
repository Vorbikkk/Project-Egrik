import React from "react";
import {BrowserRouter} from 'react-router-dom'
import HeadersRouter from "./Routers/HeadersRouter";
import cl from './App.module.css'



function App() {
  return (
        <div className={cl.App}>
          <HeadersRouter/>
        </div>
  );
}

export default App;
