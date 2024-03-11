import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './UserComponents/Home';
import Cart from './UserComponents/Cart';
import Login from './UserComponents/Login';
import SignUp from './UserComponents/SignUp';
import NavBar from './UserComponents/Navbar/Navbar';
import Footer from './UserComponents/Home/Footer/Footer';
import WishList from './UserComponents/WishList/WishList';
import Categories from './UserComponents/Home/Categories/Categories';
import View from './UserComponents/Home/View/View';
import AdminNavBar from './AdminComponents/AdminNavBar';
import AdminHome from './AdminComponents/AdminHome'
import AdminLogin from './AdminComponents/AdminLogin';
import Products from './AdminComponents/Products/Products';
import Users from './AdminComponents/Users/Users';
import AddUser from './AdminComponents/Users/AddUser';
import EditUser from './AdminComponents/Users/EditUser';
import EditProduct from './AdminComponents/Products/EditProduct';
import AddProduct from './AdminComponents/Products/AddProducts';
import Profile from './UserComponents/Profile/Profile';
import NotFound from './NotFound';
import Orders from './AdminComponents/Orders/Orders';
import OtherImages from './AdminComponents/Products/OtherImages';
import OrderPage from './UserComponents/Home/OrderPage/OrderPage';
import CheckOut from './UserComponents/Home/CheckOut/CheckOut';
import Rating from './UserComponents/Home/CheckOut/Rating';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* User Section */}
          <Route
            path="/*"
            element={
              <>
                <NavBar />
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/wishList" element={<WishList />} />
                  <Route path='/profile' element={<Profile/>}/>
                  <Route path='/Groceries' element={<Categories url="http://localhost:3001/groceries" title='Groceries' />} />
                  <Route path='/Mobiles' element={<Categories url="http://localhost:3001/smartphones" title='Mobiles' />} />
                  <Route path='/Fashions' element={<Categories url='http://localhost:3001/fashions' title='Fashions' />} />
                  <Route path='/Electronics' element={<Categories url="http://localhost:3001/electronics" title='Electronics' />} />
                  <Route path='/Furnitures' element={<Categories url="http://localhost:3001/furniture" title='Furnitures' />} />
                  <Route path='/Appliances' element={<Categories url="http://localhost:3001/appliances" title='Appliances' />} />
                  <Route path='/Beauty' element={<Categories url="http://localhost:3001/beautyToys" title='Beauty' />} />
                  <Route path='/TwoWheelers' element={<Categories url="http://localhost:3001/two-wheelers" title='TwoWheelers' />} />
                  <Route path='/Clothes' element={<Categories url="http://localhost:3001/mens-clothes" title='Clothes' />} />
                  <Route path='/Footwears' element={<Categories url="http://localhost:3001/mens-footwears" title='Footwear' />} />
                  <Route path='/Watches' element={<Categories url="http://localhost:3001/mens-watches" title='Watches' />} />
                  <Route path='/Bags' element={<Categories url="http://localhost:3001/bags" title='Bags & Wallets' />} />
                  <Route path='/WomenWatches' element={<Categories url="http://localhost:3001/women-watches" title='Watches' />} />
                  <Route path='/WomenShoes' element={<Categories url="http://localhost:3001/women-footwears" title='Footwears' />} />
                  <Route path='/WomenJewellery' element={<Categories url="http://localhost:3001/women-jewellery" title='Jewelleries' />} />
                  <Route path='/Tops' element={<Categories url="http://localhost:3001/women-clothes" title='Tops' />} />
                  <Route path='/Automotive' element={<Categories url="http://localhost:3001/automotive" title='Automotive' />} />
                  <Route path='/Lights' element={<Categories url="http://localhost:3001/lights" title='Lights' />} />
                  <Route path='/Sunglasses' element={<Categories url="http://localhost:3001/sunglasses" title='Sunglasses' />} />
                  <Route path='/Fragrances' element={<Categories url="http://localhost:3001/fragrances" title='Fragrances' />} />
                  <Route path="/View/:id" element={<View />} />
                  <Route path='/orderPage/:id' element={<OrderPage/>}/>
                  <Route path='/checkout/:id' element={<CheckOut/>}/>
                  <Route path='/rating/:id' element={<Rating/>}/>
                  <Route path='*' element={<NotFound/>}/>

                  </Routes>
                <Footer />
              </>
            }
          />

 
          {/* Admin Section */}
          <Route
  path="/admin/*"
  element={
    <div className="row">
      <div className="col-auto">
        <AdminNavBar />
      </div>
      <div className="col py-3">
        <Routes>
          <Route index element={<AdminHome />} />
          <Route path="login" element={<AdminLogin />} />
          <Route path='users' element={<Users/>}/>
          <Route path='addUser' element={<AddUser/>}/>
          <Route path='editUser/:id' element={<EditUser/>}/>
          <Route path='products' element={<Products/>}/>
          <Route path='editProduct/:id' element={<EditProduct/>}/>
          <Route path='addProduct' element={<AddProduct/>}/>
          <Route path='otherImages/:id' element={<OtherImages/>}/>
          <Route path='orders' element={<Orders/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </div>
    </div>
  }
/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
