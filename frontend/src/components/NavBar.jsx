import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export function Navbar(props) {
  return (
    <header>
      <Link to="/" className="logo">HamChick</Link>
      <nav>
        <ul>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><a href="https://discord.com/oauth2/authorize?client_id=788980482951348235&permissions=8&scope=bot" className="btn">Invite</a></li>
          <li><a href="http://localhost:8080/api/auth/discord">Login</a></li>
        </ul>
      </nav>
    </header>
  )
}