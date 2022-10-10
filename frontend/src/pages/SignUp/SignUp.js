import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import './SignUp.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { signUpRouter } from '../../utils/APIRoutes';

const SignUp = () => {
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleValidation = () => {
    const { password, confirmPassword } = user;
    if (password !== confirmPassword) {
      toast.error("Password don't match", {
        position: 'bottom-center',
      });
      return false;
    } else if (password.length < 8) {
      toast.error('Password length should more than 8 ', {
        position: 'bottom-center',
      });
      return false;
    } else {
      return true;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      // console.log(user);
      const { email, userName, password } = user;
      const { data } = await axios.post(signUpRouter, {
        userName,
        email,
        password,
      });
      if (data.status === true) {
        toast.success('data goto backend successfully', {
          position: 'bottom-center',
        });
      } else {
        toast.error("Data is't is backend", {
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
            type="text"
            placeholder="User Name"
            name="userName"
            onChange={(e) => handleChange(e)}
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit"> Create New Account</button>
          <span>
            If you have already an account ? <Link to="/signin">Login</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUp;
