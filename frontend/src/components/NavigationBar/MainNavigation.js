import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth-context';

import './MainNavigation.css';
const MainNavigation = props => {
  const context = useContext(AuthContext);
  return (
    <header className='main-navigation'>
      <div className='main-navigation__logo'>
        <h1>EventApp</h1>
      </div>
      <div className='main-navigation__items'>
        <ul>
          {!context.token && (
            <li>
              <NavLink to='/auth'>Authenticate</NavLink>
            </li>
          )}
          <li>
            <NavLink to='/events'>Events</NavLink>
          </li>
          {context.token && (
            <li>
              <NavLink to='/bookings'>Bookings</NavLink>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default MainNavigation;
