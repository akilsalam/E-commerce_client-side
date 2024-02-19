import React, { useState, useEffect } from 'react';
import './View.css';
import { ProgressBar, Carousel, Alert } from 'react-bootstrap';
import { MdStar, MdStarHalf } from 'react-icons/md';
import axios from 'axios';
import { FaRegHeart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';

const View = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);

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

  console.log('Product Data in State:', productData);

  const [isAddedToCart, setAddedToCart] = useState(false);
  const [isAddedToWishlist, setAddedToWishlist] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/checkCart/${id}`)
      .then((response) => setAddedToCart(response.data.isAdded))
      .catch((error) => console.error('Error checking cart status:', error));
  }, [id]);

  const addToCart = () => {
    setAddedToCart(localStorage.setItem('CartData', isAddedToCart));
  };

  const addToWishList = () => {
    axios
      .post(`http://localhost:3000/addToWishList/${id}`)
      .then((response) => {
        console.log(response.data);
        setAddedToWishlist(true);

        const timer = setTimeout(() => {
          setAddedToWishlist(false);
        }, 3000);

        return () => clearTimeout(timer);
      })
      .catch((error) => console.error('Error adding item to wishlist:', error));
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

  return (
    productData ? (
      <div className="MainDiv row">
        <div className="ImgDiv col-md-6">
          {isAddedToWishlist ?
            <Alert variant='danger' className='text-center'>
              Added to <FaRegHeart className='text-danger' /> WishList
            </Alert>
            : null}
          {isAddedToCart ?
            <Alert variant='warning' className='text-center'>
              Added to <BsCart3 className='text-warning' /> Cart
            </Alert>
            : null}
          <div className="Img" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <img src={productData.thumbnail} alt="" className="img-fluid" style={{ transformOrigin }} />
            <div className="wishlist" onClick={addToWishList} style={isAddedToWishlist ? { color: 'red' } : null}>
              <FaRegHeart className='fs-4' />
            </div>
          </div>
          <div className='ButtonsDiv'>
            <div className='ButtonDiv'>
              <button
                onClick={addToCart}
                className='CartButton'
                style={isAddedToCart ? { backgroundColor: 'grey' } : null}
              >
                {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
              </button>
            </div>
            <div className='ButtonDiv'>
              <button className='BuyButton'>Buy Now</button>
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
            <pre className='ViewDescription'>Description: {productData.description}</pre>
            <pre>Discount Percentage: {productData.discountPercentage}</pre>
            <pre>Brand: {productData.brand}</pre>
            <pre>Category: {productData.category}</pre>
            <p className='ViewPrice'>Price: &#x20B9;{productData.price}</p>
            <div className="col-md-12">
              <div className="">
                <h5>Images</h5>
                <Carousel>
                  {Array.isArray(productData.images) && productData.images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img src={image} alt={`Image ${index}`} />
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
