import {  Upload02Icon } from "hugeicons-react"
import Image from "next/image";
import { useRef } from "react";

const Header = () => {
    const upload = useRef(null);
  return (
    <>
   <div className="flex mb-16 flex-wrap-reverse justify-around items-center py-4 px-2">
  <div className="flex flex-col gap-2 lg:items-baseline md:items-baseline  items-center  justify-between w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
    <input ref={upload} type="file" id="upload" hidden/>
    <h1 className="lg:text-5xl md:text-5xl text-4xl font-bold text-center md:text-left">
      Remove the 

      <span className="bg-clip-text bg-gradient-to-r from-[#1532c7] to-[#9C27B0] text-transparent">
        background
      </span> 
      
      form image for free
    </h1>
    <h1 className="text-xl text-center md:text-left">Upload the image you want to remove the background</h1>
    <label htmlFor="upload" className="cursor-pointer">
      <button onClick={()=>{upload.current.click()}} className='bg-gradient-to-r cursor-pointer hover:scale-105 duration-300 from-[#3027b0] to-[#d51ee9] flex gap-2 text-white py-3 px-4 rounded-full'>
        Upload Image
        <Upload02Icon/>
      </button>
    </label>
  </div>
  <div className="mt-4 md:mt-0 md:w-1/2 lg:w-1/3 xl:w-1/4">
    <Image width={500} height={400} src="https://www.adobe.com/express/feature/ai/image/media_1a0c3267df73899911e2cea7031150b80ad4939a0.png?width=1200&format=pjpg&optimize=medium" alt="Random Image" className="w-full object-cover" />
  </div>
</div>
    </>
  )
}

export default Header
