import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/auth-context';
import Modal from '../components/Modal/Modal';
import Spinner from '../components/Spinner/Spinner';

import EventsList from '../components/Events/EventsList/EventsList';
import './Events.css';
const Events = () => {
  const context = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [values, setValues] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loanding, setLoading] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const token = context.token;

  const handleCancel = () => {
    setOpenCreateModal(false);
    setSelectedEvent(null);
  };

  const fetchEvents = () => {
    setLoading(true);
    const requestBody = {
      query: `
          query {
            events{
              _id
              title
              description
              date
              price
              creator {
                _id
                email
              }
            }
          }
        `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed');
        }
        return res.json();
      })
      .then(resData => {
        setEvents(resData.data.events);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleConfirm = () => {
    const title = values.title || '';
    const price = +values.price || '';
    const date = values.date || '';
    const description = values.description || '';

    if (
      title.trim().length === 0 ||
      price <= 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return;
    }

    const requestBody = {
      query: `
          mutation {
            createEvent(eventInput : {title: "${title}", description: "${description}" , price: ${price} , date: "${date}"}){
              _id
              title
              description
              price
              creator{
                _id
                email
              }
            }
          }
        `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed');
        }
        return res.json();
      })
      .then(resData => {
        const updatedItems = [...events];
        updatedItems.push({
          _id: resData.data.createEvent._id,
          title: resData.data.createEvent.title,
          description: resData.data.createEvent.description,
          date: resData.data.createEvent.date,
          price: resData.data.createEvent.price,
          creator: {
            _id: context.userId
          }
        });

        setEvents(updatedItems);
      })
      .catch(err => {
        console.log(err);
      });

    setOpenCreateModal(false);
  };

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  useEffect(fetchEvents, []);
  const showDetailHandler = eventId => {
    const currentEvent = events.find(e => e._id === eventId);
    setSelectedEvent(currentEvent);
  };
  return (
    <>
      <Modal
        title='Add Event'
        canCancel
        canConfirm
        open={openCreateModal}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      >
        <form>
          <div className='form-control'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              id='title'
              name='title'
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='price'>Price</label>
            <input
              type='number'
              id='price'
              name='price'
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='date'>Date</label>
            <input type='date' id='date' name='date' onChange={handleChange} />
          </div>
          <div className='form-control'>
            <label htmlFor='description'>Description</label>
            <textarea
              id='description'
              rows='4'
              name='description'
              onChange={handleChange}
            ></textarea>
          </div>
        </form>
      </Modal>
      {selectedEvent && (
        <Modal
          open={true}
          title={selectedEvent.title}
          canCancel
          canConfirm
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          confirmText='Book'
        >
          <h1>{selectedEvent.title}</h1>
          <h2>
            ${selectedEvent.price} -{' '}
            {new Date(selectedEvent.date).toLocaleDateString()}
          </h2>
          <p>{selectedEvent.description}</p>
        </Modal>
      )}
      {context.token && (
        <div className='events-control'>
          <p>Share your own Events</p>
          <button
            className='btn'
            onClick={() => {
              setOpenCreateModal(true);
            }}
          >
            Create Event
          </button>
        </div>
      )}
      {loanding ? (
        <Spinner />
      ) : (
        <EventsList
          authUserId={context.userId}
          events={events}
          onViewDetail={showDetailHandler}
        />
      )}
    </>
  );
};

export default Events;
