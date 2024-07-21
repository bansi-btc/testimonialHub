import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const TestiCard = ({ tempArr, name, email, createdAt, rating ,review, _id, space, setspaceDetails, settestimonials, liked}) => {
  const [deleteModal, setdeleteModal] = useState(false);

  const handleDelete=async()=>{
    try{
      // console.log(_id, space);

      const loadingToast=toast.loading("Deleting testimonial");
      const formData=new FormData();

      formData.append("testimonialId", _id);
      formData.append("spaceId", space);

      const res=await axios.post("http://localhost:3000/api/v1/deleteTestimonial", formData);

      console.log(res.data.updatedSpace);
      setspaceDetails(res.data.updatedSpace);
      settestimonials(res.data.updatedSpace.testimonials)

      toast.done(loadingToast);
      toast.success("Testimonial deleted successfully");
      setdeleteModal(false);
      
    }
    catch(err){
      // console.log(err)
      toast.error(err.message);
    }
  }

  const handleLike=async()=>{
    try{
      const formData=new FormData();
      formData.append("testimonialId", _id);
      formData.append("spaceId", space);

      const res=await axios.post("http://localhost:3000/api/v1/handleLike", formData);

      console.log(res.data);
      setspaceDetails(res.data.updatedSpace);
      settestimonials(res.data.updatedSpace.testimonials)

      // if(res.data.updatedSpace.te)
      if(res.data.updatedTestimonial.liked){
      toast.success("Testimonial added to wall of love");

      }
      else{
        toast.success("Testimonial removed from wall of love");
      }
    }
    catch(err){
      toast.error(err.message);
    }
  }

  return (
    <div
      className="w-full relative bg-gray-600 rounded-lg flex flex-col items-start justify-start px-5 py-4 text-gray-100
                    gap-3"
    >
        <div className={`w-[300px] h-[150px] bg-gray-800 opacity-90 backdrop-blur-sm absolute z-30
        left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] rounded-md flex flex-col items-start justify-between
        px-5 py-4 scale-0 ${deleteModal?"scale-100":"scale-0"} transition-all duration-300`}>
            <div className="text-xl font-semibold">Confirm delete</div>
            <div>Are you sure you want to delete?</div>
            <div className="flex flex-row items-center justify-start gap-4">
                <div className="px-4 py-1 border border-gray-500 rounded-md" onClick={()=>{
                    setdeleteModal(false);
                }}>Cancel</div>
                <div className="px-4 py-1 rounded-md bg-red-500" onClick={handleDelete}>Delete</div>
            </div>
        </div>
      <div className="w-full flex flex-row items-center justify-between">
        <div className="bg-blue-100 text-blue-500 font-medium px-5 py-1 rounded-full">
          Text
        </div>
        <div className="flex flex-row items-center justify-end gap-4">
          <FaStar className="text-2xl text-gray-400" />
          <FaHeart className={`text-xl  ${liked?"text-red-400":"text-gray-400"} transition-all duration-200`} onClick={handleLike} />
          <MdDelete className="text-2xl text-[#f54d4d]" onClick={()=>{
            setdeleteModal(true);
          }}/>
        </div>
      </div>

      <div className="w-full flex flex-row items-start justify-start gap-2">
        {tempArr.map((ele, idx) => {
          return (
            <FaStar
              key={idx}
              className={`text-xl ${
                ele <= rating ? "text-yellow-400" : "text-gray-400"
              } `}
            />
          );
        })}
      </div>
      <div>{review}</div>

      <div className="flex flex-row items-start justify-between w-[60%]">
        <div className="flex flex-col items-start justify-start">
          <div className="font-medium text-gray-300">Name</div>
          <div>{name}</div>
        </div>
        <div className="flex flex-col items-start justify-start">
          <div className="font-medium text-gray-300">Email</div>
          <div>{email}</div>
        </div>
      </div>

      <div className="flex flex-col items-start justify-start">
        <div className="font-medium text-gray-300">Submitted at</div>
        <div>{createdAt}</div>
      </div>
    </div>
  );
};

export default TestiCard;
