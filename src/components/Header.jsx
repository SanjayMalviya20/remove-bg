"use client"
import Image from "next/image";
import UploadBtn from "./UploadBtn";
import { useContext, useEffect, useRef, useState } from "react";
import { context } from "@/context/Appcontext";
import { Upload02Icon } from "hugeicons-react";


const Header = () => {


  return (
    <>
      <div className="flex mb-16 flex-wrap-reverse justify-around   items-center py-4 px-2">
        <div className="flex flex-col gap-2 lg:items-baseline md:items-baseline  items-center  justify-between w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
         
          <h1 className="lg:text-5xl  md:text-[40px] text-3xl font-bold text-center md:text-left">
            Remove the 

            <span className="bg-clip-text bg-gradient-to-r from-[#1532c7] to-[#9C27B0] text-transparent">
             background
            </span>

          form image for free
          </h1>
          <h1 className="text-xl text-center md:text-left">Upload the image you want to remove the background</h1>
        <UploadBtn/>
        </div>
        <div className="mt-4 md:mt-0 md:w-1/2 lg:w-1/3 xl:w-1/4">
          <Image   width={500} height={400} src="https://www.adobe.com/express/feature/ai/image/media_1a0c3267df73899911e2cea7031150b80ad4939a0.png?width=1200&format=pjpg&optimize=medium" alt="Random Image" className=" lg:w-[600px] md:w-[350px] w-full object-cover" />
        </div>
      </div>
    </>
  )
}

export default Header
