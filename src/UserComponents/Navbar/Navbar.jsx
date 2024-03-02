import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { Navbar, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BsCart3 } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { CiMenuKebab } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import logo from '../../Images/icon.svg'

const NavBar = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(false)
  const user = localStorage.getItem('ShipShopUserName')
  const userPhone = localStorage.getItem('ShipShopUserPhone')

  const toggleProfile = () => {
    setProfile(!profile);
  }
  const ProfileContent = () => (
    <div className="custom-menu-content">
      <ul>
        <Link style={{ color: 'black', textDecoration: 'none' }} to={'/profile'}><li><CgProfile />My Profile</li></Link>
        <li onClick={logOut}><MdOutlineLogout />LogOut</li>
      </ul>
    </div>
  );

  const logOut = () => {
    const userConfirmed = window.confirm('Are you sure you want to Log Out?');

    if (userConfirmed) {
      localStorage.removeItem('ShipShopUserName');
      localStorage.removeItem('ShipShopUserPhone')
      window.location.reload();
    }
  }


  return (
    <div>
      <Navbar expand="md" className="Navbar">
        <Container fluid className='container'>
          <Navbar.Brand href="/" className='brand'>
            <img src={logo} alt="" width={'50px'} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            {/* <div className="search-container">
              <CiSearch className="search-icon" />
              <select className='searchBar' type="text" placeholder="Search Products..." >
                <option value="">Search...</option>
                <option value="Appliances" onClick={One}>Appliances</option>
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
            </div> */}
            <Link className="Menus" style={{ padding: '0.8rem',display:'flex',justifyContent:'center' }} to={'/'}>
              <div>
                <IoHomeOutline />
                <span>Home</span>
              </div>
            </Link>
            <>
              <Link className="Menus" style={{ padding: '0.8rem' }} to={'/cart'}>
                <div>
                  <BsCart3 /><span>Cart</span>
                </div>
              </Link>
              <Link className="Menus" style={{ padding: '0.8rem' }} to={'/wishList'}>
                <div>
                  <FaRegHeart /><span>Wishlist</span>
                </div>
              </Link>
            </>
            {user || userPhone ? (
              <>
                <Link onClick={toggleProfile} className="Menus text-dark" style={{ padding: '0.8rem' }}>
                  <div >
                    <span><CgProfile className='fs-4 ' /></span>
                    {profile && <ProfileContent />}
                  </div>
                </Link>
              </>
            ) : (
              <Link className="Menus" style={{ padding: '0.8rem' }} to={'/login'}>
                <div>
                  <CgProfile /><span>Login</span>
                </div>
              </Link>
            )}
            <div className="menuBtn" style={{ marginLeft: '1rem', padding: '0.8rem' }}>
            <IoSettingsOutline />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>

  );
};

export default NavBar;
