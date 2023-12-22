import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { baseurl } from "../config/baseurl";



const Singleadmin = () => {
  const { userId } = useParams();
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [location, setLocation] = useState([])

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const fetchData = async () => {
      try {
        let response;
        if (searchTerm) {
          response = await axios.get(`${baseurl}/api/location/${userId}`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
            params: { searchLocation: searchTerm }
          });
        } else {
          response = await axios.get(`${baseurl}/api/location/${userId}`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
        }

        setLocation(response.data.locations);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, [searchTerm]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const storedToken = localStorage.getItem('authToken');
        const response = await axios.get(`${baseurl}/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setUserDetails(response.data.getaUser);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleclick = () => {
    navigate('/addlocation')
  }

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState([]);
  useEffect(() => {
    setShowDeleteConfirmation(new Array(location.length).fill(false));
  }, [location.length]);

  const toggleDeleteConfirmation = (index) => {
    const updatedConfirmation = [...showDeleteConfirmation];
    updatedConfirmation[index] = !updatedConfirmation[index];
    setShowDeleteConfirmation(updatedConfirmation);
  };

  const handleDelete = async (locationId) => {
    try {
      const storedToken = localStorage.getItem('authToken');
      await axios.delete(`${baseurl}/api/location/delete-location/${userId}/location/${locationId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        }
      },);
      const fetchData = async () => {
        try {
          let response;
          if (searchTerm) {
            response = await axios.get(`${baseurl}/api/location/${userId}`, {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
              params: { searchLocation: searchTerm }
            });
          } else {
            response = await axios.get(`${baseurl}/api/location/${userId}`, {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            });
          }
          setLocation(response.data.locations);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
      fetchData();
    } catch (error) {
      console.error('Error deleting location:', error);
    }
  };

  // machine api fetch

  const handlemachineclick = () => {
    navigate('/addmachine')
  }

  const [showDeleteMchineConfirmation, setShowDeleteMchineConfirmation] = useState([]);
  useEffect(() => {
    setShowDeleteMchineConfirmation(new Array(location.length).fill(false));
  }, [location.length]);

  const toggleDeleteMchineConfirmation = (index) => {
    const updatedConfirmation = [...showDeleteMchineConfirmation];
    updatedConfirmation[index] = !updatedConfirmation[index];
    setShowDeleteMchineConfirmation(updatedConfirmation);
  };

  const handleDeletemachine = async (machineId) => {
    try {
      const storedToken = localStorage.getItem('authToken');
      await axios.delete(`${baseurl}/api/user/delete-machine/${userId}/machines/${machineId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      const fetchUserDetails = async () => {
        try {
          const storedToken = localStorage.getItem('authToken');
          const response = await axios.get(`${baseurl}/api/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          setUserDetails(response.data.getaUser);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };
  
      fetchUserDetails();
    } catch (error) {
      console.error('Error deleting machine:', error);
    }
  };

  return (
    <div>
      <div className="d-flex mb-5">
        <input type="search" onChange={(e) => handleChange(e)} value={searchTerm} />
        <button className="ms-5">Search</button>
      </div>
      <h1>User Details</h1>
      <div>
        <h3>Locations:</h3>
          <button className="ms-5" onClick={handleclick}>add</button>
        <ul>
          {location?.map((location, index) => (
            <li key={index}>
              Location {index + 1}: locationname: {location.locationname} / address: {location.address} / percentage: {location.percentage}
              <Link to={`/edit-location/${userDetails._id}/${location._id}`} className="me-4 ms-4">edit</Link>
              <button onClick={() => toggleDeleteConfirmation(index)}>Delete</button>

              {/* Delete confirmation modal */}
              {showDeleteConfirmation[index] && (
                <div>
                  <p>Are you sure you want to delete?</p>
                  <button onClick={() => handleDelete(location._id)}>OK</button>
                  <button onClick={() => toggleDeleteConfirmation(index)}>Cancel</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      {userDetails ? (
        <div>
          <p>First Name: {userDetails.firstname}</p>
          <p>Last Name: {userDetails.lastname}</p>
          <p>Phone: {userDetails.phone}</p>



          <div>
            <h3>Machines:</h3>
              <button className="ms-5" onClick={handlemachineclick}>add</button>
            <ul>
              {userDetails.machines.map((machine, index) => (
                <li key={index}>
                  Machine {index + 1}: machinename: {machine.machineName} / serialnum: {machine.serialNumber}

                  <Link to={`/edit-machine/${userDetails._id}/${machine._id}`} className="me-4 ms-4">edit</Link>
                  <button onClick={() => toggleDeleteMchineConfirmation(index)}>Delete</button>

                  {showDeleteMchineConfirmation[index] && (
                    <div>
                      <p>Are you sure you want to delete?</p>
                      <button onClick={() => handleDeletemachine(machine._id)}>OK</button>
                      <button onClick={() => toggleDeleteMchineConfirmation(index)}>Cancel</button>
                    </div>
                  )}

                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  )
}

export default Singleadmin
