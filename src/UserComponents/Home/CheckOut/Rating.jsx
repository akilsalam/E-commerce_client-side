import React, { useState,useEffect } from 'react';
import './Rating.css';
import demmy from '../../../Images/fragrance.jpg';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Rate = () => {
    const {id} = useParams()
    const [thumbnail,setThumbnail] = useState('')
    const navigate = useNavigate()
    const [value, setValue] = useState(0); // Initial state can be set to 0 or any default value

    const handleRatingChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        // Fetch user data based on the userId from the server
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/checkoutProduct/${id}`);
                if (response.ok) {
                    const productData = await response.json();
                    setThumbnail(productData.productDetails.thumbnail);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleSaveRating = () => {
    
        axios.post(`http://localhost:3001/rateProduct/${id}`, { rating: value })
            .then(response => {
                // Handle success
                console.log('Rating sent successfully');
                navigate('/')
            })
            .catch(error => {
                // Handle error
                console.error('Error sending rating', error);
            });
    
        // For now, I'm logging the rating value to the console
        console.log('Rating:', value);
    };

    return (
        <div className='RatingPage'>
            <div className='RatingDiv'>
                <div className='RateHead'>
                    <h1>Rate the Product</h1>
                </div>
                <div className='RateItem'>
                    <img className='RateImg' src={thumbnail} alt="" />
                </div>
                <div className='Rate'>
                    <Stack spacing={1}>
                        <Rating
                            className='fs-1'
                            name="half-rating"
                            precision={0.5}
                            value={value}
                            onChange={handleRatingChange}
                        />
                    </Stack>
                </div>
                <div className='ButtonDiv'>
                    <Button variant='warning' style={{marginRight:'1rem'}}>Skip</Button>
                    <Button onClick={handleSaveRating}>Save Rating</Button>
                </div>
            </div>
        </div>
    );
};

export default Rate;
