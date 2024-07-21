import React, { useState } from 'react'
import logo1 from "../assets/logo1.jpg"
import { BsGearWideConnected } from "react-icons/bs";
import { MdManageAccounts } from "react-icons/md";
import { IoIosLink } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";
import { FaKey } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { HiOutlineDuplicate } from "react-icons/hi";
import { toast } from 'react-toastify';
import clipboardy from "clipboardy"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';




const SpaceCard = ({spaceName, testimonials, idx, setshowModalIdx, showModalIdx, _id, userId, setfetchData}) => {

    const [showModal, setshowModal] = useState(true);
    const [deleteModal, setdeleteModal] = useState(false)
    const token=useSelector((state)=>state.user.token);

    const handleCopy=async()=>{
        const text = `http://localhost:5173/review/${_id}`;

        await navigator.clipboard.writeText(text);
        toast.success("link copied to clipboard")
    }
    const handleKeyCopy=async()=>{
        const text = userId;

        await navigator.clipboard.writeText(text);
        toast.success("Api key copied to clipboard")
    }

    const handleDelete=async()=>{
        try{
            const spaceId=_id;

            const formData=new FormData();

            formData.append("token", token);
            formData.append("spaceId", spaceId);

            const res=await axios.post("http://localhost:3000/api/v1/deleteSpace", formData);

            console.log(res.data);
            setfetchData((prev)=>{
                return !prev;
            });


        }
        catch(err){

        }
    }
  return (
    <div className='w-[30%] bg-gray-300 flex flex-row items-center justify-between pr-5 relative rounded-md border
                    border-gray-200'>
        <div>
            <img src={logo1} alt="" className='h-[100px] rounded-l-md' />
        </div>
        <div className='flex flex-col items-start justify-center text-base text-gray-900 font-medium'>
            <div>{spaceName}</div>
            <div className='text-gray-700'>Testimonials-{testimonials.length}</div>
        </div>

        <BsGearWideConnected className='text-2xl' onClick={()=>{
            setshowModalIdx((prev)=>{
                if(prev===idx){
                    return -1;
                }
                return idx
            })
        }} />

        <div className={`absolute h-[280px] w-[230px] bg-gray-700 scale-y-0 ${showModalIdx===idx?"scale-y-100":""}
        top-10 left-20 z-30 rounded-md bg-opacity-90 backdrop-blur-sm flex flex-col items-start px-4 py-5 justify-between
        text-white transition-all duration-300 origin-top cursor-pointer`}>
              
              <Link to={`/manageTestimonial/${_id}`} className='flex flex-row items-center justify-start gap-3'>
                <MdManageAccounts className='text-2xl' />
                <div>Manage testimonials</div>
              </Link>

              <div onClick={handleCopy} className='flex flex-row items-center justify-start gap-3'>
              <IoIosLink className='text-2xl' />
              <div >Get the Link</div>
              </div>
              <div className='flex flex-row items-center justify-start gap-3'>
              <CiEdit className='text-2xl' />
              {/* <Link></Link> */}
              <Link to={`/editSpace/${_id}`}>Edit the space</Link>
              </div>
              <div className='flex flex-row items-center justify-start gap-3'>
              <TbWorld className='text-lg' />
              <div>Custom domain</div>
              </div>
              <div className='flex flex-row items-center justify-start gap-3' onClick={handleKeyCopy}>
              <FaKey className='text-lg text-gray-300' />
              <div>Api key</div>
              </div>
              
              
              
              
              <div className='h-[1px] w-full bg-gray-400'></div>
              <div className='flex flex-row items-center justify-start gap-3'>
              <HiOutlineDuplicate className='text-2xl' />
              <div>Duplicate the space</div>
              </div>
              <div className='flex flex-row items-center justify-start gap-3' onClick={()=>{setdeleteModal(true)}}>
              <MdOutlineDelete className='text-2xl' />
              <div>Delete the space</div>
              </div>

              <div className={`absolute z-30 w-[280px] h-[160px] bg-gray-900 rounded-md opacity-90 backdrop-blur-sm flex flex-col
              items-start justify-between px-5 py-4 scale-0 ${deleteModal?"scale-100":""} transition-all duration-300`}>
                <div className='text-xl font-semibold'>Confirm Delete</div>
                <div>Are you sure you want to delete?</div>
                <div className='flex flex-row items-center w-full justify-start gap-4'>
                    <div className='px-4 py-1 border border-gray-200 rounded-md' onClick={()=>{setdeleteModal(false)}}>Cancel</div>
                    <div className='px-4 py-1 rounded-md bg-red-500 text-gray-100 border border-red-800'
                    onClick={handleDelete}>Delete</div>

                </div>
              </div>
              
              
        </div>
    </div>
  )
}

export default SpaceCard