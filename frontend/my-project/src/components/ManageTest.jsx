import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { DotLoader } from "react-spinners";
import { toast } from "react-toastify";
import axios from "axios";
import logo1 from "../assets/logo1.jpg";
import { CiEdit } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { GoCodeReview } from "react-icons/go";
import { CiStar } from "react-icons/ci";
import { BiSolidWidget } from "react-icons/bi";
import { BsFileBarGraph } from "react-icons/bs";
import { IoIosLink } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import TestiCard from "./TestiCard";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { FaTools } from "react-icons/fa";
import { IoIosColorPalette } from "react-icons/io";
import { Dropdown } from "flowbite-react";
import { GrLinkPrevious } from "react-icons/gr";


import { Swiper, SwiperSlide } from "swiper/react";
import { RiDoubleQuotesL } from "react-icons/ri";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CodeBlock from "./Component";
import Codeblock from "./Component";

const ManageTest = ({setblurScreen}) => {

  const tempArr = [1, 2, 3, 4, 5];

  const filterList = [
    {
      text: "All",
      color: "bg-gray-500",
    },
    {
      text: "Text",
      color: "bg-red-500",
    },
    {
      text: "Video",
      color: "bg-blue-500",
    },
    {
      text: "Archived",
      color: "bg-green-500",
    },
    {
      text: "Liked",
      color: "bg-purple-500",
    },
  ];

  const [filterType, setfilterType] = useState("All");
  const { id } = useParams();
  const [userDetails, setuserDetails] = useState({});

  const [spaceDetails, setspaceDetails] = useState({});
  const token = useSelector((state) => state.user.token);

  const [loading, setloading] = useState(true);

  const [testimonials, settestimonials] = useState([]);
  const spaceId = location.pathname.split("/").at(-1);


  const fetchSpaceDetails = async () => {
    try {
      console.log(spaceId)

      const formData = new FormData();

      formData.append("token", token);
      formData.append("spaceId", spaceId);

      const res = await axios.post(
        "http://localhost:3000/api/v1/getSpaceDetails",
        formData
      );

      settestimonials(res.data.spaceDetails.testimonials);
      setspaceDetails(res.data.spaceDetails);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const formData = new FormData();

      formData.append("token", token);

      const res = await axios.post(
        "http://localhost:3000/api/v1/getUserDetails",
        formData
      );


      setuserDetails(res.data.userDetails);
      setloading(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const [wallModal, setwallModal] = useState(false);


  const [isAutoplay, setisAutoplay] = useState(false)
  const [slidesCount, setslidesCount] = useState(1);
  const [isDarkMode, setisDarkMode] = useState(true);
  const [step, setstep] = useState(1);

  
  const [slidesDetails, setslidesDetails] = useState({
    isAutoplay:false,
    isDarkMode:false,
    slidesCount:1,
  })

  const handleChange=async(e)=>{
    try{
      setslidesDetails((prev)=>{
        return {
          ...prev,
          [e.target.name]:e.target.checked,
        }
      })
      
    }
    catch(err){
      console.log(err.message);
    }
  }

  const handleCopyCode=async(codeString)=>{
    await navigator.clipboard.writeText(codeString);
    toast.success("code copied successfully")
  }

  useEffect(() => {
    fetchSpaceDetails();
    fetchUserDetails();
  }, []);

  // console.log(id);
  return (
    <>
      {loading && (
        <div className="loader absolute z-20 translate-x-[-50%] left-[50%] translate-y-[-50%] top-[50%]">
          <DotLoader color="#5282ff" />
        </div>
      )}
      {!loading && (
        <div className="max-w-[1300px] mx-auto pt-10 relative">
          
         {step==1 && <div
            className={`absolute bg-gray-800 h-[700px] w-[75%] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]
        z-40 rounded-md flex flex-col items-center justify-start px-10 py-10 gap-6 transition-all duration-300 origin-center
        scale-0 ${wallModal?"scale-100":""}`}
          >
            <div className="text-4xl font-semibold text-gray-100">
              Embed a wall of love
            </div>

            <div className="flex flex-row items-baseline justify-center gap-5">
              <div className="bg-gray-800 text-gray-300 px-6 py-1 rounded-full border border-gray-500">Step 1</div>
              <div className="text-gray-300 text-xl">Customize your wall of love</div>
            </div>
            <div className="text-gray-200 text-xl font-semibold">
              Live preview
            </div>
            

            {slidesDetails.isAutoplay &&  <Swiper
              className="w-full"
              autoplay={slidesDetails.isAutoplay ? { delay: 1500, disableOnInteraction: false } : false}
              modules={[Navigation, Autoplay]}
              spaceBetween={0}
              slidesPerView={slidesDetails.slidesCount}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
            >
                {testimonials.map((testi, index)=>{
                    return <SwiperSlide key={index}>
                    <div className={`w-[350px] min-h-[200px]  mx-auto rounded-md flex flex-col items-center justify-center gap-3
                    py-5 px-4 ${slidesDetails.isDarkMode?"bg-gray-900 border border-gray-500":"bg-gradient-to-tr from-[#FFDEE9] to-[#B5FFFC]"}`}>
                      <div className={`text-center text-lg ${slidesDetails.isDarkMode?"text-gray-100":"text-gray-600"}   relative w-full`}>
                      <RiDoubleQuotesL className="absolute text-5xl text-green-500 text-opacity-40 left-0 top-[-20px]"/>
    
                       <div className=" w-full break-words text-center">{testi.review}</div>
                      </div>
    
                      <div className="w-full flex flex-row items-center justify-center gap-1">
                        {tempArr.map((ele, idx)=>{
                            return <FaStar key={idx} className={`text-lg  ${ele<=testi.rating?"text-yellow-400":"text-gray-600"}`}/>
                        })}
                      </div>
                      <div className={`w-full flex flex-col items-center justify-start gap-0 ${slidesDetails.isDarkMode?"text-gray-400":"text-gray-900"}`}>
                      <div className="font-semibold">{testi.name}</div>
                      <div>Ceo, apple</div>
                      </div>
                    </div>
                  </SwiperSlide>
                })}
              
              
            </Swiper>}
            {!slidesDetails.isAutoplay && <Swiper
              className="w-full"
              autoplay={slidesDetails.isAutoplay ? { delay: 1500, disableOnInteraction: false } : false}
              modules={[Navigation, Autoplay]}
              spaceBetween={0}
              slidesPerView={slidesDetails.slidesCount}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
            >
                {testimonials.map((testi, index)=>{
                    return <SwiperSlide key={index}>
                    <div className={`w-[350px] min-h-[200px]  mx-auto rounded-md flex flex-col items-center justify-center gap-3
                    py-5 px-4 ${slidesDetails.isDarkMode?"bg-gray-900 border border-gray-500":"bg-gradient-to-tr from-[#FFDEE9] to-[#B5FFFC]"}
                    transition-all duration-300`}>
                      <div className={`text-center text-lg ${slidesDetails.isDarkMode?"text-gray-100":"text-gray-600"}   relative w-full`}>
                      <RiDoubleQuotesL className="absolute text-5xl text-green-500 text-opacity-40 left-0 top-[-20px]"/>
    
                       <div className=" w-full break-words text-center">{testi.review}</div>
                      </div>
    
                      <div className="w-full flex flex-row items-center justify-center gap-1">
                        {tempArr.map((ele, idx)=>{
                            return <FaStar key={idx} className={`text-lg  ${ele<=testi.rating?"text-yellow-400":"text-gray-600"}`}/>
                        })}
                      </div>
                      <div className={`w-full flex flex-col items-center justify-start gap-0 ${slidesDetails.isDarkMode?"text-gray-400":"text-gray-900"}`}>
                      <div className="font-semibold">{testi.name}</div>
                      <div>Ceo, apple</div>
                      </div>
                    </div>
                  </SwiperSlide>
                })}
              
              
            </Swiper>}

            <div className="w-full flex flex-row items-center justify-start gap-5">
                <div className="btn  px-5 py-1 rounded-md border border-blue-400 flex flex-row items-center justify-center
                gap-3 text-blue-200">
                    <FaTools className="text-sm" />
                    <div>Basic</div>
                </div>
                <div className="btn  px-5 py-1 rounded-md border text-gray-50 flex flex-row items-center justify-center
                gap-3">
                    <IoIosColorPalette className="text-lg" />
                    <div>More customization</div>
                </div>

               
            </div>

            <div className="flex flex-col w-full items-start justify-start text-gray-200 gap-2">
                <div className="flex flex-row items-center justify-start gap-3">
                    <input type="checkbox" name="isAutoplay" id="autoplay" checked={slidesDetails.isAutoplay} onChange={handleChange} />
                    <label htmlFor="autoplay">Autoplay</label>
                </div>
                <div className="flex flex-row items-center justify-start gap-3">
                    <input type="checkbox" name="isDarkMode" id="theme" checked={slidesDetails.isDarkMode} onChange={handleChange} />
                    <label htmlFor="theme">Dark Theme</label>
                </div>

                <div className="flex flex-row items-center justify-start gap-3">
                <Dropdown label={`${slidesDetails.slidesCount} slides`} dismissOnClick={false}>
                  <Dropdown.Item onClick={()=>{
                    setslidesDetails((prev)=>{
                      return {
                        ...prev,
                        slidesCount:1,
                      }
                    })
                  }}>1 Slide</Dropdown.Item>
                  <Dropdown.Item onClick={()=>{
                     setslidesDetails((prev)=>{
                      return {
                        ...prev,
                        slidesCount:2,
                      }
                    })
                  }}>2 Slide</Dropdown.Item>
                  {/* <Dropdown.Item onClick={()=>{setslidesCount(3)}}>3 Slide</Dropdown.Item> */}
                </Dropdown>

                <div>Select Number of slides</div>
                </div>
                
               
            </div>

            <div className="flex flex-row items-center justify-start w-full gap-5">
              <div className="bg-gray-700 px-4 py-1 text-gray-50 rounded-md border border-gray-400"
              onClick={()=>{
                setwallModal(false);
                setblurScreen(false);
              }}>Cancel</div>
              <div className="px-5 py-1 rounded-md bg-purple-500 text-white" onClick={()=>{setstep(2)}}>Next</div>
            </div>

          </div>}
         {step==2 && <div
            className={`absolute bg-gray-800 h-[700px] w-[75%] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]
        z-40 rounded-md flex flex-col items-center justify-start px-10 py-10 gap-6 transition-all duration-300 origin-center
        scale-0 ${wallModal?"scale-100":""}`}
          >

            {/* <div >Prev</div> */}
            <GrLinkPrevious className="absolute z-50 top-10 left-10 text-3xl text-gray-400 cursor-pointer" onClick={()=>{setstep(1)}}/>
            <div className="text-4xl font-semibold text-gray-100">
              Embed a wall of love
            </div>

            <div className="flex flex-row items-baseline justify-center gap-5">
              <div className="bg-gray-800 text-gray-300 px-6 py-1 rounded-full border border-gray-500">Step 2</div>
              <div className="text-gray-300 text-xl">Get code for react and tailwind</div>
            </div>
            <div className="flex flex-col w-full items-start justify-start gap-3">

              

              <div className="text-gray-100 text-lg">Step 1 : <span className="text-gray-200">Install dependencies</span></div>
              

              <div className="flex flex-col items-start justify-start w-[50%] bg-gray-900 rounded-md border
              border-gray-700 py-4 px-5 text-gray-300">
                npm install axios react-icons swiper
              </div> 
              <div className="text-gray-100 text-lg">Step 2 : <span className="text-gray-200">Create new react component and copy this code</span></div> 

              <Codeblock spaceId={spaceId} isDarkMode={slidesDetails.isDarkMode} handleCopyCode={handleCopyCode}/>


            </div>

            <div className="w-full flex flex-row items-center justify-start">
              <div className="w-[49%] bg-gray-900 text-gray-100 border border-gray-700 py-2 text-center rounded-md cursor-pointer"
              onClick={()=>{
                setwallModal(false);
                setstep(1);
                setblurScreen(false);
              }}>Close</div>
              {/* <div className="w-[49%] bg-purple-500 text-gray-100 border border-gray-700 py-2 text-center rounded-md">
                Embedding done
              </div> */}
            </div>

            

          </div>}

          <div className="flex flex-row items-start h-[100px] justify-between w-full">
            <div className="flex flex-row items-center justify-start gap-8">
              <img
                src={logo1}
                alt=""
                className="h-[100px] border border-gray-200 shadow-sm shadow-gray-400 rounded-md"
              />

              <div className="flex flex-col items-start justify-center gap-2">
                <div className="text-3xl font-semibold text-gray-800">
                  {spaceDetails.spaceName}
                </div>
                <div className="text-base text-gray-600 flex flex-row items-center justify-start gap-3">
                  Space public URL:{" "}
                  <Link
                    className="font-semibold underline"
                    to={`http://localhost:5173/review/${spaceDetails._id}`}
                  >
                    Follow this link
                  </Link>
                </div>
              </div>
            </div>

            <div className=" h-full flex flex-row items-center justify-end gap-10 text-gray-600">
              <div className="flex flex-col items-start justify-start">
                <div>Video credits</div>
                <div>{userDetails.plan.videoCredits}</div>
              </div>
              <div className="flex flex-col items-start justify-start">
                <div>Text credits</div>
                <div>10</div>
              </div>
              <Link
                to={`/editSpace/${spaceDetails._id}`}
                className="btn bg-gray-800 text-gray-100 py-2 px-6 rounded-md flex flex-row items-center
                justify-center gap-2"
              >
                <CiEdit className="text-2xl" />
                <div>Edit space</div>
              </Link>
            </div>
          </div>

          <div className="w-full flex flex-row items-start justify-between py-10">
            <div className="left flex flex-col items-start justify-start w-[30%] py-4 px-4 gap-8">
              <div className="w-full flex flex-col items-start justify-start gap-1 text-xl">
                <div className="font-semibold text-gray-600">INBOX</div>

                <div className="flex flex-col items-start justify-start w-full gap-1 px-2">
                  {filterList.map((ele, idx) => {
                    return (
                      <div
                        key={idx}
                        className={`w-full hover:bg-gray-200 py-1 px-4 rounded-md transition-colors duration-300 flex flex-row
                            items-center justify-start gap-3 ${
                              filterType === ele.text
                                ? "bg-gray-400 text-gray-50"
                                : ""
                            } text-base`}
                        onClick={() => {
                          setfilterType(ele.text);
                        }}
                      >
                        <div
                          className={`h-[8px] w-[8px] rounded-full ${ele.color}`}
                        ></div>
                        {ele.text}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="w-full flex flex-col items-start justify-start gap-1 text-xl">
                <div className="font-semibold text-gray-600">
                  Embeds and metrics
                </div>

                <div className="flex flex-col items-start justify-start w-full gap-1 px-2">
                  <div
                    className="flex flex-row items-center justify-start gap-3 py-1 px-2 hover:bg-gray-300 rounded-md
                       w-full transition-all duration-300 cursor-pointer" onClick={()=>{
                        setwallModal(true)
                        setblurScreen(true)
                      }}
                  >
                    <FaHeart className="text-lg text-red-500" />
                    <div className="text-base" >Wall of love</div>
                  </div>
                  <div
                    className="flex flex-row items-center justify-start gap-3 py-1 px-2 hover:bg-gray-300 rounded-md
                       w-full transition-all duration-300"
                  >
                    <GoCodeReview className="text-lg" />
                    <div className="text-base">Single testimonial</div>
                  </div>
                  <div
                    className="flex flex-row items-center justify-start gap-3 py-1 px-2 hover:bg-gray-300 rounded-md
                       w-full transition-all duration-300"
                  >
                    <CiStar className="text-xl" />
                    <div className="text-base">Badge</div>
                  </div>
                  <div
                    className="flex flex-row items-center justify-start gap-3 py-1 px-2 hover:bg-gray-300 rounded-md
                       w-full transition-all duration-300"
                  >
                    <BiSolidWidget className="text-lg" />
                    <div className="text-base">Collection widget</div>
                  </div>
                  <div
                    className="flex flex-row items-center justify-start gap-3 py-1 px-2 hover:bg-gray-300 rounded-md
                       w-full transition-all duration-300"
                  >
                    <BsFileBarGraph />
                    <div className="text-base">Metrics</div>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col items-start justify-start gap-1 text-xl">
                <div className="font-semibold text-gray-600">Links</div>

                <div className="flex flex-col items-start justify-start w-full gap-1 px-2">
                  <div
                    className="flex flex-row items-center justify-start gap-3 py-1 px-2 hover:bg-gray-300 rounded-md
                       w-full transition-all duration-300"
                  >
                    <IoIosLink className="text-lg" />
                    <Link
                      to={`http://localhost:5173/review/${spaceDetails._id}`}
                      className="text-base"
                    >
                      Public landing page
                    </Link>
                  </div>
                  <div
                    className="flex flex-row items-center justify-start gap-3 py-1 px-2 hover:bg-gray-300 rounded-md
                       w-full transition-all duration-300"
                  >
                    <IoIosLink className="text-lg" />
                    <div className="text-base">Wall of love page</div>
                  </div>
                  <div
                    className="flex flex-row items-center justify-start gap-3 py-1 px-2 hover:bg-gray-300 rounded-md
                       w-full transition-all duration-300"
                  >
                    <FaVideo className="text-lg" />
                    <div className="text-base">Share all videos</div>
                  </div>
                  <div
                    className="flex flex-row items-center justify-start gap-3 py-1 px-2 hover:bg-gray-300 rounded-md
                       w-full transition-all duration-300"
                  >
                    <TbWorld className="text-lg" />
                    <div className="text-base">Custom domain</div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="right w-[70%] flex flex-col items-start justify-start py-4 px-4
             gap-4"
            >
              <div className="w-full flex flex-row items-start justify-between ">
                <input
                  type="text"
                  className="w-[80%] py-1 rounded-md border border-gray-300 px-4 focus:outline-none text-gray-900"
                  placeholder="Search by name, email"
                />
                <button className="btn border border-gray-500 px-5 py-1 rounded-md text-gray-900">
                  Options
                </button>
              </div>

              <div className="w-full  h-[740px] overflow-auto hide-scrollbar flex flex-col items-start justify-start gap-6 ">
                {testimonials.map((testi, idx) => {
                  return (
                    <TestiCard
                      key={idx}
                      {...testi}
                      tempArr={tempArr}
                      setspaceDetails={setspaceDetails}
                      settestimonials={settestimonials}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageTest;
