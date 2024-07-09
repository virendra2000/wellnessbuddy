import Sidebar from "./Sidebar.jsx";
import { useEffect , useState,useCallback } from 'react';
import axios from "../axiosConfig";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import avatar from '../assets/dashboard_avatar.svg'
import avatar1 from '../assets/avatar.svg'
import Tooltip from '@mui/material/Tooltip';
const Dashboard = () => {
    const history = useNavigate();
    axios.defaults.withCredentials = true;
    const now = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(now);
    const [userData,setUserData] = useState({
        firstName:'',
        lastName:'',
        gender:'',
        age:'',
        mobileno:'',
        address:'',
    });
    const callDashboardPage = useCallback(async () => {
        try {
            const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\s*([^;]*).*$)|^.*$/, '$1');

            const res = await axios.get("/dashboard",{
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
                <div className="p-5 h-auto md:h-screen overflow-y-auto">
                    <Sidebar/>
                </div>
                <div className="p-5 w-full flex flex-col h-screen overflow-y-auto gap-4">
                    <div className="p-3 w-full flex flex-row items-center justify-between">
                        <div className="flex flex-col">
                            <h2 className="text-3xl font-bold text-orange-500 dark:text-white">Dashboard</h2>
                            <span className="text-slate-800 dark:text-slate-100 text-xl font-semibold">{formattedDate}</span>
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
                    <div className="flex flex-row p-2 bg-orange-500 w-full rounded-lg items-center justify-between">
                        <div className="flex flex-col">
                            <img src={avatar1} width={200} alt="avatar"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h2 className="text-xl md:text-3xl font-medium text-gray-100">Welcome Back , <span className="font-bold">{userData.firstName} {userData.lastName}</span></h2>
                            <span className="text-md md:text-xl font-medium text-white">Have a nice day at work</span>
                        </div>
                        <div className="flex flex-col">
                            <img src={avatar} width={160} alt="avatar"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Dashboard
