import React, { useEffect, useState } from 'react';
import dp1 from './Assets/dp1.jpeg'; // Adjust the path as needed
import dp2 from './Assets/dp2.jpeg'; // Assuming you have another image
import dp3 from './Assets/dp3.jpeg'; // Assuming you have another image

// Sample advertisement texts
const advertisements = [
    "Ad 1: Great Deals on Medications!",
    "Ad 2: Get 50% off on Your Next Purchase!",
    "Ad 3: Free Delivery on Orders Over $50!"
];

// Background images array
const backgroundImages = [
    `url(${dp1})`,
    `url(${dp2})`, // Replace with actual local image imports
    `url(${dp3})`  // Replace with actual local image imports
];

const Home = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentAdIndex, setCurrentAdIndex] = useState(0);

    useEffect(() => {
        // Change background image every 3 seconds
        const imageInterval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        }, 3000);

        // Change advertisement every 2 seconds
        const adInterval = setInterval(() => {
            setCurrentAdIndex((prevIndex) => (prevIndex + 1) % advertisements.length);
        }, 2000);

        // Clean up intervals on component unmount
        return () => {
            clearInterval(imageInterval);
            clearInterval(adInterval);
        };
    }, []);

    return (
        <div style={{
            backgroundImage: backgroundImages[currentImageIndex],
            backgroundSize: 'cover',
            height: '90vh',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px',
            color: 'white'
        }}>
            

            <div style={{
    width: '250px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '25px',
    borderRadius: '10px',
    position: 'fixed', // Use fixed positioning
    top: '10', // Align to the top
    right: '0', // Align to the right
    height: '90%', // Fill the full height of the viewport
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: 'white', // Optional: change text color for better visibility
}}>
    <h3>Advertisements</h3>
    <p>{advertisements[currentAdIndex]}</p>
</div>

        </div>
    );
};

export default Home;
