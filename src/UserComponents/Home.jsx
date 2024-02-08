import React, { useState,useEffect } from 'react';
import HeadProducts from './Home/HeadProducts/HeadProducts';
import axios from 'axios';
import BannerAD from './Home/BannerAD/BannerAD';
import OfferCards from './Home/OfferCards/OfferCards';
import Products from './Home/Products/Products';
import { Offcanvas,Button } from 'react-bootstrap';
import img from '../Images/Logo.png'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const user = localStorage.getItem('ShipShopUserName')
  const [show, setShow] = useState(true);
  const navigate = useNavigate()
const handleClose = () => setShow(false);

  const signIn = () =>{
    navigate('/signup')
  }

  return (
    <div>
        {!user &&  <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{fontWeight:'bolder' }}>ShipShop</Offcanvas.Title>
        </Offcanvas.Header>
        <div style={{backgroundColor:'#D9D9D9',margin:'2rem'}}>

        <Offcanvas.Body className='text-center' style={{fontWeight:'bold', color:'blueviolet'}}>
        <div>
          <img src={img} alt="" />
        </div>
        Sign in for your best experience
        <br />
        <br />
        <div style={{display:'flex' ,justifyContent:'center'}}>
        <Button className='' onClick={signIn}  variant="warning">Sign in Securely</Button>{' '}
        </div>
        </Offcanvas.Body>
        </div>
      </Offcanvas>}
      <HeadProducts/>
      <BannerAD/>
      <OfferCards/>
      <Products url='http://localhost:3000/groceries' title='Groceries' id='Grocery' link='/Groceries'/>
      <Products url='http://localhost:3000/smartphones' title='Mobiles' id='Mobiles' link='/Mobiles'/>
      <Products url='http://localhost:3000/fashions' title='Fashions' id='Fashion' link='/Fashions'/>
      <Products url='http://localhost:3000/electronics' title='Electronics' id='Electronics' link='/Electronics'/>
      <Products url='http://localhost:3000/furniture' title='Furnitures' id='Furniture' link='/Furnitures'/>
      <Products url='http://localhost:3000/appliances' title='Appliances' id='Appliances' link='/Appliances'/>
      <Products url='http://localhost:3000/beautyToys' title='Beauty' id='Beauty' link='/Beauty'/>
      <Products url='http://localhost:3000/two-wheelers' title='Two Wheelers' id='twoWheelers' link='/TwoWheelers'/>
    </div>
  );
}

export default Home;
