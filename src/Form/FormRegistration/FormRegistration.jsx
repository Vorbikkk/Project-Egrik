import React, { useRef, useState } from 'react';
import cl from './FormRegistration.module.css'
import MyButton from '../../UI/MyButton/MyButton'
import MyInput from '../../UI/MyInput/MyInput';
import ValidationDataRegist from '../../HeaderComponents/ValidationDataRegist';
import { useNavigate } from 'react-router-dom';
import  {UserApi}  from '../../RTK/Service/UserService';

const Registration = () => {

  const [userName, setUserName] = useState('вмв')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [typePassword, setTypePassword] = useState(true)
  const [errorField, setErrorField] = useState('')
  const [createUser] = UserApi.useCreateUserMutation()
  const navigate = useNavigate()

  
  const sendFormRegistration = async (e) => {
    e.preventDefault()
    const User = {
      id: new Date().getTime(),
      userName: userName,
      password: password,
      email: email,
    }
      console.log(User)
    let user_valid = ValidationDataRegist(User)

    if (typeof user_valid !== 'string') {
     await createUser(User) 
    .then((data)=>{
       if(data && data.data && data.data.token){
         navigate("/edit_userProfile")
        }
        else{
          setErrorField(data.error.data.message)
        }
      })
       .catch((error)=>{
        console.log('error',error)}
       )
      
    }
    else {
      setErrorField(user_valid)
    }

  }

  const OpenPassword = (e) => {
    e.preventDefault()
    setTypePassword(prev => !prev)
  }

  const changeField = (value, setter) => {
    setter(value)
    setErrorField('')
  }



  return (
    <div>
      <form className={cl.FormRegistration} method="post">
        <label for="username">Имя пользователя:</label>
        <MyInput  data-testid="userNameInput"  value={userName} onChange={(e) => changeField(e.target.value, setUserName)} type="text" name="username" required />

        <label for="email">Email:</label>
        <MyInput  data-testid="emailInput" value={email} type="email" onChange={(e) => changeField(e.target.value, setEmail)} name="email" required autocomplete="email" />

        <label for="password">Пароль:</label>
        <div>
          <MyInput data-testid="passwordInput" 
            value={password}
            type={typePassword ? 'password' : 'text'}
            onChange={(e) => changeField(e.target.value, setPassword)}
            name="password"
            required autocomplete="new-password"
          />


          <MyButton onClick={(e) => OpenPassword(e)}>open</MyButton>
        </div>
        <p style={{ color: 'red' }}>{errorField}</p>
        <MyButton className={cl.registr_btn} onClick={(e) => sendFormRegistration(e)}>Зарегистрироваться</MyButton>
      </form>

    </div>
  )
};

export default Registration;