import React from 'react';
import './WishList.css'
import img from '../../Images/grocery 4.webp'
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";

const WishList = () => {
  return (
    <div>
      <div className="WishLists">
    <h1 className='WishHead'><FaRegHeart /> WishList</h1>
  <div className="list container-fluid">
    <div className="row">
      <div className="col-md-4">
        <img className='ProductImg' src={img} alt="" />
      </div>
      <div className="col-md-4">
        <h5 className='ProductName'>Let's GoNuts Fresh Crispy Cashewnuts Broken Split 2Pcs</h5>
        <p className='ProductDetail'> 150gX2 Cashews  (2 x 150 g)</p>
        <h5 className='ProductPrice'>&#x20B9; 375</h5>
      </div>
      <div className="col-md-4 d-flex flex-column align-items-end mt-3">
      <MdOutlineDeleteOutline className="fs-3"/>
      </div>
    </div>
  </div>

  <div className="list container-fluid">
    <div className="row">
      <div className="col-md-4">
        <img className='ProductImg' src={img} alt="" />
      </div>
      <div className="col-md-4">
      <h5 className='ProductName'>Let's GoNuts Fresh Crispy Cashewnuts Broken Split 2Pcs</h5>
      <p className='ProductDetail'> 150gX2 Cashews  (2 x 150 g)</p>
      <h5 className='ProductPrice'>&#x20B9; 375</h5>
      </div>
      <div className="col-md-4 d-flex flex-column align-items-end mt-3">
      <MdOutlineDeleteOutline className="fs-3"/>
      </div>
    </div>
  </div>

  <div className="list container-fluid">
    <div className="row">
      <div className="col-md-4">
        <img className='ProductImg' src={img} alt="" />
      </div>
      <div className="col-md-4">
      <h5 className='ProductName'>Let's GoNuts Fresh Crispy Cashewnuts Broken Split 2Pcs</h5>
        <p className='ProductDetail'> 150gX2 Cashews  (2 x 150 g)</p>
        <h5 className='ProductPrice'>&#x20B9; 375</h5>
      </div>
      <div className="col-md-4 d-flex flex-column align-items-end mt-3">
      <MdOutlineDeleteOutline className="fs-3"/>
      </div>
    </div>
  </div>

  <div className="list container-fluid">
    <div className="row">
      <div className="col-md-4">
        <img className='ProductImg' src={img} alt="" />
      </div>
      <div className="col-md-4">
      <h5 className='ProductName'>Let's Gonuts Whole Cashew Nuts 125g | Akka Kaju Cashewnuts</h5>
      <p className='ProductDetail'> 150gX2 Cashews  (2 x 150 g)</p>
      <h5 className='ProductPrice'>&#x20B9; 375</h5>
      </div>
      <div className="col-md-4 d-flex flex-column align-items-end mt-3">
        <MdOutlineDeleteOutline className="fs-3"/>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}

export default WishList;
