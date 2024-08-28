import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { API_BASE } from "@/lib/projectApi";
import { AppContext } from "@/providers/AppContext";

export default function CompleteProfileCounselorPage() {
  const { currentUser } = useContext(AppContext);
  const [CounselorData, setCounselorData] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    phone_number: "",
    gender_id: "",
    alumnus: [] as string[],
    practice_license_status: "",
    practice_location: "",
    price: "",
    title: "",
    year_of_experience: "",
    certification: "",

  });
  const [genderCategories, setgenderCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const response = await axios.get(`${API_BASE}/gender`);
        setgenderCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching genders:", error);
      }
    };
    fetchGenders();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCounselorData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAlumnusChange = (index: number, value: string) => {
    const updatedAlumnus = [...CounselorData.alumnus];
    updatedAlumnus[index] = value;
    setCounselorData((prev) => ({
      ...prev,
      alumnus: updatedAlumnus,
    }));
  };

  const addAlumnusField = () => {
    setCounselorData((prev) => ({
      ...prev,
      alumnus: [...prev.alumnus, ""],
    }));
  };

  const removeAlumnusField = (index: number) => {
    const updatedAlumnus = CounselorData.alumnus.filter((_, i) => i !== index);
    setCounselorData((prev) => ({
      ...prev,
      alumnus: updatedAlumnus,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const dataToSubmit = {
        ...CounselorData,
        gender_id: parseInt(CounselorData.gender_id),
        price: parseInt(CounselorData.price),
        year_of_experience: parseInt(CounselorData.year_of_experience, 10),
    };
    
    console.log("Data to be submitted:", dataToSubmit);
    
    try {
        await axios.post(`${API_BASE}/counselor/create/${currentUser?.account_id}`, dataToSubmit);
        router.push('/Counselor/profile');  
    } catch (error) {
        console.error("Error saving profile data:", error);
    }
};




  return (
    <div className="mb-10  w-full flex justify-center items-center ">
      <div className="flex flex-col items-center rounded-2xl p-4 bg-teal-900 align-middle mt-10 lg:mx-24 w-full lg:w-1/2 md:w-1/2 mx-12">
        <h1 className="text-2xl font-semibold mb-4 text-white">Complete Your Profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-full ">

          <div className="">
            <p className="text-white lg:text-xl font-semibold">First Name</p>
            <input
              type="text"
              name="first_name"
              value={CounselorData.first_name}
              required
              onChange={handleChange}
              placeholder="Add text in here..."
              className="capitalize w-full p-2 border border-gray-300 rounded mb-4"
            />
          </div>
          <div className="">
            <p className="text-white lg:text-xl font-semibold">Last Name</p>
            <input
              type="text"
              name="last_name"
              value={CounselorData.last_name}
              required
              onChange={handleChange}
              placeholder="Add text in here..."
              className="capitalize w-full p-2 border border-gray-300 rounded mb-4"
            />
          </div>
          <div className="">
            <p className="text-white lg:text-xl font-semibold">User Name</p>
            <input
              type="text"
              name="user_name"
              value={CounselorData.user_name}
              required
              onChange={handleChange}
              placeholder="Add text in here..."
              className="capitalize w-full p-2 border border-gray-300 rounded mb-4"
            />
          </div>
          <div className="">
            <p className="text-white lg:text-xl font-semibold">Profession</p>
            <input
              type="text"
              name="title"
              value={CounselorData.title}
              required
              onChange={handleChange}
              placeholder="Add text in here..."
              className="capitalize w-full p-2 border border-gray-300 rounded mb-4"
            />
          </div>
          <div className="">
            <p className="text-white lg:text-xl font-semibold">Phone Number</p>
            <input
              type="text"
              name="phone_number"
              value={CounselorData.phone_number}
              required
              onChange={handleChange}
              placeholder="Add text in here..."
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
          </div>
          <div className="">
            <p className="text-white lg:text-xl font-semibold">Gender</p>
            <select
              name="gender_id"
              value={CounselorData.gender_id}
              required
              onChange={handleChange}
              className="capitalize w-full p-2 border border-gray-300 rounded mb-4"
            >
              <option value="" disabled>Select Gender</option>
              {genderCategories.map((gender: any) => (
                <option key={gender.gender_id} value={gender.gender_id}>
                  {gender.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <p className="text-white lg:text-xl font-semibold">Alumnus</p>
            {CounselorData.alumnus.map((alumnus, index) => (
                <div key={index} className="flex gap-2 mb-4">
                <input
                    type="text"
                    required
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
                    className="bg-white text-black p-2 rounded"
                >
                    Add Alumnus
                </button>
            </div>

            <div>
              <p className="text-white lg:text-xl font-semibold">Certification</p>
              <input
                type="text"
                required
                name="certification"
                value={CounselorData.certification}
                onChange={handleChange}
                placeholder="Add text in here..."
                className="capitalize w-full p-2 border border-gray-300 rounded mb-4"
              />
            </div>
            <div>
              <p className="text-white lg:text-xl font-semibold">Practice License</p>
              <input
                type="text"
                required
                name="practice_license_status"
                value={CounselorData.practice_license_status}
                onChange={handleChange}
                placeholder="Add text in here..."
                className="capitalize w-full p-2 border border-gray-300 rounded mb-4"
              />
            </div>
            <div>
              <p className="text-white lg:text-xl font-semibold">Practice Location</p>
              <input
                type="text"
                required
                name="practice_location"
                value={CounselorData.practice_location}
                onChange={handleChange}
                placeholder="Add text in here..."
                className="capitalize w-full p-2 border border-gray-300 rounded mb-4"
              />
            </div>
            <div>
              <p className="text-white lg:text-xl font-semibold">Year of Experience</p>
              <input
                type="number"
                required
                name="year_of_experience"
                value={CounselorData.year_of_experience}
                onChange={handleChange}
                placeholder="Add text in here..."
                className="capitalize w-full p-2 border border-gray-300 rounded mb-4"
              />
            </div>
            <div>
              <p className="text-white lg:text-xl font-semibold">Price</p>
              <input
                type="number"
                required
                name="price"
                value={CounselorData.price}
                onChange={handleChange}
                placeholder="Add text in here..."
                className="capitalize w-full p-2 border border-gray-300 rounded mb-4"
              />
            </div>

          <button type="submit" className="bg-teal-600 rounded-lg p-2 text-white">Save</button>
        </form>
      </div>
    </div>
  );
}
