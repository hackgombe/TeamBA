import React, { forwardRef, useImperativeHandle, useState } from "react";

const Modal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Expose methods to parent component using useImperativeHandle
  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-gray-500/50 opacity-75"></div>
        </div>

        {/* Modal content */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:max-w-4xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white h-[33rem] overflow-y-auto px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Modal;
