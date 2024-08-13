import { useState } from 'react';
import { FaPlus } from "react-icons/fa";

const moodPick = {
    1: 'Happy',
    2: 'Sad',
    3: 'Excited',
    4: 'Angry',
    5: 'Anxious',
    6: 'Content'
};

const dummyDiaryList = [
    {
        id: 1,
        created_at: '2024-08-10T10:00:00Z',
        mood_id: 1,
        content: 'Had a great day today! Everything went perfectly.',
    },
    {
        id: 2,
        created_at: '2024-08-11T14:30:00Z',
        mood_id: 2,
        content: 'Feeling a bit down. Things didn’t go as planned.',
    },
    {
        id: 3,
        created_at: '2024-08-12T08:15:00Z',
        mood_id: 3,
        content: 'Excited about the new project I’m working on!',
    },
    {
        id: 4,
        created_at: '2024-08-13T18:45:00Z',
        mood_id: 4,
        content: 'hari ini hari senin, senin itu adalah hari',
    },
];

const DiaryCard = () => {
    const [diaryList, setDiaryList] = useState(dummyDiaryList);
    const handleClick = (id:number) => {
        console.log(`Diary card with ID ${id} clicked`)
    }

    // useEffect(() => {
    //     const fetchDiaryList = async () => {
    //         try {
    //             const response = await axios.get(`${API_BASE}diary`)
    //             result.push(response.data)
    //         } catch (error) {
    //             console.error("fetch diary list failed:", error);
    //         }
    //     }
    //     fetchDiaryList();
    // }, []);

    return (
        <div className="flex flex-col gap-2 bg-[#22543D] w-1/2 text-lg font-semibold text-center items-center rounded-lg p-6 h-auto">
            <div className="flex justify-between w-full">
                <p className="text-white text-2xl">My Diary List</p>
                <a href="/DiaryEntryPage" className="text-2xl align-center"><FaPlus style={{ color: 'white', fontSize: '24px' }}/></a>
            </div>
            <div className="w-full">
                {diaryList.map(diary => (
                    <div key={diary.id} onClick={() => handleClick(diary.id)} className="diary-card bg-white shadow-md rounded-lg p-4 m-4">
                        <div className="flex justify-between m-2">
                            <div className="text-[#22543D] font-bold">
                                Mood: {moodPick[diary.mood_id as keyof typeof moodPick]}
                            </div>
                            <div className="text-[#22543D] font-bold">
                                {new Date(diary.created_at).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="m-2 font-normal text-black">
                            {diary.content}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DiaryCard;