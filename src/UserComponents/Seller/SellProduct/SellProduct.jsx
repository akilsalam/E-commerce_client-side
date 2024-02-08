import React from 'react';
import './SellProduct.css'
import { Button } from 'react-bootstrap';

const SellProduct = () => {
  return (
    <div>
      <div className="SellProduct">
            <div className="SellProductDiv">
                <h1 className='SellHead'>Sell Your Item</h1>
                <div className="container-fluid">
                    <div className="row">

                <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="brandname">
                  BrandName
                </label>
                <div className="InputDiv">
                  <input className="Input" type="text" id="brandname" />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="name">
                  Name
                </label>
                <div className="InputDiv">
                  <input className="Input" type="text" id="name" />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="price">
                  Price
                </label>
                <div className="InputDiv">
                  <input className="Input" type="number" id="price" />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="category">
                  Category
                </label>
                <div className="InputDiv">
                  <select className="Input" type="text" id="category" >
                    <option value="">Grocery</option>
                    <option value="">Mobiles</option>
                    <option value="">Fashion</option>
                    <option value="">Home & Furniture</option>
                    <option value="">Electronics</option>
                    <option value="">Appliances</option>
                    <option value="">Travel</option>
                    <option value="">Beauty Toys & More</option>
                    <option value="">Two Wheelers</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="lastname">
                  Description
                </label>
                <div className="InputDiv">
                  <textarea className="Input" type="text" placeholder='Describe your Product' rows="4" cols="50"/>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="lastname">
                  Shipping Method
                </label>
                <div className="InputDiv">
                  <select className="Input" type="text" id="lastname" >
                    <option value="">Free</option>
                    <option value="">Pay</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="price">
                  Quantity
                </label>
                <div className="InputDiv">
                  <input className="Input" type="number" id="price" placeholder='Available quantity'/>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="price">
                  Image
                </label>
                <div className="fileUpload">
                  <input className="Input" type="file" id="price" placeholder='Available quantity'/>
                </div>
              </div>
            </div>
            <div className="col-md-6">
                <img src="" alt="" />
            </div>
            <div className="col-md-12">
            <Button className='Sell' variant="primary">Post</Button>{' '}
            </div>
                    </div>
                </div>
            </div>
      </div>
    </div>
  );
}

export default SellProduct;
