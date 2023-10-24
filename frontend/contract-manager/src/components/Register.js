import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

const Register = () => {
  //sets state for form for signUp
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });

  //on submite grabs info and sets state to that info
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const styles = {
    card: {
      display: 'flex',
      alignItems: 'center',
      margin: '20px 400px',
      textAlign: 'center',
      borderRadius: '40%',
    },
  };

  return (
    <div className="card">
      <h4 className="card-header bg-dark text-light p-2">Register</h4>
      <div className="card-body">
        <form>
          <input
            className="form-input"
            placeholder="Full Name"
            name="name"
            type="text"
            value={formState.name}
            onChange={handleChange}
          />
          <input
            className="form-input"
            placeholder="Email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
          <input
            className="form-input"
            placeholder="******"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
          <button
            className="btn btn-block btn-primary"
            style={{ cursor: 'pointer' }}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
