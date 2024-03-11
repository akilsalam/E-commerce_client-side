import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { FaUsers } from "react-icons/fa";
import { FaListOl } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import serverUrl from '../../codes';

const Dashboard = () => {
    const [deliveredCount,setDeliveredCount] = useState('')
    const [pendingCount,setPendingCount] = useState('')
    const [rejectedCount,setRejectedCount] = useState('')
    const [productLength, setProductLength] = useState([]);
    const [orderLength, setOrderLength] = useState([]);
    const [userLength, setUserLength] = useState([]);
    const [loading, setLoading] = useState(true);
    const value = [
        { name: 'Series A', value: parseInt(rejectedCount) },
        { name: 'Series B', value: parseInt(deliveredCount) },
        { name: 'Series C', value: parseInt(pendingCount) },
    ];

    const COLORS = ['#cc4b6e', '#008000', '#d4ae3f'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${serverUrl}/admin/products`);
                setProductLength(response.data.length.toString());

                console.log(response.data.length);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${serverUrl}/admin/orders`);
    
                // Check if response.data[0].products is defined and is an array
                if (response.data[0] && Array.isArray(response.data[0].products)) {
                    // Extract product statuses
                    const productStatuses = response.data[0].products.map(product => product.status);
    
                    // Count the number of products with status "Delivered"
                    const deliveredCount = productStatuses.filter(status => status === "Delivered").length;
                    const pendingCount = productStatuses.filter(status => status === "Pending").length;
                    const rejectedCount = productStatuses.filter(status => status === "Rejected").length;
    
                    // Set the delivered count to the state
                    setRejectedCount(rejectedCount)
                    setPendingCount(pendingCount)
                    setDeliveredCount(deliveredCount);
                    console.log("Number of products delivered:", deliveredCount);
    
                    // Move the console.log statement inside the useEffect block
                    console.log("delivered" + deliveredCount);
                } else {
                    console.error('Invalid data format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);
    
    console.log("rejected"+rejectedCount);
    console.log('pending'+pendingCount);
    console.log("delivered"+deliveredCount);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${serverUrl}/admin/orders`);
                
                // Calculate the total number of products across all orders
                const totalProducts = response.data.reduce((sum, order) => {
                    return sum + order.products.length;
                }, 0);
    
                setOrderLength(totalProducts.toString());
                console.log("Total number of products: " + totalProducts);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${serverUrl}/admin/users`);
                setUserLength(response.data.length.toString());
                console.log(response.data.length);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    return (
        <div>
            <h1 className='DashboardHead'>Dashboard</h1>
            <div style={{ height: '90vh', overflowY: 'auto' }}>
                <div >
                    <div className="row flex-wrap">
                        <div className="col-md-6">
                            <div style={{backgroundColor:'#d9d9d9',width:'100%', borderRadius:'25px',padding:'1rem',marginTop:'1rem'}}>
                        <h3 className='text-center'>Order Graph</h3>
                            </div>
                            <ResponsiveContainer width='100%' height={300}>
                                <PieChart>
                                    <Pie
                                        data={value}
                                        dataKey='value'
                                        nameKey='name'
                                        cx='50%'
                                        cy='50%'
                                        outerRadius={100}
                                        fill='#8884d8'
                                        label
                                    >
                                        {value.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="row flex-wrap">
                                <div className="col-md-4" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div style={{ color:'#fff',backgroundColor: '#cc4b6e', width: '100px', height: '100px', textAlign: 'center' ,borderRadius:'25px',paddingTop:'2rem'}}>
                                        <strong >Rejected</strong>
                                    </div>
                                </div>
                                <div className="col-md-4" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div style={{ color:'#fff',backgroundColor: '#008000', width: '100px', height: '100px', textAlign: 'center' ,borderRadius:'25px',paddingTop:'2rem'}}>
                                        <strong >Delivered</strong>
                                    </div>
                                </div>
                                <div className="col-md-4" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div style={{color:'#fff', backgroundColor: '#d4ae3f', width: '100px', height: '100px', textAlign: 'center' ,borderRadius:'25px',paddingTop:'2rem'}}>
                                        <strong >Pending</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                            <div className="col-md-6" style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className="row flex-wrap">
                                <div className="col-md-12">
                                    <div className="" style={{backgroundColor:'#d9d9d9',width:'90%',height:'20vh',margin:'1rem',textAlign:'center',borderRadius:'25px'}}>
                                        <div style={{paddingTop:'2rem'}}>
                                    <FaUsers className='fs-2'/>
                                        </div>
                                    <strong>{userLength} Users</strong>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="" style={{backgroundColor:'#d9d9d9',width:'90%',height:'20vh',margin:'1rem',textAlign:'center',borderRadius:'25px'}}>
                                    <div style={{paddingTop:'2rem'}}>
                                    <FaListOl className='fs-2'/>
                                    </div>
                                    <strong>{orderLength} Orders</strong>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="" style={{backgroundColor:'#d9d9d9',width:'90%',height:'20vh',margin:'1rem',textAlign:'center',borderRadius:'25px'}}>
                                    <div style={{paddingTop:'2rem'}}>
                                    <BsCart4 className='fs-2'/>
                                    </div>
                                    <strong>{productLength} Products</strong>
                                    </div>
                                </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
