import React from 'react';
import {getUser} from '../../utils/api.js';
import {Navbar} from '../../components/NavBar';
import './index.css';
import Collapsible from 'react-collapsible';

function convertTime(time) {
  if (time >= 3600) {
    return `${time = (time / 3600).toFixed(2)} hours`;
  } else if (time >= 60) {
    return `${time = (time / 60).toFixed(2)} minutes`;
  } else {
    return `${time} seconds`
  }
}

export function ProfilePage({
  history
}) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getUser()
      .then(data => {
        setUser(data);
        setLoading(false);
      }).catch(err => {
        history.push('/')
        setLoading(false);
      });
  }, [user, history])

  if (!loading) {
    const {userID, username, avatar, callTimes, streaks} = user.data
    let highscore = convertTime(callTimes.highscore);
    let lowscore = convertTime(callTimes.lowscore);



    const avatarURL = `https://cdn.discordapp.com/avatars/${userID}/${avatar}.jpg`
    return (
      <div>
      <Navbar />
      <div>
        <div className="profile">
          <img src={avatarURL} alt="Profile"/>
          <h2>Hello {username}!</h2>
        </div>

        <div className='callTimes'>
          <Collapsible trigger= 'Call Statistics'>
            <p>Current Call Highscore: {highscore || "You haven't joined a call!"}</p>
            <p>Current Call Lowscore: {lowscore || "You haven't joined a call!"}</p>
          </Collapsible>
        </div>
        <div className='Streak'>
          <Collapsible trigger='Streak'>
            <p>Current Good Night Streak: {streaks.gnStreak}</p>
            <p>Longest Good Night Streak: {streaks.gnHighscore}</p>
            <p>Current Good Morning Streak: {streaks.gmStreak}</p>
            <p>Longest Good Morning Streak: {streaks.gmHighscore}</p>
          </Collapsible>
        </div>
        </div>
      </div>
    )
  }
  return null
}