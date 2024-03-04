import React,{useState,useEffect} from 'react';
import './Profile.css'
import { BiUser } from "react-icons/bi";
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Login from '../Login';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [address,setAddress] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [pincode,setPincode] = useState('')
  const [locality,setLocality] = useState('')
  const [town,setTown] = useState('')
  const [state,setState] = useState('')
  const [userId, setUserId] = useState(''); // Add state variable for userId
  const navigate = useNavigate()
  const [errorMessage,setErrorMessage] = useState('')

  useEffect(() => {
    // Get email and phone from localStorage
    const storedEmail = localStorage.getItem('ShipShopUserName');
    const storedPhone = localStorage.getItem('ShipShopUserPhone');
  
    // Check if either email or phone is available
    if (storedEmail || storedPhone) {
      // Send a request to the server to fetch the user profile based on email or phone
  
      // Add a conditional check for storedPhone
      const phoneWithoutPlus = storedPhone ? storedPhone.replace('+', '') : '';
  
      axios.post('http://localhost:3000/profile', { email: storedEmail, phone: phoneWithoutPlus })
        .then(response => {
          // Update the state with the fetched user profile data
          setUserProfile(response.data);
          setFirstName(response.data.first_name);
          setLastName(response.data.last_name);
          setEmail(response.data.email);
          setPhone(response.data.phone);
          setPincode(response.data.pincode);
          setAddress(response.data.address);
          setLocality(response.data.locality);
          setState(response.data.state);
          setTown(response.data.town);
          setUserId(response.data._id);
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, []); // Empty dependency array ensures the useEffect runs only once on component mount
  


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const confirmation = window.confirm('Are you Sure you want to edit the data')
      if(confirmation){

        const response = await fetch(`http://localhost:3000/profileEdit/${userId}`, {
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
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            window.location.reload()
            navigate(data.redirectUrl)
          } else {
            setErrorMessage(data.message || 'Update failed');
          }
        }
      } else {
        console.error('Failed to send data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // console.log(userProfile._id);
  return (
    <div>
      {userProfile ? 
        <div className="row flex-wrap" >
        <div className="col-md-12" >
            <div className='profileImgDiv'>
              <div className='profileImg'>
              <BiUser style={{width:'5em',height:'5em'}}/>
              </div>
              <h1 className='text-center'>My Profile</h1>
            </div>
        </div>
        <div style={{display:'flex',justifyContent:'center'}}>

      <div className="col-md-10">
            <div className="profileDetailsDiv">
              <form onSubmit={handleSubmit} style={{margin:'1rem'}}>
                <br />
              <div className="row flex-wrap">
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="firstname" >
                  FirstName
                </label>
                <div className="InputDiv">
                  <input className="Input" type="text" id="firstname" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="lastname">
                  LastName
                </label>
                <div className="InputDiv">
                  <input className="Input" type="text" id="lastname" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
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
                  <textarea rows={4} cols={50} className="Input" type="text" id="address" value={address} onChange={(e)=>setAddress(e.target.value)}/>
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
                  <input className="Input" type="text" id="email" disabled value={email} />
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
                    }}
                    country="in"
                    value={phone}
                    disabled
                  />
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
                  <input className="Input" type="text" id="locality" value={locality} onChange={(e)=>setLocality(e.target.value)}/>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="town">
                  City/District/Town
                </label>
                <div className="InputDiv">
                  <input className="Input" type="text" id="town" value={town} onChange={(e)=>setTown(e.target.value)}/>
                </div>
              </div>
            </div>
          </div>
          <div className="row flex-wrap">
          <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="pincode">
                  Pincode
                </label>
                <div className="InputDiv">
                  <input className="Input" type="number" id="pincode" value={pincode} onChange={(e)=>setPincode(e.target.value)}/>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="Inputlabel" htmlFor="state" >
                  State
                </label>
                <div className="InputDiv">
                  <input className="Input" type="text" id="state" value={state} onChange={(e)=>setState(e.target.value)}/>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div style={{display:'flex',justifyContent:'end'}}>
          <Button type='submit' className='EditBtn' variant='warning'>Edit</Button>
          </div>
              </form>
            </div>
        </div>
      </div>
                      </div>
:null}
    </div>
  );
}

export default Profile;
