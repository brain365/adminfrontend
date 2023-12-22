import axios from 'axios';
import { useState } from 'react';
import { baseurl } from '../config/baseurl';

const AddLocation = () => {
  const [locationData, setLocationData] = useState({
    locationname: '',
    address: '',
    percentage: '',
  });

  const handleInputChange = (e) => {
    setLocationData({
      ...locationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem('authToken'); // Get the bearer token from storage

    try {
      await axios.post(`${baseurl}/api/location/create`, locationData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      alert('Location added successfully!');
      // Handle navigation or other actions upon successful submission
    } catch (error) {
      console.error('Error adding location:', error);
      // Handle error cases
    }
  };

  return (
    <div>
      <h1>Add Location</h1>
      <form onSubmit={handleSubmit} className='d-flex flex-column'>
        <label>
          Location Name:
          <input
            type="text"
            name="locationname"
            value={locationData.locationname}
            onChange={handleInputChange}
            className='mb-3'
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={locationData.address}
            onChange={handleInputChange}
            className='mb-3'

          />
        </label>
        <label>
          Percentage:
          <input
            type="text"
            name="percentage"
            value={locationData.percentage}
            onChange={handleInputChange}
            className='mb-3'

          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddLocation;
