import React from 'react';
import { Table } from 'react-bootstrap';
import { FaClipboardList } from "react-icons/fa";

const Orders = () => {
    return (
        <div>
            <div>
                <h1 className="userHead"><FaClipboardList />Orders</h1>
                <div className="table-responsive" style={{ marginRight: '100px' }}>
                    <div className='userAdd'>
                    </div>
                    <Table bordered hover size="sm" responsive="sm" style={{ backgroundColor: '#D9D9D9' }}>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Date</th>
                                <th>Total_Value</th>
                                <th>CustomerId</th>
                                <th>Products</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td>1</td>
                                <td>19/02/24</td>
                                <td>&#x20B9;500</td>
                                <td>43769fuvkjr6e58uoy</td>
                                <td>[],[],[]</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default Orders;
