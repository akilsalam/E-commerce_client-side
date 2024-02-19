import React,{useState,useEffect} from 'react';
import { Card,Button,Table } from 'react-bootstrap';
import { FaRegHeart } from "react-icons/fa";
import axios from 'axios';
import './Product.css'
import { useNavigate } from 'react-router-dom';


const Products = (prop) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(prop.url);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const SeeMore = () => {
    navigate(prop.link);
  };

  const View = (productId) => {
    navigate(`/view/${productId}`);
  };

  return (
    <div>
      <div className='productBar' id={prop.id}>
        <h1>{prop.title}</h1>
        <div className='productDiv'>
          {data?.slice(0, 4).map((product) => (
            <Card className='productcard' onClick={() => View(product._id)} key={product._id}>
              <Card.Img className='productImg' variant="top" src={product.thumbnail} />
              {/* <div className="wish">
                <FaRegHeart className='fs-4' />
              </div> */}
              <Card.Body className='productBody'>
                <Card.Title className='productTitle'>{product.title}</Card.Title>
                <Card.Text className='productText'>{product.description}</Card.Text>
              </Card.Body>
            </Card>
          ))}
          <Card className='exploreCard ' >
            <h1>See More</h1>
            <Card.Body >
              <Button variant="primary" onClick={SeeMore}>Explore More</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Products;
