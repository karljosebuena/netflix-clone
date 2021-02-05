import React from 'react'
import './Subscription.css'

function Subscription({ name, definition, current = false }) {
  return (
    <div className="subscription">
      <div className="subscription__plan">
        <h3>{name}</h3>
        <p>{definition}</p>
      </div>
      <button className={`subscription__button ${current && 'subscription__current'}`}>
        {current ? 'Current Package' : 'Subscribe'}
      </button>
    </div>
  )
}

export default Subscription
