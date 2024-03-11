import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Users.css'
import { FaUserEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { TiUserAdd } from "react-icons/ti";
import { FaUsers } from "react-icons/fa";
import serverUrl from '../../codes';

const Users = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverUrl}/admin/users`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addUser = () => {
    navigate('/admin/addUser')
  }

  const editUser = (userId) => {
    navigate(`/admin/editUser/${userId}`)
  }

  const deleteBtn = async (userId) => {
    const confirmation = window.confirm('Are you sure about deleting the user?');
    if (confirmation) {
      try {
        const response = await fetch(`${serverUrl}/admin/deleteUser/${userId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            // If user clicks "OK," reload the page
            window.location.reload();
          } else {
            console.error('Failed to delete user:', data.error || 'Unknown error');
          }
        } else {
          const errorData = await response.json(); // Log the error response
          console.error('Failed to delete user:', 'Server returned an error', errorData);
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

    // Filter products based on the first letters in title, brand, and category
    const filteredUsers = data.filter(user =>
      user.first_name.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
      <div  >
        <h1 className="userHead"><FaUsers />Users</h1>
        <div className="table-responsive" style={{ height:'85vh' }}>
          <div className='userAdd'>
          <div className="input-group">
            <div className="form-outline" data-mdb-input-init>
              <input
                type="search"
                id="form1"
                placeholder="Search Users"
                className="form-control position-relative pl-5"
                style={{ paddingLeft: '2rem' }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fas fa-search position-absolute start-0" style={{ top: '50%', transform: 'translateY(-50%)', paddingLeft: '12px' }}></i>
            </div>
          </div>
            <Button onClick={addUser} variant="primary"><TiUserAdd /></Button>{' '}
          </div>
          <Table bordered hover size="sm" responsive="sm" className='table'>
            <thead>
              <tr>
                <th>No</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Address</th>
                <th>PinCode</th>
                <th>Town</th>
                <th>Locality</th>
                <th>State</th>
                <th>Phone no</th>
                <th>Email</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
      {loading && <Spinner animation='border' role='status'></Spinner>}
              {filteredUsers?.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.address}</td>
                  <td>{user.pincode}</td>
                  <td>{user.town}</td>
                  <td>{user.locality}</td>
                  <td>{user.state}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button onClick={() => editUser(user._id)} variant="warning"><FaUserEdit /></Button>{' '}
                    <Button onClick={() => deleteBtn(user._id)} variant="danger"><AiFillDelete /></Button>{' '}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Users;
