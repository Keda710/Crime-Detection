import React from 'react';
import Box from './Box';

const BlogSection = ({ reviews }) => {
  return (
    <section className="container">
      <h2>Views of people</h2>
      {reviews.map((review, index) => (
        <Box key={index} title={review.userName} reviews={[review.review]} />
      ))}
    </section>
  );
};

export default BlogSection;