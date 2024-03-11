import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Products.css';
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { IoBagAdd } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { FaRegImages } from "react-icons/fa";
import serverUrl from '../../codes';

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverUrl}/admin/products`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const editProduct = (productId) => {
    navigate(`/admin/editProduct/${productId}`)
  }

  const addProduct = () => {
    navigate('/admin/addProduct')
  }

  const otherImage = (productId) => {
    navigate(`/admin/otherImages/${productId}`)
  }

  const handleDelete = async (productId) => {
    const confirmation = window.confirm(`Are you sure you want to delete the product of ID:${productId}`)
    if (confirmation) {
      try {
        const response = await fetch(`${serverUrl}/admin/deleteProduct/${productId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          console.log('Product deleted successfully');
          window.location.reload()
          // Redirect or perform any other actions after deletion
        } else {
          console.error('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  // Filter products based on the first letters in title, brand, and category
  const filteredProducts = data.filter(product =>
    product.title.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div>
        <h1 className="ProductHead"><MdOutlineProductionQuantityLimits />Products</h1>
        <div className="table-responsive" style={{ height:'85vh' }}>
        <div className='productAdd'>
          <div className="input-group">
            <div className="form-outline" data-mdb-input-init>
              <input
                type="search"
                id="form1"
                placeholder="Search Products"
                className="form-control position-relative pl-5"
                style={{ paddingLeft: '2rem' }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fas fa-search position-absolute start-0" style={{ top: '50%', transform: 'translateY(-50%)', paddingLeft: '12px' }}></i>
            </div>
          </div>
          <Button onClick={addProduct} variant="primary"><IoBagAdd /></Button>{' '}
        </div>
          <Table bordered hover size="sm" responsive="sm" className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Thumbnail</th>
                <th>Title</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Description</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Stock</th>
                <th>Images</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {loading && <Spinner animation='border' role='status'></Spinner>}
              {filteredProducts?.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td style={{ textAlign: 'center'}}><img width={'50px'} src={product.thumbnail && product.thumbnail.startsWith('http')
                    ? product.thumbnail
                    : `data:image/jpeg;base64,${product.thumbnail}`
                  } alt="" /></td>
                  <td>{product.title}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>{product.description}</td>
                  <td> &#x20B9;{product.price}</td>
                  <td>{product.discountPercentage}%</td>
                  <td>{product.stock}</td>
                  <td className='text-center'><Button variant='secondary' onClick={() => otherImage(product._id)}><FaRegImages /></Button></td>
                  <td className='text-center'>
                    <Button variant="warning" onClick={() => editProduct(product._id)}><FaEdit /></Button>{' '}
                    <Button className='mt-2' onClick={() => handleDelete(product._id)} variant="danger"><AiFillDelete /></Button>{' '}
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
