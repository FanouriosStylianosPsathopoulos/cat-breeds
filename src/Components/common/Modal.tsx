import React from 'react';
import { useModal } from '../../context/ModalContext';

const Modal: React.FC = () => {
  const { isModalOpen, modalContent, closeModal } = useModal();

  return (
    isModalOpen ? 
    <>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative dark:bg-slate-800 dark:text-white">
          <button 
            onClick={closeModal} 
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <span className="text-xl">&times;</span>
          </button>
          <div>{modalContent}</div>
        </div>
      </div>
    </> : null
  );
};

export default Modal;
