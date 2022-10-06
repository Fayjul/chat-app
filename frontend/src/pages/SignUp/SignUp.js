import React from 'react';
import styled from 'styled-components';

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
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src="" alt=""></img>
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
        </form>
      </FormContainer>
    </>
  );
};

const FormContainer = styled.div``;

export default SignUp;
