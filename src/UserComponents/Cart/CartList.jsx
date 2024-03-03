import React, { useEffect, useState } from 'react';
import styles from './CartList.module.css';
import { CiCirclePlus } from 'react-icons/ci';
import { CiCircleMinus } from 'react-icons/ci';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { BsCart3 } from 'react-icons/bs';
import { Button, Col, Row } from 'react-bootstrap'; // Import Col and Row from react-bootstrap
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartList = () => {
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')
  const [locality, setLocality] = useState('')
  const [town, setTown] = useState('')
  const [state, setState] = useState('')
  const [cartData, setCartData] = useState([]);
  const [quantity, setQuantity] = useState({});
  const user = localStorage.getItem('ShipShopUserPhone') || localStorage.getItem('ShipShopUserName');
  const navigate = useNavigate();

  useEffect(() => {
    // Modify the fetchCartData function to check if response.data is an array
const fetchCartData = async () => {
  if (user) {
    try {
      const response = await axios.get(`http://localhost:3000/cart/${user}`);
      // Check if response.data is an array before iterating
      if (Array.isArray(response.data)) {
        setCartData(response.data);
        const initialQuantityState = {};
        response.data.forEach((item) => {
          initialQuantityState[item._id] = 1;
        });
        setQuantity(initialQuantityState);
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
        const storedCartData = JSON.parse(localStorage.getItem('Cart')) || [];
        // Initialize quantity state with item ids and their quantities
        const initialQuantityState = {};
        storedCartData.forEach((item) => {
          initialQuantityState[item._id] = 1;
        });
        setQuantity(initialQuantityState);
        setCartData(storedCartData);
      }
    };
  
    fetchCartData();
  }, [user]);
  

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

  const deleteCartData = async (productId) => {
    const confirmation = window.confirm('This deletes the data from the cart');
    if (user) {
        if(confirmation){
        try {
          // If user is available, send a request to the server to delete the cart item
          await axios.delete(`http://localhost:3000/cart/${productId}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            data: { user: user },
          });
          // If successful, update the state or perform any necessary actions
          window.location.reload()
          console.log('Cart item deleted from the server');
        } catch (error) {
          console.error('Error deleting cart item from the server:', error);
          // Handle error as needed
        }
      }
    } else {
      if (confirmation) {
        const updatedCartData = cartData.filter((item) => item._id !== productId);
        setCartData(updatedCartData);
        localStorage.setItem('Cart', JSON.stringify(updatedCartData));
      }
    }
  };
  

  const calculateTotalPrice = () => {
    return Math.ceil(
      cartData.reduce((total, cart) => total + calculateRestAmountForItem(cart) * quantity[cart._id], 0)
    );
  };

  const calculateDiscountAmount = () => {
    return Math.ceil(
      cartData.reduce((totalDiscount, cart) => totalDiscount + (cart.price * (cart.discountPercentage / 100)) * quantity[cart._id], 0)
    );
  };


  const calculateRestAmountForItem = (item) => {
    return Math.ceil(item.price - (item.price * (item.discountPercentage / 100)));
  };

  const discountPercentage = (item) =>{
    return Math.ceil(item.discountPercentage)
  }

  useEffect(() => {
    // Fetch user data based on the userId from the server
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/checkoutForm/${user}`);
            if (response.ok) {
                const userData = await response.json();
                setFirstName(userData.first_name)
                setLastName(userData.last_name)
                setEmail(userData.email)
                setPincode(userData.pincode)
                setAddress(userData.address)
                setLocality(userData.locality)
                setState(userData.state)
                setTown(userData.town)
                setPhone(userData.phone)
            } else {
                console.error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    fetchData();
}, [user]);

  const paymentHandler = async (e) =>{

    const amount = calculateTotalPrice().toString() + "00";
    const currency = "INR";
    const receiptId = "qwsaql"


    const response = await fetch("http://localhost:3000/payment", { 
    method: "POST",
    body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
    }),
    headers: {
        "Content-Type": "application/json",
    }
});

    const order = await response.json();
    console.log(order);

    var options = {
        "key": "rzp_test_zUysRbolwSc6ri", // Enter the Key ID generated from the Dashboard
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency,
        "name": "ShipShop",
        "description": "Test Transaction",
        "image": "ShipShop",
        "order_id": order.id, 
        "handler": async function (response){
            const body = {
                ...response,
            };

            const validateRes = await fetch("http://localhost:3000/payment/validate", {
                method: "POST",
                body: JSON.stringify(body),
                headers:{
                    "Content-Type":"application/json",
                },
            })
            const jsonRes = await validateRes.json();
            if(jsonRes.msg === 'success'){
                // navigate(`/rating/${productId}`)
                alert('Successfully Paid')
            }
            console.log(jsonRes);
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature)
        },
        "prefill": {
            "name": firstName+" "+lastName,
            "email": email,
            "contact": phone
        },
        "notes": {
            "address": address+','+town+','+locality+','+state
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response){
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
}

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
                <div className={`${styles.list} container-fluid`}  key={cart._id}>
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
                      <h5 className={styles.ProductName} onClick={() => View(cart._id)}>{cart.title}</h5>
                      <p className={styles.ProductDetail}>{cart.description}</p>
                      <div style={{ display: 'flex' }}>
                        <h5 className='ProductPrice' style={{ textDecoration: 'line-through' }}>
                          &#x20B9; {cart.price}
                        </h5>
                        <span style={{ color: 'green', paddingLeft: '5px' }}>({discountPercentage(cart)}%)Off</span>
                      </div>
                      <h5 className='ProductPrice'>&#x20B9; {calculateRestAmountForItem(cart)}</h5>
                <div>
                  <CiCirclePlus
                    className='bg-dark text-white fs-3'
                    style={{ borderRadius: '100%' ,cursor:'pointer'}}
                    onClick={() => updateQuantity(cart._id, quantity[cart._id] + 1)}
                  />
                  {/* <div > */}
                  <span style={{backgroundColor:'#fff',paddingLeft:'1rem',paddingRight:'1rem',paddingBottom:'0.5rem',paddingTop:'0.5rem',margin:'0.3rem',borderRadius:'10px',fontWeight:'800'}}>{quantity[cart._id]}</span>
                  {/* </div> */}
                  <CiCircleMinus
                    className='bg-dark text-white fs-3'
                    style={{ borderRadius: '100%' ,cursor:'pointer'}}
                    onClick={() => updateQuantity(cart._id, Math.max(1, quantity[cart._id] - 1))}
                  />
                </div>
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
              {/* <p style={{ fontWeight: '700', fontSize: '10px', paddingRight: '10px' }}>
                Order confirmation will be sent to {user}
              </p> */}
              <Button onClick={paymentHandler} className={`${styles.PlaceBtn} mt-auto`} variant="warning">
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
