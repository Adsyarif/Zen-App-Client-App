import { useState, useEffect, useContext } from 'react';
import { API_BASE } from "@/lib/projectApi";
import { AppContext } from "@/providers/AppContext";
import { Navigation } from "@/components/common";
import Image from "next/image";
import React from 'react';
import FeedbackModal from '@/components/FeedbackModal';
import axios from 'axios';
import ReactStars from "react-stars";


export interface Feedback {
  feedback_id: number;
  account_id: number;
  username: string;
  description: string;
  rating: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export default function HomePage () {
  const { currentUser } = useContext(AppContext);
  const accountId = currentUser?.account_id;
  const username = currentUser?.username;
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [rating, setRating] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const visibleCards = 4; 

  useEffect(() => {
    fetchFeedback();
  }, []);

  const handleSubmitReview = async () => {

    // if (!currentUser) {
    //   alert("User is not logged in");
    //   return;
    // }

    try {
      await axios.post(
        `${API_BASE}/feedback/${accountId}/create`,
        {
          username,
          description,
          rating,
        }
      );
      alert("Review submitted successfully");
      handleClose();
      setInputValue("");
      setRating(0);

      await fetchFeedback();
    } catch (error) {
      console.error("Error posting review:", error);
      alert("There was an error posting your review. Please try again.");
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  useEffect(() => {
    if (feedback.length > visibleCards) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex < feedback.length - visibleCards ? prevIndex + 1 : 0
        );
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [feedback.length]);

  const fetchFeedback = async () => {
    try {
      const response = await axios.get(`${API_BASE}/feedback`);
      console.log("Feedback data fetched:", response.data.data);
      setFeedback(response.data.data as Feedback[]);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  // const handleAddFeedback = async (newFeedback: Omit<Feedback, 'feedback_id' | 'created_at' | 'updated_at' | 'deleted_at'>) => {
  //   try {
  //     console.log("Sending feedback:", { ...newFeedback, username }); 
  //     await axios.post(`${API_BASE}/feedback/${accountId}/create`, { ...newFeedback, username });
  //     fetchFeedback();
  //   } catch (error) {
  //     console.error("Error adding feedback:", error);
  //   }
  //   setModalVisible(false); 
  // };

  const handleAddFeedback = async (feedback: { username: string; description: string; rating: number }) => {
    try {
      console.log("Sending feedback:", { ...feedback, username }); 
      await axios.post(`${API_BASE}/feedback/${accountId}/create`, { ...feedback, username });
      fetchFeedback();
    } catch (error) {
      console.error("Error adding feedback:", error);
    }
    setModalVisible(false); 
  };
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
    <Navigation/>
    
    <div className="px-8 md:px-32">
      <div className="relative flex flex-col md:flex-row py-6 items-center">
        <div className="w-full md:w-1/2 p-4 md:p-0 relative z-10">
          <div className="text-4xl md:text-6xl text-[#055254] font-bold">Zen Zone</div>
          <div className="text-lg md:text-3xl text-[#055254] font-medium mt-4">
            ZenZone provides a welcoming environment to discuss mental health challenges openly, offering professional guidance and community support to help you feel understood and empowered.
          </div>
          <div className="flex gap-4 mt-6">
            <button className="rounded-md bg-leaf p-1 px-4 md:px-6 my-3 text-white font-medium">
              More Details
            </button>
            <button className="rounded p-1 px-4 md:px-6 my-3 font-medium text-[#055254] outline outline-[#055254]">
              Join Us
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 relative">
          {/* Hidden Image on Mobile */}
          <Image
            src="/hero-image.png"
            width={800}
            height={800}
            alt="Profile picture"
            className="hidden md:block"
          />
        </div>
      </div>

      <div className="flex justify-center items-center flex-col py-6">
        <div className="text-2xl md:text-4xl font-bold">Information</div>
        <div className="text-lg md:text-3xl">Kami akan memberikan solusi dari segala penyakit mental yang anda alami</div>
      </div>
      <div className="flex flex-col md:flex-row pb-6">
        <div className="w-full md:w-1/2">
          <Image
            src="/information.png"
            width={800}
            height={100}
            alt="Profile picture"
            className=""
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <div className="flex gap-4 pl-4 pt-4 md:pt-0 ">
            <div className="w-12">
              <Image
                src="/forums.png"
                width={100}
                height={50}
                alt="Forums"
                className=""
              />
            </div>
            <div>
              <div className="text-2xl font-bold md:text-3xl">Forums</div>
              <div className="text-lg text-justify md:text-2xl">
                Kami menyediakan sebuah fitur Forums dimana anda bisa bertanya dan mengetahui pengalaman/saran dari orang-orang lain yang memiliki penyakit mental, anda bisa menggunakan fitur ini untuk saling berinteraksi dengan para pengguna lainnya.
              </div>
            </div>
          </div>
          <div className="flex gap-4 pl-4 pt-4">
            <div className="w-12">
              <Image
                src="/consouelling.png"
                width={100}
                height={50}
                alt="Consouelling"
                className=""
              />
            </div>
            <div>
              <div className="text-2xl font-bold md:text-3xl">Consouelling</div>
              <div className=" text-lg text-justify md:text-2xl">
                Kami menyediakan sebuah fitur Consouelling dimana anda bisa berkonsultasi dan mendapatkan saran dari para profesional untuk mengatasi masalah kesehatan mental.
              </div>
            </div>
          </div>
          <div className="flex gap-4 pl-4 pt-4">
            <div className="w-12">
              <Image
                src="/book.png"
                width={100}
                height={50}
                alt="Diary"
                className=""
              />
            </div>
            <div>
              <div className="text-2xl font-bold md:text-3xl">Diary</div>
              <div className="text-lg text-justify md:text-2xl">
                Kami menyediakan sebuah fitur Diary dimana anda bisa menuliskan pengalaman pribadi anda terkait kesehatan mental.
              </div>
            </div>
          </div>
          <div className="flex gap-4 pl-4 pt-4">
            <div className="w-12">
              <Image
                src="/articles.png"
                width={100}
                height={50}
                alt="Articles"
                className=""
              />
            </div>
            <div>
              <div className="text-2xl font-bold md:text-3xl">Articles</div>
              <div className="text-lg text-justify md:text-2xl">
                Kami menyediakan berbagai artikel tentang kesehatan mental yang dapat membantu anda memahami dan mengatasi masalah kesehatan mental.
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="flex flex-col md:flex-row gap-6 pb-4">
        <div className="w-full md:w-1/2 order-2 md:order-1">
          <div className="text-2xl font-bold md:text-3xl">Forums</div>
          <div className="text-lg text-justify mt-4 md:mt-0 md:text-2xl">
            Kami menyediakan sebuah fitur Forums dimana anda bisa bertanya dan mengetahui pengalaman/saran dari orang-orang lain yang memiliki penyakit mental, anda bisa menggunakan fitur ini untuk saling berinteraksi dengan para pengguna lainnya.
          </div>
        </div>
        <div className="w-full md:w-1/2 order-1 md:order-2">
          <Image
            src="/forums ss.png"
            width={800}
            height={100}
            alt="Profile picture"
            className=""
          />
        </div>
      </div>


      <div className="flex flex-col md:flex-row gap-6 pb-4">
        {/* Image section */}
        <div className="flex flex-col w-full md:w-1/2 gap-2 order-1 md:order-1">
          {/* This image is shown on mobile */}
          <div className="block md:hidden">
            <Image
              src="/profile people.png"
              width={400}
              height={400}
              alt="Profile picture"
              className=""
            />
          </div>
          {/* These images are shown only on desktop */}
          <div className="hidden md:flex gap-2">
            <div>
              <Image
                src="/profile people.png"
                width={400}
                height={400}
                alt="Profile picture"
                className=""
              />
            </div>
            <div className="flex flex-col gap-2">
              <Image
                src="/profile people.png"
                width={200}
                height={200}
                alt="Profile picture"
                className=""
              />
              <Image
                src="/profile people.png"
                width={200}
                height={200}
                alt="Profile picture"
                className=""
              />
            </div>
          </div>
        </div>
        
        {/* Text section */}
        <div className="flex flex-col justify-center w-full md:w-1/2 order-2 md:order-2 mt-4 md:mt-0">
          <div className="text-2xl font-bold md:text-3xl">Consouelling</div>
          <div className="text-lg text-justify mt-4 md:mt-0 md:text-2xl">
            Kami menyediakan sebuah fitur Forums dimana anda bisa bertanya dan mengetahui pengalaman/saran dari orang-orang lain yang memiliki penyakit mental, anda bisa menggunakan fitur ini untuk saling berinteraksi dengan para pengguna lainnya.
          </div>
        </div>
      </div>


      <div className="flex flex-col md:flex-row gap-6 pb-4">
        {/* Text section */}
        <div className="flex flex-col justify-center w-full md:w-1/2 order-2 md:order-1">
          <div className="text-2xl font-bold md:text-3xl">Diary</div>
          <div className="text-lg text-justify mt-4 md:mt-0 md:text-2xl ">
            Kami menyediakan sebuah fitur Forums dimana anda bisa bertanya dan mengetahui pengalaman/saran dari orang-orang lain yang memiliki penyakit mental, anda bisa menggunakan fitur ini untuk saling berinteraksi dengan para pengguna lainnya.
          </div>
        </div>

        {/* Image section */}
        <div className="flex flex-col w-full md:w-1/2 gap-2 order-1 md:order-2">
          {/* This image is shown on mobile */}
          <div className="block md:hidden">
            <Image
              src="/book2.png"
              width={400}
              height={400}
              alt="Profile picture"
              className=""
            />
          </div>
          {/* These images are shown only on desktop */}
          <div className="hidden md:flex gap-2">
            <div>
              <Image
                src="/book2.png"
                width={400}
                height={400}
                alt="Profile picture"
                className=""
              />
            </div>
            <div className="flex flex-col gap-2">
              <Image
                src="/book3.png"
                width={200}
                height={200}
                alt="Profile picture"
                className=""
              />
              <Image
                src="/book3.png"
                width={200}
                height={200}
                alt="Profile picture"
                className=""
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 pb-4">
        {/* Image section */}
        <div className="flex w-full md:w-1/2 gap-2 order-1 md:order-1">
          {/* This image is shown on mobile */}
          <div className="relative block md:hidden">
            <Image
              src="/Article.png"
              width={800}
              height={800}
              alt="article picture"
              className=""
            />
            <div className="absolute top-1/2 left-10 transform -translate-y-1/2 p-4 rounded-lg text-white">
              <div className="text-l font-bold ">Featured</div>
              <div className="text-2xl font-bold">Judul Artikel</div>
              <div>Article description</div>
            </div>
          </div>
          {/* This image is shown only on desktop */}
          <div className="relative hidden md:block">
            <Image
              src="/Article.png"
              width={800}
              height={800}
              alt="article picture"
              className=""
            />
            <div className="absolute top-1/2 left-10 transform -translate-y-1/2 p-4 rounded-lg text-white">
              <div className="text-l font-bold">Featured</div>
              <div className="text-2xl font-bold">Judul Artikel</div>
              <div>Article description</div>
            </div>
          </div>
        </div>
        
        {/* Text section */}
        <div className="flex flex-col justify-center w-full md:w-1/2 order-2 md:order-2 mt-4 md:mt-0">
          <div className="text-2xl font-bold md:text-3xl">Articles</div>
          <div className="text-lg text-justify mt-4 md:mt-0 md:text-2xl">
            Kami menyediakan sebuah fitur Forums dimana anda bisa bertanya dan mengetahui pengalaman/saran dari orang-orang lain yang memiliki penyakit mental, anda bisa menggunakan fitur ini untuk saling berinteraksi dengan para pengguna lainnya.
          </div>
        </div>
      </div>


      <div>
          <div className="text-2xl font-bold md:text-3xl">Feedback</div>
          <div className="relative mx-auto text-center p-4">
            <div className="relative w-full overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${(currentIndex * 100) / visibleCards}%)`,
                }}
              >
                {feedback.map((item) => (
                  <div
                    key={item.feedback_id}
                    className="flex-none px-4"
                    style={{ flexBasis: `${100 / visibleCards}%` }}
                  >
                    <div className="bg-white p-6 shadow-lg rounded-lg text-left">
                      <p className="text-gray-700">{item.description}</p>
                      <div className="flex items-center mb-4 my-2">
                        <img
                          className="w-10 h-10 rounded-full mr-4"
                          src="https://randomuser.me/api/portraits/lego/1.jpg" 
                          alt={item.username}
                        />
                        <div>
                          <p className="font-semibold text-black">{item.username}</p>
                          <p className="text-sm text-gray-500">{item.created_at}</p>
                          <ReactStars
                            count={5}
                            size={20}
                            value={item.rating}
                            edit={false}
                            color2={"#ffd700"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

      <div className="gap-6 pb-4">
        <div className="text-2xl md:text-3xl font-bold flex justify-center">
          You can also leave feedback for us by filling out the form
        </div>

        <div className="flex flex-col-reverse md:flex-row py-6">
          {/* Text section */}
          <div className="flex flex-col justify-center w-full md:w-1/2 order-1 md:order-2 mt-4 md:mt-0">
            <div className="text-lg text-justify">
              Your feedback is very important to us for analyzing our strengths and weaknesses, so we can continue to improve based on your comments.
            </div>
            <div className="flex justify-center">
              <button
                className="rounded-md bg-leaf p-1 px-6 my-3 text-white font-medium"
                onClick={toggleModal}
              >
                Leave Feedback
              </button>
            </div>
            <FeedbackModal 
              isVisible={isModalVisible} 
              onClose={toggleModal} 
              onSubmit={handleAddFeedback} 
            />

            {/* <FeedbackForm 
              isVisible={isModalVisible} 
              onClose={toggleModal} 
              onSubmit={handleAddFeedback} 
            /> */}
          </div>

          {/* Image section */}
          <div className="flex w-full md:w-1/2 gap-2 order-2 md:order-1">
            {/* Image for mobile */}
            <div className="relative block md:hidden z-10">
              <Image
                src="/feedback.png"
                width={800}
                height={800}
                alt="Feedback"
              />
            </div>

            {/* Image for desktop */}
            <div className="relative hidden md:block">
              <Image
                src="/feedback.png"
                width={800}
                height={800}
                alt="Feedback"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
  
}

function handleClose() {
  throw new Error('Function not implemented.');
}

function setInputValue(arg0: string) {
  throw new Error('Function not implemented.');
}

function fetchReviewCounselor() {
  throw new Error('Function not implemented.');
}

