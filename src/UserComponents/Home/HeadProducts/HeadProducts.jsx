import React from 'react';
import './HeadProducts.css'
import { Col, Row,Navbar,Container } from 'react-bootstrap';
import img1 from "../../../Images/grocery.webp"
import img2 from '../../../Images/mobiles.webp'
import img3 from '../../../Images/Fashion.webp'
import img4 from '../../../Images/home.png'
import img5 from '../../../Images/Electronics.webp'
import img6 from '../../../Images/Appliances.png'
import img7 from '../../../Images/Travel.webp'
import img8 from '../../../Images/Beauty.webp'
import img9 from '../../../Images/Two wheelers.webp'


const HeadProducts = () => {
  return (
    <div className='productsDiv'>
      <Navbar expand="md" className="Navbar">
        <Container fluid className='container'>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">

            <Row className='products'>
              <a href='#Grocery' className='product '><Col ><img src={img1} alt="" />Grocery</Col></a>
              <a href='#Mobiles' className='product '><Col ><img src={img2} alt="" />Mobiles</Col></a>
              <a href='#Fashion' className='product '><Col ><img src={img3} alt="" />Fashion</Col></a>
              <a href='#Electronics' className='product '><Col ><img src={img5} alt="" />Electronics</Col></a>
              <a href='#Furniture' className='product '><Col ><img src={img4} alt="" />Home & Furiture</Col></a>
              <a href='#Appliances' className='product '><Col ><img src={img6} alt="" />Appliances</Col></a>
              <a href='#Travels' className='product '><Col ><img src={img7} alt="" />Travels</Col></a>
              <a href='#Beauty' className='product '><Col ><img src={img8} alt="" />Beauty & Toys</Col></a>
              <a href='#twoWheelers' className='product '><Col ><img src={img9} alt="" />Two Wheelers</Col></a>
            </Row>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>

  );
}

export default HeadProducts;
