import { useState } from 'react';
import axios from 'axios';
import { baseurl } from '../config/baseurl';

const AddMachine = () => {
  const [machineData, setMachineData] = useState({
    machineName: '',
    serialNumber: '',
  });

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
      await axios.post(`${baseurl}/api/user/addmachine`, machineData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      alert("Machien added successfully")
    } catch (error) {
      console.error('Error adding machine:', error);
    }
  };

  return (
    <div>
      <h1>Add Machine</h1>
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
        <button type="submit">Add Machine</button>
      </form>
    </div>
  );
};

export default AddMachine;
