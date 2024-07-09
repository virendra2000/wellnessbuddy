import Sidebar from "./Sidebar.jsx";
import { useEffect , useState,useCallback } from 'react';
import axios from "../axiosConfig";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ObesityDiet from '../components/ObesityDiet.jsx'
import NormalWeightDiet from '../components/NormalWeightDiet.jsx'
import UnderweightDiet from '../components/UnderweightDiet.jsx'
import OverweightDiet from '../components/OverweightDiet.jsx'
const ViewDiet = () => {
    const history = useNavigate();
    axios.defaults.withCredentials = true;
    const [userData,setUserData] = useState({
        firstName:'',
        lastName:'',
        gender:'',
        age:'',
        mobileno:'',
        address:'',
        diettype:'',
    });
    const callDashboardPage = useCallback(async () => {
        try {
            const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\s*([^;]*).*$)|^.*$/, '$1');

            const res = await axios.get("/viewdiet",{
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
                toast.info(`Welcome ${data.diettype} Diet`, {
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

    const renderDiet = () => {
        switch (userData.diettype) {
            case 'Overweight':
                return <OverweightDiet />;
            case 'Underweight':
                return <UnderweightDiet />;
            case 'Normal Weight':
                return <NormalWeightDiet />;
            case 'Obesity':
                return <ObesityDiet />;
            default:
                return <div className="text-lg text-black dark:text-white">Invalid Diet Category or Empty Diet Category . Kindly Update Height Weight and BMI by Calculating in Profile Section. In Profile Page , you have to mention height and weight and click on Calculate and after that Click on Update Button.</div>;
        }
    };
    return (
        <>
            <div className="flex flex-col md:flex-row min-h-screen bg-slate-100 dark:bg-slate-800">
                <ToastContainer autoClose={1000}/>
                <div className="p-5 h-auto md:h-screen overflow-y-auto">
                    <Sidebar/>
                </div>
                <div className="p-5 w-full flex flex-col h-screen gap-4 overflow-y-auto">
                    {renderDiet()}
                </div>
            </div>
        </>
    );
}
export default ViewDiet
