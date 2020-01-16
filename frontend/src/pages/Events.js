import React, { useState } from 'react';

import Modal from '../components/Modal/Modal';
import './Events.css';
const Events = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const handleCancel = () => {
    setOpenCreateModal(false);
  };
  const handleConfirm = () => {
    setOpenCreateModal(false);
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
        <p>Content</p>
      </Modal>
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
    </>
  );
};

export default Events;
