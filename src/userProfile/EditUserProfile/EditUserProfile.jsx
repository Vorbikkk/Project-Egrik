import React, { useState } from 'react';
import cl from './EditUserProfile.module.css'
import MyInput from '../../UI/MyInput/MyInput';
import MyButton from '../../UI/MyButton/MyButton';

const EditUserProfile = (user) => {

    const [nameUser, setNameUser] = useState(user.userName)
    const [lastName, setLastName] = useState(user.LastName)
    const [firstName, setFirstName] = useState(user.firstName)
    const [birthDate, setBirthDate] = useState(user.birthDate)
    const [email, setEmail] = useState(user.email)
    const [city, setCity] = useState(user.city)
    const [country, setCountry] = useState(user.country)


    
    return (
        <div data-testid='EditUserProfile' className={cl.block_edit}>
            <label className={cl.box_inline}>Имя:<MyInput placeholder='ваше имя' className={cl.field_size} value={firstName} onChange={(e) => setFirstName(e.target.value)} /></label>
            <label className={cl.box_inline}>Фамилия:<MyInput placeholder='ваша Фамилия' className={cl.field_size} value={lastName} onChange={(e) => setLastName(e.target.value)} required autocomplete="email" /></label>
            <label  className={cl.box_inline}>e-mail:
                <MyInput
                type='email' 
                className={cl.field_size}
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required autocomplete="email"
                />
            </label>
            <label className={cl.box_inline}>Никнэйм:<MyInput placeholder='никнэйм' className={cl.field_size} value={nameUser} onChange={(e) => setNameUser(e.target.value)} /></label>
            <label className={cl.box_inline}>дата рождения:<MyInput placeholder='дата рождения' className={cl.field_size} value={birthDate} onChange={(e) => setBirthDate(e.target.value)} /></label>
            <label className={cl.box_inline}>выберите роль:
                <select className={[cl.selectRole, cl.field_size].join(' ')} >
                    <option value="user">student</option>
                    <option value="coach">coach</option>
                </select>
            </label>
            <label className={cl.box_inline}>город:<MyInput className={cl.field_size} value={city} onChange={(e) => setCity(e.target.value)} /></label>
            <label className={cl.box_inline}>страна:<MyInput className={cl.field_size} value={country} onChange={(e) => setCountry(e.target.value)} /></label>
           
            <MyButton style={{ margin: '0 auto' }} >Сохранить данные</MyButton>

        </div>
    );
};

export default EditUserProfile;