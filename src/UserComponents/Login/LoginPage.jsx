import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Alert, Tab, Tabs } from 'react-bootstrap';
import './LoginPage.css'
import logo from '../../Images/icon.svg'
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
// import Input from 'react-phone-number-input/input'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../firebase';
import ReCAPTCHA from 'react-google-recaptcha';

const Login = () => {
  const navigate = useNavigate()
  const GoSignUp = () => {
    navigate('/signup')
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming you have a server endpoint that validates the login
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        if (data.success) {
          if (emailRef.current.value === email && passwordRef.current.value === password) {
            localStorage.setItem("ShipShopUserName", email);
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



  const [phone, setPhone] = useState('');
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState('');
  const phoneRef = useRef()
  const recaptchaVerifierRef = useRef(null);

  // Example: Add console logs for debugging
  const sendOtp = async (e) => {
    e.preventDefault();

    try {
      console.log('Sending OTP...');
      try {
        const response = await axios.post('http://localhost:3000/checkPhoneNumber', {
          phone: phone.replace(/\D/g, ''), // Remove non-numeric characters
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          if (data.exists) {
            // Continue with the OTP sending logic
            recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha', {});
            const confirmation = await signInWithPhoneNumber(auth, phone, recaptchaVerifierRef.current);
            setUser(confirmation);
            console.log('OTP sent successfully:', confirmation);
          } else {
            setErrorMessage('Phone Number Not Found!!🧐 Please SignUp');
          }
        } else {
          console.error('Invalid credentials');
          setErrorMessage('Invalid credentials');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('Error during login. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error.message);
    }
  };


  const verifyOtp = async (e) => {
    e.preventDefault();

    try {
      console.log('Verifying OTP...');
      if (user) {
        const data = await user.confirm(otp);
        const phone = data._tokenResponse.phoneNumber;
        localStorage.setItem("ShipShopUserPhone", phone);
        navigate('/')
        console.log('Otp verification successful:', data);
        // You may perform additional actions after successful verification
      } else {
        console.error('User object is null or undefined');
        // Handle the case where the user object is not properly set
      }
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
      // Handle error gracefully
    }
  };

  return (
    <div className='LoginPage'>
      <div className='LoginDiv'>
        <div className='logoImg'>
          <img className='logo' src={logo} alt='Logo'/>
        </div>
        <Tabs
          style={{ display: 'flex', justifyContent: 'center' }}
          defaultActiveKey='OTPValid'
          id='uncontrolled-tab-example'
          className='mb-3 text-center'
        >
          <Tab eventKey='OTPValid' title='Login with OTP'>
            <div>
              {errorMessage && (
                <Alert className='text-center' variant='danger'>
                  {errorMessage}
                </Alert>
              )}
              {/* <form> */}
              {user ? null : (
                <>
                  <p style={{ display: 'flex', justifyContent: 'center' }} htmlFor='username'>
                    Enter your Mobile number
                  </p>
                  <form action="" onSubmit={sendOtp}>
                    <div className='form-group ' style={{ display: 'flex', justifyContent: 'center' }}>
                      <div className='InputDiv'>
                        <PhoneInput
                          defaultCountry='in'
                          ref={phoneRef}
                          value={phone}
                          id='phone'
                          inputProps={{
                            name: 'phone',
                            required: true,
                            autoFocus: true,
                            placeholder: 'Type your phone number',
                          }}
                          onChange={(value, data, event, formattedValue) => {
                            setPhone(formattedValue);
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }} id='recaptcha'></div>
                    <button className='submitBtn btn btn-primary mt-5' type='submit'>
                      Send OTP
                    </button>
                  </form>
                </>
              )}
              {user ? (
                <>
                  <form action="" onSubmit={verifyOtp}>
                    <div className='form-group'>
                      <label className='Inputlabel' htmlFor='username'>
                        Enter your OTP
                      </label>
                      <div className='InputDiv'>
                        <input
                          className='Input form-control'
                          placeholder='Enter OTP'
                          required
                          onChange={(e) => setOtp(e.target.value)}
                        />
                      </div>
                    </div>
                    <button className='submitBtn btn btn-primary' type='submit'>
                      Verify OTP
                    </button>
                  </form>
                </>
              ) : null}
              {/* </form> */}
            </div>
          </Tab>
          <Tab eventKey='EmailValid' title='Login with Email'>
            <div>
              {errorMessage && (
                <Alert className='text-center' variant='danger'>
                  {errorMessage}
                </Alert>
              )}
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label className='Inputlabel' htmlFor='username'>
                    Username
                  </label>
                  <div className='InputDiv'>
                    <input
                      className='Input form-control'
                      type='text'
                      id='username'
                      value={email}
                      ref={emailRef}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className='form-group'>
                  <label className='Inputlabel' htmlFor='password'>
                    Password
                  </label>
                  <div className='InputDiv'>
                    <input
                      className='Input form-control'
                      type='password'
                      id='password'
                      value={password}
                      ref={passwordRef}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <button className='submitBtn btn btn-primary' type='submit'>
                  Login to ShipShop
                </button>
              </form>
            </div>
          </Tab>
        </Tabs>
        <p className='mt-3'>
          By continuing, you agree to ShipShop's Conditions of Use and Privacy Notice.
        </p>
        <div className='SignUpDiv'>
          <p className=''>_________New To ShipShop________</p>
          <button className='SignUpBtn btn btn-success' type='button' onClick={GoSignUp}>
            Create Your ShipShop Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
