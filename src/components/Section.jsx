import { Delete01Icon, Delete02Icon, Download01Icon, Download03Icon, ImageRemove01Icon, ImageRemove02Icon, Remove01Icon, Remove02Icon, Upload01Icon } from 'hugeicons-react'

const Section = () => {
  return (
    <>
       <h1 className='text-3xl mb-5  text-center'>  Steps to remove the background <br/> image in seconds</h1>
      <div className='flex flex-wrap mb-16 gap-5 justify-center '>
       <div className=' bg-[#f4b7ff] shadow-[0px_0px_1px_black] p-3 rounded-md'>
        <Upload01Icon size={40}  className='p-2 rounded-md bg-gradient-to-r  to-[#9C27B0] from-blue-500   '/>
        <p className='font-bold'>upload image</p>
        <p>Upload your image and get started</p>
       </div>
       <div className=' bg-[#94afff] shadow-[0px_0px_1px_black] p-3 rounded-md'>
        <ImageRemove02Icon size={40}  className='p-2 rounded-md bg-gradient-to-r  to-[#9C27B0] from-blue-500   '/>
        <p className='font-bold'>remove image</p>
        <p>Remove the background from your image</p>
       </div>
       <div className=' bg-[#d1aeff] shadow-[0px_0px_1px_black]  p-3 rounded-md'>
        <Download03Icon size={40}  className='p-2 rounded-md bg-gradient-to-r  to-[#9C27B0] from-blue-500   '/>
        <p className='font-bold'>download image</p>
        <p>Get your image and download it</p>
       </div>
       
      </div>
   
    </>
  )
}

export default Section
