import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseurl } from '../config/baseurl';

const UpdateUser = () => {
  const { userId } = useParams(); // Get the user ID from the URL

  const [updatedUserData, setUpdatedUserData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedToken = localStorage.getItem('authToken');

        const response = await axios.get(`${baseurl}/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        const userData = response.data;
        console.log(userData.getaUser);
        setUpdatedUserData({
          firstname: userData.getaUser.firstname,
          lastname: userData.getaUser.lastname,
          phone: userData.getaUser.phone,
          email: userData.getaUser.email,
          password: "", 
        });
        // if(response){
        //     // navigate('/')
        // }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleInputChange = (e) => {
    setUpdatedUserData({
      ...updatedUserData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSubmit = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');

      await axios.put(`${baseurl}/api/user/edit-user/${userId}`, updatedUserData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      alert("update successfully")
      // Redirect to user list or other appropriate page after update
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h1>Update User</h1>
      <div className="mb-3">
        <label>Firstname:</label>
        <input
          type="text"
          name='firstname'
          value={updatedUserData.firstname}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label>Lastname:</label>
        <input
          type="text"
          name='lastname'
          value={updatedUserData.lastname}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label>Phone:</label>
        <input
          type="phone"
          name='phone'
          value={updatedUserData.phone}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={updatedUserData.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={updatedUserData.password}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleUpdateSubmit}>Update User</button>
    </div>
  );
};

export default UpdateUser;
