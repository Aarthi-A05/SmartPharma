import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage'; // Adjust the path as necessary
import LoginPage from './LoginPage'; // Adjust the path as necessary
import DoctorPage from './DoctorPage'; // Adjust the path as necessary
import PatientPage from './PatientPage'; // Adjust the path as necessary
import PatientPrescription from './PatientPrescription';
import SignUp from './SignUp'; 

const App = () => {
  return (
    <Router>
      <Routes>
        {/* HomePage will display Home.js content */}
        <Route path="/" element={<HomePage displayHome={true} />} />

        {/* LoginPage or other routes will not display Home.js */}
        <Route path="/login/:role" element={<LoginPage />} />
        <Route path="/doctor" element={<DoctorPage />} />
        <Route path="/patient" element={<PatientPage />} />
        <Route path="/prescription/:patientId" element={<PatientPrescription />} />
        <Route path="/signup" element={<SignUp />} /> 
      </Routes>
    </Router>
  );
};

export default App;
