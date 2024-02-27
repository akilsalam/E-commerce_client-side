import React, { useEffect, useState } from 'react';
import './WishList.css';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const WishList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/wishlist');
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteWishData = (productId) => {
    const confirmation = window.confirm('This deletes the data from the wishlist');
    if (confirmation) {
      const updatedWishData = data.filter((item) => item._id !== productId);
      setData(updatedWishData);
      localStorage.setItem('WishList', JSON.stringify(updatedWishData));
    }
  };

  return (
    <div>
      <div className="WishLists">
        <h1 className='WishHead'>
          <FaRegHeart /> Your Liked Products
        </h1>
        {data?.map((wishlist) => (
          <div className="list container-fluid" key={wishlist._id}>
            <div className="row flex-wrap">
              <div className="col-md-4">
                <img
                  className='ProductImg'
                  width={'250rem'}
                  height={'400rem'}
                  src={
                    wishlist.thumbnail && wishlist.thumbnail.startsWith('http')
                      ? wishlist.thumbnail
                      : `data:image/jpeg;base64,${wishlist.thumbnail}`
                  }
                  alt=""
                />
              </div>
              <div className="col-md-4">
                <h5 className='ProductName'>{wishlist.title}</h5>
                <p className='ProductDetail'>{wishlist.description}</p>
                <h5 className='ProductPrice'>&#x20B9; {wishlist.price}</h5>
              </div>
              <div className="col-md-4 d-flex flex-column align-items-end mt-3">
                <div className='deleteDiv'>
                  <MdOutlineDeleteOutline className="deleteWished fs-3" onClick={() => deleteWishData(wishlist._id)} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
