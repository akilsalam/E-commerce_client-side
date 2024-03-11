import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Spinner } from 'react-bootstrap';
import './OtherImages.css';
import axios from 'axios';
import { FaRegImages } from 'react-icons/fa';
import { RiImageEditFill } from 'react-icons/ri';
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import serverUrl from '../../codes';

const OtherImages = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  let url = window.location.href;
  url = url.split('/');
  const productId = url[url.length - 1];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverUrl}/admin/otherImages/${productId}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const handleImageEdit = async (index, file) => {
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result.split(',')[1];

        const response = await axios.post(
          `${serverUrl}/admin/editImage/${productId}/${index}`,
          { image: base64String },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data.success) {
          window.location.reload()
          console.log('Image updated successfully');
        } else {
          setError('Failed to update image. Please try again.');
        }
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error('Error updating image:', error);
      setError('Failed to update image. Please try again.');
    }
  };

  const handleImageDelete = async (index) => {
    const confirmation = window.confirm('Are you sure you want to delete the image')
    if(confirmation){

        try {
            const response = await axios.post(
        `${serverUrl}/admin/deleteImage/${productId}/${index}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        );
        
        if (response.data.success) {
            window.location.reload();
            console.log('Image deleted successfully');
        } else {
            setError('Failed to delete image. Please try again.');
        }
    } catch (error) {
        console.error('Error deleting image:', error);
        setError('Failed to delete image. Please try again.');
    }
}
};

  return (
    <div>
            <h2 className='ImageHead'>
        <FaRegImages /> Other Images of {data.title}
      </h2>
      {loading && <Spinner animation='border' role='status'></Spinner>}
      {error && <div className='text-danger'>{error}</div>}
      <Row xs={1} md={2} lg={3} xl={4} style={{ flexWrap: 'wrap' }} className='OtherImagesDiv'>
        {data.images ? (
            data.images.map((image, index) => (
                <Col key={index}>
              <Card style={{ width: '100%',height:'13.5rem' }}>
                <Card.Img
                  style={{ borderRadius: '35px', width: '100%', height: '12.5rem' }}
                  variant='top'
                  src={
                      image && image.startsWith('http')
                      ? image
                      : `data:image/jpeg;base64,${image}`
                    }
                    alt={`Image ${index + 1}`}
                />
              </Card>
              <div className='text-center mt-2'>
                <Button variant='warning' >
                  <label htmlFor={`fileInput${index}`}>
                    <input
                      type='file'
                      id={`fileInput${index}`}
                      style={{ display: 'none' }}
                      onChange={(e) => handleImageEdit(index, e.target.files[0])}
                      />
                    <RiImageEditFill style={{cursor:'pointer'}} />
                  </label>
                </Button>
                <Button variant='danger' className='m-2' onClick={handleImageDelete}>
                    <MdDeleteForever  style={{cursor:'pointer'}}/>
                  {/* </label> */}
                </Button>
              </div>
              
            </Col>
          ))
          ) : null}
      </Row>
    </div>
    );
};

export default OtherImages;
