import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditUser.css'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const EditUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [locality, setLocality] = useState('');
  const [state, setState] = useState('');
  const [town, setTown] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()

  let url = window.location.href;
  url = url.split('/');
  const userId = url[url.length - 1];

  useEffect(() => {
    // Fetch user data based on the userId from the server
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/admin/editUser/${userId}`);
        if (response.ok) {
          const userData = await response.json();
          setFirstName(userData.first_name)
          setLastName(userData.last_name)
          setEmail(userData.email)
          setPincode(userData.pincode)
          setAddress(userData.address)
          setLocality(userData.locality)
          setState(userData.state)
          setTown(userData.town)
          setPhone(userData.phone)
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/admin/editUser/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstData: firstName,
          lastData: lastName,
          addressData: address,
          pincode: pincode,
          locality: locality,
          town: town,
          state: state,
          emailData: email,
          phoneData: phone,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Handle success, e.g., redirect to another page
          navigate(data.redirectUrl)
        } else {
          setErrorMessage(data.message || 'Update failed');
        }
      } else {
        console.error('Failed to send data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="EditUserPage">
      <div className="EditUserDiv">
        <div className="EditUserHead pt-2">
          <h1>Edit User</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row flex-wrap">
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="firstname" >
                  FirstName
                </label>
                <div className="InputDiv">
                  <input className="Input" type="text" id="firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="lastname">
                  LastName
                </label>
                <div className="InputDiv">
                  <input className="Input" type="text" id="lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
          <div className="row flex-wrap">
            <div className="col-md-12">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="address" >
                  Address
                </label>
                <div className="InputDiv">
                  <textarea rows={4} cols={50} className="Input" type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
          <div className="row flex-wrap">
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="email" >
                  Email
                </label>
                <div className="InputDiv">
                  <input className="Input" type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="pincode">
                  Pincode
                </label>
                <div className="InputDiv">
                  <input className="Input" type="number" id="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
          <div className="row flex-wrap">
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="locality" >
                  Locality
                </label>
                <div className="InputDiv">
                  <input className="Input" type="text" id="locality" value={locality} onChange={(e) => setLocality(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="town">
                  City/District/Town
                </label>
                <div className="InputDiv">
                  <input className="Input" type="text" id="town" value={town} onChange={(e) => setTown(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
          <div className="row flex-wrap">
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="state" >
                  State
                </label>
                <div className="InputDiv">
                  <select className="Input" id="state" value={state} onChange={(e) => setState(e.target.value)}>
                    <option value="">Select your State</option>
                    <option value="Kerala">Kerala</option>
                    <option value="TamilNadu">TamilNadu</option>
                    <option value="Kannada">Kannada</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="phone">
                  Phone no
                </label>
                <div className="InputDiv">
                <PhoneInput
                    inputProps={{
                      name: 'phone',
                      required: true,
                      autoFocus: true,
                    }}
                    country="in"
                    value={phone}
                    onChange={(value) => setPhone(value)}
                  />
                  {/* <input className="Input" type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} /> */}
                </div>
              </div>
            </div>
            <br />
            <br />
          </div>
          <button className="submitBtn" type="submit">
            Edit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
