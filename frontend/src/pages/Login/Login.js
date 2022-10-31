import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { signinRouter } from '../../utils/APIRoutes';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCAL_HOST_KEY)) {
      navigate('/');
    }
  }, []);
  const handleValidation = () => {
    const { email, password } = user;
    if (email === '' || password === '') {
      toast.error('Email and password is required.', {
        position: 'bottom-center',
      });
      return false;
    }
    return true;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      //console.log(user);
      const { email, password } = user;
      const { data } = await axios.post(signinRouter, {
        email,
        password,
      });
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCAL_HOST_KEY,
          JSON.stringify(data.user)
        );
        navigate('/');
      } else {
        toast.error(data.msg, {
          position: 'bottom-center',
        });
      }
    } else {
      console.log('There is an error');
    }
  };
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div className="main-div">
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt=""></img>
            <h1>CHAT-APP</h1>
          </div>

          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit"> Log In</button>
          <span>
            If you don't have an account ? <Link to="/signup">Sign Up</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
