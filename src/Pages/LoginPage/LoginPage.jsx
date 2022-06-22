import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export const LoginPage = (props) => {
    console.log(props);
    const navigate = useNavigate();
    const handleLogIn = (e) => {
        e.preventDefault(); 
        navigate('/');
    }

  return (
      <div className='loginPage'>
          <h2>Авторизация</h2>
          <form action="" className='loginForm' onSubmit={handleLogIn}>
              <div>
                  <input type="text" placeholder='Логин' className='loginFormInput' required />
              </div>
              <div>
                  <input type="password" placeholder='Пароль' className='loginFormInput' required />
              </div>
              <div>
                  <button className='blackBtn' type='submit'>Войти</button>
              </div>
          </form>
      </div>
  )
}
