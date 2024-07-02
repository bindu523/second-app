
import React from 'react';
import '../css/LandingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

    const navigate = useNavigate();

  return (
    <div className='my-app-container'>
        <div className='my-app-header'>Welcome to my-app</div>
        <button className='my-app-button' onClick={() => navigate('/login')}>Login/Signup</button>
    </div>
  )
}

export default LandingPage
