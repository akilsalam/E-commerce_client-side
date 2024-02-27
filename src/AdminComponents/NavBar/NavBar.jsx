  import React,{useState} from 'react';
  import './NavBar.css'
  import { Accordion, Button } from 'react-bootstrap';
  import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
    CDBSidebarFooter,
    
    
  } from 'cdbreact';
  import { IoSettingsOutline } from "react-icons/io5";
  import { Outlet,useNavigate } from 'react-router-dom';
  import { RiUser3Line } from "react-icons/ri";
  import { RiLogoutCircleLine } from "react-icons/ri";


const NavBar = () => {
  const navigate = useNavigate()
  const admin = localStorage.getItem('ShipShopAdmin')
  const dashboard = () => {
    navigate('/admin')
  }
  const products = () => {
    navigate('/admin/products')
  }
  const logout = () =>{
    const userConfirmed = window.confirm('Are you sure you want to Log Out?');

    if (userConfirmed) {
        localStorage.removeItem('ShipShopAdmin');
        window.location.reload();
    }
  }
  const userPage = () =>{
    navigate('/')
  }

  const Orders = () =>{
    navigate('/admin/orders')
  }

  const Users = () =>{
    navigate('/admin/users')
  }

    return (
      <div>
      <div className="container-fluid px-0 py-0" style={{height:'100vh'}}>
        <div className="row flex-nowrap" style={{height:'100vh'}}>
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0" style={{height:'100vh'}}>
            <CDBSidebar
              className="SideBar"
              style={{
                backgroundColor: '#D9D9D9',
                color: '#000',
                height: '100vh', // Set height to 100% of viewport height
                display: 'flex',
                flexDirection: 'column',
              }}
            >            
              <CDBSidebarHeader  style={{ backgroundColor: 'grey', color: 'white' }} prefix={<i className="fa fa-bars" />}>ShipShop</CDBSidebarHeader>
              <CDBSidebarContent>
                {
                  admin ? (
                    <CDBSidebarMenu>
                  <CDBSidebarMenuItem icon="fas fa-border-all"  className="SideitemDiv" onClick={dashboard}>
                    <span className="sideitem"> Dashboard</span>
                  </CDBSidebarMenuItem>
                  <CDBSidebarMenuItem icon='fas fa-chart-bar' className="SideitemDiv" onClick={Orders}>
                    <span className="sideitem"> Orders</span>
                  </CDBSidebarMenuItem>
                  <CDBSidebarMenuItem icon='fas fa-shopping-basket' className="SideitemDiv" onClick={products}>
                    <span className="sideitem" > Products</span>
                  </CDBSidebarMenuItem>
                  <CDBSidebarMenuItem icon='users' className="SideitemDiv" onClick={Users}>
                    <span className="sideitem"> Users</span>
                  </CDBSidebarMenuItem>
                </CDBSidebarMenu>
                ):null}
              </CDBSidebarContent>

              <CDBSidebarFooter  style={{ textAlign: 'center', marginTop: 'auto' }}>
                <div className="sidebar-btn-wrapper" style={{ padding: '20px 5px' }}>
                <CDBSidebarMenuItem style={{color:'red'}} onClick={logout} icon='fas fa-sign-out-alt' className="SideitemDiv">
                    <span className="sideitem">LogOut</span>
                  </CDBSidebarMenuItem>
                {/* <Accordion  defaultActiveKey='0'>
      <Accordion.Item  eventKey="1">
        <Accordion.Header ><IoSettingsOutline />
                    </Accordion.Header>
        <Accordion.Body>
        <Button variant="outline-secondary" onClick={userPage} style={{width:'100%'}}><RiUser3Line /> UserPage</Button>
        <br />
        <br />
        {admin ? 
        <Button variant="outline-danger" onClick={logout} style={{width:'100%'}}><RiLogoutCircleLine /> LogOut</Button>
      :null}

        </Accordion.Body>
      </Accordion.Item>
    </Accordion> */}
                </div>
              </CDBSidebarFooter>
            </CDBSidebar>
          </div>
          <div className='OutletDiv'>
          <div className="col py-3 p-0 m-0">
            <Outlet />
          </div>
          </div>
        </div>
      </div>
    </div>
    );
  };
  
  export default NavBar;