import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { FaClipboardList } from 'react-icons/fa';
import axios from 'axios';
import styles from './Orders.module.css';
import serverUrl from '../../codes';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${serverUrl}/admin/orders`);
                console.log('Orders from server:', response.data);
    
                const ordersData = await Promise.all(
                    response.data.map(async (order) => {
                        const userResponse = await axios.get(`${serverUrl}/admin/user/${order.customerId}`);
                        console.log('User details for order:', userResponse.data);
                        const user = userResponse.data;
    
                        // Update each product with the calculated deliveryDate
                        const productsWithDeliveryDate = await Promise.all(order.products.map(async (product) => {
                            const productDeliveryDate = calculateDeliveryDate(product.date);
                            
                            // Check if the delivery date matches the current date
                            const isDelivered = new Date(productDeliveryDate) <= new Date();
    
                            // If delivered, update the product status on the server
                            if (isDelivered && product.status !== 'Delivered') {
                                await axios.put(`${serverUrl}/admin/orders/${order._id}/products/${product._id}`, { status: 'Delivered' });
                            }
    
                            return { ...product, deliveryDate: productDeliveryDate };
                        }));
    
                        return { ...order, user, products: productsWithDeliveryDate };
                    })
                );
    
                console.log('Orders with user details:', ordersData);
    
                setOrders(ordersData);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
    
        fetchOrders();
    }, []);
    
    const calculateDeliveryDate = (orderDate) => {
        const deliveryDate = new Date(orderDate);
        deliveryDate.setDate(deliveryDate.getDate() + 2);
    
        const formattedDeliveryDate = new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        }).format(deliveryDate);
    
        return formattedDeliveryDate;
    };
    
    

    const renderProductsDropdown = (products, orderId) => (
        <div className={styles.productsDropdown}>
            {products.map((product, productIndex) => (
                <div key={productIndex}>
                    <p>Product ID: {product.productId}</p>
                    <p>Title: {product.title}</p>
                    <p>Category: {product.category}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Total Amount: &#x20B9;{product.totalAmount}</p>
                    <p>Purchase Date & Time: {product.date}</p>
                    {(product.status === 'Rejected' || product.status === 'Delivered') ? null : (
                    <p>Delivery Date: 
                        {product.deliveryDate}
                        </p>
                    )}
                    <p>Status:
                    {(product.status === 'Rejected') ? (
                        <span style={{ color: 'red', fontWeight: '700' }}>Rejected</span>
                        ) : (product.status === 'Delivered') ? (
                            <span style={{ color: 'green', fontWeight: '700' }}>Delivered</span>
                            ):
                            <span style={{ color: 'orange', fontWeight: '700' }}>Pending</span>
                        }
                        </p>
                        {(product.status === 'Delivered' || product.status === 'Rejected') ? null : (
    <Button onClick={() => rejectProduct(orderId, product._id)} variant="danger">
        Reject
    </Button>
)}

                    <hr />
                </div>
            ))}
        </div>
    );
    

    const rejectProduct = async (orderId, productId) => {
        try {
            const confirmation = window.confirm('Are you sure you want to reject this order')
            if(confirmation){
                // Send a request to update the product status in the database
                await axios.put(`${serverUrl}/admin/orders/${orderId}/products/${productId}`, { status: 'Rejected' });
                
                // Update the status locally
                const updatedOrders = orders.map((order) =>
                order._id === orderId ? { ...order, products: updateProductStatus(order.products, productId, 'Rejected') } : order
                );
                setOrders(updatedOrders);
            }
        } catch (error) {
            console.error('Error rejecting product:', error);
        }
    };

    const updateProductStatus = (products, productId, status) => {
        return products.map((product) =>
            product._id === productId ? { ...product, status } : product
        );
    };

    return (
        <div>
            <div>
                <h1 className={styles.OrderHead}>
                    <FaClipboardList />
                    Orders
                </h1>
                <div className={`${styles.table} table-responsive`}>
                    <Table bordered hover size="sm" responsive="sm" style={{ backgroundColor: '#D9D9D9' }}>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Customer Email</th>
                                <th>Customer Phone</th>
                                <th>Customer Address</th>
                                <th>Products</th>
                                <th>Last Purchase Date</th>
                                <th>Total Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index} >
                                    <td>{index + 1}</td>
                                    <td>{order.user.email}</td>
                                    <td>+{order.user.phone}</td>
                                    <td>{order.user.address},{order.user.town},{order.user.locality},{order.user.state}</td>
                                    <td>
                                        <details>
                                            <summary style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>View Products</summary>
                                            {renderProductsDropdown(order.products, order._id)}
                                        </details>
                                    </td>
                                    <td>{new Date(order.updatedAt).toLocaleDateString()}</td>
                                    <td>&#x20B9;{order.products.reduce((total, product) => total + product.totalAmount, 0)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default Orders;
