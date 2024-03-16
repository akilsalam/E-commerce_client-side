import React, { useState, useEffect } from 'react';
import styles from './CheckOut.module.css'
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Button } from 'react-bootstrap';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import serverUrl from '../../../codes';

const CheckOut = () => {
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [pincode, setPincode] = useState('')
    const [locality, setLocality] = useState('')
    const [town, setTown] = useState('')
    const [state, setState] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [quantity, setQuantity] = useState('')
    const [productName, setProductName] = useState('')
    const [totalValue, setTotalValue] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const userId = localStorage.getItem('ShipShopUserName') || localStorage.getItem('ShipShopUserPhone')
    const navigate = useNavigate()

    let url = window.location.href;
    url = url.split('/');
    const productId = url[url.length - 1];


    useEffect(() => {
        // Fetch user data based on the userId from the server
        const fetchData = async () => {
            try {
                const response = await fetch(`${serverUrl}/checkoutProduct/${productId}`);
                if (response.ok) {
                    const productData = await response.json();
                    setThumbnail(productData.productDetails.thumbnail);
                    setQuantity(productData.productDetails.quantity)
                    setProductName(productData.productDetails.title)
                    setTotalValue(productData.productDetails.totalAmount)
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [productId]);


    useEffect(() => {
        // Fetch user data based on the userId from the server
        const fetchData = async () => {
            try {
                const response = await fetch(`${serverUrl}/checkoutForm/${userId}`);
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
    }, [userId]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const confirmation = window.confirm('Are you sure you want to change the Address')
        if(confirmation){

            try {
                const response = await fetch(`${serverUrl}/checkoutForm/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    addressData: address,
                    pincode: pincode,
                    locality: locality,
                    town: town,
                    state: state,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    // Handle success, e.g., redirect to another page
                    // navigate(data.redirectUrl)
                    window.alert('Your address Changed')
                } else {
                    setErrorMessage(data.message || 'Update failed');
                }
            } else {
                console.error('Failed to send data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    };

    const paymentHandler = async (e) =>{

        const amount = totalValue.toString() + "00";
        const currency = "INR";
        const receiptId = "qwsaql"


        const response = await fetch(`${serverUrl}/payment`, { 
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

                const validateRes = await fetch(`${serverUrl}/payment/validate`, {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers:{
                        "Content-Type":"application/json",
                    },
                })
                const jsonRes = await validateRes.json();
                if(jsonRes.msg === 'success'){
                    navigate(`/rating/${productId}`)
                    // alert('Successfully Paid')
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

        <div className={styles.CheckOutPage}>
            <div className={styles.CheckOutDiv}>
                <h1 className={styles.CheckOutHead}>Checkout</h1>
                <div className="row flex-wrap">
                    <div className={`col-md-6 ${styles.CheckOutImgDiv}`}>
                        <div className={`row flex-wrap`} style={{ display: 'flex', justifyContent: 'center' }}>
                            <div className={`col-md-12`} style={{ display: 'flex', justifyContent: 'center' }}>
                                <img className={styles.CheckOutImg} src={
                thumbnail && thumbnail.startsWith('/')
                  ? `data:image/jpeg;base64,${thumbnail}`
                  : thumbnail
              } alt="" />
                            </div>
                            <div className={`col-md-12`} style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className={styles.ProductDetailsDiv}>
                                    <div className={`row flex-wrap `}>
                                        <div className={`col-md-12 ${styles.Product}`}>
                                            <p>Product Name: {productName}</p>
                                        </div>
                                        <div className={`col-md-12 ${styles.Product}`}>
                                            <p>Ordered Quantity: {quantity}</p>
                                        </div>
                                        <div className={`col-md-12 ${styles.Product}`}>
                                            <p>Total Value: &#x20B9;{totalValue}</p>
                                        </div>
                                        {/* <hr />
                                        <div className={`row flex-wrap ${styles.BackToChangeOrder}`}>
                                            <div className={`col-md-6 ${styles.BackToChangeOrderText}`}>
                                                <p>Back To Change order</p>
                                            </div>
                                            <div className={`col-md-6 ${styles.BackToChangeOrderButton}`} style={{ justifyContent:'end'}}>
                                                <Button><IoArrowBackCircleOutline /></Button>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`col-md-6 ${styles.CheckOutDetailsDiv}`}>
                        <div className={styles.CheckOutDetails}>
                            <form onSubmit={handleSubmit} >
                                <div className="row flex-wrap">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="Inputlabel" htmlFor="email" >
                                                Email
                                            </label>
                                            <div className="InputDiv">
                                                <input className="Input" type="text" id="email" value={email} disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="Inputlabel" htmlFor="phone">
                                                Phone no
                                            </label>
                                            <div className="InputDiv">
                                                <PhoneInput
                                                    inputProps={{
                                                        name: 'phone',
                                                        required: true,
                                                        style: { width: '100%', backgroundColor: '#ccc' }
                                                    }}

                                                    country="in"
                                                    value={phone}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row flex-wrap">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="Inputlabel" htmlFor="address" >
                                                Address
                                            </label>
                                            <div className="InputDiv">
                                                <textarea rows={4} cols={50} className="Input" type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row flex-wrap">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="Inputlabel" htmlFor="locality" >
                                                Locality
                                            </label>
                                            <div className="InputDiv">
                                                <input className="Input" type="text" id="locality" value={locality} onChange={(e) => setLocality(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="Inputlabel" htmlFor="town">
                                                City/District/Town
                                            </label>
                                            <div className="InputDiv">
                                                <input className="Input" type="text" id="town" value={town} onChange={(e) => setTown(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row flex-wrap">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="Inputlabel" htmlFor="state" >
                                                State
                                            </label>
                                            <div className="InputDiv">
                                                <select className="Input" id="state" value={state} onChange={(e) => setState(e.target.value)}>
                                                    <option value="">Select your State</option>
                                                    <option value="Kerala">Kerala</option>
                                                    <option value="TamilNadu">TamilNadu</option>
                                                    <option value="Kannada">Kannada</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="Inputlabel" htmlFor="pincode">
                                                Pincode
                                            </label>
                                            <div className="InputDiv">
                                                <input className="Input" type="number" id="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.ChangeBtn}>
                                    <Button type='submit' variant='warning'>Change Address</Button>
                                </div>
                            </form>
                            <div className={styles.PlaceBtn}>
                                <Button variant='outline-primary' onClick={paymentHandler} style={{ width: '100%' }}>Place Order</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckOut;
