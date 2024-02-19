import React,{useEffect,useState} from 'react';
import './WishList.css'
import img from '../../Images/grocery 4.webp'
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const WishList = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/wishlist");
        console.log(response.data);  // Log the entire response
        setData(response.data);  // Set the data directly, assuming the array of groceries is at the top level
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);


  return (
    <div>
      <div className="WishLists">
    <h1 className='WishHead'><FaRegHeart /> WishList</h1>
    {data?.map((wishlist) => (
      <div className="list container-fluid">
    <div className="row">
      <div className="col-md-4">
        <img className='ProductImg' width={'250rem'} height={'400rem'} src={wishlist.thumbnail} alt="" />
      </div>
      <div className="col-md-4">
        <h5 className='ProductName'>{wishlist.title}</h5>
        <p className='ProductDetail'>{wishlist.description}</p>
        <h5 className='ProductPrice'>&#x20B9; {wishlist.price}</h5>
      </div>
      <div className="col-md-4 d-flex flex-column align-items-end mt-3">
      <MdOutlineDeleteOutline className="fs-3"/>
      </div>
    </div>
  </div>
    ))}
</div>
    </div>
  );
}

export default WishList;
