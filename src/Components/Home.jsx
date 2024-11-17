import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const [prediction, setPrediction] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await axios.post('/api/upload-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };
  const navigate = useNavigate();

  const handleLM = (event)=> {
    event.preventDefault();
    navigate('/About');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className='rnd'>Advancing Community Safety: Leveraging Technology Solutions</h1>
          <p className='rnd1'> Utilizing Innovative Technologies to Foster Peace, Justice, and Institutional Strength</p>
          <a onClick={handleLM} className="cta-button">Learn More</a>
        </div>
      </section>

      <section className="upload-section1">
        <div className="container">
          <h2>Upload Video</h2>
          <form action="http://localhost:3001/upload" method="post" encType="multipart/form-data">
            <label htmlFor="video">Choose a video:</label>
            <input type="file" id="video" name="video" accept="video/*" onChange={handleFileUpload} />
            <button type="submit">Upload</button>
            {prediction && <p>Prediction: {prediction}</p>}
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;