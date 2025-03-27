"use client"

import { Upload02Icon } from "hugeicons-react"
import { useRef } from "react"

const Upload = () => {
    const upload =useRef(null)
  return (
    <>
    <div className="flex flex-col gap-10 items-center">
        <input  ref={upload} type="file" hidden />
        <h1 className="text-3xl text-center mt-5">See the magic.Try it now</h1>
        <label htmlFor="upload" className="cursor-pointer">
      <button onClick={()=>{upload.current.click()}} className='bg-gradient-to-r cursor-pointer hover:scale-105 duration-300 from-[#3027b0] to-[#d51ee9] flex gap-2 text-white py-3 px-4 rounded-full'>
        Upload Image
        <Upload02Icon/>
      </button>
      </label>
    </div>
      
    </>
  )
}

export default Upload
