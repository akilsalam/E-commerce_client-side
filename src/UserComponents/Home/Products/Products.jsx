import React, { useState, useEffect } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { FaRegHeart } from "react-icons/fa";
import axios from 'axios';
import './Product.css';
import { useNavigate } from 'react-router-dom';
import { IoMdHeart } from "react-icons/io";
import { GrStatusGood } from "react-icons/gr";

const Products = (prop) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [addedProducts, setAddedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(prop.url);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('WishList');

    if (storedWishlist) {
      const wishlistItems = JSON.parse(storedWishlist);
      const productIds = wishlistItems.map(item => item._id);
      setAddedProducts(productIds);
    }
  }, []);

  const SeeMore = () => {
    navigate(prop.link);
  };

  const View = (productId) => {
    navigate(`/view/${productId}`);
  };

  const toWishList = (product) => {
    const storedValue = localStorage.getItem('WishList');
    let existingWishList = [];

    if (storedValue) {
      try {
        existingWishList = JSON.parse(storedValue);
      } catch (error) {
        console.error('Error parsing stored value:', error);
      }
    }

    const existingProductIndex = existingWishList.findIndex((item) => item._id === product._id);

    if (existingProductIndex === -1) {
      // Product is not in wishlist, add it
      existingWishList.push({
        _id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        discountPercentage:product.discountPercentage,
        rating:product.rating,
        stock:product.stock,
        brand:product.brand,
        category:product.category,
        thumbnail:product.thumbnail,
        images:product.images
      });

      // Set isAdded state for the added product
      setAddedProducts([...addedProducts, product._id]);

      // Show a success notification
      setNotificationMessage(`Product added to Wish List!`);
    } else {
      // Product is already in wishlist, remove it
      existingWishList.splice(existingProductIndex, 1);

      // Remove the product from the addedProducts array
      setAddedProducts(addedProducts.filter((productId) => productId !== product._id));

      // Show an info notification
      setNotificationMessage(`Product removed from Wish List!`);
    }

    localStorage.setItem('WishList', JSON.stringify(existingWishList));
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div>
      <div className='productBar' id={prop.id}>
        <h1>{prop.title}</h1>
        <div className='productDiv'>
          {loading && <Spinner animation='border' role='status'></Spinner>}
          {data?.slice(0, 4).map((product) => (
            <Card className='productcard' key={product._id}>
              <Card.Img
                className='productImg'
                onClick={() => View(product._id)}
                variant="top"
                src={
                  product.thumbnail && product.thumbnail.startsWith('http')
                    ? product.thumbnail
                    : `data:image/jpeg;base64,${product.thumbnail}`
                }
              />
              <div className="wish m-3" onClick={() => toWishList(product)}>
                {addedProducts.includes(product._id) ? 
                  <IoMdHeart className='fs-4'style={{color:'red'}}/> :
                   <FaRegHeart className='fs-4' />
                }
              </div>
              <Card.Body className='productBody'>
                <Card.Title className='productTitle'>{product.title}</Card.Title>
                <Card.Text className='productText'>{product.description}</Card.Text>
              </Card.Body>
            </Card>
          ))}
          <Card className='exploreCard '>
            <h1>See More</h1>
            <Card.Body>
              <Button variant="primary" onClick={SeeMore}>
                Explore More
              </Button>
            </Card.Body>
          </Card>
          {showNotification && (
            <div style={{display:'flex',justifyContent:'center'}} className={`notification ${notificationMessage.includes('removed') ? 'removedNotification' : ''}`}>
              <p><span style={{color:'GrayText'}}><GrStatusGood className='fs-4'/></span>{notificationMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
