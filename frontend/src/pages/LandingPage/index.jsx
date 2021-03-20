import React from 'react';
import './index.css';
import streak from "../../images/streak.png"
import call from "../../images/call.png";
import kiss from "../../images/kiss.png"
import {Navbar} from '../../components/NavBar';

export function LandingPage(props) {
  return (
    <div>
    <Navbar />
      <div className="content-1">
        <h1>The best monitoring bot ever created!</h1 >
        <h3>Keep track of all your friends 👀 and kiss your homies 💋 good night! 🌙</h3>
        <img src={call} alt="" className="call" />
      </div>
      <div className="content-2">
        <img src={streak} alt="" className="streak" />
        <img src={kiss} alt="" className="kiss" />
      </div>
  </div>
  )
}