import React, { useState, useEffect } from 'react';
import './View.css';
import { ProgressBar, Carousel, Alert } from 'react-bootstrap';
import { MdStar, MdStarHalf } from 'react-icons/md';
import axios from 'axios';
import { FaRegHeart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';
import { IoMdHeart } from 'react-icons/io';
import { GrStatusGood } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import serverUrl from '../../../codes';

const View = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [rate,setRate] = useState('')
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [shouldRenderCartButton, setShouldRenderCartButton] = useState(true);
  const [shouldRenderWishButton, setShouldRenderWishButton] = useState(true);
  const user = localStorage.getItem('ShipShopUserName') || localStorage.getItem('ShipShopUserPhone');
  const navigate = useNavigate();

  const Buy = () => {
    navigate(`/orderPage/${productData._id}`);
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${serverUrl}/View/${id}`);
        setProductData(response.data);
        console.log('Product Data:', response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [id]);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const response = await axios.get(`${serverUrl}/rate/${id}`);
        setRate(response.data);
        console.log('Rates', response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
  
    fetchRate();
  }, [id]);
  

  useEffect(() => {
    const storedCart = localStorage.getItem('Cart');
    const storedWishlist = localStorage.getItem('WishList');

    if (storedCart) {
      const cartItems = JSON.parse(storedCart);
      const inCart = cartItems.some((item) => item._id === id);
      setAddedToCart(inCart);
    }

    if (storedWishlist) {
      const wishlistItems = JSON.parse(storedWishlist);
      const inWishlist = wishlistItems.some((item) => item._id === id);
      setAddedToWishlist(inWishlist);
    }
  }, [id]);

  useEffect(() => {
    const checkCartExistence = async () => {
      try {
        const existsInCart = await cartExist(id);
        setShouldRenderCartButton(!existsInCart);
      } catch (error) {
        console.error('Error checking cart existence:', error);
      }
    };

    checkCartExistence();
  }, [id]);

  useEffect(() => {
    const checkWishExistence = async () => {
      try {
        const existsInWish = await wishExist(id);
        setShouldRenderWishButton(!existsInWish);
        console.log("exist",id);
      } catch (error) {
        console.error('Error checking cart existence:', error);
      }
    };

    checkWishExistence();
  }, [id]);

  const toCart = async () => {
    const storedCart = localStorage.getItem('Cart');
    let existingCart = [];

    if (storedCart) {
      existingCart = JSON.parse(storedCart);
    }

    const existingProductIndex = existingCart.findIndex((item) => item._id === id);

    if (existingProductIndex === -1) {
      // Product is not in cart, add it
      existingCart.push({
        _id: id,
        title: productData.title,
        description: productData.description,
        price: productData.price,
        discountPercentage: productData.discountPercentage,
        rating: productData.rating,
        stock: productData.stock,
        brand: productData.brand,
        category: productData.category,
        thumbnail: productData.thumbnail,
        images: productData.images,
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

    if (user) {
      try {
        // Send data to the server
        await axios.post(
          `${serverUrl}/cart`,
          {
            user: user,
            items: existingCart,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        window.location.reload()
      } catch (error) {
        console.error('Error sending cart data to the server:', error);
        // Handle error as needed
      }
    } else {
      localStorage.setItem('Cart', JSON.stringify(existingCart));
      setShowNotification(true);
    }

    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const cartExist = async (productId) => {
    try {
      // Send a request to the server to check if the product and productId exist in the cart
      const response = await axios.get(`${serverUrl}/cartExist/${id}`, {
        params: { user: user, productId: productId },
      });

      setAddedToCart(true);
      return response.data.exists;
    } catch (error) {
      console.error('Error checking if product exists in the cart:', error);
      // Handle error as needed
      throw error;
    }
  };

  const toWishList = async () => {
    const storedWishlist = localStorage.getItem('WishList');
    let existingWishList = [];

    if (storedWishlist) {
      existingWishList = JSON.parse(storedWishlist);
    }

    const existingProductIndex = existingWishList.findIndex((item) => item._id === id);

    if (existingProductIndex === -1) {
      // Product is not in wishlist, add it
      existingWishList.push({
        _id: id,
        title: productData.title,
        description: productData.description,
        price: productData.price,
        discountPercentage: productData.discountPercentage,
        rating: productData.rating,
        stock: productData.stock,
        brand: productData.brand,
        category: productData.category,
        thumbnail: productData.thumbnail,
        images: productData.images,
      });

      // Show a success notification
      setNotificationMessage(`Product added to WishList!`);

      setAddedToWishlist(true);
    } else {
      // Product is already in wishlist, remove it
      existingWishList.splice(existingProductIndex, 1);

      // Show an info notification
      setNotificationMessage(`Product removed from WishList!`);
      setAddedToWishlist(false);
    }

    if (user) {
      try {
        // Send data to the server
        await axios.post(
          `${serverUrl}/wishlist`,
          {
            user: user,
            items: existingWishList,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        window.location.reload()
      } catch (error) {
        console.error('Error sending wishList data to the server:', error);
        // Handle error as needed
      }
    } else {

    localStorage.setItem('WishList', JSON.stringify(existingWishList));
    setShowNotification(true);
    }

    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const wishExist = async (productId) => {
    try {
      // Send a request to the server to check if the product and productId exist in the cart
      const response = await axios.get(`${serverUrl}/wishExist/${id}`, {
        params: { user: user, productId: id },
      });

      setAddedToWishlist(true);
      return response.data.exists;
    } catch (error) {
      console.error('Error checking if product exists in the cart:', error);
      // Handle error as needed
      throw error;
    }
  };

  const removeWish = async () =>{
    try {
      // If user is available, send a request to the server to delete the cart item
      await axios.delete(`${serverUrl}/wishlist/${id}`, {
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
    return Math.round(item.price - item.price * (item.discountPercentage / 100));
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const averageRate = () => {
    const { OneStar, TwoStar, ThreeStar, FourStar, FiveStar } = rate?.data || {};
  
    // Ensure all ratings are numbers before summing
    const sumOfRatings = [OneStar, TwoStar, ThreeStar, FourStar, FiveStar].reduce(
      (acc, rating) => acc + (typeof rating === 'number' ? rating : 0),
      0
    );
  
    // Calculate the average
    const totalRatings = [OneStar, TwoStar, ThreeStar, FourStar, FiveStar].filter(
      rating => typeof rating === 'number'
    ).length;
  
    return totalRatings > 0 ? sumOfRatings / totalRatings : 0;
  };
  
  const totalAmountOfRatings = () => {
    const { OneStar, TwoStar, ThreeStar, FourStar, FiveStar } = rate?.data || {};
  
    // Ensure all ratings are numbers before summing
    const sumOfRatings = [OneStar, TwoStar, ThreeStar, FourStar, FiveStar].reduce(
      (acc, rating) => acc + (typeof rating === 'number' ? rating : 0),
      0
    );
  
    return sumOfRatings;
  };
  
  const login = () =>{
    navigate('/login')
  }
  

  return (
    productData ? (
      <div className="MainDiv row flex-wrap">
        <div className="ImgDiv col-md-6">
          <div className="Img" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <img
              src={
                productData.thumbnail && productData.thumbnail.startsWith('/')
                  ? `data:image/jpeg;base64,${productData.thumbnail}`
                  : productData.thumbnail
              }
              alt=""
              className="img-fluid"
              style={{ transformOrigin }}
            />
            <div className="wishlist  m-1" >
              {shouldRenderWishButton ? (
                <FaRegHeart onClick={async () => await toWishList()} className='fs-4 m-1' />
                ) : (
                <IoMdHeart onClick={async () => await removeWish()} className='fs-4' style={{ color: 'red' }} />
              )}
            </div>
          </div>
          {showNotification && (
            <div
              style={{ display: 'flex', justifyContent: 'center' }}
              className={`notification ${notificationMessage.includes('removed') ? 'removedNotification' : ''}`}
            >
              <p>
                <span style={{ color: 'GrayText' }}>
                  <GrStatusGood className='fs-4' />
                </span>
                {notificationMessage}
              </p>
            </div>
          )}
          <div className='ButtonsDiv'>
            <div className='ButtonDiv'>
              {shouldRenderCartButton ? (
                <button 
                onClick={toCart} className='CartButton'>
                  Add to Cart
                </button>
              ) : (
                <button onClick={goToCart} className='CartButton'>
                  Go to Cart
                </button>
              )}
            </div>
            <div className='ButtonDiv'>
              <button className='BuyButton' onClick={user ? Buy : login}>
                Buy Now
              </button>
            </div>
          </div>
          <br />
          <div className="col-md-12">
            <div className="row flex-wrap">
              <p className='text-center'>Rating and reviews are verified and are from people who use the service </p>
              <div className="col-md-4">
                <h1 className='rateNo text-center'>{averageRate()}</h1>
                <hr />
                <div className='text-center text-warning' style={{display:'flex',justifyContent:'center'}}>
                <Stack spacing={1} >
                        <Rating
                            className='fs-3'
                            name="half-rating"
                            precision={0.5}
                            value={averageRate()}
                            readOnly
                        />
                    </Stack>
                </div>
                  <p className='text-secondary text-center'>{totalAmountOfRatings()} Ratings</p>
              </div>
              <div className="col-md-8">
                <ProgressBar className='m-2' variant="primary" now={rate?.data?.OneStar} />
                <ProgressBar className='m-2' variant="primary" now={rate?.data?.TwoStar} />
                <ProgressBar className='m-2' variant="primary" now={rate?.data?.ThreeStar} />
                <ProgressBar className='m-2' variant="primary" now={rate?.data?.FourStar} />
                <ProgressBar className='m-2' variant="primary" now={rate?.data?.FiveStar} />
              </div>
            </div>
          </div>
        </div>
        {/* <div style={{display:'flex',justifyContent:'center'}}> */}
        <div className="DetailDiv col-md-6">
          <h1 className='ViewHead'>Product Details</h1>
          <div className='ViewDetails'>
            <h5 className='ViewName'>Name: {productData.title}</h5>
            <p className='ViewDescription'>Description: {productData.description}</p>
            <p>Discount Percentage: {Math.ceil(productData.discountPercentage)}</p>
            <p>Brand: {productData.brand}</p>
            <p>Category: {productData.category}</p>
            <div style={{ display: 'flex' }}>
              <span className='ViewPrice'>Price:</span>
              <p className='ViewPrice' style={{ paddingLeft: '1rem', paddingRight: '1rem', textDecoration: 'line-through', color: 'grey' }}>
                {' '}
                &#x20B9;{productData.price}
              </p>{' '}
              <p className='ViewPrice'> &#x20B9;{calculateRestAmountForItem(productData)}</p>
            </div>
            <div className="col-md-12">
              <div className="">
                <h5>Images</h5>
                <div className="row flex-wrap">
                  <div className='col-md-4' style={{ justifyContent: 'center', display: 'flex' }}>
                    <img style={{ borderRadius: '10px', width: '100px',  }} src={productData.images[0]} alt={`Image`} />
                  </div>
                  <div className='col-md-4' style={{ justifyContent: 'center', display: 'flex' }}>
                    <img style={{ borderRadius: '10px', width: '100px',  }} src={productData.images[1]} alt={`Image`} />
                  </div>
                  <div className='col-md-4' style={{ justifyContent: 'center', display: 'flex' }}>
                    <img style={{ borderRadius: '10px', width: '100px',}} src={productData.images[2]} alt={`Image`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      // </div>
    ) : null
  );
};

export default View;
