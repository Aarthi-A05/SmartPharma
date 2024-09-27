import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Import user icon from react-icons
import './SignOut.css';

const SignOut = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleSignOut = () => {
    // Perform any cleanup if needed
    navigate('/'); // Navigate to the home page
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="p-3 w-100" style={{ height: '80px' }}> {/* Ensure full width and set height */}
      <Nav className="ms-auto"> {/* Aligns items to the right */}
        <Dropdown align="end">
          <Dropdown.Toggle variant="link" id="dropdown-basic" style={{ color: 'white' }}>
            <FaUserCircle size={30} /> {/* User icon */}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};

export default SignOut;
