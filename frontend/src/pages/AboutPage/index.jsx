import React from 'react';
import {Navbar} from '../../components/NavBar';
import './index.css';


export function AboutPage(props) {
  return (
  <div>
    <Navbar />
    <div>
      <h1>About Page</h1>
      <p>Hello! This HamChick (don't mind the silly name), a Discord bot I made earlier this year for some of my friends and have been adding features to from time to time. It all started because we have this friend who would constantly leave and join call. We would all joke about her ridiculously short call times and wanted a way to keep track of how long she stayed in call at any given time. Therefore, HamChick was born with its first (and primary) feature: call time tracking. HamChick keeps track of when a user joins and leaves a call and saves that to MongoDB. Other features of the bot include:</p>
      <ul>
        <li>Marry your friends!</li>
        <li>Keep track of good morning and good night streaks!</li>
        <li>GIF Search</li>
      </ul>
    </div>
  </div>
    )
}