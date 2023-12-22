import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseurl } from '../config/baseurl';

const EditLocation = () => {
    const {locationId} = useParams(); // Replace with the actual location ID
    const {userId} = useParams();

  const [locationData, setLocationData] = useState({
    locationname: '',
    address: '',
    percentage: '',
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken'); // Get the bearer token from storage

    const fetchLocation = async () => {
      try {
        const response = await axios.get(`${baseurl}/api/location/${userId}/${locationId}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setLocationData(response.data.location);
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchLocation();
  }, []);

  const handleInputChange = (e) => {
    setLocationData({
      ...locationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    const storedToken = localStorage.getItem('authToken'); // Get the bearer token from storage

    try {
      await axios.put(`${baseurl}/api/location/edit-location/${userId}/location/${locationId}`, locationData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      alert('Location updated successfully!');
    } catch (error) {
      console.error('Error updating location:', error);
      // Handle error cases
    }
  };

  return (
    <div>
      <h1>Edit Location</h1>
      <div className="mb-3">
        <label>Locationname:</label>
        <input
          type="text"
          name='locationname'
          value={locationData.locationname}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label>Address:</label>
        <input
          type="text"
          name='address'
          value={locationData.address}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label>Percentage:</label>
        <input
          type="text"
          name='percentage'
          value={locationData.percentage}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleUpdate}>Update User</button>
    </div>
  );
};

export default EditLocation;
