
import React,{useState,useRef} from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import './LoginPage.css'
import logo from '../../Images/Logo.png'
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link,useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const GoSignUp = () =>{
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
  
        if (data.success) {
          if (emailRef.current.value === email && passwordRef.current.value === password) {
            localStorage.setItem("ShipShopUserName", email);
            // localStorage.setItem("ShipShopPassword", password);
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
<div className='LoginPage'>
    <div className="LoginDiv">
        <div className="logoImg">
            <img src={logo} alt="Logo" />
        </div>
        {errorMessage && 
                <Alert className='text-center' variant='danger'>
                {errorMessage}
              </Alert>}
        <form action="" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className='Inputlabel' htmlFor="username">Username</label>
                <div className="InputDiv">
                    <input className='Input' type="text" id="username" ref={emailRef} onChange={(e) => setEmail(e.target.value)}/>
                </div>
            </div>
            <div className="form-group">
                <label className='Inputlabel' htmlFor="password">Password</label>
                <div className="InputDiv">
                    <input className='Input' type="password" id="password" ref={passwordRef} onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div>
            <button className="submitBtn" type="submit">Login to ShipShop</button>
        </form>
        <p>By continuing, you agree to ShipShop's Conditions of Use and Privacy Notice.</p>
        <div className="SignUpDiv">
        <p className=''>_________New To ShipShop________</p>
        <button className="SignUpBtn" type="submit" onClick={GoSignUp}>Create Your ShipShop Acccount</button>
        </div>
    </div>
</div>

  );
}

export default Login;
