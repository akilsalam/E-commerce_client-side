import React ,{useState,useEffect} from 'react';
import styles from "./OrderPage.module.css";
import { CiCirclePlus, CiCircleMinus } from 'react-icons/ci';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import serverUrl from '../../../codes';
// const CryptoJS = require('crypto-js');

const OrderPage = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const navigate = useNavigate()
  const user = localStorage.getItem('ShipShopUserName') || localStorage.getItem('ShipShopUserPhone')


  // Assuming you have a state or context for quantity
  const [quantity, setQuantity] = useState(1); // Initial quantity value

  // Function to update the quantity
  const updateQuantity = (newQuantity) => {
    // Implement your logic to update quantity
    setQuantity(newQuantity);
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${serverUrl}/View/${id}`);
        setProductData(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [id]);

  const calculateRestAmountForItem = (item) => {
    return Math.round(item.price - (item.price * (item.discountPercentage / 100)));
  };

  const handleSubmit = async () => {
    
    const orderData = {
      customer: user,
      products: [
        {
          productId: productData._id,
          title: productData.title,
          thumbnail: productData.thumbnail,
          category: productData.category,
          quantity: quantity,
          totalAmount: calculateRestAmountForItem(productData) * quantity,
          date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }),
          status: "Pending",
        },
      ],
    };
    
    console.log('pro',productData);
    console.log(orderData);
    
    try {
      const response = await axios.post(`${serverUrl}/placeOrder`, orderData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      navigate(`/checkout/${id}`)
    } catch (error) {
      window.alert('Error placing order:', error);
    }
  };
  return (
    productData ? 
    <div className={`container-fluid ${styles.CheckOutPage}`}>
      <div className={`row flex-wrap`}>
        <div className={`${styles.CheckOutRow} col-lg-8 col-md-12`}>
          <div className={`${styles.CheckOutDiv}`}>
            <h1 className={`${styles.CheckOutHead}`}>Order Summary</h1>
            <div className="row flex-wrap">
              <div className={`${styles.ImgDiv} col-md-6`}>
                <img src={productData.thumbnail} width={'350px'} alt="" />
              </div>
              <div className={`${styles.ProductDetails} col-md-6`}>
              <div style={{backgroundColor:'#d9d9d9',borderRadius:'10px',padding:'0.5rem',marginRight:'1rem',boxShadow:'0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                <p className={`${styles.title}`}>{productData.title}</p>
                <p className={`${styles.description}`}>{productData.description}</p>
                <div style={{display:"flex"}}>
                <p className={`${styles.price}`} style={{textDecoration:'line-through',color:'grey'}}>&#x20B9;{productData.price}</p><p style={{paddingLeft:'1rem',color:'darkgreen'}}>&#x20B9;{calculateRestAmountForItem(productData)}</p>
                </div>
                <div style={{  marginBottom: '1rem' }}>
                  <CiCirclePlus
                    className='bg-dark text-white fs-3'
                    style={{ borderRadius: '100%', cursor: 'pointer' }}
                    onClick={() => updateQuantity(quantity + 1)}
                    />
                  <span style={{ backgroundColor: '#fff', paddingLeft: '1rem', paddingRight: '1rem', paddingBottom: '0.5rem', paddingTop: '0.5rem', margin: '0.3rem', borderRadius: '10px', fontWeight: '800' }}>{quantity}</span>
                  <CiCircleMinus
                    className='bg-dark text-white fs-3'
                    style={{ borderRadius: '100%', cursor: 'pointer' }}
                    onClick={() => updateQuantity(Math.max(1, quantity - 1))}
                    />
                </div>
              </div>
                    </div>
            </div>
          </div>
        </div>
        <div className={`${styles.PriceDetailsRow} col-lg-4 col-md-12 mt-4 mt-md-0`}>
          <div className={`${styles.PriceDetailsDiv}`}>
            <h1 className={`${styles.PriceHead}`}>Price Details</h1>
            <div className={`${styles.PriceDetails}`}>
              <div style={{display:'flex'}}>
              <p className={`${styles.Price}`} >Price</p><p style={{marginLeft:'auto'}}>&#x20B9;{calculateRestAmountForItem(productData)*quantity}</p>
              </div>
              <div style={{display:'flex'}}>
              <p className={`${styles.Delivery}`}>Delivery</p><p style={{color:'darkgreen',marginLeft:'auto'}}>FREE</p>
              </div>
              <hr />
              <div style={{display:'flex'}}>
              <p className={`${styles.Total}`}>Total Amount</p><p style={{marginLeft:'auto'}}>&#x20B9;{calculateRestAmountForItem(productData)*quantity}</p>
              </div>
              <hr />
              <div style={{display:'flex',justifyContent:'end'}}>
                <span>Order confirmation will be sent to this {user}</span>
              <Button onClick={handleSubmit} variant='warning' className={`${styles.Button}`}>Continue</Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    : null
  );
};

export default OrderPage;
