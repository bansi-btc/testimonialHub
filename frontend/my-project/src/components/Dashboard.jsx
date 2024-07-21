import React, { useEffect, useState } from 'react'
import { FaVideo } from "react-icons/fa";
import { FaRegSmileBeam } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import spaceImg from "../assets/space.svg"
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios"
import {DotLoader} from "react-spinners"
import logo1 from "../assets/logo1.jpg"
import { BsGearWideConnected } from "react-icons/bs";
import SpaceCard from './SpaceCard';
import Slider from './Slider';


const Dashboard = () => {

    const token=useSelector((state)=>state.user.token);

    const navigate=useNavigate();

    const [user, setuser] = useState({});
    const [loading, setloading] = useState(true)
    const [userId, setuserId] = useState(null)

    const fetchUserData=async()=>{
        const formData=new FormData();

        formData.append("token", token);
        const res=await axios.post("http://localhost:3000/api/v1/getUserDetails", formData, {
            headers:{
                'Content-Type': 'multipart/form-data',
            }
        })

        console.log(res.data.userDetails);
        setuser(res.data.userDetails);
        setuserId(res.data.userDetails._id)
        // console.log(res.data.userDetails._id)
        setloading(false);
    }

    const [fetchData, setfetchData] = useState(true);

    useEffect(()=>{
        if(!token){
            toast.error("User not logged in")
            navigate("/login")
        }


        fetchUserData();

        




    },[fetchData]);

    const [showModalIdx, setshowModalIdx] = useState(-1);
  return (
    <>
    {loading && <div className='loader absolute z-20 translate-x-[-50%] left-[50%] translate-y-[-50%] top-[50%]'>
          <DotLoader color="#5282ff" />
          </div>}
    {!loading && <div className='max-w-[1200px] mx-auto py-20 flex flex-col items-start justify-start gap-10 relative'>
          
          <div className='flex flex-col items-start justify-start w-full gap-8'>
            <div className='text-4xl font-semibold text-gray-900'>Overview</div>

            <div className='w-full flex flex-row items-center justify-between'>

                <div className='w-[32%] h-[130px] bg-gray-300 rounded-md flex flex-row items-center justify-start px-10 gap-6
                 text-gray-600'>
                    <FaVideo className='text-2xl text-gray-600' />
                    <div className='flex flex-col items-start justify-center gap-0 text-xl font-semibold'>
                        <div>Videos</div>
                        <div>0</div>
                    </div>
                </div>
                <div className='w-[32%] h-[130px] bg-gray-300 rounded-md flex flex-row items-center justify-start px-10 gap-6
                 text-gray-600'>
                    <FaRegSmileBeam className='text-2xl text-gray-600'/>
                    <div className='flex flex-col items-start justify-center gap-0 text-xl font-semibold'>
                        <div>Video Credits</div>
                        <div>{user?.plan?.videoCredits}</div>
                    </div>
                </div>
                <div className='w-[32%] h-[130px] bg-gray-300 rounded-md flex flex-row items-center justify-start px-10 gap-6
                 text-gray-600'>
                    <IoBagHandle className='text-2xl text-gray-600' />
                    <div className='flex flex-col items-start justify-center gap-0 text-xl font-semibold'>
                        <div>Plan</div>
                        <div className='flex flex-row items-start justify-start gap-5'>
                            <div>{user?.plan?.name} plan</div>
                            <div className='bg-purple-500 text-gray-100 px-4 font-normal rounded-sm'>Upgrade</div>
                        </div>
                    </div>
                    
                </div>
            </div>
          </div>
          <div className='flex flex-col items-start justify-start w-full gap-8'>
            <div className='flex flex-row items-center justify-between w-full'>
                <div className='text-4xl font-semibold text-gray-900 '>Spaces</div>
                {/* <Link></Link> */}
                <Link to={"/createSpace"} className='bg-purple-500 text-white px-5 py-2 rounded-sm flex flex-row items-center justify-start gap-3'>
                <IoMdAdd />
                <div>Create a new space</div>
                </Link>
            </div>

            {user.spaces.length===0?<div className='w-full flex flex-col items-center justify-center gap-5'>
                <img src={spaceImg} alt="" className='h-[220px]' />
                <div className='text-lg text-gray-800'>No space yet,add a new one?</div>

            </div>:
            <div className='w-full flex flex-row items-start justify-start gap-10 flex-wrap'>
                {user.spaces.map((space, idx)=>{
                    // const [showSetting, setshowSetting] = useState(false);
                    return <SpaceCard key={idx} {...space} idx={idx} setshowModalIdx={setshowModalIdx} showModalIdx={showModalIdx}
                    userId={userId} setfetchData={setfetchData}/>
                })}
                
            </div>
            }

          </div>

          {/* <Slider/> */}
    </div>}
    </>
  )
}

export default Dashboard