import logo1 from '../assets/logo.png'
import logo2 from '../assets/logo3.png'
import bg1 from '../assets/bgimg1.jpg'
import DarkModeButton from '../components/DarkModeButton'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "../axiosConfig";
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Register = () => {
    const history = useNavigate();
    axios.defaults.withCredentials = true;
    const generateRandomCode = () => {
        return Math.floor(100000 + Math.random() * 900000);
    };
    const [userData,setUserData] = useState({
        firstName:'',
        lastName:'',
        gender:'',
        age:'',
        mobileno:'',
        address:'',
        email:'',
        password:'',
        code:generateRandomCode(),
        status:'Pending'
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
            const res = await axios.post("/Register",dataToSend);
            if(res.status==201) {
                toast.success('Registered Successfully');
                setTimeout(() => {
                    history(`/verifyaccount?email=${dataToSend.email}`);
                }, 2000);
            }
            else {
                toast.error('Registration Failed');
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
                    <img src={bg1} width={435} height={90} alt="bg"/>
                </div>
                <div className="w-full md:w-[50%] px-5 py-5 flex flex-col items-center justify-center">
                    <div className="p-3 flex flex-row items-center">
                        <img src={logo1} className="hidden dark:block" width={60} height={60} alt="logo"/>
                        <img src={logo2} className="block dark:hidden" width={60} height={60} alt="logo"/>
                        <h2 className="text-4xl font-bold text-orange-400">WellnessBuddy</h2>
                    </div>
                    <form onSubmit={handleSubmit} name="f1" className="w-full md:w-[80%] flex flex-col px-5 py-5 gap-6 bg-slate-100 dark:bg-slate-600 rounded-xl shadow-lg dark:shadow-none shadow-gray-400">
                        <h1 className="py-5 text-3xl font-bold text-orange-500 dark:text-white">Sign Up</h1>
                        <div className="flex flex-row gap-2 ">
                            <input type="text" name="firstName" placeholder="First Name" id="firstname" className="px-4 py-2 w-full bg-transparent border-b-2 border-orange-500 outline-none placeholder-black dark:placeholder-white font-bold text-orange-500 dark:text-white" value={userData.firstName} onChange={handleInputChange}/>

                            <input type="text" name="lastName" placeholder="Last Name" id="lastname" className="px-4 py-2 w-full bg-transparent border-b-2 border-orange-500 outline-none placeholder-black dark:placeholder-white font-bold text-orange-500 dark:text-white" value={userData.lastName} onChange={handleInputChange}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <input type="text" list="gender" name="gender" placeholder="Gender" id="gender" className="px-4 py-2 w-full bg-transparent border-b-2 border-orange-500 outline-none placeholder-black dark:placeholder-white font-bold text-orange-500 dark:text-white" value={userData.gender} onChange={handleInputChange}/>
                            <datalist id="gender">
                                <option value="Male"/>
                                <option value="Female"/>
                            </datalist>
                            <input type="number" name="age" placeholder="Age" id="age" className="px-4 py-2 w-full bg-transparent border-b-2 border-orange-500 outline-none placeholder-black dark:placeholder-white font-bold text-orange-500 dark:text-white" value={userData.age} onChange={handleInputChange}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <input type="text" name="mobileno" placeholder="Mobile Number" id="mobilenum" className="px-4 py-2 w-full bg-transparent border-b-2 border-orange-500 outline-none placeholder-black dark:placeholder-white font-bold text-orange-500 dark:text-white" value={userData.mobileno} onChange={handleInputChange}/>

                            <input type="text" name="address" placeholder="Address" id="address" className="px-4 py-2 w-full bg-transparent border-b-2 border-orange-500 outline-none placeholder-black dark:placeholder-white font-bold text-orange-500 dark:text-white" value={userData.address} onChange={handleInputChange}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <input type="email" name="email" placeholder="Email" id="emailid" className="px-4 py-2 w-full bg-transparent border-b-2 border-orange-500 outline-none placeholder-black dark:placeholder-white font-bold text-orange-500 dark:text-white" value={userData.email} onChange={handleInputChange}/>

                            <input type="password" name="password" placeholder="Password" id="password" className="px-4 py-2 w-full bg-transparent border-b-2 border-orange-500 outline-none placeholder-black dark:placeholder-white font-bold text-orange-500 dark:text-white" value={userData.password} onChange={handleInputChange}/>
                        </div>
                        <input type="submit" value="Sign Up" name="s1" className="bg-orange-500 px-4 py-2 font-bold text-white rounded-lg cursor-pointer"/>

                        <label className="text-center font-bold text-black dark:text-white">Already have an Account ? <a href="/" className="text-orange-500">Sign In</a></label>
                    </form>
                </div>
                <DarkModeButton/>
            </div>
        </>
    )
}
export default Register