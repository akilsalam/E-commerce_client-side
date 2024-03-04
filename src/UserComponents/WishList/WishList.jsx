import React, { useEffect, useState } from 'react';
import './WishList.css';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import empty from '../../Images/emptyWishlist.png'

const WishList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = localStorage.getItem('ShipShopUserPhone') || localStorage.getItem('ShipShopUserName');
  const navigate = useNavigate();

  useEffect(() => {
    // Modify the fetchCartData function to check if response.data is an array
const fetchCartData = async () => {
  if (user) {
    try {
      const response = await axios.get(`http://localhost:3000/wishlist/${user}`);
      // Check if response.data is an array before iterating
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        console.error('Invalid response format from the server:', response.data);
        // Handle error as needed
      }
    } catch (error) {
      console.error('Error fetching cart data from the server:', error);
      // Handle error as needed
    }
  } else {
        // User does not exist, fetch cart data from local storage
        const storedData = JSON.parse(localStorage.getItem('WishList')) || [];
        // Initialize quantity state with item ids and their quantities
        // const initialQuantityState = {};
        // storedCartData.forEach((item) => {
        //   initialQuantityState[item._id] = 1;
        // });
        // setQuantity(initialQuantityState);
        setData(storedData);
      }
    };
  
    fetchCartData();
  }, [user]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3000/wishlist');
  //       console.log(response.data);
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const deleteWishData = async (productId) => {
    const confirmation = window.confirm('This deletes the data from the cart');
    if (user) {
        if(confirmation){
        try {
          // If user is available, send a request to the server to delete the cart item
          await axios.delete(`http://localhost:3000/wishlist/${productId}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            data: { user: user },
          });
          // If successful, update the state or perform any necessary actions
          window.location.reload()
          console.log('Wishlist item deleted from the server');
        } catch (error) {
          console.error('Error deleting cart item from the server:', error);
          // Handle error as needed
        }
      }
    } else {
      if (confirmation) {
        const updatedWishListData = data.filter((item) => item._id !== productId);
        setData(updatedWishListData);
        localStorage.setItem('WishList', JSON.stringify(updatedWishListData));
      }
    }
  };

  return (
    <div>
      <div className="WishLists">
        <h1 className='WishHead'>
          <FaRegHeart /> Your Liked Products
        </h1>
        {data && data.length > 0 ? (
  data.map((wishlist) => (
    <div className="list container-fluid" key={wishlist._id}>
      <div className="row flex-wrap">
        <div className="col-md-4">
          <img
            className='ProductImg'
            width={'250rem'}
            height={'400rem'}
            src={
              wishlist.thumbnail && wishlist.thumbnail.startsWith('http')
                ? wishlist.thumbnail
                : `data:image/jpeg;base64,${wishlist.thumbnail}`
            }
            alt=""
          />
        </div>
        <div className="col-md-4">
          <h5 className='ProductName'>{wishlist.title}</h5>
          <p className='ProductDetail'>{wishlist.description}</p>
          <h5 className='ProductPrice'>&#x20B9; {wishlist.price}</h5>
        </div>
        <div className="col-md-4 d-flex flex-column align-items-end mt-3">
          <div className='deleteDiv'>
            <MdOutlineDeleteOutline className="deleteWished fs-3" onClick={() => deleteWishData(wishlist._id)} />
          </div>
        </div>
      </div>
    </div>
  ))
) : (
  <>
    <div style={{ justifyContent: 'center', display: 'flex', marginTop: '5rem', fontSize: '30px', fontWeight: '800', fontFamily: 'cursive' }}>
      <img width={"400px"} src={empty} alt="" />
    </div>
    {/* <h1 style={{ textAlign: 'center' }}>Your Wishlist is Empty</h1> */}
  </>
)}

      </div>
    </div>
  );
};

export default WishList;
