import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseurl } from '../config/baseurl';

const EditMachine = () => {
  const { userId, machineId } = useParams(); // Get the user ID and machine ID from the URL params
  const [machineData, setMachineData] = useState({
    machineName: '',
    serialNumber: '',
  });

  useEffect(() => {
    const fetchMachineDetails = async () => {
      try {
        const storedToken = localStorage.getItem('authToken');
        const response = await axios.get(`${baseurl}/api/user/machine/${userId}/${machineId}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        setMachineData({
          machineName: response.data.machine.machineName,
          serialNumber: response.data.machine.serialNumber,
        });
      } catch (error) {
        console.error('Error fetching machine details:', error);
      }
    };

    fetchMachineDetails();
  }, [userId, machineId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMachineData({
      ...machineData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const storedToken = localStorage.getItem('authToken');
      await axios.post(`${baseurl}/api/user/edit-machine/${userId}/machines/${machineId}`, machineData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      alert("machien update successfully")
    } catch (error) {
      console.error('Error updating machine:', error);
    }
  };

  

  return (
    <div>
      <h1>Edit Machine</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="machineName">Machine Name:</label>
          <input
            type="text"
            id="machineName"
            name="machineName"
            value={machineData.machineName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="serialNumber">Serial Number:</label>
          <input
            type="text"
            id="serialNumber"
            name="serialNumber"
            value={machineData.serialNumber}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Machine</button>
      </form>
    </div>
  );
};

export default EditMachine;
