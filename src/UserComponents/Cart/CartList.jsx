import React, { useEffect, useState } from 'react';
import styles from './CartList.module.css';
import { CiCirclePlus } from 'react-icons/ci';
import { CiCircleMinus } from 'react-icons/ci';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { BsCart3 } from 'react-icons/bs';
import { Button, Col, Row } from 'react-bootstrap'; // Import Col and Row from react-bootstrap
import { useNavigate } from 'react-router-dom';

const CartList = () => {
  const [cartData, setCartData] = useState([]);
  const [quantity, setQuantity] = useState({});
  const user = localStorage.getItem('ShipShopUserPhone') || localStorage.getItem('ShipShopUserName');
  const navigate = useNavigate();

  useEffect(() => {
    const storedCartData = JSON.parse(localStorage.getItem('Cart')) || [];
    // Initialize quantity state with item ids and their quantities
    const initialQuantityState = {};
    storedCartData.forEach((item) => {
      initialQuantityState[item._id] = 1;
    });
    setQuantity(initialQuantityState);
    setCartData(storedCartData);
  }, []);

  const updateQuantity = (productId, newQuantity) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [productId]: newQuantity,
    }));

    const updatedCartData = cartData.map((item) => {
      if (item._id === productId) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });

    localStorage.setItem('Cart', JSON.stringify(updatedCartData));
  };

  const View = (productId) => {
    navigate(`/view/${productId}`);
  };

  const deleteCartData = (productId) => {
    const confirmation = window.confirm('This deletes the data from the cart');
    if (confirmation) {
      const updatedCartData = cartData.filter((item) => item._id !== productId);
      setCartData(updatedCartData);
      localStorage.setItem('Cart', JSON.stringify(updatedCartData));
    }
  };

  const calculateTotalPrice = () => {
    return Math.round(
      cartData.reduce((total, cart) => total + calculateRestAmountForItem(cart) * quantity[cart._id], 0)
    );
  };

  const calculateDiscountAmount = () => {
    return Math.round(
      cartData.reduce((totalDiscount, cart) => totalDiscount + (cart.price * (cart.discountPercentage / 100)) * quantity[cart._id], 0)
    );
  };


  const calculateRestAmountForItem = (item) => {
    return Math.round(item.price - (item.price * (item.discountPercentage / 100)));
  };

  return (
    <div className={styles.CartLists}>
      <Row className='flex-wrap'>
        <Col md={8}>
          <p className={styles.CartHead}>
            <BsCart3 /> Carted Products
          </p>
          <div className={styles.CartProducts}>
            {cartData?.map((cart) => (
              <>
                <div className={`${styles.list} container-fluid`} onClick={() => View(cart._id)} key={cart._id}>
                  <div className='row flex-wrap'>
                    <div onClick={() => View(cart._id)} className={`col-md-4`}>
                      <img
                        className={styles.ProductImg}
                        width={'230rem'}
                        src={
                          cart.thumbnail && cart.thumbnail.startsWith('http')
                            ? cart.thumbnail
                            : `data:image/jpeg;base64,${cart.thumbnail}`
                        }
                        alt=""
                      />
                    </div>
                    <div className={`${styles.ProductDetailBar} col-md-4`}>
                      <h5 className='ProductName'>{cart.title}</h5>
                      <p className={styles.ProductDetail}>{cart.description}</p>
                      <div style={{ display: 'flex' }}>
                        <h5 className='ProductPrice' style={{ textDecoration: 'line-through' }}>
                          &#x20B9; {cart.price}
                        </h5>
                        <span style={{ color: 'green', paddingLeft: '5px' }}>({cart.discountPercentage}%)Off</span>
                      </div>
                      <h5 className='ProductPrice'>&#x20B9; {calculateRestAmountForItem(cart)}</h5>
                    </div>
                    <div className='col-md-4 d-flex flex-column align-items-end mt-3 mb-3'>
                      <div className={styles.deleteDiv}>
                        <MdOutlineDeleteOutline
                          className={`${styles.deleteCart} fs-3`}
                          onClick={() => deleteCartData(cart._id)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
                  <CiCirclePlus
                    className='bg-dark text-white fs-3'
                    style={{ borderRadius: '100%' ,cursor:'pointer'}}
                    onClick={() => updateQuantity(cart._id, quantity[cart._id] + 1)}
                  />
                  {/* <div > */}
                  <span style={{backgroundColor:'#d9d9d9',paddingLeft:'1rem',paddingRight:'1rem',paddingBottom:'0.5rem',paddingTop:'0.5rem',margin:'0.3rem',borderRadius:'10px',fontWeight:'800'}}>{quantity[cart._id]}</span>
                  {/* </div> */}
                  <CiCircleMinus
                    className='bg-dark text-white fs-3'
                    style={{ borderRadius: '100%' ,cursor:'pointer'}}
                    onClick={() => updateQuantity(cart._id, Math.max(1, quantity[cart._id] - 1))}
                  />
                </div>
              </>
            ))}
          </div>
        </Col>
        <Col md={4}>
          <div className={styles.PriceDetails}>
            <h1 className={styles.PriceHead}>PRICE DETAILS</h1>
            <hr />
            <div>
              <div className={styles.PriceItemDiv}>
                <p className={styles.PriceItemHead}>Price ({cartData.length} Items)</p>
                <p className={styles.PriceItem}>&#x20B9;{calculateTotalPrice()}</p>
              </div>
              <div className={styles.PriceItemDiv}>
                <p className={styles.PriceItemHead}>Discount</p>
                <p className={styles.PriceItem}>&#x20B9;{calculateDiscountAmount()}</p>
              </div>
              <div className={styles.PriceItemDiv}>
                <p className={styles.PriceItemHead}>Delivery Charges</p>
                <p className={styles.PriceItem}>
                  <span className={styles.deliveryFee}>&#x20B9;70 </span>
                  <span className={styles.deliveryFree}> FREE</span>
                </p>
              </div>
            </div>
            <hr />
            <div className={styles.PriceItemDiv}>
              <p className={styles.totalHead}>Total Amount</p>
              <p className={styles.PriceItem}>&#x20B9;{calculateTotalPrice()}</p>
            </div>
            <hr />
            <p className={styles.savings}>Your total savings on this order &#x20B9;{calculateDiscountAmount()}</p>
            <div style={{ display: 'flex', justifyContent: 'end', marginRight: '1rem', paddingBottom: '1rem' }}>
              <p style={{ fontWeight: '700', fontSize: '10px', paddingRight: '10px' }}>
                Order confirmation will be sent to {user}
              </p>
              <Button className={`${styles.PlaceBtn} mt-auto`} variant="warning">
                Place Order
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartList;
