import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ role }) => {
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Check credentials
    if (email === 'abc@gmail.com' && password === '123') {
      // Navigate to respective page based on role
      if (role === 'doctor') {
        navigate('/doctor'); // Navigate to doctor page
      } else if (role === 'patient') {
        navigate('/patient'); // Navigate to patient page
      }
    } else {
      alert('Invalid email or password!'); // Alert for incorrect credentials
    }
  };

  const handleSignUp = () => {
    navigate('/signup'); // Navigate to SignUp page
  };

  return (
    <Form onSubmit={handleSubmit}>
      <br />
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
        />
      </Form.Group>

      {/* Conditional rendering of Sign Up link for patients */}
      {role === 'patient' && (
        <div className="mt-3">
          <p>
            Don't have an account?{' '}
            <Button variant="link" onClick={handleSignUp} style={{ padding: 0 }}>
              Sign Up
            </Button>
          </p>
        </div>
      )}

      <br />
      <center>
        <Button variant="primary" type="submit">
          Login as {role.charAt(0).toUpperCase() + role.slice(1)}
        </Button>
      </center>
    </Form>
  );
};

export default LoginPage;
