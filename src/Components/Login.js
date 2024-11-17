import React, { useState, useEffect } from 'react';
import { auth, provider } from "./Config";
import { signInWithPopup, signOut } from 'firebase/auth';
import '../Account.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const handlesumbit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { email, password })
      .then(result => {
        console.log(result);
        
        if (result.data === "Login Successful") {
         
          navigate('/Home');
        } else {
          
          alert('Username does not exist or the password is incorrect');
        }
      })
      .catch(err => {
        console.log(err);
       
        alert('An error occurred while trying to log in');
      });
  };
  

  return (
    <section className="container account-section">
      <h2>Login</h2>
      <section className="account-form-container">
        <form action="/register" method="post" onSubmit={handlesumbit}>
         
          <input type="email" name="email" placeholder="Email"   onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" name="password" placeholder="Password"   onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Register</button>
          <Link className="create-account-link1" onClick={handleGoogleSignIn}>Sign In with Google</Link>
          <Link className="create-account-link" to="/Account">Sign up</Link>
                    

        </form>
      </section>

     
    </section>
  );
}

export default Login;