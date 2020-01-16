import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import AuthPage from './pages/Auth';
import EventsPage from './pages/Events';
import BookingsPage from './pages/Bookings';
import MainNavigation from './components/NavigationBar/MainNavigation';
import AuthContext from './context/auth-context';

function App() {
  const [state, setState] = useState({
    token: null,
    userId: null
  });

  const login = (token, userId, tokenExpiration) => {
    setState({ token: token, userId: userId });
  };
  const logout = () => {
    setState({ token: null, userId: null });
  };
  return (
    <BrowserRouter>
      <>
        <AuthContext.Provider
          value={{
            token: state.token,
            userId: state.userId,
            login: login,
            logout: logout
          }}
        >
          <MainNavigation />
          <main className='main-content'>
            <Switch>
              {state.token && <Redirect from='/' to='/events' exact />}
              {state.token && <Redirect from='/auth' to='/events' exact />}

              {!state.token && <Route path='/auth' component={AuthPage} />}
              <Route path='/events' component={EventsPage} />
              {state.token && (
                <Route path='/bookings' component={BookingsPage} />
              )}
              {!state.token && <Redirect to='/auth' exact />}
            </Switch>
          </main>
        </AuthContext.Provider>
      </>
    </BrowserRouter>
  );
}

export default App;
