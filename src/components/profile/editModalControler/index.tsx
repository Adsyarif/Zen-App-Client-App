import React, { useState, useEffect } from "react";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  counselorData: any;
  onSave: (updatedData: any) => void;
}

const EditModal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  counselorData,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    phone_number: "",
    gender_name: "",
    title: "",
    certification: "",
    practice_license_status: "",
    practice_location: "",
    price: "",
    year_of_experience: "",
    alumnus: [] as string[],
  });

  useEffect(() => {
    if (counselorData && Object.keys(counselorData).length) {
      setFormData({
        first_name: counselorData.first_name || "",
        last_name: counselorData.last_name || "",
        user_name: counselorData.user_name || "",
        phone_number: counselorData.phone_number || "",
        gender_name: counselorData.gender_name || "",
        title: counselorData.title || "",
        certification: counselorData.certification || "",
        practice_license_status: counselorData.practice_license_status || "",
        practice_location: counselorData.practice_location || "",
        price: counselorData.price || "",
        year_of_experience: counselorData.year_of_experience || "",
        alumnus: counselorData.alumnus || [],
      });
    }
  }, [counselorData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAlumnusChange = (index: number, value: string) => {
    const updatedAlumnus = [...formData.alumnus];
    updatedAlumnus[index] = value;
    setFormData((prev) => ({
      ...prev,
      alumnus: updatedAlumnus,
    }));
  };

  const addAlumnusField = () => {
    setFormData((prev) => ({
      ...prev,
      alumnus: [...prev.alumnus, ""],
    }));
  };

  const removeAlumnusField = (index: number) => {
    const updatedAlumnus = formData.alumnus.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      alumnus: updatedAlumnus,
    }));
  };
  

  const handleSubmit = () => {
    onSave(formData);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-teal-900 p-6 rounded-md md:w-1/2 lg:w-1/2 w-full mx-12">
        <h2 className="text-xl font-semibold mb-4 text-white text-center">
          Edit Profile
        </h2>
        <div className="flex flex-row gap-10 w-full ">
          <div className="flex flex-col w-full">
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
              <p className="text-white lg:text-xl font-semibold">Profession</p>
              <input
                type="text"
                name="title"
                value={formData.title}
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
          </div>

          <div className="flex flex-col w-full">
            <div>
                <p className="text-white lg:text-xl font-semibold">Alumnus</p>
                {formData.alumnus.map((alumnus, index) => (
                    <div key={index} className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={alumnus}
                        onChange={(e) => handleAlumnusChange(index, e.target.value)}
                        placeholder="Add text in here..."
                        className="capitalize w-full p-2 border border-gray-300 rounded"
                    />
                    <button
                        type="button"
                        onClick={() => removeAlumnusField(index)}
                        className="text-red-500"
                    >
                        x
                    </button>
                    </div>
                ))}
                    <button
                        type="button"
                        onClick={addAlumnusField}
                        className="bg-teal-600 text-white p-2 rounded"
                    >
                        Add Alumnus
                    </button>
            </div>
            <div>
              <p className="text-white lg:text-xl font-semibold">Certification</p>
              <input
                type="text"
                name="certification"
                value={formData.certification}
                onChange={handleChange}
                placeholder="Add text in here..."
                className="capitalize w-full p-2 border border-gray-300 rounded mb-4"
              />
            </div>
            <div>
              <p className="text-white lg:text-xl font-semibold">Practice License</p>
              <input
                type="text"
                name="practice_license_status"
                value={formData.practice_license_status}
                onChange={handleChange}
                placeholder="Add text in here..."
                className="capitalize w-full p-2 border border-gray-300 rounded mb-4"
              />
            </div>
            <div>
              <p className="text-white lg:text-xl font-semibold">Practice Location</p>
              <input
                type="text"
                name="practice_location"
                value={formData.practice_location}
                onChange={handleChange}
                placeholder="Add text in here..."
                className="capitalize w-full p-2 border border-gray-300 rounded mb-4"
              />
            </div>
            <div>
              <p className="text-white lg:text-xl font-semibold">Year of Experience</p>
              <input
                type="number"
                name="year_of_experience"
                value={formData.year_of_experience}
                onChange={handleChange}
                placeholder="Add text in here..."
                className="capitalize w-full p-2 border border-gray-300 rounded mb-4"
              />
            </div>
            <div>
              <p className="text-white lg:text-xl font-semibold">Price</p>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Add text in here..."
                className="capitalize w-full p-2 border border-gray-300 rounded mb-4"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-10">
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
