import React, { useState } from 'react';

// Modal component to display the patient image
const Modal = ({ imageUrl, onClose }) => {
    return (
        <div style={modalStyles}>
            <div style={modalContentStyles}>
                <img src={imageUrl} alt="Patient" style={{ width: '200px', height: '200px' }} /><br></br>
                <button onClick={onClose}>Ok</button>
            </div>
        </div>
    );
};

// Styles for the modal
const modalStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const modalContentStyles = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
};

const DosageDetail = () => {
    const [dosage, setDosage] = useState('');
    const [imageUrl, setImageUrl] = useState(''); // State to store the fetched image URL
    const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility
    const [paymentConfirmed, setPaymentConfirmed] = useState(false); // State to track payment confirmation
    const pricePerDosage = 50; // Define the price per dosage

    const handleInputChange = (event) => {
        setDosage(event.target.value);
    };

    const handlePayment = async () => {
        // Fetch the patient details from the JSON file
        try {
            const response = await fetch('/PatientDetails.json'); // Adjust the path based on your setup
            const patientData = await response.json();
            
            // Assuming you want to use the first patient's imageUrl for now
            const patient = patientData[0];
            
            setImageUrl(patient.imageUrl);
            setModalOpen(true); // Open the modal when payment is made
            setPaymentConfirmed(false); // Reset confirmation state
        } catch (error) {
            console.error('Error fetching patient details:', error);
        }
    };

    // Calculate the total amount based on dosage
    const totalAmount = dosage ? dosage * pricePerDosage : 0;

    const handleOkClick = () => {
        setPaymentConfirmed(true); // Update the confirmation state
        setModalOpen(false); // Close the modal
    };

    return (
        <div>
            <h2>Medication Dosage Quantity Details</h2>
            <label>
                How many quantities of the prescribed medication would you like to receive?
                <input 
                    type="number" 
                    value={dosage} 
                    onChange={handleInputChange} 
                    min="1" 
                    placeholder="Enter the quantity" 
                />
            </label>
            <br />
            {dosage && (
                <p>
                    Total amount to pay: ₹{totalAmount}
                </p>
            )}
            <button onClick={handlePayment}>Pay via</button>

            {/* Display confirmation message if payment is confirmed */}
            {paymentConfirmed && (
                <div style={{ marginTop: '20px', color: 'green' }}>
                    <p>You have done payment for {dosage} dosage(s).</p>
                </div>
            )}

            {/* Render modal if it's open */}
            {modalOpen && (
                <Modal imageUrl={imageUrl} onClose={handleOkClick} />
            )}
        </div>
    );
};

export default DosageDetail;
