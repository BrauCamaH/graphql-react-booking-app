import React from 'react';
import './EventItem.css';
const EventItem = props => {
  const { event, userId, onDetail } = props;
  return (
    <li className='events__list-item'>
      <div>
        <h1>{event.title}</h1>
        <h2>
          ${event.price} - {new Date(event.date).toLocaleDateString()}
        </h2>
      </div>
      <div>
        {userId === event.creator._id ? (
          <p>Your the owner of this event.</p>
        ) : (
          <button
            className='btn'
            onClick={() => {
              onDetail(event._id);
            }}
          >
            View Details
          </button>
        )}
      </div>
    </li>
  );
};

export default EventItem;
