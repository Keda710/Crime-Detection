
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = ({ addReview }) => {
  const [review, setReview] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const blogRef = useRef(null);

  useEffect(() => {
    if (blogRef.current) {
      blogRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (userName.trim() !== '' && review.trim() !== '') {
      const newReview = { userName, review };
      addReview(newReview);
      setUserName('');
      setReview('');
      navigate('/views');
    }
  };

  return (
    <div className='tush'>
    <section className="container upload-section">
      <form onSubmit={handleReviewSubmit}>
        <h2>
          <label htmlFor="userName" style={{ color: 'your-desired-color' }}>
            Your Name:
          </label>
        </h2>
        <input type="text" id="userName" name="userName" placeholder="Enter your name" value={userName} onChange={(e) => setUserName(e.target.value)}/>
        <h2>
          <label htmlFor="review" style={{ color: 'your-desired-color' }}>
            Submit a Review:
          </label>
        </h2>
        <input type="text" id="review" name="review" placeholder="Share your thoughts about how to generate awareness among people to maintain peace"
          value={review} onChange={(e) => setReview(e.target.value)}/>
        <button type="submit">Submit</button>
      </form>
    </section>
    </div>
  );
};

export default Contact;