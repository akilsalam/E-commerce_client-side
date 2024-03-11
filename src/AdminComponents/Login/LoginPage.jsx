import React, { useState, useRef } from 'react';
import logo from '../../Images/icon.svg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import './LoginPage.css'
import AdminHome from '../AdminHome';
import serverUrl from '../../codes';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()
  const admin = localStorage.getItem('ShipShopAdmin')


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming you have a server endpoint that validates the login
      const response = await axios.post(`${serverUrl}/admin/login`, {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = response.data;

        if (data.success) {
          if (emailRef.current.value === email && passwordRef.current.value === password) {
            localStorage.setItem("ShipShopAdmin", email);
          }

          // Navigate to the specified URL
          navigate(data.redirectUrl);

          // Reload the page after a short delay
          window.location.reload();
        } else {
          setErrorMessage(data.message || 'User Name Not Found!!🧐');
        }
      } else {
        console.error('Invalid credentials');
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error during login. Please try again.');
    }
  };

  return (
    admin ? <AdminHome /> : (
      <div className='AdminLoginPage'>
        <div className="AdminLoginDiv">
          <div className="logoImg">
            <img className='logo' src={logo} alt="Logo" />
          </div>
          <h2 className='text-center text-secondary'>Admin Login</h2>
          {errorMessage &&
            <Alert className='text-center' variant='danger'>
              {errorMessage}
            </Alert>}
          <form action="" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className='Inputlabel' htmlFor="username">Username</label>
              <div className="InputDiv">
                <input className='Input' type="text" id="username" ref={emailRef} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label className='Inputlabel' htmlFor="password">Password</label>
              <div className="InputDiv">
                <input className='Input' type="password" id="password" ref={passwordRef} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <button className="submitBtn" type="submit">Login to Admin Page</button>
          </form>
        </div>
      </div>
    )
  );
}

export default LoginPage;
