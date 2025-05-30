import React, { useState, useEffect } from "react";
import { BrowserRouter } from 'react-router-dom'
import HeadersRouter from "./Routers/HeadersRouter";
import ModalDefault from "./Modal/ModalDefault";
import Authentificate from "./Form/Authentificate/Authentificate";
import { useDispatch,useSelector } from "react-redux";
import { installUser,giveUser } from "./RTK/app/Slice/SliceUser";
import cl from './App.module.css'



function App() {

  const [activeAuth, setActiveAuth] = useState(true)
  const [boolAuth, setBoolAuth] = useState()
  const dispatch=useDispatch()


  useEffect(() => {
    checkAuth()
  }, [])

    useEffect(() => {
  if (boolAuth && !boolAuth.auth && boolAuth.user) {
    dispatch(installUser(boolAuth.user));
  }
}, [boolAuth]);


  const checkAuth = async () => {
    const response = await fetch('http://localhost:5000/api/user/checkToken', {
      credentials: 'include',
    })
    await response.json()
      .then((data) => {
        console.log(data)
        setBoolAuth(data)
      }
      )
  }

  if (boolAuth?.auth) {
    return <ModalDefault active={activeAuth} setActive={setActiveAuth} >
      <Authentificate setActive={setActiveAuth} />
    </ModalDefault>
  }
  else{
     return (
    <div className={cl.App}>
      <HeadersRouter />
    </div>
  );
  }



 
}

export default App;
