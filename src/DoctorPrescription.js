import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

function DoctorPrescription({ onClose }) { // Accept onClose prop
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    onClose(); // Close the modal after form submission
  };

  return (
    <div className="container my-4">
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Patient Prescription Details</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="patientId" className="form-label">Patient ID</label>
              <input type="text" className="form-control" id="patientId" required />
            </div>
            <div className="mb-3">
              <label htmlFor="patientName" className="form-label">Patient Name</label>
              <input type="text" className="form-control" id="patientName" required />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">Date</label>
              <input type="date" className="form-control" id="date" required />
            </div>
            <div className="mb-3">
              <label htmlFor="medication" className="form-label">Medication</label>
              <input type="text" className="form-control" id="medication" required />
            </div>
            <div className="mb-3">
              <label htmlFor="dosage" className="form-label">Dosage</label>
              <input type="text" className="form-control" id="dosage" required />
            </div>
            <div className="mb-3">
              <label htmlFor="frequency" className="form-label">Frequency</label>
              <input type="text" className="form-control" id="frequency" required />
            </div>
            <button type="submit" className="btn btn-primary">Proceed</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DoctorPrescription;
