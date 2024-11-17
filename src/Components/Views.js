import React from 'react';
import BlogSection from './blogSection';

const Views = ({ reviews }) => {
  return (
    <div className='tush1'>
     
      <section className="blog-section">
        <BlogSection reviews={reviews}/>
      </section>
    </div>
  );
}

export default Views;
