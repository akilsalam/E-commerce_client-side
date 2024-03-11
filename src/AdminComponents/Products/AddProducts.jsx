import React, { useState } from 'react';
import './AddProduct.css';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [stock, setStock] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const navigate = useNavigate()

  const handleThumbnail = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setThumbnail(reader.result.split(',')[1]); // Extract base64 part
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubImage1 = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage1(reader.result.split(',')[1]); // Extract base64 part
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubImage2 = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage2(reader.result.split(',')[1]); // Extract base64 part
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubImage3 = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage3(reader.result.split(',')[1]); // Extract base64 part
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        title,
        brand,
        description,
        category,
        price,
        discountPercentage,
        stock,
        thumbnail,
        image1,
        image2,
        image3,
      };

      const response = await axios.post('http://localhost:3001/admin/addProduct', productData);

      if (response.status === 200) {
        const data = response.data;

        if (data.success) {
          // Handle success, e.g., show success message
          navigate('/admin/products')
          console.log('Product added successfully');
        } else {
          // Handle failure, e.g., show error message
          window.confirm(data.message)
          console.error(data.message || 'Failed to add product');
        }
      } else {
        console.error('Failed to send data');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  return (
    <div className='AddProductWrapper'>
    <div className='AddProductPage'>
      <div className='AddProductDiv'>
        <h1 className='AddProductHead m-3'>Add New Product</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="Rows row flex-wrap">
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="name" >
                  Name
                </label>
                <div className="ProductInputDiv">
                  <input className="ProductInput" type="text" id="title" onChange={(e) => setTitle(e.target.value)} required/>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="brand">
                  Brand
                </label>
                <div className="ProductInputDiv">
                  <input className="ProductInput" type="text" id="brand" onChange={(e) => setBrand(e.target.value)} required/>
                </div>
              </div>
            </div>
          </div>
          <div className="Rows row flex-wrap">
            <div className="col-md-12">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="description" >
                  Description
                </label>
                <div className="ProductInputDiv">
                  <textarea rows="3" cols="50" type="text" id="description" onChange={(e) => setDescription(e.target.value)} required/>
                </div>
              </div>
            </div>
          </div>
          <div className="Rows row flex-wrap">
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="firstname" >
                  Category
                </label>
                <div className="ProductInputDiv">
                  <select className="ProductInput" type="text" id="firstname" onChange={(e) => setCategory(e.target.value)} required>
                    <option value="">Select Your Category</option>
                    <option value="Appliances">Appliances</option>
                    <option value="Automotives">Automotives</option>
                    <option value="Bags">Bags</option>
                    <option value="Beauty or Toys">Beauty or Toys</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashions">Fashions</option>
                    <option value="Fragrances">Fragrances</option>
                    <option value="Grocery">Grocery</option>
                    <option value="Home Furniture">Home Furniture</option>
                    <option value="Lights">Lights</option>
                    <option value="Mens Clothes">Mens Clothes</option>
                    <option value="Mens Footwear">Mens Footwears</option>
                    <option value="Mens Watches">Mens Watches</option>
                    <option value="Mobiles">Mobiles</option>
                    <option value="Sunglasses">Sunglasses</option>
                    <option value="Two Wheelers">Two Wheelers</option>
                    <option value="Womens Clothes">Womens Clothes</option>
                    <option value="Womens Footwear">Womens Footwear</option>
                    <option value="Womens Jewellery">Womens Jewellery</option>
                    <option value="Womens Watches">Womens Watches</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="price">
                  Price
                </label>
                <div className="ProductInputDiv">
                  <input className="ProductInput" type="number" id="price" onChange={(e) => setPrice(e.target.value)} required/>
                </div>
              </div>
            </div>
          </div>
          <div className="Rows row flex-wrap">
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="discountPercentage" >
                  DiscountPercentage
                </label>
                <div className="ProductInputDiv">
                  <input className="ProductInput" type="number" id="discountPercentage" onChange={(e) => setDiscountPercentage(e.target.value)} required/>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="stock">
                  Stock
                </label>
                <div className="ProductInputDiv">
                  <input className="ProductInput" type="number" id="stock" onChange={(e) => setStock(e.target.value)} required/>
                </div>
              </div>
            </div>
          </div>
          <div className="Rows row flex-wrap">
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="thumbnail">
                  Thumbnail
                </label>
                <div className="ProductInputDiv">
                  <input
                    className="ProductInput"
                    type="file"
                    id="thumbnail"
                    required
                    onChange={handleThumbnail}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <div className="ProductInputDiv" style={{ width: '100px' }}>
                  <strong>Thumbnail</strong>
                {thumbnail ? (
        <img src={`data:image/jpeg;base64,${thumbnail}`} alt="Thumbnail" className="img-fluid" />
      ): <><br/><span>Not Added</span></>}

                </div>
              </div>
            </div>
          </div>
          <div className="Rows row flex-wrap">
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="thumbnail">
                  Sub Images
                </label>
                <div className="ProductInputDiv">
                  <input
                    className="ProductInput"
                    type="file"
                    id="image"
                    onChange={handleSubImage1}
                  />
                </div>                
                <div className="ProductInputDiv">
                  <input
                    className="ProductInput"
                    type="file"
                    id="image"
                    onChange={handleSubImage2}
                  />
                </div>
                <div className="ProductInputDiv">
                  <input
                    className="ProductInput"
                    type="file"
                    id="image"
                    onChange={handleSubImage3}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <div className="ProductInputDiv" style={{ width: '100px' }}>
                  <strong>Image1</strong>
                {image1 ? (
                  <img src={`data:image/jpeg;base64,${image1}`} alt="image1" className="img-fluid" />
                  ): <><br/><span>Not Added</span></> }

                </div>
                <div className="ProductInputDiv" style={{ width: '100px' }}>
                  <strong>Image2</strong>
                {image2 ? (
                  <img src={`data:image/jpeg;base64,${image2}`} alt="image2" className="img-fluid" />
                  ):<><br/><span>Not Added</span></>}

                </div>
                <div className="ProductInputDiv" style={{ width: '100px' }}>
                  <strong>Image3</strong>
                {image3 ? (
                  <img src={`data:image/jpeg;base64,${image3}`} alt="image3" className="img-fluid" />
                  ):<><br/><span>Not Added</span></>}

                </div>
              </div>
            </div>
          </div>
          <div className='BtnDiv'>
            <Button variant='outline-primary' className='AddProductBtn' type='submit'>
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddProduct;
