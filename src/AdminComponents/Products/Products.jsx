import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Products.css'
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { IoBagAdd } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/products');
        const flattenedData = Object.values(response.data).flatMap(category => category);
        setData(flattenedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const editProduct = (productId) =>{
    navigate(`/admin/editProduct/${productId}`)
  }
  const addProduct = () =>{
    navigate('/admin/addProduct')
  }

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3000/admin/deleteProduct/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Product deleted successfully');
        // Redirect or perform any other actions after deletion
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
        <div>
            <h1 className="ProductHead"><MdOutlineProductionQuantityLimits />Products</h1>
            <div className="table-responsive" style={{height:'90vh'}}>
            <div className='productAdd'>
            <Button onClick={addProduct} variant="primary"><IoBagAdd /></Button>{' '}
            </div>
            <Table  bordered hover size="sm" responsive="sm" >
            <thead >
              <tr >
                <th>No</th>
                <th>Thumbnail</th>
                <th>Title</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Description</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Stock</th>
                <th>Rating</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td style={{justifyContent:'center',display:'flex',textAlign:'center'}}><img width={'50px'}  src={product.thumbnail} alt="" /></td>
                  <td>{product.title}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>{product.description}</td>
                  <td> &#x20B9;{product.price}</td>
                  <td>{product.discountPercentage}%</td>
                  <td>{product.stock}</td>
                  <td>{product.rating}</td>
                  <td>
                  <Button variant="warning" onClick={()=>editProduct(product._id)}><FaEdit /></Button>{' '}
      <Button onClick={()=>handleDelete(product._id)} variant="danger"><AiFillDelete /></Button>{' '}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
            </div>
        </div>
              </div>
  );
};

export default Products;
