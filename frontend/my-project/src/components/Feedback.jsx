import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import {DotLoader} from "react-spinners"
import axios from "axios"
import logo1 from "../assets/logo1.jpg"
import { FaHeart } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import {toast} from "react-toastify"



const Feedback = () => {

    const [formDetails, setformDetails] = useState({
      name:"",
      email:"",
      customerImg:null,
      review:"",
      rating:1,
      userPermission:false,
    })

    const {id}=useParams();

    const [loading, setloading] = useState(true);
    const [isDarkMode, setisDarkMode] = useState(false)

    const [spaceDetails, setspaceDetails] = useState({})
    const [questions, setquestions] = useState([])

    const token=useSelector((state)=>state.user.token);

    const fetchData=async()=>{

        const formData=new FormData();

        formData.append("token", token);
        formData.append("spaceId", id);

        const res=await axios.post("http://localhost:3000/api/v1/getSpaceDetails", formData, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        })

        console.log(res.data.spaceDetails);
        setspaceDetails(res.data.spaceDetails);
        let que=res.data.spaceDetails.questions[0].split(",");
        setquestions(que);
        setloading(false);
        setisDarkMode(res.data.spaceDetails.darkMode)
        // console.log(questions)
        // const str="lgdjag";



    }

    const [showModal, setshowModal] = useState(false);
    let arr=[1, 2, 3, 4, 5];
    // const [rating, setrating] = useState(1)

    const handleChange=(event)=>{
      setformDetails((prev)=>{
        return {
          ...prev,
          [event.target.name]:event.target.value,
        }
      })

      console.log(formDetails)
    }

    useEffect(()=>{
        fetchData();
    }, [])

    const handleSubmit=async()=>{
      try{
        // toast.success("Hello")
        const formData=new FormData();
        formData.append("name", formDetails.name)
        formData.append("email", formDetails.email)
        formData.append("review", formDetails.review)
        formData.append("rating", formDetails.rating)
        formData.append("space", id)
        formData.append("userPermission", formDetails.userPermission);
        formData.append("customerImg", formDetails.customerImg);

        if(!formDetails.name || !formDetails.email || !formDetails.review || !formDetails.rating || !formDetails.customerImg){
          toast.error("All fields are required");
          return;
        }

        let toastid=toast.loading("Adding testimonial")
        console.log(toastid);

        const res=await axios.post("http://localhost:3000/api/v1/addTestimonial", formData, {
          headers:{
            "Content-Type":'multipart/form-data',
          }
        })

        toast.done(toastid)

        console.log(res.data);
        setshowModal(false);
      }
      catch(err){

      }
    }




    
    
    // console.log(id)
  return (
    <div >
    {!loading?<div className='max-w-[1200px] mx-auto h-[92vh] flex flex-col items-center justify-start py-40 relative'>

      <div className={`w-[450px] bg-gray-300 absolute translate-x-[-50%] left-[50%]
      top-[50%] translate-y-[-50%] z-30 bg-opacity-40 backdrop-blur-md shadow-sm shadow-gray-400
       flex flex-col items-start justify-start px-4 py-4 gap-5 scale-y-0 ${showModal?"scale-y-100":""}
       transition-all duration-200 origin-center`}>
        <div className='text-xl font-medium flex flex-row items-start justify-between w-full'>
        <div>Write text testimonials to</div>
        <RxCross2 onClick={()=>setshowModal(false)}/>
          </div>
        <div><img src={logo1} alt="" className='h-[50px] rounded-md' /></div>

        <div className='flex flex-col items-start justify-start gap-3'>
          <div className='text-xl'>Questions</div>
          <div className='w-[40px] h-[5px] bg-purple-400 rounded-sm'></div>

          <div className='flex flex-col items-start justify-start gap-0'>
              {questions.map((que, idx)=>{
                return <div key={idx} className='text-base'>{que}</div>
              })}
          </div>
          
        </div>

        <div className='flex flex-row items-center justify-start gap-1 transition-all duration-300 origin-left'>
          {arr.map((ele)=>{
            // console.log(ele)

            return <FaHeart key={ele} className={`${ele<=formDetails.rating?"text-red-500":"text-black"} text-2xl transition-all duration-500
            origin-left hover:scale-110`} 
            onClick={(e)=>{
              setformDetails((prev)=>{
                return {
                  ...prev,
                  rating:ele,
                }
              })
              console.log(formDetails)
            }}/>
          })}
        </div>

        <div className='w-full'>
          <textarea id="" cols="30" rows="4" name='review' value={formDetails.review} onChange={handleChange}  className='w-full bg-gray-800 text-gray-50 focus:outline-none bg-opacity-70
          px-5 py-2 rounded-md'></textarea>
        </div>

        <div className='w-full flex flex-col items-start justify-start gap-2'>
          <label htmlFor="reviewImage">Attach image</label>
          <input type="file" name="" id="revewImage" />

        </div>

        <div className='w-full flex flex-col items-start justify-start gap-1'>
          <label htmlFor="name">Your name</label>
          <input type="text" id='name' name='name' value={formDetails.name} onChange={handleChange} className='w-full bg-gray-800 text-gray-50 focus:outline-none bg-opacity-70
          px-4 py-2 rounded-sm' />
        </div>

        <div className='w-full flex flex-col items-start justify-start gap-1'>
          <label htmlFor="email">Your email</label>
          <input type="email" id='email' name='email' value={formDetails.email} onChange={handleChange} className='w-full bg-gray-800 text-gray-50 focus:outline-none bg-opacity-70
          px-4 py-2 rounded-sm' />
        </div>

        <div className='w-full flex flex-col items-start justify-start gap-2'>
          <label htmlFor="userImage">Your Image</label>

          <div className='flex flex-row items-start justify-start relative'>
            {/* <div className='h-[30px] w-[50px] bg-white'></div> */}
          <input type="file" name="customerImg" id="userImage" onChange={(e)=>{
            setformDetails((prev)=>{
              return {
                ...prev,
                customerImg:e.target.files[0],
              }
            })
            console.log(formDetails)
          }} />
          </div>
        </div>

        <div className='flex flex-row place-items-baseline justify-start gap-2'>
          <input type="checkbox" name="" id="permission" onChange={(e)=>{
            setformDetails((prev)=>{
              return {
                ...prev,
                userPermission:e.target.checked
              }
            })

            console.log(formDetails);
          }}/>
          <label htmlFor="permission">I give permission to use this testimonial across social channels and other marketing efforts</label>
        </div>

        <div className='flex flex-row items-start justify-end w-full gap-4'>

          <div className='py-1 w-[80px] flex flex-row items-center justify-center bg-gray-100 border border-gray-400 
          cursor-pointer rounded-md' onClick={()=>{
            setshowModal(false)
          }}>Cancel</div>
          <div className='py-1  w-[80px] flex flex-row items-center justify-center bg-purple-500 text-gray-100 borde
          cursor-pointer border-gray-400 rounded-md' onClick={handleSubmit}>Send</div>
        </div>



        </div>


        <div className={`w-[400px] mx-auto py-16 px-8 border transition-all duration-300  ${isDarkMode?"text-white bg-gray-900":""}  border-gray-300 shadow-md shadow-gray-200 rounded-md flex flex-col items-center justify-start gap-5 relative`}>

            <div className="absolute top-[-3%] left-[5%] z-10 bg-green-300 text-green-700
            px-5 py-1 rounded-full">Submit-Testimonial</div>
            <div className={`text-3xl font-semibold text-gray-900 overflow-hidden ${isDarkMode?"text-white":""}`}>
              {/* {"Header Goes here..."} */}
              {spaceDetails.header}
            </div>
            <div className="text-gray-500 w-full break-words text-center">
            {"Your custom message goes here..."}
              
            </div>

            <div className={`w-full flex flex-col items-start self-start gap-3 text-gray-800 ${isDarkMode?"text-white":""} `}>
              <div>QUESTIONS</div>
              <div className="w-[50px] h-[4px] bg-purple-500"></div>

              <div className="flex w-full flex-col items-start justify-start gap-1">
                {questions.map((que, idx)=>{
                  return <div key={idx} className="break-words w-full overflow-hidden">{que}</div>
                })}
                
              </div>
            </div>

            <div className="flex flex-col w-full items-center justify-start gap-3">
              <button className="btn bg-purple-500 w-full py-2 text-white rounded-md">
                Record a video
              </button>
              <button className={`btn  w-full py-2 text-white rounded-md ${isDarkMode?"bg-gray-700":"bg-gray-900"}`}
              onClick={()=>{setshowModal(true)}}>
                Send in text
              </button>
            </div>
          </div>


    </div>:
    <div className='loader absolute z-20 translate-x-[-50%] left-[50%] translate-y-[-50%] top-[50%]'>
    <DotLoader color="#5282ff" />
    </div>}
    </div>
  )
}

export default Feedback