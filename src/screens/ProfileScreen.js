import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectUser } from '../features/userSlice'
import { auth } from '../firebase'
import Nav from '../Nav'
import Subscription from '../Subscription'
import './ProfileScreen.css'

function ProfileScreen() {
  const { email } = useSelector(selectUser)
  const history = useHistory()

  const exit = () => {
    history.replace('/');
    return auth.signOut();
  }

  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          <img
            src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
            alt=""
          />
          <div className="profileScreen__details">
            <h2>{email}</h2>
            <div className="profileScreen__plans">
              <h3>Plans (Current Plan: premium)</h3>
              <h4>Renewal Date: 04/06/2021</h4>
              <Subscription name="NetFlix Standard" definition="1080p" />
              <Subscription name="NetFlix Basic" definition="420" />
              <Subscription name="NetFlix Premium" definition="4k+HDR" current />
              <button
                onClick={exit}
                className="profileScreen__signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen
