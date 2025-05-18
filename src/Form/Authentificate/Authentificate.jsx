import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import cl from './Authentificate.module.css';
import { useNavigate } from 'react-router-dom';
import { UserApi } from '../../RTK/Service/UserService';

const Authentificate = ({setActive}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [typePassword, setTypePassword] = useState(true)
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [getUserAuth, { }] = UserApi.useGetUserAuthMutation()
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      await getUserAuth({ email: email, password: password })
        .then((data => {
          
          if (data.data && data.data.token) {
            navigate('/profile')
            setActive(false)
            setIsSubmitting(false);
          }
        }))
        .catch((err) => console.log(err))
    }
  };

  const OpenPassword = (e) => {
    e.preventDefault()
    setTypePassword(prev => !prev)
  }


  return (
    <div className={cl.container}>
      <form onSubmit={handleSubmit} className={cl.form}>
        <h2 className={cl.title}>Sign In</h2>

        <div className={cl.inputGroup}>
          <label htmlFor="email" className={cl.label}>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${cl.input} ${errors.email ? cl.inputError : ''}`}
            placeholder="Enter your email"
          />
          {errors.email && <span className={cl.error}>{errors.email}</span>}
        </div>

        <div className={cl.inputGroup}>
          <label htmlFor="password" className={cl.label}>Password</label>
          <input
            type={typePassword ? 'password' : 'text'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${cl.input} ${errors.password ? cl.inputError : ''}`}
            placeholder="Enter your password"
          />
          <button className={cl.togglePassword} onClick={(e) => OpenPassword(e)}>
            {typePassword ? '🔒' : '👁️'}
          </button>
          {errors.password && <span className={cl.error}>{errors.password}</span>}
        </div>

        <button
          type="submit"
          className={`${cl.button} ${isSubmitting ? cl.buttonDisabled : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </button>

        <div className={cl.footer}>
          {/* <a href="#forgot" className={cl.link}>Forgot password?</a> */}
          <span className={cl.divider}>|</span>
          <Link to={"/regist"} className={cl.link}>Create account</Link>
        </div>
      </form>
    </div>
  );
};

export default Authentificate;