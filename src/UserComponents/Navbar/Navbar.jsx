import React, { useState,useEffect,useRef } from 'react';
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
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [profile,setProfile] = useState(false)
  const user = localStorage.getItem('ShipShopUserName')
  const userPhone = localStorage.getItem('ShipShopUserPhone')
  
  const toggleProfile = () =>{
    setProfile(!profile);
  }
  const ProfileContent = () => (
    <div className="custom-menu-content">
    <ul>
      <Link style={{color:'black',textDecoration:'none'}} to={'/profile'}><li><CgProfile />My Profile</li></Link>
    <li onClick={logOut}><MdOutlineLogout />LogOut</li>
    </ul>
    </div>
  );
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const MenuContent = () => (
    <div className="custom-menu-content">
    <ul>
      <Link style={{color:'black',textDecoration:'none'}} to={'/settings'}><li><IoSettingsOutline /> Settings</li></Link>
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
        <div className="search-container">
          <CiSearch className="search-icon" />
          <input className='searchBar ' type="text" placeholder="Search.." />
        </div>


        <Link className="Menus" style={{ padding: '0.8rem' }} to={'/'}>
          <div>
            <IoHomeOutline />
            <span>Home</span>
          </div>
        </Link>
        {/* {user || userPhone ? ( */}
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
        {/* // ) : null} */}
        {user || userPhone ? (
          <>
            <Link onClick={toggleProfile} className="profile text-dark" style={{ padding: '0.8rem' }}>
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
        <div className="menuBtn" style={{ marginLeft: '1rem', padding: '0.8rem' }} onClick={toggleMenu}>
          <CiMenuKebab />
          {isMenuOpen && <MenuContent />}
        </div>
      </Navbar.Collapse>
    </Container>
  </Navbar>
</div>

  );
};

export default NavBar;
