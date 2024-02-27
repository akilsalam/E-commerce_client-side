import React, { useState, useEffect } from 'react';
import './EditProduct.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [stock, setStock] = useState(0);
  const [thumbnail, setThumbnail] = useState(null);
  const navigate = useNavigate()


  let url = window.location.href;
  url = url.split('/');
  const productId = url[url.length - 1];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProductData(productId);
        
        if (response.ok) {
          const responseData = await response.json();
          const productData = Object.values(responseData)[0]; // Assuming you're only fetching one product
          
          console.log(productData);

          if (productData) {
            setName(productData.title || '');
            setBrand(productData.brand || '');
            setDescription(productData.description || '');
            setCategory(productData.category || '');
            setPrice(productData.price || 0);
            setDiscountPercentage(productData.discountPercentage || 0);
            setStock(productData.stock || 0);
            setThumbnail(productData.thumbnail || null);
          } else {
            console.error('No valid product data found');
          }
        } else {
          console.error('Failed to fetch product data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [productId]);

  const fetchProductData = async (productId) => {
    // Use the same URL for fetching data
    const response = await fetch(`http://localhost:3000/admin/editProduct/${productId}`);
    return response;
  };

  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  // ... (existing code)

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
  
    // Convert file to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];
      setThumbnail(base64String); // Set the base64 string to state
      setThumbnailPreview(reader.result); // Set the file preview
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const productData = {
      name,
      brand,
      description,
      category,
      price,
      discountPercentage,
      stock,
      thumbnail,
    };
  
    try {
      const response = await fetch(`http://localhost:3000/admin/editProduct/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
  
      if (response.ok) {
        console.log('Product updated successfully');
        navigate('/admin/products');
      } else {
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className='EditProductPage'>
      <div className='EditProductDiv'>
            <h1 className='EditProductHead m-3'>Edit Product</h1>
            <form onSubmit={handleSubmit}>
          <div className="Rows row flex-wrap">
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="name" >
                  Name
                </label>
                <div className="ProductInputDiv">
                  <input className="ProductInput" type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)}/>
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
    <label className="Inputlabel" htmlFor="category">
      Category
    </label>
    <div className="ProductInputDiv">
      <select
        className="ProductInput"
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
                    <option value="">Select Your Category</option>
                    <option value="Appliances">Appliances</option>
                    <option value="Automotives">Automotives</option>
                    <option value="Bags">Bags</option>
                    <option value="Beauty or Toys">Beauty or Toys</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashions">Fashions</option>
                    <option value="Sunglasses">Sunglasses</option>
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
        {/* Add other options here */}
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
          onChange={handleThumbnailChange}
        />
      </div>
    </div>
  </div>
  <div className="col-md-6">
    <div className="form-group">
      <div className="ProductInputDiv" style={{width:'100px'}}>
        <img
          src={thumbnail && thumbnail.startsWith('http')
          ?  thumbnail
          : `data:image/jpeg;base64,${thumbnail}`
        }
          alt=""
          className="img-fluid"
        />
      </div>
    </div>
  </div>
</div>
          <div className='BtnDiv'>
          <Button variant="outline-primary" className="EditProductBtn" type="submit">
            Edit 
          </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
