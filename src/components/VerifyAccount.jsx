import logo1 from '../assets/logo.png'
import DarkModeButton from './DarkModeButton'
import { useLocation } from 'react-router-dom';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "../axiosConfig";
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const VerifyAccount = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const emailadd = queryParams.get('email');
    const history = useNavigate();
    axios.defaults.withCredentials = true;
    const [userData,setUserData] = useState({
        email:emailadd,
        code:''
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({...userData,[name]: value});
    };
    const handleSubmit = async (e) => {
        let dataToSend;
        e.preventDefault();
        dataToSend = userData;
        try {
            const res = await axios.post("/verifyotp",dataToSend) ;
            if(res.status==201) {
                toast.success('Account Verified Successfully');
                setTimeout(() => {
                    history("/");
                }, 2000);
            }
            else {
                toast.error('Verification Failed');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="verifypage flex flex-row h-[100vh]">
                <ToastContainer autoClose={1000}/>
                <div className="w-full md:w-[50%] px-5 py-10 flex flex-col items-center justify-center">
                    <div className="p-5 flex flex-row items-center">
                        <img src={logo1} width={60} height={60} alt="logo"/>
                        <h2 className="text-4xl font-bold text-orange-400">WellnessBuddy</h2>
                    </div>
                    <form name="f1" onSubmit={handleSubmit} className="w-full md:w-[80%] flex flex-col px-5 py-5 gap-6 bg-slate-100 dark:bg-slate-600 rounded-xl shadow-lg dark:shadow-none shadow-gray-400">
                        <h1 className="py-5 text-3xl font-bold text-orange-500 dark:text-white">Verify Account</h1>
                        <p className="mb-4 text-green-500 dark:text-white font-bold text-center">An OTP has been sent to your email {userData.email}. Please check your email and enter the OTP below.</p>
                        <input type="text" name="code" placeholder="Enter One Time Password" id="verifycode" className="px-4 py-2 w-full bg-transparent border-b-2 border-orange-500 outline-none placeholder-black dark:placeholder-white font-bold text-orange-500 dark:text-white" value={userData.code} onChange={handleInputChange}/>

                        <input type="submit" value="Change Password" name="s1" className="bg-orange-500 px-4 py-2 font-bold text-white rounded-lg cursor-pointer"/>
                    </form>
                </div>
                <DarkModeButton/>
            </div>
        </>
    )
}
export default VerifyAccount