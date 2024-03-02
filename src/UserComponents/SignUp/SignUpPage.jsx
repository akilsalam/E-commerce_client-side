import React, { useState } from 'react';
import axios from 'axios';
import './SignUpPage.css';
import logo from '../../Images/icon.svg';
import { Link } from 'react-router-dom';
import { Form,Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('')
  const [locality, setLocality] = useState('');
  const [town, setTown] = useState('');
  const [state, setState] = useState('')
  const [phone, setPhone] = useState('+91');
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
        pincode:pincode,
        locality:locality,
        town:town,
        state:state,
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
          // if (email === email && password === password) {
          //   localStorage.setItem("ShipShopUserName", email);
          //   // localStorage.setItem("ShipShopPassword", password);
          // }

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
          <img className='logo' src={logo} alt="Logo" />
        </div>
        {errorMessage && 
                <Alert className='text-center' variant='danger'>
                {errorMessage}
              </Alert>}
        <form onSubmit={handleSubmit}>
          <div className="row flex-wrap">
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="firstname" >
                  FirstName
                </label>
                <div className="InputDiv">
                  <input className="Input" type="text" id="firstname" onChange={(e) => setFirstName(e.target.value)} required/>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="lastname">
                  LastName
                </label>
                <div className="InputDiv">
                  <input className="Input" type="text" id="lastname" onChange={(e) => setLastName(e.target.value)} required/>
                </div>
              </div>
            </div>
          </div>
          <div className="row flex-wrap">
            <div className="col-md-12">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="address">
                  Address
                </label>
                <div className="InputDiv">
                  <textarea className="Input" rows={4} cols={50} type="text" id="address" onChange={(e) => setAddress(e.target.value)} required/>
                </div>
              </div>
            </div>
          </div>
          <div className="row flex-wrap">
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="pincode">
                  Pincode
                </label>
                <div className="InputDiv">
                  <input className="Input" type="number" id="pincode" onChange={(e) => setPincode(e.target.value)} required/>
                </div>
              </div>
            </div>
          </div>
          <div className="row flex-wrap">
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="locality" >
                  Locality
                </label>
                <div className="InputDiv">
                  <input className="Input" type="text" id="locality" onChange={(e) => setLocality(e.target.value)} required/>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="town">
                  City/District/Town
                </label>
                <div className="InputDiv">
                  <input className="Input" type="text" id="town" onChange={(e) => setTown(e.target.value)} required/>
                </div>
              </div>
            </div>
          </div>
          <div className="row flex-wrap">
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="state" >
                  State
                </label>
                <div className="InputDiv">
                  <select className="Input" type="text" onChange={(e) => setState(e.target.value)} required>
                    <option value="">Set Your State</option>
                    <option value="Kerala" >Kerala</option>
                    <option value="TamilNadu" >TamilNadu</option>
                    <option value="Kannada" >Kannada</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="phone">
                  Phone no
                </label>
                <div className="InputDiv">
                <PhoneInput
  inputProps={{
    name: 'phone',
    required: true,
    autoFocus: true,
  }}
  required
  country="in"
  value={phone}
  onChange={(value) => setPhone(value)}
/>

                </div>
              </div>
            </div>
          </div>
          <div className="row flex-wrap">
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="username">
                  Email
                </label>
                <div className="InputDiv">
                  <input className="Input" type="text" id="username" onChange={(e) => setEmail(e.target.value)} required/>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="password">
                  Password
                </label>
                <div className="InputDiv">
                  <input className="Input" type="password" id="password" onChange={(e) => setPassword(e.target.value)} required/>
                </div>
              </div>
            </div>
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
