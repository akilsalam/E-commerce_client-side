import React, { useState, useEffect } from 'react';
import './View.css';
import { ProgressBar, Carousel, Alert } from 'react-bootstrap';
import { MdStar, MdStarHalf } from 'react-icons/md';
import axios from 'axios';
import { FaRegHeart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';
import { IoMdHeart } from "react-icons/io";
import { GrStatusGood } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

const View = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const navigate = useNavigate()

  const Buy = () =>{
    navigate(`/checkout/${productData._id}`)
  }

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/View/${id}`);
        setProductData(response.data);
        console.log('Product Data:', response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [id]);

  useEffect(() => {
    const storedCart = localStorage.getItem('Cart');
    const storedWishlist = localStorage.getItem('WishList');

    if (storedCart) {
      const cartItems = JSON.parse(storedCart);
      const inCart = cartItems.some(item => item._id === id);
      setAddedToCart(inCart);
    }

    if (storedWishlist) {
      const wishlistItems = JSON.parse(storedWishlist);
      const inWishlist = wishlistItems.some(item => item._id === id);
      setAddedToWishlist(inWishlist);
    }
  }, [id]);

  const toCart = () => {
    const storedCart = localStorage.getItem('Cart');
    let existingCart = [];

    if (storedCart) {
      existingCart = JSON.parse(storedCart);
    }

    const existingProductIndex = existingCart.findIndex(item => item._id === id);

    if (existingProductIndex === -1) {
      // Product is not in cart, add it
      existingCart.push({
        _id: id,
        title: productData.title,
        description: productData.description,
        price: productData.price,
        discountPercentage:productData.discountPercentage,
        rating:productData.rating,
        stock:productData.stock,
        brand:productData.brand,
        category:productData.category,
        thumbnail:productData.thumbnail,
        images:productData.images
      });

      // Show a success notification
      setNotificationMessage(`Product added to Cart!`);
      setAddedToCart(true);
    } else {
      // Product is already in cart, remove it
      existingCart.splice(existingProductIndex, 1);

      // Show an info notification
      setNotificationMessage(`Product removed from Cart!`);
      setAddedToCart(false);
    }

    localStorage.setItem('Cart', JSON.stringify(existingCart));
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const toWishList = () => {
    const storedWishlist = localStorage.getItem('WishList');
    let existingWishList = [];

    if (storedWishlist) {
      existingWishList = JSON.parse(storedWishlist);
    }

    const existingProductIndex = existingWishList.findIndex(item => item._id === id);

    if (existingProductIndex === -1) {
      // Product is not in wishlist, add it
      existingWishList.push({
        _id: id,
        title: productData.title,
        description: productData.description,
        price: productData.price,
        discountPercentage:productData.discountPercentage,
        rating:productData.rating,
        stock:productData.stock,
        brand:productData.brand,
        category:productData.category,
        thumbnail:productData.thumbnail,
        images:productData.images
      });

      // Show a success notification
      setNotificationMessage(`Product added to Wish List!`);
      setAddedToWishlist(true);
    } else {
      // Product is already in wishlist, remove it
      existingWishList.splice(existingProductIndex, 1);

      // Show an info notification
      setNotificationMessage(`Product removed from Wish List!`);
      setAddedToWishlist(false);
    }

    localStorage.setItem('WishList', JSON.stringify(existingWishList));
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const [transformOrigin, setTransformOrigin] = useState('center center');

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setTransformOrigin(`${x * 100}% ${y * 100}%`);
  };

  const handleMouseLeave = () => {
    setTransformOrigin('center center');
  };

  const calculateRestAmountForItem = (item) => {
    return Math.round(item.price - (item.price * (item.discountPercentage / 100)));
  };

  return (
    productData ? (
      <div className="MainDiv row flex-wrap">
        <div className="ImgDiv col-md-6">
          <div className="Img" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <img src={productData.thumbnail && productData.thumbnail.startsWith('/')
              ? `data:image/jpeg;base64,${productData.thumbnail}`
              : productData.thumbnail
            } alt="" className="img-fluid" style={{ transformOrigin }} />
            <div className="wishlist  m-1" onClick={toWishList}>
              {addedToWishlist ?
                <IoMdHeart className='fs-4' style={{ color: 'red' }} /> :
                <FaRegHeart className='fs-4 m-1' />
              }
            </div>
          </div>
          {showNotification && (
            <div style={{ display: 'flex', justifyContent: 'center' }} className={`notification ${notificationMessage.includes('removed') ? 'removedNotification' : ''}`}>
              <p><span style={{ color: 'GrayText' }}><GrStatusGood className='fs-4' /></span>{notificationMessage}</p>
            </div>
          )}
          <div className='ButtonsDiv'>
            <div className='ButtonDiv'>
              <button
                onClick={toCart}
                className='CartButton'
                style={addedToCart ? { backgroundColor: 'maroon' } : null}
              >
                {addedToCart ? 'Remove from Cart' : 'Add to Cart'}
              </button>
            </div>
            <div className='ButtonDiv'>
              <button className='BuyButton' onClick={Buy}>Buy Now</button>
            </div>
          </div>
          <br />
          <div className="col-md-12">
            <div className="row flex-wrap">
              <p>Rating and reviews are verified and are from people who use the service </p>
              <div className="col-md-4">
                <h1 className='rateNo text-center'>{productData.rating}</h1>
                <hr />
                <div className='text-center text-warning'>
                  <MdStar /><MdStar /><MdStar /><MdStar /><MdStarHalf />
                  <p className='text-secondary'>2,256,896</p>
                </div>
              </div>
              <div className="col-md-8">
                <ProgressBar className='m-2' variant="primary" now={80} />
                <ProgressBar className='m-2' variant="primary" now={30} />
                <ProgressBar className='m-2' variant="primary" now={20} />
                <ProgressBar className='m-2' variant="primary" now={10} />
                <ProgressBar className='m-2' variant="primary" now={20} />
              </div>
            </div>
          </div>
        </div>
        <div className="DetailDiv col-md-6">
          <h1 className='ViewHead'>Product Details</h1>
          <div className='ViewDetails'>
            <h5 className='ViewName'>Name: {productData.title}</h5>
            <p className='ViewDescription'>Description: {productData.description}</p>
            <p>Discount Percentage: {productData.discountPercentage}</p>
            <p>Brand: {productData.brand}</p>
            <p>Category: {productData.category}</p>
            <div style={{display:'flex'}}>
            <span className='ViewPrice'>Price:</span><p className='ViewPrice' style={{paddingLeft:'1rem',paddingRight:'1rem',textDecoration:'line-through',color:'grey'}}> &#x20B9;{productData.price}</p> <p className='ViewPrice'> &#x20B9;{calculateRestAmountForItem(productData)}</p>
            </div>
            <div className="col-md-12">
              <div className="">
                <h5>Images</h5>
                <Carousel>
                  {Array.isArray(productData.images) && productData.images.map((image, index) => (
                    <Carousel.Item key={index} >
                      <div style={{display:'flex',justifyContent:'center'}}>
                      <img style={{borderRadius:'10px'}} src={image} alt={`Image ${index}`} />
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null
  );
};

export default View;
