import React, { useState } from 'react';
import axios from 'axios';
import './SignUpPage.css';
import logo from '../../Images/Logo.png';
import { Link } from 'react-router-dom';
import { Form,Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/signup', {
        firstData: firstName,
        lastData: lastName,
        emailData: email,
        address:address,
        phone:phone,
        passwordData: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = response.data;

        if (data.success) {
          // Set localStorage
          if (email === email && password === password) {
            localStorage.setItem("ShipShopUserName", email);
            // localStorage.setItem("ShipShopPassword", password);
          }

          // Navigate to the specified URL
          navigate(data.redirectUrl);

          // Reload the page after a short delay
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          setErrorMessage(data.message || 'Registration failed');
        }
      } else {
        console.error('Failed to send data');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  
  return (
    <div className="SignupPage">
      <div className="SignupDiv">
        <div className="logoImg">
          <img src={logo} alt="Logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="firstname" >
                  FirstName
                </label>
                <div className="InputDiv">
                  <input className="Input" type="text" id="firstname" onChange={(e) => setFirstName(e.target.value)}/>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="lastname">
                  LastName
                </label>
                <div className="InputDiv">
                  <input className="Input" type="text" id="lastname" onChange={(e) => setLastName(e.target.value)}/>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="address">
                  Address
                </label>
                <div className="InputDiv">
                  <input className="Input" type="text" id="address" onChange={(e) => setAddress(e.target.value)}/>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="phone">
                  Phone no
                </label>
                <div className="InputDiv">
                  <input className="Input" type="text" id="phone" onChange={(e) => setPhone(e.target.value)}/>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="username">
                  Username
                </label>
                <div className="InputDiv">
                  <input className="Input" type="text" id="username" onChange={(e) => setEmail(e.target.value)}/>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="password">
                  Password
                </label>
                <div className="InputDiv">
                  <input className="Input" type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
              </div>
            </div>
            <div className="col-md-2">
            <Form.Check
              type="radio"
              label="Male"
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
              />
              </div>
              <div className="col-md-2">
            <Form.Check
              type="radio"
              label="Female"
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
              />

              </div>
        {errorMessage && 
                <Alert className='text-center' variant='danger'>
                {errorMessage}
              </Alert>}
              <br />
              <br />
          </div>
          <button className="submitBtn" type="submit">
            Sign Up for ShipShop
          </button>
        </form>
        <Link to={'/login'}>
          Already Have An Account
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
