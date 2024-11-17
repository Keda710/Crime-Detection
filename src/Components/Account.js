import React, { useState, useEffect } from 'react';
import { auth, provider } from "./Config";
import { signInWithPopup, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import '../Account.css';

const Account = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      setUser(user);
      localStorage.setItem('email', user.email);
      navigate('/Home'); 
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      localStorage.removeItem('email');
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setUser({ email: storedEmail });
    }
  }, []);

 const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/demo', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      navigate('/Home');
    } else if (response.status === 400) {
      const errorData = await response.json();
      console.log(errorData);
      alert("User already exists. Please login.");
    } else {
      alert("An error occurred. Please try again later.");
    }
  };



  return (
    <section className="container account-section">
      <h2>Create Account</h2>
      <section className="account-form-container">
        <form onSubmit={handleSubmit} action="/register" method="post">
          <input type="text" name="username" placeholder="Username" onChange={handleForm} required />
          <input type="email" name="email" placeholder="Email" onChange={handleForm} required />
          <input type="password" name="password" placeholder="Password" onChange={handleForm} required />
          <button type="submit">Register</button>
        </form>
        <div className="create-account-links">
          <Link className="create-account-link" to="/Login">Login</Link>
          <Link className="create-account-link1" onClick={handleGoogleSignIn}>Sign In with Google</Link>
        </div>
      </section>
    </section>
  );
}

export default Account;

