import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseurl } from "../config/baseurl";

const All = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    console.log(baseurl);
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');

        const fetchData = async () => {
            try {
                let response;
                if (searchTerm) {
                    response = await axios.get(`${baseurl}/api/user/alluser`, {
                        headers: {
                            Authorization: `Bearer ${storedToken}`,
                        },
                        params: { searchuser: searchTerm }
                    });
                } else {
                    response = await axios.get(`${baseurl}/api/user/alluser`, {
                        headers: {
                            Authorization: `Bearer ${storedToken}`,
                        },
                    });
                }

                setUsers(response.data);
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

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState([]);
    useEffect(() => {
        setShowDeleteConfirmation(new Array(users.length).fill(false));
    }, [users.length]);

    const toggleDeleteConfirmation = (index) => {
        const updatedConfirmation = [...showDeleteConfirmation];
        updatedConfirmation[index] = !updatedConfirmation[index];
        setShowDeleteConfirmation(updatedConfirmation);
    };


    const handleDelete = async (userId) => {
        try {
          const storedToken = localStorage.getItem('authToken');
          await axios.delete(`${baseurl}http://localhost:5000/api/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          const fetchUserDetails = async () => {
            try {
              const storedToken = localStorage.getItem('authToken');
              const response = await axios.get(`${baseurl}/api/user/alluser`, {
                headers: {
                  Authorization: `Bearer ${storedToken}`,
                },
              });
              setUsers(response.data);
            } catch (error) {
              console.error('Error fetching user details:', error);
            }
          };
      
          fetchUserDetails();
        } catch (error) {
          console.error('Error deleting machine:', error);
        }
      };

    // const handleDelete = async (userId) => {
    //     try {
    //         const storedToken = localStorage.getItem('authToken');

    //         await axios.delete(`http://localhost:5000/api/user/${userId}`, {
    //             headers: {
    //                 Authorization: `Bearer ${storedToken}`,
    //             },
    //         });
    //         const response = await axios.get('http://localhost:5000/api/user/alluser', {
    //             headers: {
    //                 Authorization: `Bearer ${storedToken}`,
    //             },
    //             params: { name: searchTerm }
    //         });

    //         setUsers(response.data);
    //     } catch (error) {
    //         console.error('Error deleting user:', error);
    //     }
    // };

    return (
        <div>
            <div>
                <h1>User List</h1>
                <div className="d-flex mb-5">
                    <input type="search" onChange={(e) => handleChange(e)} value={searchTerm} />
                    <button className="ms-3">Search</button>
                </div>
                <ul>
                    {users.map((user, index) => (
                        <li key={user._id}>
                            {user.firstname} {user.lastname}
                            {/* <button onClick={() => handleDelete(user._id)} className="ms-3 mb-3">Delete</button> */}
                            <Link to={`/update-user/${user._id}`}>
                                <button className="ms-3">Update</button>
                            </Link>
                            <Link to={`/user-details/${user._id}`} className="ms-3">
                                User Details
                            </Link>
                            <button onClick={() => toggleDeleteConfirmation(index)}>Delete</button>

                            {showDeleteConfirmation[index] && (
                                <div>
                                    <p>Are you sure you want to delete?</p>
                                    <button onClick={() => handleDelete(user._id)}>OK</button>
                                    <button onClick={() => toggleDeleteConfirmation(index)}>Cancel</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default All;
