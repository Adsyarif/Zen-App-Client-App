import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { API_BASE } from "@/lib/projectApi";
import { AppContext } from "@/providers/AppContext";

export default function CompleteProfilePage() {
  const { currentUser } = useContext(AppContext);
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    phone_number: "",
    gender_id: "",
  });
  const [genderCategories, setgenderCategories] = useState([]);
  const router = useRouter();

  // Fetch gender options from the API when the component mounts
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
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data to be submitted:", userData);
    try {
      await axios.post(`${API_BASE}/user_details/${currentUser?.account_id}`, userData);
      router.push('/profilePage');  
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
              value={userData.first_name}
              required
              onChange={handleChange}
              placeholder="First Name"
              className="capitalize w-full p-2 border border-gray-300 rounded mb-4"
            />
          </div>
          <div className="">
            <p className="text-white lg:text-xl font-semibold">Last Name</p>
            <input
              type="text"
              name="last_name"
              value={userData.last_name}
              required
              onChange={handleChange}
              placeholder="Last Name"
              className="capitalize w-full p-2 border border-gray-300 rounded mb-4"
            />
          </div>
          <div className="">
            <p className="text-white lg:text-xl font-semibold">User Name</p>
            <input
              type="text"
              name="user_name"
              value={userData.user_name}
              required
              onChange={handleChange}
              placeholder="User Name"
              className="capitalize w-full p-2 border border-gray-300 rounded mb-4"
            />
          </div>
          <div className="">
            <p className="text-white lg:text-xl font-semibold">Gender</p>
            <select
              name="gender_id"
              value={userData.gender_id}
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
          <div className="">
            <p className="text-white lg:text-xl font-semibold">Phone Number</p>
            <input
              type="text"
              name="phone_number"
              value={userData.phone_number}
              required
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
          </div>

          <button type="submit" className="bg-teal-600 rounded-lg p-2 text-white">Save</button>
        </form>
      </div>
    </div>
  );
}
