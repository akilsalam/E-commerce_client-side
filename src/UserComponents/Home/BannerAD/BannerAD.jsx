import React from 'react';
import './BannerAD.css'
import { Carousel } from 'react-bootstrap';
import Banner1 from '../../../Images/Banner.jpg'
import Banner2 from '../../../Images/Banner2.jpg'
import Banner3 from '../../../Images/Banner3.jpg'


const BannerAD = () => {
  return (
    <div className='BannerDiv'>
          <Carousel>
      <Carousel.Item>
        <img src={Banner1} alt="" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={Banner2} alt="" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={Banner3} alt="" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={Banner1} alt="" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={Banner2} alt="" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={Banner3} alt="" />
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default BannerAD;
