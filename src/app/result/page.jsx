"use-client"

import Image from "next/image"

const page = () => {
  return (
    <div className="container  flex justify-center items-center md:h-[75vh] sm:h-[75vh] lg:h-[75vh]">
      {/* Card component */}
      <div className="card flex-col   m-auto p-5 sm:h-[70vh] lg:h-[70vh] md:lg:h-[70vh] gap-3  bg-white w-[75%] shadow-md flex justify-center  items-center">
        <div className="flex gap-3 lg:flex-nowrap md:flex-nowrap sm:flex-nowrap flex-wrap">
          <div className="flex  gap-3 flex-col">
            <h1>Original</h1>
            <Image width={400} height={400} className="rounded-md" src="https://photoscissors.com/images/samples/3-before.jpg" />
          </div>
          <div className="flex gap-3  flex-col ">
            <h1>Background removed</h1>
            <Image width={400} height={400} className="rounded-md" src="https://photoscissors.com/images/samples/3-after.jpg" />
          </div>
        </div>
        <div className="flex justify-end w-full gap-3 p-2">
          <button className="bg-gradient-to-r rounded-full from-[#3027b0] to-[#d51ee9]  cursor-pointer hover:scale-105 duration-300 text-white px-4 py-2  ">Try antoher image</button>
          <button className="text-black  border-[1]  border-[#b027a9] rounded-full cursor-pointer hover:scale-105 duration-300  px-4 py-2  ">Download image</button>

        </div>
      </div>
    </div>
  )
}

export default page
