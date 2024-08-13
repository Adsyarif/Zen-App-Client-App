import Image from "next/image";
import React from 'react';
import FeedbackModal from '@/components/FeedbackModal';
import { useEffect, useState } from "react";
import { Navigation } from "@/components/common";

export default function HomePage () {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  const items = [
    {
      id: 1,
      name: "John Doe",
      time: "8 Agustus 2024",
      src: "https://randomuser.me/api/portraits/men/1.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.",
    },
    {
      id: 2,
      name: "Jane Smith",
      time: "8 Agustus 2024",
      src: "https://randomuser.me/api/portraits/women/2.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.",
    },
    {
      id: 3,
      name: "Michael Johnson",
      time: "8 Agustus 2024",
      src: "https://randomuser.me/api/portraits/men/3.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.",
    },
    {
      id: 4,
      name: "Emily Davis",
      time: "8 Agustus 2024",
      src: "https://randomuser.me/api/portraits/women/4.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.",
    },
    {
      id: 5,
      name: "William Brown",
      time: "8 Agustus 2024",
      src: "https://randomuser.me/api/portraits/men/5.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.",
    },
    {
      id: 6,
      name: "Sophia Wilson",
      time: "8 Agustus 2024",
      src: "https://randomuser.me/api/portraits/women/6.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.",
    },
    {
      id: 7,
      name: "Sophia Wilson",
      time: "8 Agustus 2024",
      src: "https://randomuser.me/api/portraits/women/6.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.",
    },
    {
      id: 8,
      name: "Sophia Wilson",
      time: "8 Agustus 2024",
      src: "https://randomuser.me/api/portraits/women/6.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.",
    },
  ];

  const updateVisibleCards = () => {
    if (window.innerWidth < 768) {
      setVisibleCards(1);
    } else if (window.innerWidth < 1024) {
      setVisibleCards(2);
    } else if (window.innerWidth < 1280) {
      setVisibleCards(3);
    } else {
      setVisibleCards(4);
    }
  };
  

  useEffect(() => {
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex < items.length - visibleCards ? prevIndex + 1 : 0
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, visibleCards, items.length]);

  return (
    <>
    <Navigation/>
    <div className="px-32">
      <div className="flex py-6 items-center">
        <div className="w-full md:w-1/2">
        <div className="text-6xl text-[#055254] font-bold">Zen Zone</div>
        <div className="text-xl text-[#055254] font-medium">ZenZone provides a welcoming environment to discuss mental health challenges openly, offering professional guidance and community support to help you feel understood and empowered.</div>
          <div className="flex gap-4">
            <button className="rounded-md bg-leaf p-1 px-6 my-3 text-white font-medium" >
              More Details
            </button>
            <button className="rounded p-1 px-6 my-3 font-medium text-[#055254] outline outline-[#055254]" >
              Join Us
            </button>
          </div>
        </div>
        <div className=" w-full md:w-1/2 ">
          <Image
                src="/hero-image.png"
                width={800}
                height={800}
                alt="Profile picture"
                className=""
              />
          </div>
        </div>
        <div className="flex justify-center items-center flex-col py-6">
          <div className="text-4xl font-bold">Information</div>
          <div className="">Kami akan memberikan solusi dari segala penyakit mental yang anda alami</div>
        </div>
        <div className="flex pb-6">
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
            <div className="flex gap-4 pl-4">
              <div className="">
              <Image
                  src="/forums.png"
                  width={100}
                  height={50}
                  alt="Profile picture"
                  className=""
                />
              </div>
              <div>
                <div className="font-bold text-xl">Forums</div>
                <div className="text-justify">Kami menyediakan sebuah fitur Forums dimana anda bisa bertanya dan mengetahui pengalaman/saran dari orang-orang lain yang memiliki penyakit mental, anda bisa menggunakan fitur ini untuk saling berinteraksi dengan para pengguna lainnya</div>
              </div>
            </div>
            <div className="flex gap-4 pl-4">
              <div className="">
              <Image
                  src="/consouelling.png"
                  width={100}
                  height={50}
                  alt="Profile picture"
                  className=""
                />
              </div>
              <div>
                <div className="font-bold text-xl">Consouelling</div>
                <div className="text-justify">Kami menyediakan sebuah fitur Forums dimana anda bisa bertanya dan mengetahui pengalaman/saran dari orang-orang lain yang memiliki penyakit mental, anda bisa menggunakan fitur ini untuk saling berinteraksi dengan para pengguna lainnya</div>
              </div>
            </div>
            <div className="flex gap-4 pl-4">
              <div className="">
              <Image
                  src="/book.png"
                  width={100}
                  height={50}
                  alt="Profile picture"
                  className=""
                />
              </div>
              <div>
                <div className="font-bold text-xl">Diary</div>
                <div className="text-justify">Kami menyediakan sebuah fitur Forums dimana anda bisa bertanya dan mengetahui pengalaman/saran dari orang-orang lain yang memiliki penyakit mental, anda bisa menggunakan fitur ini untuk saling berinteraksi dengan para pengguna lainnya</div>
              </div>
            </div>
            <div className="flex gap-4 pl-4">
              <div className="">
              <Image
                  src="/articles.png"
                  width={100}
                  height={50}
                  alt="Profile picture"
                  className=""
                />
              </div>
              <div className="">
                <div className="font-bold text-xl">Articles</div>
                <div className="text-justify">Kami menyediakan sebuah fitur Forums dimana anda bisa bertanya dan mengetahui pengalaman/saran dari orang-orang lain yang memiliki penyakit mental, anda bisa menggunakan fitur ini untuk saling berinteraksi dengan para pengguna lainnya</div>
              </div>
            </div>
          </div>
        </div>

          <div className="flex gap-6 pb-4">
            <div className="flex flex-col justify-center w-full md:w-1/2">
              <div className="font-bold text-4xl">Forums</div>
              <div className="text-justify">Kami menyediakan sebuah fitur Forums dimana anda bisa bertanya dan mengetahui pengalaman/saran dari orang-orang lain yang memiliki penyakit mental, anda bisa menggunakan fitur ini untuk saling berinteraksi dengan para pengguna lainnya</div>
            </div>
            <div className="w-full md:w-1/2">
            <Image
                src="/forums ss.png"
                width={800}
                height={100}
                alt="Profile picture"
                className=""
              />
            </div>
          </div>

          <div className="flex gap-6 pb-4">
            <div className="flex w-full md:w-1/2 gap-2">
              <div className="">
              <Image
                src="/profile people.png"
                width={400}
                height={400}
                alt="Profile picture"
                className=""
              />
              </div>
              <div className="flex flex-col gap">
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
            <div className="flex flex-col justify-center w-full md:w-1/2">
              <div className="font-bold text-4xl">Consouelling</div>
              <div className="text-justify">Kami menyediakan sebuah fitur Forums dimana anda bisa bertanya dan mengetahui pengalaman/saran dari orang-orang lain yang memiliki penyakit mental, anda bisa menggunakan fitur ini untuk saling berinteraksi dengan para pengguna lainnya</div>
            </div>
          </div>

          <div className="flex gap-6 pb-4">
            <div className="flex flex-col justify-center w-full md:w-1/2">
              <div className="font-bold text-4xl">Diary</div>
              <div className="text-justify">Kami menyediakan sebuah fitur Forums dimana anda bisa bertanya dan mengetahui pengalaman/saran dari orang-orang lain yang memiliki penyakit mental, anda bisa menggunakan fitur ini untuk saling berinteraksi dengan para pengguna lainnya</div>
            </div>
            <div className="flex w-full md:w-1/2 gap-2">
              <div className="">
              <Image
                src="/book2.png"
                width={400}
                height={400}
                alt="Profile picture"
                className=""
              />
              </div>
              <div className="flex flex-col gap">
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

          <div className="flex gap-6 pb-4">
            <div className="flex w-full md:w-1/2 gap-2">
              <div className="relative">
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
            <div className="flex flex-col justify-center w-full md:w-1/2">
              <div className="font-bold text-4xl">Articles</div>
                <div className="text-justify">Kami menyediakan sebuah fitur Forums dimana anda bisa bertanya dan mengetahui pengalaman/saran dari orang-orang lain yang memiliki penyakit mental, anda bisa menggunakan fitur ini untuk saling berinteraksi dengan para pengguna lainnya</div>
              </div>
            </div>

              <div className="flex justify-start w-full">
                <div className="font-bold text-4xl">Feedback</div>
              </div>
              <div className="relative mx-auto text-center p-4">
                <div className="relative w-full overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${(currentIndex * 100) / visibleCards}%)`,
                    }}
                  >
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex-none px-4"
                        style={{ flexBasis: `${100 / visibleCards}%` }}
                      >
                        <div className="bg-white p-6 shadow-lg rounded-lg text-left">
                          <p className="text-gray-700">"{item.text}"</p>
                          <div className="flex items-center mb-4 my-2">
                            <img
                              className="w-10 h-10 rounded-full mr-4"
                              src={item.src}
                              alt={item.name}
                            />
                            <div>
                              <p className="font-semibold text-black">{item.name}</p>
                              <p className="text-sm text-gray-500">{item.time}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            <div className="gap-6 pb-4">
              <div className="text-4xl font-bold flex justify-center">You can also leave a feedback for us by filling the form</div>
                <div className="flex py-6">
                  <div className="flex w-full md:w-1/2 gap-2">
                    <div className="">
                    <Image
                      src="/feedback.png"
                      width={800}
                      height={800}
                      alt="Profile picture"
                      className=""
                    />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center w-full md:w-1/2">
                  <div className="text-justify">
                    feedback yang kamu berikan sangat berarti bagi kami untuk menganalisa
                    kekurangan maupun kelebihan sehingga kami bisa semakin berkembang dari
                    feedback yang telah anda kirimkan
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="rounded-md bg-leaf p-1 px-6 my-3 text-white font-medium"
                      onClick={toggleModal}
                    >
                      leave a feedback
                    </button>
                  </div>
                  <FeedbackModal isVisible={isModalVisible} onClose={toggleModal} />
                </div>
              </div>
            </div>
      </div>
    </>
  );
  
}


