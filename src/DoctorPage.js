import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import SignOut from './SignOut'; // Adjust the path as necessary
import { Button, Modal } from 'react-bootstrap'; // Import Button and Modal from react-bootstrap
import DoctorPrescription from './DoctorPrescription'; // Import the DoctorPrescription component

function DoctorPage() {
  const [selectedPatient, setSelectedPatient] = useState(null); // State to hold selected patient details
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false); // State to control modal visibility

  const patients = [
    { 
      id: 1, 
      date: '2024-09-24', 
      name: 'John Doe', 
      prescription: 'Sample Prescription',
      dosage: '500mg',
      frequency: 'Twice a day'
    },
    { 
      id: 2, 
      date: '2024-09-25', 
      name: 'Jane Smith', 
      prescription: 'Another Sample',
      dosage: '250mg',
      frequency: 'Once a day'
    },
    // Add more patient records as needed
  ];

  const handleRowClick = (patient) => {
    setSelectedPatient(patient); // Set the selected patient details
  };

  const handleNewButtonClick = () => {
    setShowPrescriptionModal(true); // Show the modal for the prescription form
  };

  const handleCloseModal = () => {
    setShowPrescriptionModal(false); // Close the modal
  };

  const handleCancelClick = () => {
    setSelectedPatient(null); // Deselect the patient to return to patient records
  };

  return (
    <div className="container">
      <SignOut /> {/* Include the SignOut component here */}
      
      <div className="d-flex justify-content-between align-items-center my-3">
        <h2 className="text-center">Patient Records</h2>
        <Button variant="primary" onClick={handleNewButtonClick}>
          <i className="bi bi-plus" /> {/* Bootstrap Icons for the plus icon */}
          New
        </Button>
      </div>

      <div className="table-responsive-sm" style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '250px', maxWidth: '100%' }}>
        <table className="table table-hover">
          <thead>
            <tr className="table-success">
              <th>P_id</th>
              <th>Date</th>
              <th>Patient Name</th>
              <th>Prescription</th>
              <th>Actions</th> {/* Added column for Send button */}
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} onClick={() => handleRowClick(patient)} style={{ cursor: 'pointer' }}>
                <td>{patient.id}</td>
                <td>{patient.date}</td>
                <td>{patient.name}</td>
                <td>{patient.prescription}</td>
                <td>
                  {/* Prevent row click event from firing when "Send" is clicked */}
                  <Button variant="primary" onClick={(e) => e.stopPropagation()}>Send</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Patient Details Card with Cancel Icon */}
      {selectedPatient && (
        <div className="card mt-3">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Patient Details</h5>
            {/* Cancel icon button */}
            <Button variant="outline-danger" size="sm" onClick={handleCancelClick}>
              <i className="bi bi-x" /> {/* Bootstrap Icons for cancel icon */}
            </Button>
          </div>
          <div className="card-body">
            <p><strong>ID:</strong> {selectedPatient.id}</p>
            <p><strong>Name:</strong> {selectedPatient.name}</p>
            <p><strong>Date:</strong> {selectedPatient.date}</p>
            <p><strong>Prescription:</strong> {selectedPatient.prescription}</p>
            <p><strong>Dosage:</strong> {selectedPatient.dosage}</p> {/* Added dosage */}
            <p><strong>Frequency:</strong> {selectedPatient.frequency}</p> {/* Added frequency */}
          </div>
        </div>
      )}

      {/* Modal for DoctorPrescription */}
      <Modal show={showPrescriptionModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Prescription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DoctorPrescription onClose={handleCloseModal} /> {/* Pass the close handler */}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DoctorPage;
