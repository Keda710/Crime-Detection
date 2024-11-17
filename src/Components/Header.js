import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth'; // Import hook to listen for authentication state changes
import { auth } from "./Config";

const Header = () => {
  const [user] = useAuthState(auth);

  return (
    <header className='head'>
      <nav>
        <Link to="/Home" className="nav-btn">Home</Link>
        <Link to="/About" className="nav-btn">About</Link>
        <Link to="/Contact" className="nav-btn">Awareness</Link>
        <Link to="/Views" className="nav-btn">Views of People</Link>
        {user ? (
          <div className="profile-dropdown">
            <button className="nav-btn profile-btn">{user.displayName}</button>
            <div className="profile-dropdown-content">
              <p>Name: {user.displayName}</p>
              <p>Email: {user.email}</p>
              <button onClick={() => auth.signOut()}>Logout</button>
            </div>
          </div>
        ) : (
          <Link to="/Account" className="nav-btn">Login/Register</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;