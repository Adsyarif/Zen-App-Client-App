import CarouselReviewCard from "@/components/carouselReviewCard";


export default function test() {
    return (
        <div className="bg-[#FAF6E3] h-screen w-screen">
            <h1 className="text-red-600">Profile</h1>
            <p className="text-red-600">Penjelasan</p>
            <h1 className="text-2xl text-black font-bold ">Review</h1>
            <CarouselReviewCard />
        </div>
    )
}