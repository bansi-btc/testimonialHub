import React, { useEffect, useState } from "react";
import { CardOne } from "./Card";
import { SlNote } from "react-icons/sl";
import { RiListSettingsLine } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { Space, Switch } from 'antd';
import { CheckOutlined, CloseOutlined, StarOutlined } from '@ant-design/icons';
import { toast } from "react-toastify";
import axios from "axios"
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";


const EditSpace = () => {

    const location=useLocation();
    // console.log(location)

    const [loading, setloading] = useState(true)
    const [spaceId, setspaceId] = useState(null)
  const token=useSelector((state)=>state.user.token);
  // console.log(token);

  const [isDarkMode, setisDarkMode] = useState(false)
  const [showSelect, setshowSelect] = useState(false)
  const [stars, setstars] = useState(false)

  const [formDetails, setformDetails] = useState({
    spaceName:"",
    spaceLogo:"",
    title:"",
    message:"",
  })

  
  const typeList=["Text only","Video only", "Both" ];
  const [testimode, settestimode] = useState(typeList[0]);

  const toggleDarkMode=()=>{
    // toast.success("Hello")
    setisDarkMode((prev)=>{
      return !prev;
    })
  }

  const handleChange=(e)=>{
    setformDetails((prev)=>{
      return {
        ...prev,
        [e.target.name]:e.target.value,
      }
    })

    // console.log(formDetails)
  }


  const [questions, setquestions] = useState([
    "Who are you what are you working on",
    "How has [our product / service] helped you?",
    "What is the best thing about [our product / service]",
  ])

  const handleQuestionChange=async(event, idx)=>{
    // console.log(idx)
    let newQuestions=[...questions];
    newQuestions[idx]=event.target.value;

    setquestions(newQuestions);

    // console.log(questions)
   
  }

  const handleDelete=async(event, i)=>{
    
    let newQuestions=[];

    for(let idx=0; idx<questions.length; idx++){
      if(idx!=i){
      newQuestions.push(questions[idx]);

      }

      setquestions(newQuestions);
    }
  }

  const navigate=useNavigate();

  const handleSubmit=async()=>{
    // console.log("Bansi")
    try{
      if(!formDetails.spaceLogo || !formDetails.spaceName || !formDetails.title || !formDetails.message){
        toast.error("All fields are required");
        return;
      }

      // console.log("Bansi")

      const formData=new FormData();

      formData.append("token", token);

      formData.append("spaceName", formDetails.spaceName);
      formData.append("spaceLogo", formDetails.spaceLogo);
      formData.append("header", formDetails.title);
      formData.append("questions", questions);
      formData.append("spaceId", spaceId)
      if(testimode===typeList[0]){
        formData.append("testimonialType", "text");

      }
      else if(testimode===typeList[1]){
        formData.append("testimonialType", "video");
      }
      else{
        formData.append("testimonialType", "both");
      }

      formData.append("darkmode", isDarkMode);

      const res=await axios.post("http://localhost:3000/api/v1/updateSpace", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })  
      console.log(res.data);
      toast.success("Space updated successfully");
      navigate("/dashboard");
    }
    catch(err){
      console.log(err);
      toast.error(err.message);
    }

    

    

    
  }

  const fetchSpaceDetails=async()=>{
    try{
        const spaceId=location.pathname.split("/").at(-1);
        // console.log(spaceId)

        // console.log(token);
        const formData=new FormData();

        formData.append("token", token);
        formData.append("spaceId", spaceId);

        const res=await axios.post("http://localhost:3000/api/v1/getSpaceDetails", formData);

        // console.log(res.data.spaceDetails.questions);

        let questionsarr=res.data.spaceDetails.questions[0].split(',');
        // console.log(questionsarr);
        setquestions(questionsarr)

        setformDetails((prev)=>{
            return {
                ...prev,
                spaceName:res.data.spaceDetails.spaceName,
                spaceLogo:res.data.spaceDetails.spaceLogo,
                title:res.data.spaceDetails.header,
                message:"Your message goes here...."
            }
        })
        
        setspaceId(res.data.spaceDetails._id)
        // formDetails.spaceName(res.data.spaceName)
        // formDetails.spaceLogo(res.data.spaceLogo)
        // formDetails.title(res.data.header)
        // formDetails.message(res.data.message);
    }
    catch(err){
        toast.error(err.message)
    }
}

  useEffect(()=>{
    // console.log("Hello")
    fetchSpaceDetails();
}, [])
  return (
    <div className="w-screen bg-gray-100 py-10 h-screen">
      <div className="max-w-[1300px] mx-auto py-10 form bg-white shadow-sm shadow-gray-400 h-full rounded-md flex flex-row items-start justify-start">
        <div className="left w-[38%] flex flex-col items-start justify-start gap-4 py-14 px-10 ">

          <div className={`w-full py-16 px-8 border transition-all duration-300  ${isDarkMode?"text-white bg-gray-900":""}  border-gray-300 shadow-md shadow-gray-200 rounded-md flex flex-col items-center justify-start gap-5 relative`}>

            <div className="absolute top-[-3%] left-[5%] z-10 bg-green-300 text-green-700
            px-5 py-1 rounded-full">Live preview - Testimonial page</div>
            <div className={`text-3xl font-semibold text-gray-900 overflow-hidden ${isDarkMode?"text-white":""}`}>
              {formDetails.title?formDetails.title:"Header Goes here..."}
            </div>
            <div className="text-gray-500 w-full break-words text-center">
            {formDetails.message?formDetails.message:"Your custom message goes here..."}
              
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
              <button className={`btn  w-full py-2 text-white rounded-md ${isDarkMode?"bg-gray-700":"bg-gray-900"}`}>
                Send in text
              </button>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between w-full">
            <div className="btn border border-gray-400 py-1 w-[48%] rounded-md flex flex-row items-center justify-center gap-1">
              <SlNote />
              <div>Thankyou page</div>
            </div>
            <div className="btn border border-gray-400 py-1 w-[48%] rounded-md flex flex-row items-center justify-center gap-1">
              <RiListSettingsLine />
              <div>Extra settings</div>
            </div>
          </div>

          <div className="text-base text-gray-700">
            Upgrade to add your own video message
          </div>
        </div>

        <div className="right w-[50%] flex flex-col items-center justify-start gap-4 py-14 px-10">

            <div className="text-3xl text-gray-800 font-semibold">Update your Space</div>
            {/* <div></div> */}

            <div className="w-[80%] text-center text-gray-700">After the Space is updated, it will generate a dedicated page for collecting testimonials.</div>

            {/* <div>
                <label htmlFor="">Space name</label>
                <input type="text" />
            </div> */}

            <div className="w-full flex flex-col items-start gap-2 pt-10">
            <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="spacename"
            >
            Space name
            </label>
            <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Enter space name"
            id="spacename"
            name="spaceName"
            value={formDetails.spaceName}
            onChange={handleChange}
            ></input>
            </div>

            <div className="w-full flex flex-col items-start gap-2">
            <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="spaceLogo"
            >
            Space logo
            </label>
            <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Enter space name"
            id="spaceLogo"
            name="spaceLogo"
            value={formDetails.spaceLogo}
            onChange={handleChange}
            ></input>
            </div>
            <div className="w-full flex flex-col items-start gap-2">
            <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="title"
            >
            Header title
            </label>
            <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Would you like to give a shoutout to xyz?"
            id="title"
            name="title"
            value={formDetails.title}
            onChange={handleChange}
            maxLength={25}
            ></input>
            </div>
            <div className="w-full flex flex-col items-start gap-2">
            <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="message"
            >
            Your custom message
            </label>
            <textarea rows={5}
            className="flex w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Would you like to give a shoutout to xyz?"
            id="message"
            name="message"
            value={formDetails.message}
            onChange={handleChange}

            ></textarea>
            </div>

            <div className="questions flex flex-col self-start items-start justify-start gap-2 w-full">
              <div>Questions</div>

              {questions.map((que, idx)=>{
                return <div key={idx} className="w-full flex flex-row items-center justify-between gap-2">
                <input 
                className="flex h-10 w-[90%] rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Keep it short"
                id="que1"
                value={questions[idx]}
                onChange={(e)=>handleQuestionChange(e, idx)}
                maxLength={50}
                ></input>
                <MdOutlineDeleteOutline className="text-2xl" onClick={(e)=>{handleDelete(e, idx)}}/>
                </div>
              })}

              {/* <input
            className="flex h-10 w-[90%] rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Keep it short"
            id="que1"
            ></input> */}
            </div>


            <div className="w-full flex flex-row items-start justify-between gap-2 h-[80px]">

              <div className="flex flex-col items-start justify-start w-[200px] gap-2">
                <div>Collections type</div>
                {/* <div>Text</div> */}
                <div className="btn bg-gray-300 w-full py-1 rounded-md text-center" onClick={()=>{
                  setshowSelect((prev)=>!prev)
                }}>{testimode}</div>
                <div className={`bg-gray-900 flex flex-col items-center justify-start w-full border shadow-md text-white rounded-md scale-y-0
                transition-all duration-200 origin-top py-1 ${showSelect?"scale-y-100":""} shadow-gray-200 gap-1 
                bg-opacity-40 backdrop-blur-sm`}>
                  {typeList.map((item, idx)=>{
                    return <div key={idx} className="cursor-pointer" onClick={(e)=>{
                      settestimode(item)
                      setshowSelect(false);
                    }}>{item}</div>
                  })}
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-2">
                <div>Collect star ratings</div>
                {/* <div>Text</div> */}
              <Switch
              // checkedChildren={<CheckOutlined />}
              checkedChildren={<StarOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked
              onClick={(e)=>{
                setstars((prev)=>!prev)
              }}

              />
              </div>
              <div className="flex flex-col items-start justify-start gap-2">
                <div>Choose a theme</div>
                <DarkModeSwitch
                style={{ marginBottom: '2rem' }}
                checked={isDarkMode}
                onChange={toggleDarkMode}
                size={30}
                moonColor="black"
                />
              </div>
            </div>
            <div className="btn bg-purple-500 text-white w-full text-center py-2 rounded-md" onClick={handleSubmit}>Update space</div>


            {/* <div>Create new space</div> */}

            









        </div>
      </div>
    </div>
  );
};

export default EditSpace;
