import logo1 from '../assets/logo.png'
import useDarkMode from '../constants/useDarkMode'
import Tooltip from '@mui/material/Tooltip';
import axios from "../axiosConfig";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect , useState,useCallback } from 'react';
import profile1 from '../assets/man.png';
import profile2 from '../assets/woman.png';
const Sidebar = () => {
    const [colorTheme, setTheme] = useDarkMode();
    axios.defaults.withCredentials = true;
    const history = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender,setGenderData] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const callLogoutPage = async () => {
        try {
            const res = await axios.get("/logout");
            document.cookie = `jwtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            if (res.status == 200) {
                toast.success('Logout Successfully',{
                    position: toast.POSITION.TOP_CENTER,
                    closeButton: false,
                    hideProgressBar: false,
                    className: 'bg-white text-green-500 dark:text-white dark:bg-slate-600 font-bold',
                });
                setTimeout(() => {
                    history('/', {replace:true});
                }, 2000);
            }
            else {
                throw new Error(`Request failed with status ${res.status}`);
            }
        }
        catch(err) {
            console.log(err);
            history('/');
        }
    }
    const callDashboardPage = useCallback(async () => {
        try {
            const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\s*([^;]*).*$)|^.*$/, '$1');

            const res = await axios.get("/dashboard",{
                headers:{
                    'jwtoken':cookieValue
                }
            });
            const data = res.data;
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setGenderData(data.gender);
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
    useEffect(() => {
        // Set image URL based on the gender
        if (gender === 'Male' || gender==='male') {
            setImageUrl(profile1);
        }
        else {
            setImageUrl(profile2);
        }
    }, [gender]);
    return (
        <>
            <div className="flex flex-row md:flex-col items-center justify-between h-auto md:h-full w-full bg-orange-500 p-2 rounded-lg shadow-lg shadow-gray-500 dark:shadow-none">
                <ToastContainer autoClose={1000}/>
                <div className="p-3 flex flex-row items-center">
                    <img src={logo1} className="w-[30px] md:w-[60px]" alt="logo"/>
                    {/* <img src={logo2} className="block dark:hidden w-[30px] md:w-[60px]" alt="logo"/> */}
                </div>
                <div className='flex flex-row md:flex-col items-center justify-start h-full gap-4'>
                    <div className='flex items-center justify-center'>
                        <a href="/Dashboard">
                            <Tooltip title="Dashboard">
                                <svg className="text-white w-[24px] md:w-[42px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                    <path d="M2 18C2 16.4596 2 15.6893 2.34673 15.1235C2.54074 14.8069 2.80693 14.5407 3.12353 14.3467C3.68934 14 4.45956 14 6 14C7.54044 14 8.31066 14 8.87647 14.3467C9.19307 14.5407 9.45926 14.8069 9.65327 15.1235C10 15.6893 10 16.4596 10 18C10 19.5404 10 20.3107 9.65327 20.8765C9.45926 21.1931 9.19307 21.4593 8.87647 21.6533C8.31066 22 7.54044 22 6 22C4.45956 22 3.68934 22 3.12353 21.6533C2.80693 21.4593 2.54074 21.1931 2.34673 20.8765C2 20.3107 2 19.5404 2 18Z" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M14 18C14 16.4596 14 15.6893 14.3467 15.1235C14.5407 14.8069 14.8069 14.5407 15.1235 14.3467C15.6893 14 16.4596 14 18 14C19.5404 14 20.3107 14 20.8765 14.3467C21.1931 14.5407 21.4593 14.8069 21.6533 15.1235C22 15.6893 22 16.4596 22 18C22 19.5404 22 20.3107 21.6533 20.8765C21.4593 21.1931 21.1931 21.4593 20.8765 21.6533C20.3107 22 19.5404 22 18 22C16.4596 22 15.6893 22 15.1235 21.6533C14.8069 21.4593 14.5407 21.1931 14.3467 20.8765C14 20.3107 14 19.5404 14 18Z" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M2 6C2 4.45956 2 3.68934 2.34673 3.12353C2.54074 2.80693 2.80693 2.54074 3.12353 2.34673C3.68934 2 4.45956 2 6 2C7.54044 2 8.31066 2 8.87647 2.34673C9.19307 2.54074 9.45926 2.80693 9.65327 3.12353C10 3.68934 10 4.45956 10 6C10 7.54044 10 8.31066 9.65327 8.87647C9.45926 9.19307 9.19307 9.45926 8.87647 9.65327C8.31066 10 7.54044 10 6 10C4.45956 10 3.68934 10 3.12353 9.65327C2.80693 9.45926 2.54074 9.19307 2.34673 8.87647C2 8.31066 2 7.54044 2 6Z" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M14 6C14 4.45956 14 3.68934 14.3467 3.12353C14.5407 2.80693 14.8069 2.54074 15.1235 2.34673C15.6893 2 16.4596 2 18 2C19.5404 2 20.3107 2 20.8765 2.34673C21.1931 2.54074 21.4593 2.80693 21.6533 3.12353C22 3.68934 22 4.45956 22 6C22 7.54044 22 8.31066 21.6533 8.87647C21.4593 9.19307 21.1931 9.45926 20.8765 9.65327C20.3107 10 19.5404 10 18 10C16.4596 10 15.6893 10 15.1235 9.65327C14.8069 9.45926 14.5407 9.19307 14.3467 8.87647C14 8.31066 14 7.54044 14 6Z" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            </Tooltip>
                        </a>
                    </div>
                    <div className='flex items-center justify-center'>
                        <Tooltip title="Create Post">
                        <svg xmlns="http://www.w3.org/2000/svg" className='text-white w-[24px] md:w-[42px]' viewBox="0 0 24 24" fill="none">
                            <path d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M4.64856 5.07876C4.7869 4.93211 4.92948 4.7895 5.0761 4.65111M7.94733 2.72939C8.12884 2.6478 8.31313 2.57128 8.5 2.5M2.5 8.5C2.57195 8.31127 2.64925 8.12518 2.73172 7.94192" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 8V16M16 12L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        </Tooltip>
                    </div>
                    <div className='flex items-center justify-center'>
                        <a href="/Profile">
                            <Tooltip title="Profile">
                                <svg xmlns="http://www.w3.org/2000/svg" className='text-white w-[24px] md:w-[42px]' viewBox="0 0 24 24" width="42" height="42" fill="none">
                                    <path d="M7.78256 17.1112C6.68218 17.743 3.79706 19.0331 5.55429 20.6474C6.41269 21.436 7.36872 22 8.57068 22H15.4293C16.6313 22 17.5873 21.436 18.4457 20.6474C20.2029 19.0331 17.3178 17.743 16.2174 17.1112C13.6371 15.6296 10.3629 15.6296 7.78256 17.1112Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15.5 10C15.5 11.933 13.933 13.5 12 13.5C10.067 13.5 8.5 11.933 8.5 10C8.5 8.067 10.067 6.5 12 6.5C13.933 6.5 15.5 8.067 15.5 10Z" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M2.854 16C2.30501 14.7664 2 13.401 2 11.9646C2 6.46129 6.47715 2 12 2C17.5228 2 22 6.46129 22 11.9646C22 13.401 21.695 14.7664 21.146 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </Tooltip>
                        </a>
                    </div>
                    <div className='flex items-center justify-center'>
                        <a href="/ViewDiet"><Tooltip title="View Diet">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='text-white w-[24px] md:w-[42px]' fill="none">
                            <path d="M16.5 7C18.6111 8.09821 20.1802 9.94542 20.7578 12.1376C21.5 12.1376 22 13.1645 22 14.0106C22 16.3424 18.5658 16.7405 18 14.5165C17.4968 16.4945 14.5032 16.4945 14 14.5165C13.4968 16.4945 10.5032 16.4945 10 14.5165C9.49677 16.4945 6.50323 16.4945 6 14.5165C5.43417 16.7405 2 16.3424 2 14.0106C2 13.1645 2.5 12.1376 3.24224 12.1376C3.81984 9.94542 5.38887 8.09821 7.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 4C13.1046 4 14 4.89543 14 6C14 7.10457 13.1046 8 12 8C10.8954 8 10 7.10457 10 6C10 4.89543 10.8954 4 12 4ZM12 4C12 3.5 12.4 2.4 14 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14.5 10.5L15 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.5 10.5L9 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3.5 16L4.13246 17.8974C4.79247 19.8774 5.12248 20.8675 5.90815 21.4337C6.69381 22 7.73739 22 9.82456 22H14.1754C16.2626 22 17.3062 22 18.0919 21.4337C18.8775 20.8675 19.2075 19.8774 19.8675 17.8974L20.5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        </Tooltip></a>
                    </div>
                    <div className='flex items-center justify-center'>
                        <Tooltip title="Theme">
                        {colorTheme === "light" ? (
                            <svg
                                onClick={() => setTheme("light")}
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-white block cursor-pointer w-[24px] md:w-[42px]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                        </svg>
                        ) : (
                            <svg
                            onClick={() => setTheme("dark")}
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-white block cursor-pointer w-[24px] md:w-[42px]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                            />
                        </svg>
                    )}
                    </Tooltip>
                    </div>
                    <div className='flex items-center justify-center'>
                        <button onClick={callLogoutPage}><Tooltip title="Log Out">
                        <svg className="text-white w-[24px] md:w-[42px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                            <path d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.987 10.2401 20.8194 9.05112 20.484C6.18961 19.6768 3.70555 18.3203 3.10956 15.2815C3 14.723 3 14.0944 3 12.8373L3 11.1627C3 9.90561 3 9.27705 3.10956 8.71846C3.70555 5.67965 6.18961 4.32316 9.05112 3.51603C10.2401 3.18064 10.8346 3.01295 11.3156 3.00119C13.3831 2.95061 14.9264 4.52307 15 6.37501" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M21 12H10M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        </Tooltip>
                        </button>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <Tooltip title={firstName && lastName ? `${firstName} ${lastName}` : ''}>
                        {imageUrl && <img src={imageUrl} alt="Profile" />}
                    </Tooltip>
                </div>
            </div>
        </>
    )
}
export default Sidebar
