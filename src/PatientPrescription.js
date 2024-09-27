import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import DosageDetail from './DosageDetail';
import SignOut from './SignOut';

function PatientPrescription() {
  const { patientId } = useParams(); // Get the patientId from route params
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('/DocPresc.json')
      .then((response) => response.json())
      .then((data) => {
        const filteredPrescriptions = data.filter(p => p.patientId === parseInt(patientId)); // Parse patientId to integer
        if (filteredPrescriptions.length > 0) {
          setSelectedPrescription(filteredPrescriptions[0]);
        } else {
          setSelectedPrescription(null);
        }
      })
      .catch((error) => console.error('Error fetching prescription data:', error));
  }, [patientId]);

  const handleDownload = () => {
    console.log(`Downloading prescription for Patient ID: ${patientId}`);
  };

  const handleProceed = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <SignOut />
      <h2 className="text-center my-4">Patient Prescription Details</h2>

      {selectedPrescription ? (
        <div className="border p-4">
          <h5>Patient ID: {selectedPrescription.patientId}</h5>
          <h5>Patient Name: {selectedPrescription.patientName}</h5>
          <h5>Medication: {selectedPrescription.medication}</h5>
          <h5>Frequency: {selectedPrescription.frequency}</h5>
          <h5>Dosage: {selectedPrescription.dosage}</h5>

          <div className="d-flex justify-content-between mt-4">
            <Button variant="primary" onClick={handleDownload}>
              Download
            </Button>
            <Button variant="primary" onClick={handleProceed}>
              Proceed
            </Button>
          </div>
        </div>
      ) : (
        <p>No prescription details available for the selected patient.</p>
      )}

      {/* Modal for DosageDetail */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Dosage Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DosageDetail />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PatientPrescription;
