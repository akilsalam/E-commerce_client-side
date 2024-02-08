import React from 'react';
import './HeadTag.css'
import SellerImg from '../../../../Images/seller.png'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HeadTag = () => {
  const navigate = useNavigate()
  const sellBtn = () => {
    navigate('/sellerLogin')
  }
  return (
<div className="container-fluid">
  <div className="row">
    <div className="col-md-8">
      <div className="HeadDiv">
        <h1 className="Head">Became A Seller On ShipShop</h1>
      </div>
    </div>
    <div className="col-md-4">
      <img className="img-fluid" src={SellerImg} alt="Seller Image" />
    </div>
    <div className="col-12">
      <Button  className='sellBtn' onClick={sellBtn} > Start Selling</Button>{' '}
    </div>
  </div>
</div>


  );
}

export default HeadTag;
