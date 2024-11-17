import React from 'react';
import './About.css'; 

const About = () => {
  return (
    <div>
  
      <section id="about" className="about-section">
        <div className='container'>
          <h1>GDSC Solution Challenge</h1>
          <h2>SDG-16: Peace, Justice, and Strong Institutions</h2>
        </div>

        <section className='mission-vision-section'>
        <div className="container">          
          <h2>About Us</h2>
          <ul>
            <li>
              In response to the growing need for proactive security measures, our project focuses on developing an Advanced AI model for Real-Time CCTV Surveillance System designed to swiftly detect and report criminal activities to the appropriate authorities. 
            </li>

            <li>
              Leveraging cutting-edge technologies such as CNNs and LSTMs, we aim to swiftly identify critical events like fighting, shoplifting, abuse, and more.
            </li>

            <li>
              By accurately identifying the nature of the crime, this system aids in directing the information to the relevant agencies, thereby enhancing the efficiency of law enforcement. 
            </li>

            <li>
              By reducing crime rates and facilitating the prompt handling of criminal incidents, our initiative contributes to fostering peace within communities and reinforces the establishment of resilient institutions, thus advancing the objectives of SDG16.
            </li>
          </ul>
        </div>
      </section>
      </section>

      
      <section className="mission-vision-section">
        <div className="container">
          <h2>Our Solution</h2>
          <ol>
            <li>We developed two models: one for crime detection and another for identifying crime types.</li>
            <li>Upon detecting the type of crime, we promptly notify the relevant authorities about the incident.</li>
            <li>
              We have the capability to integrate our model into CCTV cameras situated in densely populated locations like malls and public spaces to proactively prevent crimes. By leveraging this integration, we enhance surveillance efforts and contribute to ensuring safety and security in these areas.
            </li>
          </ol>
        </div>
      </section>

      <section className="key-features-section">
        <div className="container">
          <h2>Key Features</h2>
          <ul>
            <li>Deep Learning Models</li>
            <ol>
              <li>Long Short Term Memory Networks (LSTM)</li>
              <li>Convolutional Neural Networks (CNN)</li>
              <li>Long-term Recurrent Convolutional Network (LSTM)</li>
            </ol>
            <li>Seamless CCTV Integration</li>
            <li>Real-time Monitoring</li>
            <li>Prompt Warning Systems</li>
            
          </ul>
        </div>
      </section>
    </div>
  );
};

export default About;