import Image from "next/image";
export default function HeaderImageArticles() {
  return (
    <div className="relative">
      <Image
        src={"/topArticlesImg.png"}
        width={480}
        height={120}
        alt={`Background picture of top articles `}
        className="w-full h-72 md:h-auto rounded-lg object-cover object-center"
      />

      <div className="absolute bottom-0 w-full flex justify-center items-center">
        <div className="bg-black bg-opacity-10 text-white p-4 lg:p-20 rounded-lg">
            <h1 className="text-lg md:text-2xl lg:text-3xl lg:py-2">Featured</h1>
            <h2 className="text-sm md:text-xl font-bold lg:text-2xl lg:py-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, vel. Voluptates nobis magni eaque facere provident ex consequatur accusantium.</h2>
            <p className="text-xs md:text-lg lg:text-xl lg:py-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime fugit, beatae culpa voluptatibus asperiores et!</p>
        </div>
      </div>
    </div>
  );
}
