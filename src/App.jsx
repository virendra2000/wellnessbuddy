import './App.css'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'
import VerifyAccount from './components/VerifyAccount'
import Dashboard from './components/Dashboard.jsx'
import Profile from './components/Profile.jsx'
import ViewDiet from './components/ViewDiet.jsx'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path='/forgotpassword' element={<ForgotPassword/>}/>
          <Route path='/verifyaccount' element={<VerifyAccount/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="/Profile" element={<Profile/>}/>
          <Route path='/ViewDiet' element={<ViewDiet/>}/>
        </Routes>
      </Router>
    </>
  )
}
export default App
