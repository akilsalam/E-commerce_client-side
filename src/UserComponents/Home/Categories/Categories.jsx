import React,{useState,useEffect}from 'react';
import "./Categories.css"
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { FaRegHeart } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const Groceries = (props) => {
  const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          console.log(props.url);
          const response = await axios.get(props.url);
          console.log(response.data);  // Log the entire response
          setData(response.data);  // Set the data directly, assuming the array of groceries is at the top level
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };
    
      fetchData();
    }, []);

    const View = (productId) => {
      navigate(`/view/${productId}`);
    };
  
  return (

      <>
        <h1 className='CategoryTitle'>{props.title}</h1>
    <div className='itemDiv'>
        {data?.map((product) => (
            <Card className='itemcard' onClick={() => View(product.id)} key={product.id}>
            <Card.Img className='itemImg' variant="top" src={product.thumbnail} />
            <div className="wish">
              <FaRegHeart className='fs-4'/>
            </div>
            <Card.Body className='itemBody'>
              <Card.Title className='itemTitle'>{product.title}</Card.Title>
              <Card.Text className='itemText'>{product.brand}</Card.Text>
              <p className='itemPrice'>&#x20B9;{product.price}</p>
              <span><FaRegStar className='text-warning'/></span>
              <span><FaRegStar className='text-warning'/></span>
              <span><FaRegStar className='text-warning'/></span>
              <span><FaRegStar /></span>
              <span><FaRegStar /></span>
            </Card.Body>
          </Card>
        ))}
    </div>
        </>

  );
}


export default Groceries;
