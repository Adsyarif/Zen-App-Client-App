import { Navigation } from '@/components/common';
import DiaryCard from '@/components/diary_card';

const Diary = () => {
    return (
        <>

            <Navigation/>
            <div className="flex justify-center m-10 ">
                <DiaryCard />
            </div>
        </>
        
    )
}

export default Diary;