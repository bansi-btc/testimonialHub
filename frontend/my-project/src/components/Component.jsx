import { CodeBlock, dracula } from 'react-code-blocks';
import { toast } from 'react-toastify';
const Codeblock = ({spaceId, isDarkMode, handleCopyCode}) => {

  // console.log("Himanshu"spaceId)
  const codeString = `import React, { useEffect, useState } from 'react'
  import { Swiper, SwiperSlide } from "swiper/react";
  import { Navigation, Autoplay } from "swiper/modules";
  
  import "swiper/css";
  import "swiper/css/navigation";
  import "swiper/css/pagination";
  import { useSelector } from 'react-redux';
  import { toast } from 'react-toastify';
  import axios from 'axios';
  import { FaStar } from "react-icons/fa";
  import { RiDoubleQuotesL } from "react-icons/ri";
  
  
  const Slider = () => {
      const spaceId="${spaceId}";

      //isko dynamic banana hai bas
  
      const tempArr=[1, 2, 3, 4, 5];
  
      const token=useSelector((state)=>state.user.token);
      const [slidesDetails, setslidesDetails] = useState({
          isAutoplay:true,
          isDarkMode:false,
          slidesCount:2,
        })
  
       const [testimonials, settestimonials] = useState([]);
  
      const fetchSpaceDetails = async () => {
          try {
              
              // console.log(spaceId);
            const formData = new FormData();
      
            formData.append("token", token);
            formData.append("spaceId", spaceId);
      
            const res = await axios.post(
              "http://localhost:3000/api/v1/getSpaceDetails",
              formData
            );
  
            // console.log(res.data.spaceDetails.testimonials);
  
            let testArr=res.data.spaceDetails.testimonials.filter((t)=>{
              return t.liked===true;
            })
            console.log(testArr)
  
            settestimonials(testArr)
  
          //   settestimonials(res.data.spaceD
          } catch (err) {
          // toast.error(err.message);
          console.log(err.message);
          }
        };
  
  
      useEffect(()=>{
          fetchSpaceDetails();
      }, [])
    return (
      <div className='w-full'>
          {slidesDetails.isAutoplay && <Swiper
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
                centeredSlides={true}
                
              >
                  {testimonials.map((testi, index)=>{
                      return <SwiperSlide key={index}>
                      <div className={\`w-[400px] min-h-[220px]  mx-auto rounded-md flex flex-col items-center justify-center gap-6
                      py-5 px-10 ${isDarkMode?"bg-gray-900 border border-gray-500":"bg-gradient-to-tr from-[#FFDEE9] to-[#B5FFFC]"}
                      transition-all duration-300 flex flex-row items-center justify-center\`}>
                        <div className={\`text-center text-lg ${isDarkMode?"text-gray-100":"text-gray-600"}   relative w-full
                        text-2xl\`}>
                        <RiDoubleQuotesL className="absolute text-5xl text-green-500 text-opacity-40 left-0 top-[-20px]"/>
      
                         <div className=" w-full break-words text-center text-xl">{testi.review} Lorem, ipsum dolor.</div>
                        </div>
      
                        <div className="w-full flex flex-row items-center justify-center gap-1">
                          {tempArr.map((ele, idx)=>{
                              return <FaStar key={idx} className={\`text-xl  \${ele<=testi.rating?"text-yellow-400":"text-gray-600"}\`}/>
                          })}
                        </div>
                        <div className={\`w-full flex flex-col items-center justify-start gap-0 ${isDarkMode?"text-gray-400":"text-gray-900"}\`}>
                        <div className="font-semibold text-xl">{testi.name}</div>
                        <div className='text-lg'>Ceo, apple</div>
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
                centeredSlides={true}
                
              >
                  {testimonials.map((testi, index)=>{
                      return <SwiperSlide key={index}>
                      <div className={\`w-[400px] min-h-[220px]  mx-auto rounded-md flex flex-col items-center justify-center gap-6
                      py-5 px-10 ${isDarkMode?"bg-gray-900 border border-gray-500":"bg-gradient-to-tr from-[#FFDEE9] to-[#B5FFFC]"}
                      transition-all duration-300 flex flex-row items-center justify-center\`}>
                        <div className={\`text-center text-lg ${isDarkMode?"text-gray-100":"text-gray-600"}   relative w-full
                        text-2xl\`}>
                        <RiDoubleQuotesL className="absolute text-5xl text-green-500 text-opacity-40 left-0 top-[-20px]"/>
      
                         <div className=" w-full break-words text-center text-xl">{testi.review} Lorem, ipsum dolor.</div>
                        </div>
      
                        <div className="w-full flex flex-row items-center justify-center gap-1">
                          {tempArr.map((ele, idx)=>{
                              return <FaStar key={idx} className={\`text-xl  \${ele<=testi.rating?"text-yellow-400":"text-gray-600"}\`}/>
                          })}
                        </div>
                        <div className={\`w-full flex flex-col items-center justify-start gap-0 ${isDarkMode?"text-gray-400":"text-gray-900"}\`}>
                        <div className="font-semibold text-xl">{testi.name}</div>
                        <div className='text-lg'>Ceo, apple</div>
                        </div>
                      </div>
                    </SwiperSlide>
                  })}
                
                
              </Swiper>}
      </div>
    )
  }
  
  export default Slider`

// const handleCopyCode=async()=>{
//     await navigator.clipboard.writeText(codeString);
//     toast.success("code copied successfully")
// }
  return (

    <div className='w-full bg-gray-900 border border-gray-700 rounded-md h-[300px] overflow-auto hide-scrollbar relative'>

        <div className='text-base text-gray-200 absolute right-3 top-3 bg-gray-900 border border-gray-700 py-1 px-4
        rounded-md' onClick={()=>{handleCopyCode(codeString)}}>Copy code</div>
    <CodeBlock
      text={codeString}
      language={"javascript"}
      showLineNumbers={false}
      theme={dracula}
    />
    </div>
  );
};

export default Codeblock;