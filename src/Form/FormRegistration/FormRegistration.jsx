import React, { useRef, useState,useEffect } from 'react';
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
  const {data,}=UserApi.useGetUsersQuery()
  const [deleteUser,]=UserApi.useDeleteUserMutation()
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
    let user_valid = ValidationDataRegist(User)

    if (typeof user_valid !== 'string') {
      await createUser(User) 
      .then((data)=>{
        console.log(data)
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
    <div className={cl.registrationPage}>
    <form className={cl.formContainer} method="post">
      <h2 className={cl.formTitle}>Регистрация</h2>
      
      <div className={cl.formGroup}>
        <label className={cl.formLabel} htmlFor="username">Имя пользователя:</label>
        <MyInput 
          className={cl.formInput}
          data-testid="userNameInput"  
          value={userName} 
          onChange={(e) => changeField(e.target.value, setUserName)} 
          type="text" 
          name="username" 
          required 
        />
      </div>

      <div className={cl.formGroup}>
        <label className={cl.formLabel} htmlFor="email">Email:</label>
        <MyInput 
          className={cl.formInput}
          data-testid="emailInput" 
          value={email} 
          type="email" 
          onChange={(e) => changeField(e.target.value, setEmail)} 
          name="email" 
          required 
          autoComplete="email" 
        />
      </div>

      <div className={cl.formGroup}>
        <label className={cl.formLabel} htmlFor="password">Пароль:</label>
        <div className={cl.passwordContainer}>
          <MyInput 
            className={`${cl.formInput} ${cl.passwordInput}`}
            data-testid="passwordInput" 
            value={password}
            type={typePassword ? 'password' : 'text'}
            onChange={(e) => changeField(e.target.value, setPassword)}
            name="password"
            required 
            autoComplete="new-password"
          />
          <button className={cl.togglePassword} onClick={(e) => OpenPassword(e)}>
            {typePassword ? '🔒' : '👁️'}
          </button>
        </div>
      </div>

      {errorField && <p className={cl.errorMessage}>{errorField}</p>}

      <button className={cl.submitButton} onClick={(e) => sendFormRegistration(e)}>
        Зарегистрироваться
      </button>

      <div className={cl.additionalLinks}>
        Уже есть аккаунт? <a href="/login">Войти</a>
      </div>
    </form>
  </div>
  )
};

export default Registration;