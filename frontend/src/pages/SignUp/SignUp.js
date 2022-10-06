import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import './SignUp.css';

const SignUp = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('form');
  };
  const handleChange = (event) => {
    console.log('Hello');
  };
  return (
    <>
      <div className="main-div">
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt=""></img>
            <h1>Chat-App</h1>
          </div>
          <input
            type="text"
            placeholder="User Name"
            name="username"
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
    </>
  );
};

export default SignUp;
