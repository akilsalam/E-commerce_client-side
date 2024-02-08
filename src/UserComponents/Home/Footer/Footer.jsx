import React from 'react';
import './Footer.css'

const Footer = () => {
  return (
    <div className="footerParentDiv">
      <div className="content">
        <div className="col-md-3">
          <div className="heading">
            <p>POPULAR LOCATIONS</p>
          </div>
          <div className="list">
            <ul className="list-unstyled">
              <li>Kolkata</li>
              <li>Mumbai</li>
              <li>Chennai</li>
              <li>Pune</li>
            </ul>
          </div>
        </div>
        <div className="col-md-3">
          <div className="heading">
            <p>ABOUT US</p>
          </div>
          <div className="list">
            <ul className="list-unstyled">
              <li>About ShipShop Group</li>
              <li>Careers</li>
              <li>Contact Us</li>
              <li>ShipShopPeople</li>
            </ul>
          </div>
        </div>
        <div className="col-md-3">
          <div className="heading">
            <p>SHIPSHOP</p>
          </div>
          <div className="list">
            <ul className="list-unstyled">
              <li>Help</li>
              <li>Sitemap</li>
              <li>Legal & Privacy information</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer">
        <p className='pl-5' style={{ fontSize: '12px' }}>Help-Sitemap</p>
        <p className='pr-5' style={{ fontSize: '12px' }}>All rights reserved © 2006-2024 OLX</p>
      </div>
    </div>
  );
}

export default Footer;
