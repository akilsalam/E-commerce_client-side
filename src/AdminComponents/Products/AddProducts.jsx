import React, { useState } from 'react';
import './AddProduct.css';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [stock, setStock] = useState(0);
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!category || !name || !price || !stock) {
          console.error('Category, name, price, and stock are required');
          return;
        }
    
        const formData = new FormData();
        formData.append('category', category);
        formData.append('title', name);
        formData.append('brand', brand);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('discountPercentage', discountPercentage);
        formData.append('stock', stock);
    
        try {
          const response = await axios.post('http://localhost:3000/admin/addProduct', formData);
    
          console.log('Product added successfully:', response.data);
        } catch (error) {
          console.error('Failed to add product:', error);
          console.log('Full error object:', error);
        }
      };
    
  return (
    <div className='AddProductPage'>
      <div className='AddProductDiv'>
        <h1 className='AddProductHead m-3'>Add New Product</h1>
        <form 
        onSubmit={handleSubmit}
        >
        <div className="Rows row flex-wrap">
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="name" >
                  Name
                </label>
                <div className="ProductInputDiv">
                  <input className="ProductInput" type="text" id="title" value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="brand">
                  Brand
                </label>
                <div className="ProductInputDiv">
                  <input className="ProductInput" type="text" id="brand" value={brand} onChange={(e)=>setBrand(e.target.value)}/>
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
                  <textarea rows="3" cols="50" type="text" id="description" value={description} onChange={(e)=>setDescription(e.target.value)} />
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
                  <select className="ProductInput" type="text" id="firstname" value={category} onChange={(e)=>setCategory(e.target.value)} >
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
                  <input className="ProductInput" type="number" id="price" value={price} onChange={(e)=>setPrice(e.target.value)} />
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
                  <input className="ProductInput" type="number" id="discountPercentage" value={discountPercentage} onChange={(e)=>setDiscountPercentage(e.target.value)}  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="stock">
                  Stock
                </label>
                <div className="ProductInputDiv">
                  <input className="ProductInput" type="number" id="stock" value={stock} onChange={(e)=>setStock(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="Rows row flex-wrap">
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
                onChange={handleThumbnailChange}
                // onChange={(e)=>setThumbnail(e.target.files[0])}
              />
            </div>
          </div>
        </div>
  <div className="col-md-6">
    <div className="form-group">
      <div className="ProductInputDiv" style={{width:'100px'}}>
              {thumbnailPreview && <img src={thumbnailPreview} alt="" className="img-fluid" />}
      </div>
    </div>
  </div>
</div> */}
          <div className='BtnDiv'>
            <Button variant='outline-primary' className='AddProductBtn' type='submit'>
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
