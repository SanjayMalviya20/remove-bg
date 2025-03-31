"use-client"

import {  Contact02Icon, ContactIcon, Facebook02Icon, InstagramIcon } from "hugeicons-react"
import Link from "next/link"

const Footer = () => {
  return (
    <div className="flex   mt-10 flex-wrap gap-2  p-3 py-5 justify-around">
      <div className="flex gap-4 flex-wrap justify-center items-center">
        <h1 className="text-xl font-bold ">remove.bg</h1>
        <p className="text-center"> Copyright @SanjayMalviya | All rights reserved.</p>
        
      </div >
      <div className="flex gap-4 px-3 items-center">
        <Link href="https://www.instagram.com/sanjay_malviya19/">
      <InstagramIcon  className="shadow-[0px_0px_1px_black] bg-white rounded-full p-1" size={30}  cursor={"pointer"}/>
        </Link>
      <Facebook02Icon  className="shadow-[0px_0px_1px_black] bg-white rounded-full p-1" size={30} cursor={"pointer"}/>
      <a className="text-black  border-[1]  border-[#020202] rounded-full cursor-pointer hover:scale-105 duration-300  px-4 py-2  " href="https://wa.me/+918005693569">Contactus</a>
      </div>
      
    </div>
  )
}

export default Footer
