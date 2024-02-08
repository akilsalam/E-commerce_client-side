import React from 'react';
import './SellerSignUp.css'
import logo from '../../../Images/Logo.png';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

const SellerSignUp = () => {
  return (
    <div className="SignupPage">
      <div className="SignupDiv">
        <div className="logoImg">
          <img src={logo} alt="Logo" />
        </div>
        <h1 className='SignupHead'>Create a Seller Account</h1>
        <form action="">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="firstname">
                  FirstName
                </label>
                <div className="InputDiv">
                  <input className="Input" type="text" id="firstname" />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="lastname">
                  LastName
                </label>
                <div className="InputDiv">
                  <input className="Input" type="text" id="lastname" />
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
                  <input className="Input" type="text" id="address" />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="phone">
                  Phone no
                </label>
                <div className="InputDiv">
                  <input className="Input" type="text" id="phone" />
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
                  <input className="Input" type="text" id="username" />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="password">
                  Password
                </label>
                <div className="InputDiv">
                  <input className="Input" type="password" id="password" />
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
              <br />
              <br />
          </div>
          <button className="submitBtn" type="submit">
            Sign Up 
          </button>
        </form>
        <Link to={'/sellerLogin'}>
          Already Have An Account
        </Link>
      </div>
    </div>
  );
}

export default SellerSignUp;
