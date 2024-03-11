import React from 'react';
import styles from './HeadProducts.module.css'
import { Col, Row,Navbar,Container } from 'react-bootstrap';
import img1 from "../../../Images/grocery.webp"
import img2 from '../../../Images/mobiles.png'
import img3 from '../../../Images/Fashion.png'
import img4 from '../../../Images/home.png'
import img5 from '../../../Images/Electronics.png'
import img6 from '../../../Images/Appliances.png'
import img7 from '../../../Images/Travel.png'
import img8 from '../../../Images/Beauty.png'
import img9 from '../../../Images/Two_wheelers.png'


const HeadProducts = () => {
  return (
    <div style={{display:'flex',justifyContent:'center',width:'100%'}}>
    <div className={styles.productsDiv}>
      <Navbar expand="md" className={styles.Navbar}>
        <Container fluid className={`container`}>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className={`justify-content-end`}>

            <Row className={`${styles.products} flex-wrap`}>
              <a href='#Grocery' className={styles.product}><Col ><img src={img1} alt="" />Grocery</Col></a>
              <a href='#Mobiles' className={styles.product}><Col ><img src={img2} alt="" />Mobiles</Col></a>
              <a href='#Fashion' className={styles.product}><Col ><img src={img3} alt="" />Fashion</Col></a>
              <a href='#Electronics' className={styles.product}><Col ><img src={img5} alt="" />Electronics</Col></a>
              <a href='#Furniture' className={styles.product}><Col ><img src={img4} alt="" />Home & Furiture</Col></a>
              <a href='#Appliances' className={styles.product}><Col ><img src={img6} alt="" />Appliances</Col></a>
              <a href='#Travels' className={styles.product}><Col ><img src={img7} alt="" />Travels</Col></a>
              <a href='#Beauty' className={styles.product}><Col ><img src={img8} alt="" />Beauty & Toys</Col></a>
              <a href='#twoWheelers' className={styles.product}><Col ><img src={img9} alt="" />Two Wheelers</Col></a>
            </Row>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
    </div>
  );
}

export default HeadProducts;
