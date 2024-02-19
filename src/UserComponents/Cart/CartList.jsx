import React,{useEffect,useState} from 'react';
import './CartList.css'
import img from '../../Images/grocery 4.webp'
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BsCart3 } from "react-icons/bs";
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/carts");
  //       console.log(response.data);  // Log the entire response
  //       setData(response.data);  // Set the data directly, assuming the array of groceries is at the top level
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   fetchData();
  // }, []);

  const View = (productId) => {
    navigate(`/view/${productId}`);
  };

  return (
<div className="CartLists">
    <h1 className='CartHead'><BsCart3 /> CartList</h1>
    {data?.map((cart) => (

      <div className="list container-fluid" onClick={() => View(cart._id)} key={cart._id}>
    <div className="row">
      <div className="col-md-4">
        <img className='ProductImg' width={'250rem'} height={'400rem'} src={cart.thumbnail} alt="" />
      </div>
      <div className="col-md-4">
        <h5 className='ProductName'>{cart.title}</h5>
        <p className='ProductDetail'>{cart.description}</p>
        <h5 className='ProductPrice'>&#x20B9; {cart.price}</h5>
        <CiCirclePlus className='fs-4'/> 1 <CiCircleMinus className='fs-4'/>
      </div>
      <div className="col-md-4 d-flex flex-column align-items-end mt-3">
      <MdOutlineDeleteOutline className="fs-3"/>
        <Button className='PlaceBtn mt-auto' variant="warning">Place Order</Button>
      </div>
    </div>
  </div>
    ))}
</div>

  );
}

export default CartList;
