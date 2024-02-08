import React from 'react';
import './CardAD.css'
import Payment from './Icons/Payment';
import Flight from './Icons/Flight';
import Delivery from './Icons/Delivery';

const CardAD = () => {
  return (
<div className="container-fluid">
  <div className="row">
    <div className="col-12">
      <h2 className='Head2'>Why Sell on ShipShop?</h2>
    </div>
    <div className="col-12">
      <div className="row">
        <div className="col-md-4">
            <div className='cardAd'>
          <Payment/>
          <h1 className='cardH1'>Recieve timely payments</h1>
          <p className='cardText'>ShipShop ensures your payments are deposited directly in your bank account within 7-14 days.</p>
            </div>
        </div>
        <div className="col-md-4">
            <div className='cardAd'>
          <Flight/>
          <h1 className='cardH1'>Reach crores of customers</h1>
          <p className='cardText'>Sell to crores of engaged customer visiting ShipShop.in on desktop and through our mobile app.</p>
            </div>
        </div>
        <div className="col-md-4">
            <div className='cardAd'>
          <Delivery/>
          <h1 className='cardH1'>Stress-free delivery</h1>
          <p className='cardText'>Deliver to 100% of India's serviceable pincodes, through Easy Ship & Fulfillment by ShipShop.</p>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

export default CardAD;
