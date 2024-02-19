import React from 'react';
import './OfferCards.css'
import men1 from '../../../Images/men style1.jpg'
import men2 from '../../../Images/men style2.jpg'
import men3 from '../../../Images/men style3.jpg'
import men4 from '../../../Images/men style4.jpg'
import home1 from '../../../Images/dresses.jpg'
import home2 from '../../../Images/bags.jpg'
import home3 from '../../../Images/watches.jpg'
import home4 from '../../../Images/jewellery.jpg'
import screen1 from '../../../Images/automotive.jpg'
import screen2 from '../../../Images/sunglasses.jpg'
import screen3 from '../../../Images/fragrance.jpg'
import screen4 from '../../../Images/Lights.jpg'
import { Link,useNavigate } from 'react-router-dom';



const OfferCards = () => {
  const navigate = useNavigate()
  const clothes = () =>{
    navigate('/Clothes')
  }
  const footwear = () =>{
    navigate('/Footwears')
  }
  const watches = () =>{
    navigate('/Watches')
  }
  const bags = () =>{
    navigate('/Bags')
  }
  const WomenWatches = () =>{
    navigate('/WomenWatches')
  }
  const WomenFootwears = () =>{
    navigate('/WomenShoes')
  }
  const WomenJewellery = () =>{
    navigate('/WomenJewellery')
  }
  const Tops = () =>{
    navigate('/Tops')
  }
  const Automotives = () =>{
    navigate('/Automotive')
  }
  const Lights = () =>{
    navigate('/Lights')
  }
  const Sunglasses = () =>{
    navigate('/Sunglasses')
  }
  const Fragrances = () =>{
    navigate('/Fragrances')
  }
  return (
<div className='container'>
  <div className='row'>
    <div className='col-sm-12 col-md-6 col-lg-4'>
      <div className='card'>
        <h1 className='cardHead'>Styles for men</h1>
        <div className='cardImgDiv'>
          <div className='itemContainer' onClick={clothes}>
            <img className='cardImg' src={men1} alt='' />
            <span className='itemName'>Clothing</span>
          </div>
          <div className='itemContainer' onClick={footwear}>
            <img className='cardImg' src={men2} alt='' />
            <span className='itemName'>Footwear</span>
          </div>
          <div className='itemContainer' onClick={watches}>
            <img className='cardImg' src={men3} alt='' />
            <span className='itemName'>Watches</span>
          </div>
          <div className='itemContainer' onClick={bags}>
            <img className='cardImg' src={men4} alt='' />
            <span className='itemName'>Bags & Wallets</span>
          </div>
        </div>
        {/* <Link className='viewAll'>Explore All</Link> */}
      </div>
    </div>

    <div className='col-sm-12 col-md-6 col-lg-4'>
      <div className='card'>
        <h1 className='cardHead'>Styles for Women</h1>
        <div className='cardImgDiv'>
          <div className='itemContainer' onClick={Tops}>
            <img className='cardImg' src={home1} alt='' />
            <span className='itemName'>Women's Clothing</span>
          </div>
          <div className='itemContainer' onClick={WomenFootwears}>
            <img className='cardImg' src={home2} alt='' />
            <span className='itemName'>Footwears</span>
          </div>
          <div className='itemContainer' onClick={WomenWatches}>
            <img className='cardImg' src={home3} alt='' />
            <span className='itemName'>Watches</span>
          </div>
          <div className='itemContainer' onClick={WomenJewellery}>
            <img className='cardImg' src={home4} alt='' />
            <span className='itemName'>Fashion Jewellery</span>
          </div>
        </div>
        {/* <Link className='viewAll'>Explore All</Link> */}
      </div>
    </div>

    <div className='col-sm-12 col-md-6 col-lg-4'>
      <div className='card'>
        <h1 className='cardHead'> Other need Items</h1>
        <div className='cardImgDiv'>
          <div className='itemContainer' onClick={Automotives}>
            <img className='cardImg' src={screen1} alt='' />
            <span className='itemName'>Automotives</span>
          </div>
          <div className='itemContainer' onClick={Sunglasses}>
            <img className='cardImg' src={screen2} alt='' />
            <span className='itemName'>Sunglasses</span>
          </div>
          <div className='itemContainer' onClick={Fragrances}>
            <img className='cardImg' src={screen3} alt='' />
            <span className='itemName'>Fragrances</span>
          </div>
          <div className='itemContainer' onClick={Lights}>
            <img className='cardImg' src={screen4} alt='' />
            <span className='itemName'>Lights</span>
          </div>
        </div>
        {/* <Link className='viewAll'>Explore All</Link> */}
      </div>
    </div>
  </div>
</div>



  );
}

export default OfferCards;
