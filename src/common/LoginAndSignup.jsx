
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/LoginAndSignup.css';
import axios from 'axios';

const LoginAndSignup = (props) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [errors, setErrors]= useState({});
    const [apiError, setApiError] = useState('');

    const callSignUpAPI = () => {
        return axios.post('http://localhost:8000/api/users/create', {
            username: userName,
            email,
            password
        }).then((res) => {
            console.log(res, 'the signup Api is successfull');
            return navigate('/login');
        })
        .catch((err) => {
            console.log(err, 'error in signup API');
            setApiError(err.response.data.message);
        })
    }

    const callLoginAPI = () => {
        return axios.post('http://localhost:8000/api/users/login', {
                email,
                password
            }).then((res) => {
                console.log(res, 'the login Api is successfull');
                localStorage.setItem('_auth', res.data.token);
                return navigate('/home')
            })
        .catch((err) => console.log(err, 'the login APi is failed'))
    }

    const validateUserData = (username, email, password) => {
        const errors = {};
    
        // Validate username
        if(props.heading !== 'login') {
            if (!username) {
                errors.username = "Username is required";
            } else if (username.length < 6) {
                errors.username = "Username must be at least 6 characters long";
            }
        }
        
    
        // Validate email
        const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (!email) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(email)) {
            errors.email = "Email is not valid";
        }
    
        // Validate password
        if (!password) {
            errors.password = "Password is required";
        } else if (password.length < 8) {
            errors.password = "Password must be at least 8 characters long";
        }

        if((errors && errors.username) || errors.email || errors.password) {
            return setErrors(errors);
        } else {
            
            setErrors({});
            if(props.heading === 'signup') {
                callSignUpAPI();
            } else {
                callLoginAPI();
            }
        }
    
    };
    

  return (
    <div className={props.heading === 'login' ? 'ls-page-login': 'ls-page-signup'}>
        <div className='ls-container'>
            <div className='ls-header'>{props.heading}</div>
            <div className='ls-body'>
                {props.heading === 'signup' && 
                <div>
                        <p className='ls-label'>UserName</p>
                        <input type='text' className='ls-input' onChange={(e) => setUserName(e.target.value)} value={userName}/>
                        {errors.username && <div>{errors.username}</div>}
                    </div>} 
                <div>
                        <p className='ls-label'>Email</p>
                        <input type='email' className='ls-input' onChange={(e) => setEmail(e.target.value)} value={email}/>
                        {errors.email && <div>{errors.email}</div>}
                    </div> 
                    <div>
                        <p className='ls-label'>Password</p>
                        <input type='password' className='ls-input'onChange={(e) => setPassword(e.target.value)} value={password}/>
                        {errors.password && <div>{errors.password}</div>}
                    </div> 

                    <div >
                    {props.heading === 'login' ? 
                        <div className='ls-notify'>New User? <p onClick={() => navigate('/signup')} style={{ marginLeft: '4px', textDecoration: 'underline', cursor: 'pointer', fontWeight: 700}}>Sign up</p></div> : 
                        <div className='ls-notify'>Already a user? <p onClick={() => navigate('/login')} style={{ marginLeft: '4px', textDecoration: 'underline', cursor: 'pointer', fontWeight: 700}}>Login</p></div>}
                    </div>
                    <button className='ls-button' onClick={() => validateUserData(userName, email, password)}>
                        {props.heading}
                    </button>
                    <div>
                        {apiError && apiError}
                    </div>
                </div>
        </div>
    </div>
  )
}

export default LoginAndSignup
