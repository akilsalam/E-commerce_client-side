import React,{useState,useEffect} from 'react';
import './View.css';
import img from '../../Images/laptop.jpeg';
import { ProgressBar,Carousel } from 'react-bootstrap';
import { MdStar,MdStarHalf } from "react-icons/md";
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaRegHeart } from "react-icons/fa";


const View = () => {
    const { id } = useParams();
    const [productData, setProductData] = useState(null);
    const location = useLocation();
    const pathnameParts = location.pathname.split('/');
    const productId = pathnameParts[pathnameParts.length - 1];
  
    console.log(productId); // This will log the product ID, e.g., "31"

    useEffect(() => {
        const fetchProductData = async () => {
            try {
              const response = await axios.get(`https://dummyjson.com/products/${productId}`);
              setProductData(response.data);
            } catch (error) {
              console.error('Error fetching product data:', error);
            }
          };
    
        fetchProductData();
      }, [productId]);

      console.log(productData);
  
  return (
    productData ? 

        <div className="MainDiv row">
        <div className="ImgDiv col-md-6">
        <div className="Img">
        <img src={productData.thumbnail} alt="" className="img-fluid" />
        <div className="wishlist">
                <FaRegHeart className='fs-4' />
              </div>
        </div>
        <div className='ButtonsDiv'>
        <div className='ButtonDiv'>
        <button className='CartButton'>Add to Cart</button>
        </div>
        <div className='ButtonDiv'>
        <button className='BuyButton'>Buy Now</button>
            </div>
        </div>
        <br />
        <div className="col-md-12">
        <div className="row">
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
        <div className="row">
        <h5>Images</h5>
        <Carousel>
      {productData.images[0] ? 

      <Carousel.Item>
    <img src={productData.images[0]} alt="" />
      </Carousel.Item>
    :null}

      {productData.images[1] ? 

      <Carousel.Item>
            <img src={productData.images[1]} alt="" />
      </Carousel.Item>
    :null}
      {productData.images[2] ? 
      <Carousel.Item>
        <img src={productData.images[2]} alt="" />
      </Carousel.Item>
    :null}
      {productData.images[3] ? 
      <Carousel.Item>
        <img src={productData.images[3]} alt="" />
      </Carousel.Item>
    :null}
      {productData.images[4] ? 
      <Carousel.Item>
        <img src={productData.images[4]} alt="" />
      </Carousel.Item>
    :null}
    </Carousel>
        </div>
        </div>
        
        </div>
        </div>
        </div>
        :null
        );
    }
    
export default View;