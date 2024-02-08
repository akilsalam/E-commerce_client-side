import React from 'react';
import './CartList.css'
import img from '../../Images/grocery 4.webp'
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BsCart3 } from "react-icons/bs";
import { Button } from 'react-bootstrap';

const CartList = () => {
  return (
<div className="CartLists">
    <h1 className='CartHead'><BsCart3 /> CartList</h1>
  <div className="list container-fluid">
    <div className="row">
      <div className="col-md-4">
        <img className='ProductImg' src={img} alt="" />
      </div>
      <div className="col-md-4">
        <h5 className='ProductName'>Let's GoNuts Fresh Crispy Cashewnuts Broken Split 2Pcs</h5>
        <p className='ProductDetail'> 150gX2 Cashews  (2 x 150 g)</p>
        <h5 className='ProductPrice'>&#x20B9; 375</h5>
        <CiCirclePlus className='fs-4'/> 1 <CiCircleMinus className='fs-4'/>
      </div>
      <div className="col-md-4 d-flex flex-column align-items-end mt-3">
      <MdOutlineDeleteOutline className="fs-3"/>
        <Button className='PlaceBtn mt-auto' variant="warning">Place Order</Button>
      </div>
    </div>
  </div>

  {/* <div className="list container-fluid">
    <div className="row">
      <div className="col-md-4">
        <img className='ProductImg' src={img} alt="" />
      </div>
      <div className="col-md-4">
      <h5 className='ProductName'>Let's GoNuts Fresh Crispy Cashewnuts Broken Split 2Pcs</h5>
      <p className='ProductDetail'> 150gX2 Cashews  (2 x 150 g)</p>
      <h5 className='ProductPrice'>&#x20B9; 375</h5>
      <CiCirclePlus className='fs-4'/> 1 <CiCircleMinus className='fs-4'/>
      </div>
      <div className="col-md-4 d-flex flex-column align-items-end mt-3">
      <MdOutlineDeleteOutline className="fs-3"/>
        <Button className='PlaceBtn mt-auto' variant="warning">Place Order</Button>
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
        <CiCirclePlus className='fs-4'/> 1 <CiCircleMinus className='fs-4'/>
      </div>
      <div className="col-md-4 d-flex flex-column align-items-end mt-3">
      <MdOutlineDeleteOutline className="fs-3"/>
        <Button className='PlaceBtn mt-auto' variant="warning">Place Order</Button>
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
      <CiCirclePlus className='fs-4'/> 1 <CiCircleMinus className='fs-4'/>
      </div>
      <div className="col-md-4 d-flex flex-column align-items-end mt-3">
        <MdOutlineDeleteOutline className="fs-3"/>
        <Button className='PlaceBtn mt-auto' variant="warning">Place Order</Button>
      </div>
    </div>
  </div> */}
</div>

  );
}

export default CartList;
