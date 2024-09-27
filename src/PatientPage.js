import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import SignOut from './SignOut';
import { Button, Modal } from 'react-bootstrap';

function PatientPage() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetch('/PatientDetails.json')
      .then((response) => response.json())
      .then((data) => setPatients(data))
      .catch((error) => console.error('Error fetching patient data:', error));
  }, []);

  const handleQRClick = (patient) => {
    if (selectedPatient && selectedPatient.patientId === patient.patientId) {
      setSelectedPatient(null);
    } else {
      setSelectedPatient(patient);
    }
  };

  const handleClose = () => {
    setSelectedPatient(null);
  };

  const handleScanClick = () => {
    // Navigate to the prescription page with the patient's ID
    if (selectedPatient) {
      navigate(`/prescription/${selectedPatient.patientId}`);
    }
  };

  return (
    <div className="container">
      <SignOut />
      <h2 className="text-center my-4">Medicine Logs</h2>

      <div className="table-responsive-sm" style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '250px', maxWidth: '100%' }}>
        <table className="table table-hover">
          <thead>
            <tr className="table-primary">
              <th>P_id</th>
              <th>Patient Name</th>
              <th>QR Code</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.patientId}>
                <td>{patient.patientId}</td>
                <td>{patient.patientName}</td>
                <td>
                  <Button variant="primary" onClick={() => handleQRClick(patient)}>
                    {selectedPatient && selectedPatient.patientId === patient.patientId ? 'Hide QR' : 'View QR'}
                  </Button>
                </td>
                <td>{patient.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for displaying QR Code */}
      <Modal show={!!selectedPatient} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>QR Code for {selectedPatient ? selectedPatient.patientName : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPatient && (
            <div className="text-center">
              <img
                src={selectedPatient.imageUrl}
                alt={`QR code for ${selectedPatient.patientName}`}
                style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
              />
              <Button variant="primary" onClick={handleScanClick}>
                View Prescription
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PatientPage;
