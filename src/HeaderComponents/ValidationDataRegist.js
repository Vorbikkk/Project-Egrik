 

const ValidationDataRegist = (user) => {

  
    if(user.userName.trim().length ===0){
       return 'не верно введено имя'
    }
    else if(!user.email.includes('@mail.ru') ){
      return 'не правильно введен e-mail'
      
    }
    else if(user.password.length ===0){
      return 'не правильно введен пароль'
      
    }
   
return true

};

export default ValidationDataRegist;