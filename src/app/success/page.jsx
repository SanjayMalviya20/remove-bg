"use client"
import { context } from "@/context/Appcontext"
import { useContext, useEffect } from "react"
import { toast } from "react-toastify"
const page = () => {
  const {GenrateCreadits,setSessionid,Sessionid} = useContext(context)
  useEffect(() => {
    GenrateCreadits()
  }, [])


  const getSuccessfullyCredits=async()=>{
    const sessionId = localStorage.getItem("sessionId");
    const data =await fetch(`https://remove-bg-hdc8.vercel.app/api/payment/?session_id=${sessionId}`,{
      method:"GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const res=await data.json();
    if(res?.success){
      toast.success(`Payment Successful and you have ${res?.credits} credits` )
      localStorage.removeItem("sessionId")
    }
  }

  useEffect(()=>{
    const sessionid = localStorage.getItem("sessionId");
   if(sessionid){
      getSuccessfullyCredits()
    }
  },[Sessionid])
  return (
    <>
    <div className="flex justify-center bg-white items-center h-[99vh]">
      <h1 className="lg:text-3xl text-md font-bold text-center">Successfully purchased your credits 🪙🥳</h1>
    </div>
    </>
  )
}

export default page
