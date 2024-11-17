// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Home from './Components/Home';
import About from './Components/About';
import Account from './Components/Account';
import Contact from './Components/Contact';
import Footer from './Components/footer';
import Views from './Components/Views';
import Main from './Components/Main';
import Login from './Components/Login';
import PredictionResult from './Components/Output'; 
function App() {
  const [reviews, setReviews] = useState([]);

  const addReview = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  return (
    
    <Router>
      <div className="App">
        <Main />
        <Header />
        <Routes>
          <Route path="/Home" element={<Home/>}/>
          <Route path="/About" element={<About />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/contact" element={<Contact addReview={addReview} />}/>
          <Route path="/views" element={<Views reviews={reviews}/>} />
           <Route path="/login" element={<Login />} /> 
           <Route path="/prediction" element={<PredictionResult />} />
        </Routes>
        <Footer />
      </div>
    </Router>
    
  );
}

export default App;