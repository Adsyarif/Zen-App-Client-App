import React from 'react';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<ModalProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-leaf p-6 rounded-md w-11/12 md:w-1/3">
        <h2 className="text-xl font-semibold mb-4 text-white text-center">Add a Feedback</h2>
        <input
          type="text"
          placeholder="Add text in here..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <div className="flex justify-center">
          <button
            className="rounded-md bg-leaf p-2 px-4 text-white font-medium mr-2 outline outline-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="rounded-md bg-leaf p-2 px-4 text-white font-medium outline outline-white">
            Create Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
