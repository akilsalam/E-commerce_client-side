import React from 'react';
import './BannerAD.css'
import { Carousel } from 'react-bootstrap';
import Banner1 from '../../../Images/Banner.webp'
import Banner2 from '../../../Images/Banner2.webp'
import Banner3 from '../../../Images/Banner3.webp'


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
