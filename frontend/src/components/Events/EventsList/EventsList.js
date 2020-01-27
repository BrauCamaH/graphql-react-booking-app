import React from 'react';
import EventItem from './EventItem/EventItem';

import './EventsList.css';
const EventsList = props => {
  const { onViewDetail } = props;
  const events = props.events.map(event => {
    return (
      <EventItem
        key={event._id}
        event={event}
        userId={props.authUserId}
        onDetail={onViewDetail}
      />
    );
  });

  return <ul className='events__list'>{events}</ul>;
};
export default EventsList;
