import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Users.css'
import { FaUserEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { TiUserAdd } from "react-icons/ti";
import { FaUsers } from "react-icons/fa";

const Users = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/users');
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
        const response = await fetch(`http://localhost:3000/admin/deleteUser/${userId}`, {
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

  return (
    <div>
      <div  >
        <h1 className="userHead"><FaUsers />Users</h1>
        <div className="table-responsive" style={{ marginRight: '100px' }}>
          <div className='userAdd'>
            <Button onClick={addUser} variant="primary"><TiUserAdd /></Button>{' '}
          </div>
          <Table bordered hover size="sm" responsive="sm" style={{ backgroundColor: '#D9D9D9' }}>

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
              {data?.map((user, index) => (
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
