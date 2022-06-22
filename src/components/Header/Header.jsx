import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

export const Header= ()=>  {
  return (
    <header className='mainHeader'>
      <nav>
        <NavLink to='/' activeclassname='active' >Home</NavLink>
        <NavLink to='/login' activeclassname='active' >Login</NavLink>       
        </nav>
      </header>
  )
}

