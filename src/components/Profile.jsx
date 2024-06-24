import Sidebar from "./Sidebar.jsx";
import { useEffect , useState,useCallback } from 'react';
import axios from "../axiosConfig";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tooltip from '@mui/material/Tooltip';
const Profile = () => {
    const history = useNavigate();
    axios.defaults.withCredentials = true;
    const [userData,setUserData] = useState({
        firstName:'',
        lastName:'',
        gender:'',
        age:'',
        mobileno:'',
        address:'',
        weight:'',
        height:'',
        bmivalue:'',
        diettype:'',
        language:''
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({...userData,[name]: value});
    };
    const calculateBMI = (weightKg, heightM) => {
        if (heightM <= 0) {
            throw new Error('Height must be greater than zero.');
        }
        let bmi = weightKg / (heightM * heightM);
        return bmi;
    };
    const handleBMICalculate = () => {
        try {
            // Parse weight and height inputs
            let weightKg = parseFloat(userData.weight);
            let heightM = parseFloat(userData.height) * 0.0254; // Convert inches to meters
    
            // Validate input values
            if (isNaN(weightKg) || isNaN(heightM) || weightKg <= 0 || heightM <= 0) {
                throw new Error('Invalid weight or height');
            }
    
            // Calculate BMI
            let bmiValue = calculateBMI(weightKg, heightM);
            let bmiCategory = '';
            if (bmiValue < 18.5) {
                bmiCategory = 'Underweight';
            } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
                bmiCategory = 'Normal Weight';
            } else if (bmiValue >= 25 && bmiValue <= 29.99) {
                bmiCategory = 'Overweight';
            } else if (bmiValue >= 30) {
                bmiCategory = 'Obesity';
            }
            if (!isNaN(bmiValue)) {
                setUserData((prevState) => ({
                    ...prevState,
                    bmivalue: bmiValue.toFixed(2).toString(),
                    diettype: bmiCategory
                }));
            } else {
                throw new Error('Invalid BMI calculation result');
            }
        } catch (error) {
            console.log(error);
            toast.error('Error calculating BMI');
        }
    };    
    const handleSubmit = async (e) => {
        let dataToSend;
        e.preventDefault();
        dataToSend = userData;
        try {
            const res = await axios.post("/updatedata",dataToSend);
            if(res.status==201) {
                toast.success('Profile Updated Successfully');
                setTimeout(() => {
                    history(`/Profile`);
                }, 2000);
            }
            else {
                toast.error('Registration Failed');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const callDashboardPage = useCallback(async () => {
        try {
            const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\s*([^;]*).*$)|^.*$/, '$1');

            const res = await axios.get("/profile",{
                headers:{
                    'jwtoken':cookieValue
                }
            });
            const data = res.data;
            setUserData(data);
            if(res.status !== 200) {
                throw new Error(`Request failed with status ${res.status}`);
            }
            else {
                toast.info(`Welcome ${data.firstName} ${data.lastName}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    closeButton: false,
                    hideProgressBar: false,
                    className: 'bg-white text-blue-500 dark:text-white dark:bg-slate-600 font-bold',
                });
            }
        }
        catch(err) {
            history('/');
        }

        
    },[history]);
    useEffect(() => {
        callDashboardPage();
    },[callDashboardPage]);
    return (
        <>
            <div className="flex flex-col md:flex-row min-h-screen bg-slate-100 dark:bg-slate-800">
                <ToastContainer autoClose={1000}/>
                <div className="p-5">
                    <Sidebar/>
                </div>
                <div className="p-5 w-full flex flex-col h-auto gap-4">
                    <div className="p-3 w-full flex flex-row items-center justify-between">
                        <div className="flex flex-col">
                            <h2 className="text-4xl font-bold text-orange-500 dark:text-white">Profile</h2>
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
                    <div className="flex flex-row items-center justify-center w-full">
                        <div className="w-[50%] flex flex-col items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-orange-500 dark:text-white" viewBox="0 0 24 24" width="250" height="250" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M7.5 17C9.8317 14.5578 14.1432 14.4428 16.5 17M14.4951 9.5C14.4951 10.8807 13.3742 12 11.9915 12C10.6089 12 9.48797 10.8807 9.48797 9.5C9.48797 8.11929 10.6089 7 11.9915 7C13.3742 7 14.4951 8.11929 14.4951 9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <form onSubmit={handleSubmit} className="p-5 flex flex-col items-center justify-center gap-4 w-[50%]">
                            <div className="flex flex-row gap-4 w-full">
                                <input type="text" name="firstName" placeholder="First Name" className="px-4 py-2 outline-none rounded-md w-[50%] bg-white dark:bg-slate-600 border-2 border-orange-500 dark:border-none text-black dark:text-white" value={userData.firstName} onChange={handleInputChange}/>

                                <input type="text" name="lastName" className="px-4 py-2 outline-none rounded-md w-[50%] bg-white dark:bg-slate-600 border-2 border-orange-500 dark:border-none text-black dark:text-white" placeholder="Last Name" value={userData.lastName} onChange={handleInputChange}/>
                            </div>
                            <div className="flex flex-row gap-4 w-full">
                                <input type="text" name="gender" placeholder="Gender" className="px-4 py-2 outline-none rounded-md w-[50%] bg-white dark:bg-slate-600 border-2 border-orange-500 dark:border-none text-black dark:text-white" value={userData.gender} onChange={handleInputChange}/>

                                <input type="text" name="age" className="px-4 py-2 outline-none rounded-md w-[50%] bg-white dark:bg-slate-600 border-2 border-orange-500 dark:border-none text-black dark:text-white" placeholder="Age" value={userData.age} onChange={handleInputChange}/>
                            </div>
                            <div className="flex flex-row gap-4 w-full">
                                <input type="text" name="mobileno" placeholder="Mobile Number" className="px-4 py-2 outline-none rounded-md w-[50%] bg-white dark:bg-slate-600 border-2 border-orange-500 dark:border-none text-black dark:text-white" value={userData.mobileno} onChange={handleInputChange}/>

                                <input type="text" name="address" className="px-4 py-2 outline-none rounded-md w-[50%] bg-white dark:bg-slate-600 border-2 border-orange-500 dark:border-none text-black dark:text-white" placeholder="Address" value={userData.address} onChange={handleInputChange}/>
                            </div>
                            <div className="flex flex-row gap-4 w-full">
                                <input type="text" name="weight" placeholder="Weight" className="px-4 py-2 outline-none rounded-md w-[50%] bg-white dark:bg-slate-600 border-2 border-orange-500 dark:border-none text-black dark:text-white" value={userData.weight} onChange={handleInputChange}/>

                                <input type="text" name="height" className="px-4 py-2 outline-none rounded-md w-[50%] bg-white dark:bg-slate-600 border-2 border-orange-500 dark:border-none text-black dark:text-white" placeholder="Height (In Inches)" value={userData.height} onChange={handleInputChange}/>
                            </div>
                            <div className="flex flex-row gap-4 w-full">
                                <input type="text" name="bmivalue" placeholder="BMI Value" className="px-4 py-2 outline-none rounded-md w-[50%] bg-white dark:bg-slate-600 border-2 border-orange-500 dark:border-none text-black dark:text-white" value={userData.bmivalue} onChange={handleInputChange}/>

                                <input type="text" name="diettype" className="px-4 py-2 outline-none rounded-md w-[50%] bg-white dark:bg-slate-600 border-2 border-orange-500 dark:border-none text-black dark:text-white" placeholder="Diet Type" value={userData.diettype} onChange={handleInputChange}/>

                                <button type="button" className="bg-orange-500 px-4 py-2 w-[50%] text-white font-bold rounded-md cursor-pointer" onClick={handleBMICalculate}>Calculate BMI</button>
                            </div>
                            <div className="flex flex-row gap-4 w-full items-center">
                                <label className="text-xl font-bold text-black dark:text-white">Your Diet Language</label>
                                <select className="px-4 py-2 outline-none rounded-md w-[50%] bg-white dark:bg-slate-600 border-2 border-orange-500 dark:border-none text-black dark:text-white" name="language" value={userData.language} onChange={handleInputChange}>
                                    <option value="English">English</option>
                                    <option value="Hindi">Hindi</option>
                                </select>

                            </div>
                            <div className="flex flex-row gap-4 w-full">
                                <input type="submit" name="s1" value="Update Profile" className="bg-orange-500 px-4 py-2 w-full text-white font-bold rounded-md cursor-pointer"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Profile