import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../Images/Logo.png'
import './SellerLogin.css'

const SellerLogin = () => {
    const navigate = useNavigate()
    const GoSignUp = () =>{
        navigate('/sellerSignUp')
      }
    const Submit = () =>{
        navigate('/sellProduct')
    }
  return (
      <div className='LoginPage'>
    <div className="LoginDiv">
        <div className="logoImg">
            <img src={logo} alt="Logo" />
        </div>
        <h3 className='LoginHead'>Login to Seller Account</h3>
        <form action=''>
            <div className="form-group">
                <label className='Inputlabel' htmlFor="username">Username</label>
                <div className="InputDiv">
                    <input className='Input' type="text" id="username" />
                </div>
            </div>
            <div className="form-group">
                <label className='Inputlabel' htmlFor="password">Password</label>
                <div className="InputDiv">
                    <input className='Input' type="password" id="password" />
                </div>
            </div>
            <button className="submitBtn" type="submit" onClick={Submit}>Login to ShipShop</button>
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

export default SellerLogin;
