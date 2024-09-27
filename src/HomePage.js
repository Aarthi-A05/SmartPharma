import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Offcanvas, Card } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import LoginPage from './LoginPage'; // Import your existing LoginPage component
import Home from './Home'; // Import Home.js component

const HomePage = ({ displayHome }) => {
  const [show, setShow] = useState(false); // State to control sidenav visibility
  const [selectedRole, setSelectedRole] = useState(null); // State to track selected role

  const handleClose = () => {
    setShow(false);
    setSelectedRole(null); // Reset the role when closing
  };

  const handleShow = () => setShow(true); // Show sidenav

  const handleRoleSelection = (role) => {
    setSelectedRole(role); // Set the selected role
    setShow(false); // Close sidenav
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" className="p-3">
        <Container>
          {/* Menu Icon Button */}
          <Navbar.Brand href="#" onClick={handleShow}>
            <FaBars style={{ color: 'white', fontSize: '1.5rem' }} />
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Sidenav (Offcanvas) */}
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton style={{ backgroundColor: 'blue' }}>
          <Offcanvas.Title style={{ color: 'white', fontSize: '1.5rem' }}>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link onClick={() => handleRoleSelection('patient')}>Patient</Nav.Link>
            <Nav.Link onClick={() => handleRoleSelection('doctor')}>Doctor</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Conditionally render Home.js content only if displayHome is true */}
      {displayHome && !selectedRole && <Home />}

      {/* Card to Display the Login Page */}
      {selectedRole && (
        <div style={{ paddingTop: '200px' }}>
          <Card className="mt-3 shadow" style={{ maxWidth: '500px', margin: 'auto' }}>
            <Card.Body>
              <center>
                <Card.Title>{`${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Login`}</Card.Title>
              </center>
              {/* Render the LoginPage component with a prop indicating the role */}
              <LoginPage role={selectedRole} />
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

export default HomePage;
