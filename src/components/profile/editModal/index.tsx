import React, { useState, useEffect } from "react";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  userData: any; 
  onSave: (updatedData: any) => void; 
}

const EditModal: React.FC<ModalProps> = ({ isVisible, onClose, userData, onSave }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    phone_number: "",
    gender_name: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        user_name: userData.user_name || "",
        phone_number: userData.phone_number || "",
        gender_name: userData.gender_name || "",
      });
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-teal-900 p-6 rounded-md md:w-1/2 lg:w-1/4 w-full mx-12">
        <h2 className="text-xl font-semibold mb-4 text-white text-center">Edit Profile</h2>
        <div className="">
          <p className="text-white lg:text-xl font-semibold">First Name</p>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Add text in here..."
            className="capitalize w-full p-2 border border-gray-300 rounded mb-4"
          />
        </div>
        <div>
          <p className="text-white lg:text-xl font-semibold">Last Name</p>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Add text in here..."
            className="capitalize w-full p-2 border border-gray-300 rounded mb-4"
          />
        </div>
        <div>
          <p className="text-white lg:text-xl font-semibold">Username</p>
          <input
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            placeholder="Add text in here..."
            className="capitalize w-full p-2 border border-gray-300 rounded mb-4"
          />
        </div>
        <div>
          <p className="text-white lg:text-xl font-semibold">Phone Number</p>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Add text in here..."
            className="capitalize w-full p-2 border border-gray-300 rounded mb-4"
          />
        </div>
        <div>
          <p className="text-white lg:text-xl font-semibold">Gender</p>
          <input
            type="text"
            name="gender_name"
            value={formData.gender_name}
            onChange={handleChange}
            placeholder="Add text in here..."
            className="capitalize w-full p-2 border border-gray-300 rounded mb-4"
          />
        </div>
        <div className="flex justify-center">
          <button
            className="rounded-md bg-lightGreen p-2 px-4 text-white font-medium mr-2 outline outline-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-lightGreen p-2 px-4 text-white font-medium outline outline-white"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
