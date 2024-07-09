import Tooltip from '@mui/material/Tooltip';
import avatar from '../assets/chef.svg'
import goal from '../assets/goal.png';
import breakfastdiet1 from '../assets/underweight/breakfastdiet1.jpg'
import breakfastdiet2 from '../assets/underweight/breakfastdiet2.jpg'
import midmorningdiet from '../assets/underweight/midmorningsnack.jpg'
import lunchdiet1 from '../assets/underweight/lunchdiet1.jpeg'
import lunchdiet2 from '../assets/underweight/lunchdiet2.jpeg'
import afternoonsnack from '../assets/underweight/afternoonsnack.jpeg'
import dinnerdiet1 from '../assets/underweight/dinnerdiet1.jpg'
import dinnerdiet2 from '../assets/underweight/dinnerdiet2.jpeg'
import dinnerdiet3 from '../assets/underweight/dinnerdiet3.jpeg'
import eveningsnack from '../assets/underweight/eveningsnack.jpeg'
const UnderweightDiet = () => {
    return (
        <>
            <div className="p-3 w-full  flex flex-row items-center justify-between">
                <div className="flex flex-col">
                    <h2 className="text-3xl font-bold text-orange-500 dark:text-white">Diet Category : Underweight</h2>
                </div>
                <div className="flex flex-row">
                    <Tooltip title="Notifications">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" className="text-orange-500 dark:text-white cursor-pointer" fill="none">
                            <path d="M2.52992 14.7696C2.31727 16.1636 3.268 17.1312 4.43205 17.6134C8.89481 19.4622 15.1052 19.4622 19.5679 17.6134C20.732 17.1312 21.6827 16.1636 21.4701 14.7696C21.3394 13.9129 20.6932 13.1995 20.2144 12.5029C19.5873 11.5793 19.525 10.5718 19.5249 9.5C19.5249 5.35786 16.1559 2 12 2C7.84413 2 4.47513 5.35786 4.47513 9.5C4.47503 10.5718 4.41272 11.5793 3.78561 12.5029C3.30684 13.1995 2.66061 13.9129 2.52992 14.7696Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 19C8.45849 20.7252 10.0755 22 12 22C13.9245 22 15.5415 20.7252 16 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Tooltip>
                </div>
            </div>
            <div className="flex flex-row px-4 py-2 bg-orange-500 w-full rounded-lg items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl md:text-3xl font-medium text-gray-100">Hello <span className="font-bold">Mr. WellnessBuddy Chef </span>here ,</h2>
                    <span className="text-md md:text-xl font-medium text-white">I&apos;m Your Diet Planner</span>
                </div>
                <div className="flex flex-col">
                    <img src={avatar} width={200} alt="avatar"/>
                </div>
            </div>

            <div className='px-4 py-2 flex flex-col gap-6'>
                <div className='flex flex-row gap-2 items-center'>
                    <img src={goal} width={100} alt="goal"/>

                    <div className='p-2 bg-slate-100 dark:bg-slate-600 rounded-lg shadow-lg shadow-gray-400 dark:shadow-none'>
                        <span className='text-lg font-medium text-black dark:text-white'>Gain weight healthily by incorporating nutrient-dense and calorie-rich foods.</span>
                    </div>
                </div>

                <div className='flex flex-col'>
                    <span className='text-2xl font-medium text-black dark:text-white'>Breakfast</span>

                    <div className="flex flex-col md:flex-row gap-4 py-4">
                        <div className="overweightdiet1 flex flex-col w-[50%]">
                            <img src={breakfastdiet1} width={300} className='rounded-lg' alt="diet1"/>
                            <span className='px-4 py-4 w-[50vh] text-wrap text-lg font-medium text-black dark:text-white'>Smoothie with whole milk, banana, peanut butter, and spinach.</span>
                        </div>
                        <div className="overweightdiet1 flex flex-col w-[50%]">
                            <img src={breakfastdiet2} width={300} className='rounded-lg' alt="diet1"/>
                            <span className='px-4 py-4 w-[50vh] text-wrap text-lg font-medium text-black dark:text-white'>Whole-grain toast with avocado and a poached egg.</span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='text-2xl font-medium text-black dark:text-white'>Mid-Morning Snack</span>

                    <div className="flex flex-col md:flex-row gap-4 py-4">
                        <div className="overweightdiet1 flex flex-col w-[50%]">
                            <img src={midmorningdiet} width={300} className='rounded-lg' alt="diet1"/>
                            <span className='px-4 py-4 w-[50vh] text-wrap text-lg font-medium text-black dark:text-white'>Trail mix with nuts, seeds, and dried fruit.</span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='text-2xl font-medium text-black dark:text-white'>Lunch</span>

                    <div className="flex flex-col md:flex-row gap-4 py-4">
                        <div className="overweightdiet1 flex flex-col w-[50%]">
                            <img src={lunchdiet1} width={300} className='rounded-lg' alt="diet1"/>
                            <span className='px-4 py-4 w-[50vh] text-wrap text-lg font-medium text-black dark:text-white'>Turkey or chickpea sandwich on whole-grain bread with avocado, lettuce, and tomato.</span>
                        </div>
                        <div className="overweightdiet1 flex flex-col w-[50%]">
                            <img src={lunchdiet2} width={300} className='rounded-lg' alt="diet1"/>
                            <span className='px-4 py-4 w-[50vh] text-wrap text-lg font-medium text-black dark:text-white'>Sweet potato fries.</span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='text-2xl font-medium text-black dark:text-white'>Afternoon Snack</span>
                    
                    <div className="flex flex-col md:flex-row gap-4 py-4">
                        <div className="overweightdiet1 flex flex-col w-[50%]">
                            <img src={afternoonsnack} width={300} className='rounded-lg' alt="diet1"/>
                            <span className='px-4 py-4 w-[50vh] text-wrap text-lg font-medium text-black dark:text-white'>Cheese and whole-grain crackers.</span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='text-2xl font-medium text-black dark:text-white'>Dinner</span>

                    <div className="flex flex-col md:flex-row gap-4 py-4">
                        <div className="overweightdiet1 flex flex-col w-[50%]">
                            <img src={dinnerdiet1} width={300} className='rounded-lg' alt="diet1"/>
                            <span className='px-4 py-4 w-[50vh] text-wrap text-lg font-medium text-black dark:text-white'>Beef stir-fry with vegetables.</span>
                        </div>
                        <div className="overweightdiet1 flex flex-col w-[50%]">
                            <img src={dinnerdiet2} width={300} className='rounded-lg' alt="diet1"/>
                            <span className='px-4 py-4 w-[50vh] text-wrap text-lg font-medium text-black dark:text-white'>Brown rice or noodles.</span>
                        </div>
                        <div className="overweightdiet1 flex flex-col w-[50%]">
                            <img src={dinnerdiet3} width={300} className='rounded-lg' alt="diet1"/>
                            <span className='px-4 py-4 w-[50vh] text-wrap text-lg font-medium text-black dark:text-white'>A side of mixed greens with olive oil dressing.</span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='text-2xl font-medium text-black dark:text-white'>Evening Snack</span>

                    <div className="flex flex-col md:flex-row gap-4 py-4">
                        <div className="overweightdiet1 flex flex-col w-[50%]">
                            <img src={eveningsnack} width={300} className='rounded-lg' alt="diet1"/>
                            <span className='px-4 py-4 w-[50vh] text-wrap text-lg font-medium text-black dark:text-white'>Cottage cheese with fresh fruit or honey.</span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-4 bg-slate-100 dark:bg-slate-600 px-4 py-2 rounded-xl shadow-lg shadow-gray-500 dark:shadow-none'>
                    <span className='text-xl font-medium text-black dark:text-white'>Note :</span>

                    <span className='font-medium text-lg text-black dark:text-white'>These diets are general suggestions. Individual needs may vary based on factors such as age, gender, activity level, and medical conditions. Always consult with a healthcare provider or registered dietitian for personalized dietary advice.</span>
                </div>
            </div>
        </>
    )
}

export default UnderweightDiet
