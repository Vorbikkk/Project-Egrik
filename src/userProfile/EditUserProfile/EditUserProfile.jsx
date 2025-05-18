import React, { useState } from 'react';
import cl from './EditUserProfile.module.css';

const EditUserProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    userName: user.userName || '',
    lastName: user.lastName || '',
    firstName: user.firstName || '',
    birthDate: user.birthDate || '',
    email: user.email || '',
    city: user.city || '',
    country: user.country || '',
    role: 'user'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика сохранения данных
    console.log('Данные для сохранения:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className={cl.formContainer}>
      <div className={cl.formGroup}>
        <label>
          Имя:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Ваше имя"
            className={cl.formInput}
          />
        </label>
      </div>

      <div className={cl.formGroup}>
        <label>
          Фамилия:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Ваша фамилия"
            className={cl.formInput}
            required
          />
        </label>
      </div>

      <div className={cl.formGroup}>
        <label>
          E-mail:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={cl.formInput}
            required
          />
        </label>
      </div>

      <div className={cl.formGroup}>
        <label>
          Никнейм:
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Никнейм"
            className={cl.formInput}
          />
        </label>
      </div>

      <div className={cl.formGroup}>
        <label>
          Дата рождения:
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className={cl.formInput}
          />
        </label>
      </div>

      <div className={cl.formGroup}>
        <label>
          Роль:
          <select 
            name="role" 
            value={formData.role} 
            onChange={handleChange}
            className={cl.formSelect}
          >
            <option value="user">Student</option>
            <option value="coach">Coach</option>
          </select>
        </label>
      </div>

      <div className={cl.formGroup}>
        <label>
          Город:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={cl.formInput}
          />
        </label>
      </div>

      <div className={cl.formGroup}>
        <label>
          Страна:
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={cl.formInput}
          />
        </label>
      </div>

      <button type="submit" className={cl.submitButton}>
        Сохранить данные
      </button>
    </form>
  );
};

export default EditUserProfile;