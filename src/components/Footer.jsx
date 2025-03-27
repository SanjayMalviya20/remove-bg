"use-client"

import { Facebook01Icon, Facebook02Icon, InstagramIcon, TwitterIcon } from "hugeicons-react"
import Link from "next/link"

const Footer = () => {
  return (
    <div className="flex   mt-10 flex-wrap gap-2  p-3 py-5 justify-around">
      <div className="flex gap-4 flex-wrap justify-center items-center">
        <h1 className="text-xl font-bold ">remove.bg</h1>
        <p className="text-center"> Copyright @SanjayMalviya | All rights reserved.</p>
        
      </div >
      <div className="flex gap-4 px-3">
        <Link href="https://www.instagram.com/sanjay_malviya19/">
      <InstagramIcon  className="shadow-[0px_0px_6px_black] bg-white rounded-full p-1" size={30}  cursor={"pointer"}/>
        </Link>
      <Facebook02Icon  className="shadow-[0px_0px_6px_black] bg-white rounded-full p-1" size={30} cursor={"pointer"}/>
      <TwitterIcon className="shadow-[0px_0px_6px_black] bg-white rounded-full p-1" size={30}  cursor={"pointer"}/>
      </div>
    </div>
  )
}

export default Footer
