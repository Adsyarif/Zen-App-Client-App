import React, { useState, useContext } from 'react';
import { AppContext } from "@/providers/AppContext";
import { Feedback } from '@/pages';
import ReactStars from "react-stars";

export interface FeedbackModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (feedback: Omit<Feedback, 'feedback_id' | 'created_at' | 'updated_at' | 'deleted_at'>) => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isVisible, onClose, onSubmit }) => {
  const { currentUser } = useContext(AppContext);
  const [username, setUsername] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [rating, setRating] = useState<number>(0); 
  

  const handleSubmit = async () => {
    if (username && description && rating > 0) { 
      const newFeedback: Omit<Feedback, 'feedback_id' | 'created_at' | 'updated_at' | 'deleted_at'> = {
        account_id: currentUser?.account_id || 0,
        username,
        description,
        rating,
      };
  
      try {
        onSubmit(newFeedback);
      } catch (error) {
        console.error("Error submitting feedback:", error);
      }
  
      onClose();
    }
  };
  
  

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 z-50">
        <h2 className="text-2xl mb-4">Leave Feedback</h2>
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <textarea
          placeholder="Your Feedback"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-center mb-4">
          <ReactStars
            count={5}
            size={24}
            color2={"#ffd700"}
            value={rating}
            onChange={setRating}
          />
        </div>
        <button
          className="bg-leaf text-white p-2 rounded w-full"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className="mt-2 text-gray-500 underline w-full"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;
