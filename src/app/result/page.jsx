"use client"
import { context } from "@/context/Appcontext"
import { useContext, useRef } from "react"
import Image from "next/image"
import Loader from "@/components/Loader"

const page = () => {
  const { resultImage ,loader,removebgFromImage,image} = useContext(context)
console.log(resultImage)
const refInput = useRef(null);

  return (
    <div className="container  flex justify-center items-center md:h-[75vh] sm:h-[75vh] lg:h-[75vh]">
      {/* Card component */}
      <input ref={ refInput} type="file" accept="image/*" onChange={(e) => { removebgFromImage(e.target.files[0]) }} className="hidden" />
      <div className="card flex-col mt-10  m-auto p-5 sm:h-[70vh] lg:h-[70vh] md:lg:h-[70vh] gap-3  bg-white w-[75%] shadow-md flex justify-center  items-center">
        <div className="flex gap-3 lg:flex-nowrap md:flex-nowrap sm:flex-nowrap flex-wrap">
          <div className="flex  gap-3 flex-col">
            <h1>Original</h1>
            {
          //  loader?<div className="w-[200px] h-[200px]  md:h-[250px] md:w-[250px] lg:h-[300px] lg:w-[350px] bgblack flex justify-center items-center "><LoaderTwo/></div>:
            <Image  width={400}  height={400} className="rounded-md lg:h-[270px] w-[400px]" alt="image" src={image?URL.createObjectURL(image):"https://photoscissors.com/images/samples/3-before.jpg"} />
            }
          </div>
          <div className="flex gap-3  flex-col ">
            <h1>Background removed</h1>
            {
              loader?<div className="w-[200px] h-[200px]  md:h-[250px] md:w-[250px] lg:h-[300px] lg:w-[350px] bgblack flex justify-center items-center "><Loader/></div>:
              <Image width={400} height={400} className="rounded-md lg:h-[270px] w-[400px]" alt="image"  src={resultImage?resultImage:"https://photoscissors.com/images/samples/3-after.jpg"} />
            }
          </div>
        </div>
        <div className="flex lg:justify-end justify-center w-full flex-wrap items-center  gap-3 p-2">
          <button onClick={()=>{refInput.current.click()}} className="bg-gradient-to-r rounded-full from-[#3027b0] to-[#d51ee9]  cursor-pointer hover:scale-105 duration-300 text-white px-4 py-2  ">Try antoher image</button>
<a className="text-black  border-[1]  border-[#b027a9] rounded-full cursor-pointer hover:scale-105 duration-300  px-4 py-2  "  href={resultImage?resultImage:""} download>
  Download image      
</a>
        </div>
      </div>
    </div>
  )
}

export default page

