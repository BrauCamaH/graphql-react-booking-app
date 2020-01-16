import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';
const Modal = props => {
  const { open, onCancel, onConfirm } = props;
  return (
    <>
      {open && (
        <>
          <Backdrop />
          <div className='modal'>
            <header className='modal__header'>
              <h1>{props.title}</h1>
            </header>
            <section className='modal__content'>{props.children}</section>
            <section className='modal__actions'>
              {props.canCancel && (
                <button className='btn' onClick={onCancel}>
                  Cancel
                </button>
              )}
              {props.canConfirm && (
                <button className='btn' onClick={onConfirm}>
                  Confirm
                </button>
              )}
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
