
import React from 'react';

const Box = ({ reviews, title }) => {
  return (
    <div
      style={{
        width: '100%', 
        maxWidth: '600px', 
        margin: '20px auto', 
        backgroundColor: '#fff', 
        border: '1px solid #ddd', 
        borderRadius: '10px', 
        overflow: 'hidden', 
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', 
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ padding: '20px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
        <h2 style={{ color: '#333', marginBottom: '15px' }}>{title}</h2>
        <p style={{ color: '#888', fontSize: '16px' }}>
          {reviews && reviews.length > 0 ? reviews.join(', ') : 'No reviews yet'}
        </p>
      </div>
    </div>
  );
};

export default Box;