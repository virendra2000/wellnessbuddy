import logo1 from '../assets/logo.png'
import logo2 from '../assets/logo3.png'
import bg1 from '../assets/bgimg2.jpg'
import DarkModeButton from '../components/DarkModeButton'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "../axiosConfig";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Home = () => {
    const history = useNavigate();
    const [userData, setUserData] = useState({
        email:'',
        password:'',
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
            const res = await axios.post("/Login",dataToSend);
            if(res.status==201) {
                console.log(res.headers);
                Cookies.set('jwtoken',res.headers['jwtoken'],{ expires: 2, path: '/' });
                toast.success('Login Successfully & Account Verified');
                setTimeout(() => {
                    history("/Dashboard");
                }, 2000);
            }
            else {
                toast.error('Login Failed');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="flex flex-row min-h-screen bg-slate-100 dark:bg-slate-800">
                <ToastContainer autoClose={1000}/>
                <div className="w-[50%] hidden md:block">
                    <img src={bg1} width={435} height={100} alt="bg"/>
                </div>
                <div className="w-full md:w-[50%] px-5 py-5 flex flex-col items-center justify-center">
                    <div className="p-3 flex flex-row items-center">
                        <img src={logo1} className="hidden dark:block" width={60} height={60} alt="logo"/>
                        <img src={logo2} className="block dark:hidden" width={60} height={60} alt="logo"/>
                        <h2 className="text-4xl font-bold text-orange-400">WellnessBuddy</h2>
                    </div>
                    <form onSubmit={handleSubmit} name="f1" className="w-full md:w-[80%] flex flex-col px-5 py-5 gap-6 bg-slate-100 dark:bg-slate-600 rounded-xl shadow-lg dark:shadow-none shadow-gray-400">
                        <h1 className="py-5 text-3xl font-bold text-orange-500 dark:text-white">Sign In</h1>
                        
                        <input type="email" name="email" placeholder="Email" id="emailid" className="px-4 py-2 w-full bg-transparent border-b-2 border-orange-500 outline-none placeholder-black dark:placeholder-white font-bold text-orange-500 dark:text-white" value={userData.email} onChange={handleInputChange}/>

                        <input type="password" name="password" placeholder="Password" id="password" className="px-4 py-2 w-full bg-transparent border-b-2 border-orange-500 outline-none placeholder-black dark:placeholder-white font-bold text-orange-500 dark:text-white" value={userData.password} onChange={handleInputChange}/>
                    
                        <a href="/forgotpassword" className="text-black dark:text-white text-right font-bold">Forgot Password ?</a>
                        <input type="submit" value="Sign In" name="s1" className="bg-orange-500 px-4 py-2 font-bold text-white rounded-lg cursor-pointer"/>

                        <label className="text-center font-bold text-black dark:text-white">Don&apos;t have an Account ? <a href="/register" className="text-orange-500">Create An Account</a></label>
                    </form>
                </div>
                <DarkModeButton/>
            </div>
        </>
    )
}
export default Home