import React, { useState, useEffect } from 'react';
import "./Categories.css"
import axios from 'axios';
import { Card, Spinner } from 'react-bootstrap';
import { FaRegStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { GrStatusGood } from "react-icons/gr";

const Groceries = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [addedProducts, setAddedProducts] = useState([]);

  useEffect(() => {
    // Load wishlist items from localStorage on component mount
    const storedWishlist = localStorage.getItem('WishList');

    if (storedWishlist) {
      const wishlistItems = JSON.parse(storedWishlist);
      const productIds = wishlistItems.map(item => item._id);
      setAddedProducts(productIds);
    }

    const fetchData = async () => {
      try {
        console.log(props.url);
        const response = await axios.get(props.url);
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [props.url]);

  const View = (productId) => {
    navigate(`/view/${productId}`);
  };

  // const toWishList = (product) => {
  //   const storedValue = localStorage.getItem('WishList');
  //   let existingWishList = [];

  //   if (storedValue) {
  //     try {
  //       existingWishList = JSON.parse(storedValue);
  //     } catch (error) {
  //       console.error('Error parsing stored value:', error);
  //     }
  //   }

  //   const existingProductIndex = existingWishList.findIndex((item) => item._id === product._id);

  //   if (existingProductIndex === -1) {
  //     // Product is not in wishlist, add it
  //     existingWishList.push({
  //       _id: product._id,
  //       title: product.title,
  //       description: product.description,
  //       price: product.price,
  //       discountPercentage:product.discountPercentage,
  //       rating:product.rating,
  //       stock:product.stock,
  //       brand:product.brand,
  //       category:product.category,
  //       thumbnail:product.thumbnail,
  //       images:product.images
  //     });

  //     // Set isAdded state for the added product
  //     setAddedProducts([...addedProducts, product._id]);

  //     // Show a success notification
  //     setNotificationMessage(`Product added to Wish List!`);
  //   } else {
  //     // Product is already in wishlist, remove it
  //     existingWishList.splice(existingProductIndex, 1);

  //     // Remove the product from the addedProducts array
  //     setAddedProducts(addedProducts.filter((productId) => productId !== product._id));

  //     // Show an info notification
  //     setNotificationMessage(`Product removed from Wish List!`);
  //   }

  //   localStorage.setItem('WishList', JSON.stringify(existingWishList));
  //   setShowNotification(true);

  //   setTimeout(() => {
  //     setShowNotification(false);
  //   }, 3000);
  // };

  return (
    <>
      <h1 className='CategoryTitle'>{props.title}</h1>
      <div className='itemDiv'>
        {loading && <Spinner animation='border' role='status'></Spinner>}
        {data?.map((product) => (
          <Card className='itemcard' key={product._id}>
            <Card.Img
              onClick={() => View(product._id)}
              className='itemImg'
              variant="top"
              src={product.thumbnail && product.thumbnail.startsWith('http')
                ? product.thumbnail
                : `data:image/jpeg;base64,${product.thumbnail}`
              }
              alt="Product Thumbnail"
            />
            {/* <div className="wish m-3" onClick={() => toWishList(product)}>
              {addedProducts.includes(product._id) ?
                <IoMdHeart className='fs-4' style={{ color: 'red' }} /> :
                <FaRegHeart className='fs-4' />
              }
            </div> */}
            <Card.Body className='itemBody'>
              <Card.Title className='itemTitle'>{product.title}</Card.Title>
              <Card.Text className='itemText'>{product.brand}</Card.Text>
              <p className='itemPrice'>&#x20B9;{product.price}</p>
              <span><FaRegStar className='text-warning' /></span>
              <span><FaRegStar className='text-warning' /></span>
              <span><FaRegStar className='text-warning' /></span>
              <span><FaRegStar /></span>
              <span><FaRegStar /></span>
            </Card.Body>
          </Card>
        ))}
      </div>
      {showNotification && (
        <div style={{ display: 'flex', justifyContent: 'center' }} className={`notification ${notificationMessage.includes('removed') ? 'removedNotification' : ''}`}>
          <p><span style={{ color: 'GrayText' }}><GrStatusGood className='fs-4' /></span>{notificationMessage}</p>
        </div>
      )}
    </>
  );
}

export default Groceries
