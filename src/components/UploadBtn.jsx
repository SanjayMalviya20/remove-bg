"use cleint"

import { context } from "@/context/Appcontext";
import { Upload02Icon } from "hugeicons-react";
import { useContext, useRef, useState } from "react";

const UploadBtn = () => {
    const { removebgFromImage,image } = useContext(context)
    const upload = useRef(null);
   
   

    return (
        <>

            <label htmlFor="upload" className="cursor-pointer">
                <input hidden accept="image/*" name="file" onChange={(e) => { removebgFromImage(e.target.files[0]) }} ref={upload} type="file" id="upload" />
                <button onClick={() => { upload.current.click() }} className='bg-gradient-to-r mt-5 cursor-pointer hover:scale-105 duration-300 from-[#3027b0] to-[#d51ee9] flex gap-2 text-white py-3 px-4 rounded-full'>
                    Upload Image
                    <Upload02Icon />
                </button>
                {/* <button type="submit" className="btn">get</button> */}
            </label>
        </>
    )
}

export default UploadBtn
