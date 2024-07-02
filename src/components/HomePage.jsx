
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    // localStorage.getItem('_auth') ? localStorage.getItem('_auth') : null;
    const token = localStorage.getItem('_auth') ?? false;
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getUserData = () => {
        return axios.get('http://localhost:8000/api/users/get-user-data', {
            headers: {
                authtoken: token 
            },
        }).then((res) => {
            setUserDetails(res.data.userDetails);
            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false);
        })
    }

    
    useEffect(() => {
        if(!token) {
            return navigate('/login');
        } else {
            setIsLoading(true);
            getUserData();
        }
    }, []);        

  return (
    <div>{isLoading ? 'Loading ....' : `Hello ${userDetails?.name}, and your email is ${userDetails?.email}` }</div>
  )
}

export default HomePage
