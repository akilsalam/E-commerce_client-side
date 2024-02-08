import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './UserComponents/Home';
import Cart from './UserComponents/Cart';
import Login from './UserComponents/Login';
import Seller from './UserComponents/Seller';
import SignUp from './UserComponents/SignUp';
import NavBar from './UserComponents/Navbar/Navbar';
import Footer from './UserComponents/Home/Footer/Footer';
import SellerLogin from './UserComponents/Seller/LoginPage/SellerLogin';
import SellerSignUp from './UserComponents/Seller/SignUpPage/SellerSignUp';
import SellProduct from './UserComponents/Seller/SellProduct/SellProduct';
import WishList from './UserComponents/WishList/WishList';
import Categories from './UserComponents/Home/Categories/Categories';
import View from './UserComponents/View/View';

const UserSection = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/seller" element={<Seller />} />
                <Route path="/sellerLogin" element={<SellerLogin />} />
                <Route path="/sellerSignUp" element={<SellerSignUp />} />
                <Route path="/sellProduct" element={<SellProduct />} />
                <Route path="/wishList" element={<WishList />} />
                <Route path='/Groceries' element={<Categories url="https://dummyjson.com/products/category/groceries" title='Groceries' />} />
                <Route path='/Mobiles' element={<Categories url="https://dummyjson.com/products/category/smartphones" title='Mobiles' />} />
                <Route path='/Fashions' element={<Categories url="https://dummyjson.com/products/category/womens-dresses" title='Fashions' />} />
                <Route path='/Electronics' element={<Categories url="https://dummyjson.com/products/category/laptops" title='Electronics' />} />
                <Route path='/Furnitures' element={<Categories url="https://dummyjson.com/products/category/furniture" title='Furnitures' />} />
                <Route path='/Appliances' element={<Categories url="https://dummyjson.com/products/category/home-decoration" title='Appliances' />} />
                <Route path='/Beauty' element={<Categories url="https://dummyjson.com/products/category/skincare" title='Beauty' />} />
                <Route path='/TwoWheelers' element={<Categories url="https://dummyjson.com/products/category/motorcycle" title='TwoWheelers' />} />
                <Route path='/Clothes' element={<Categories url="https://dummyjson.com/products/category/mens-shirts" title='Clothes' />} />
                <Route path='/Footwears' element={<Categories url="https://dummyjson.com/products/category/mens-shoes" title='Footwear' />} />
                <Route path='/Watches' element={<Categories url="https://dummyjson.com/products/category/mens-watches" title='Watches' />} />
                <Route path='/Bags' element={<Categories url="https://dummyjson.com/products/category/womens-bags" title='Bags & Wallets' />} />
                <Route path='/WomenWatches' element={<Categories url="https://dummyjson.com/products/category/womens-watches" title='Watches' />} />
                <Route path='/WomenShoes' element={<Categories url="https://dummyjson.com/products/category/womens-shoes" title='Footwears' />} />
                <Route path='/WomenJewellery' element={<Categories url="https://dummyjson.com/products/category/womens-jewellery" title='Jewelleries' />} />
                <Route path='/Tops' element={<Categories url="https://dummyjson.com/products/category/tops" title='Tops' />} />
                <Route path='/Automotive' element={<Categories url="https://dummyjson.com/products/category/automotive" title='Automotive' />} />
                <Route path='/Lights' element={<Categories url="https://dummyjson.com/products/category/lighting" title='Lights' />} />
                <Route path='/Sunglasses' element={<Categories url="https://dummyjson.com/products/category/sunglasses" title='Sunglasses' />} />
                <Route path='/Fragrances' element={<Categories url="https://dummyjson.com/products/category/fragrances" title='Fragrances' />} />
                <Route path="/View/:id" element={<View />} />
            </Routes>
            <Footer />
    </>
  );
}

export default UserSection;
