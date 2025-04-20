import {render,screen,fireEvent,act} from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { UserApi } from '../../rtk/Service/UserService'
import { Provider } from 'react-redux'
import App from '../../App'
import { configureStore } from '@reduxjs/toolkit'


jest.mock('../../rtk/Service/UserService')
 

describe('Roter Regist',()=>{

  beforeEach(()=>{
    let createUser=async ()=>{

    return  {  data:{
              token:'sdfsgvewv'
            }}
    }
      
   
    UserApi.useCreateUserMutation=jest.fn().mockReturnValue(
      [
        createUser
      ]
   )
  })


  it('go to page  edit_userProfile',async()=>{

    render(
         <MemoryRouter initialEntries={['/regist']}>
             <App/>
         </MemoryRouter>
    )
    
    const btnAddGroup=screen.getByText('Зарегистрироваться')
    const userNameInput=screen.getByTestId('userNameInput')
    const emailInput=screen.getByTestId('emailInput')
    const passwordInput=screen.getByTestId('passwordInput')
    

        fireEvent.change(userNameInput,{
     target:{
         value:'assdasd '
     }
  })
    fireEvent.change(emailInput,{
     target:{
         value:'assdasd@mail.ru '
     }
  })
    fireEvent.change(passwordInput,{
     target:{
         value:'assdasd'
     }
  })
 await act(async()=>{
  fireEvent.click(btnAddGroup)
 })

 expect(screen.getByTestId('EditUserProfile')).toBeInTheDocument()


    })

    //2 тест

    it('validate Email',async ()=>{
      render(
        <MemoryRouter initialEntries={['/regist']}>
            <App/>
        </MemoryRouter>
       )
       const btnAddGroup=screen.getByText('Зарегистрироваться')
      const userNameInput=screen.getByTestId('userNameInput')
      const emailInput=screen.getByTestId('emailInput')
      
      
      act(()=>fireEvent.change(userNameInput,{
           target:{
               value:'assdasdfsddsf '
           }
        }))
      
      act(()=>fireEvent.change(emailInput,{
           target:{
               value:'assdasdmail.ru '
           }
        }))
        await  act(async()=>{
          fireEvent.click(btnAddGroup)
         })
        expect(screen.getByText("не правильно введен e-mail")).toBeInTheDocument()

    })
 
})
 
