import Image from "next/image";
export default function HomePage() {

  
  
  return (
    <>
    <div className="px-32">
      <div className="flex py-6 items-center">
        <div className="w-full md:w-1/2">
        <div className="text-6xl text-[#055254] font-bold">Zen Zone</div>
        <div className="text-xl text-[#055254] font-medium">ZenZone provides a welcoming environment to discuss mental health challenges openly, offering professional guidance and community support to help you feel understood and empowered.</div>
          <div className="object-bottom">
            <button className="rounded-md bg-leaf p-1 px-6 my-3 text-white font-medium" >
              More Details
            </button>
            <button className="rounded outline-1 outline-[#055254] p-1 px-6 my-3 font-medium text-[#055254]" >
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
                  width={50}
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
                  width={50}
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
                  width={50}
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
                  width={50}
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

            <div className="flex gap-6 pb-4">
              <div className="flex flex-col justify-center w-full md:w-1/2">
                <div className="font-bold text-4xl">Feedback</div>
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
                  <div className="text-justify">feedback yang kamu berikan sangat berarti bagi kami untuk menganalisa kekukarang maupun kelebihan sehingga kami bisa semakin berkembang dari feedback yang telah anda kirimkan</div>
                  <div className="flex justify-center">
                    <button className="rounded-md bg-leaf p-1 px-6 my-3 text-white font-medium" >
                      leave a feedback
                    </button>
                  </div>
                </div>
              </div>
            </div>
      </div>
    </>
  );
}
