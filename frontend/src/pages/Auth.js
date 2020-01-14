import React, { useState, useContext } from 'react';
import './Auth.css';
import AuthContext from '../context/auth-context';

const Auth = () => {
  const context = useContext(AuthContext);

  const [values, setValues] = useState({});
  const [isLogin, setIsLogin] = useState(true);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.type]: event.target.value
    });
  };
  const submitHadler = event => {
    event.preventDefault();
    const email = values.email || '';
    const password = values.password || '';
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}"){
            userId
            token
            tokenExpiration
          }
        }
      `
    };

    if (!isLogin) {
      requestBody = {
        query: `
          mutation {
            createUser(userInput : {email: "${email}", password: "${password}"}){
              _id
              email
            }
          }
        `
      };
    }

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed');
        }
        return res.json();
      })
      .then(resData => {
        if (resData.data.login.token) {
          context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <form className='auth-form' onSubmit={submitHadler}>
      <div className='form-control'>
        <label htmlFor='email'>E-mail</label>
        <input type='email' id='email' onChange={handleChange} />
      </div>
      <div className='form-control'>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' onChange={handleChange} />
      </div>
      <div className='form-actions'>
        <button type='submit'>submit</button>
        <button
          type='button'
          onClick={() => {
            setIsLogin(!isLogin);
          }}
        >
          Switch to {isLogin ? 'Sigup' : 'Login'}
        </button>
      </div>
    </form>
  );
};

export default Auth;
