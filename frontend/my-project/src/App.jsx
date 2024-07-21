import React, { useEffect, useState } from 'react'
import { Routes,Route, useNavigate } from 'react-router-dom'
import { SignUpThree } from './components/SingUp'
import { SignInThree } from './components/Login'
import { ExampleNavbarThree } from './components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { setLogoutModal, setToken } from './features/userSlice'
import { ToastContainer, toast } from 'react-toastify'
import Dashboard from './components/Dashboard'
import CreateSpace from './components/CreateSpace'
import Feedback from './components/Feedback'
import EditSpace from './components/EditSpace'
import ManageTest from './components/ManageTest'
import Slider from './components/Slider'

const App = () => {
  const dispatch=useDispatch();

  const modal=useSelector((state)=>state.user.logoutModal);
  const navigate=useNavigate();

  const handleLogout=async()=>{
    dispatch(setToken(null));
    localStorage.clear();
    dispatch(setLogoutModal(false));
    toast.success("Logged out successfully");
    navigate("/login")

  }

  useEffect(()=>{
    setblurScreen(false);
  }, [location.pathname])

  const [blurScreen, setblurScreen] = useState(false)
  
  return (
    <div className='relative h-screen'>  
   <div className={`h-full w-full absolute bg-gray-300 z-40 bg-opacity-60 backdrop-blur-sm scale-x-0 ${blurScreen?"scale-x-100":""}
   `}></div>
     <div className={`modal bg-gray-400 rounded-md bg-opacity-40 backdrop-blur-sm h-[250px] w-[500px] mx-auto absolute
      translate-x-[-50%] left-[50%] translate-y-[-55%] top-[50%] z-20 flex flex-col items-start justify-start px-10 py-5 gap-5
      transition-all duration-300 scale-0 ${modal?"scale-100":""}`}>

        <div className='text-2xl font-semibold'>Confirm Logout</div>
        <div className='text-xl font-semibold'>Are you sure you want to log out?</div>

        <div className='flex flex-row items-start justify-start gap-6 py-2'>
          <button className="btn border border-gray-400 rounded-md px-8 py-2 text-black" onClick={()=>{
            dispatch(setLogoutModal(false))
          }}>Cancel</button>
          <button className="btn bg-[#e23a3a] rounded-md px-8 py-2 text-white" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <ExampleNavbarThree/>
    <Routes>
      <Route path='/' element={<>Home</>}/>
      <Route path='/singup' element={<SignUpThree/>}/>
      <Route path='/login' element={<SignInThree/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/createSpace' element={<CreateSpace/>}/>
      <Route path='/editSpace/:id' element={<EditSpace/>}/>
      <Route path='/review/:id' element={<Feedback/>}/>
      <Route path='/manageTestimonial/:id' element={<ManageTest setblurScreen={setblurScreen}/>}/>
      <Route path='/slider' element={<Slider/>}/>
    </Routes>
    </div>

  )
}

export default App