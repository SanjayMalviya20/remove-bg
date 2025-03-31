"use client"
import { context } from "@/context/Appcontext"
import { useContext, useEffect } from "react"
const page = () => {
  const {GenrateCreadits} = useContext(context)
  useEffect(() => {
    GenrateCreadits()
  }, [])
  return (
    <>
    <div className="flex justify-center bg-white items-center h-[99vh]">
      <h1 className="lg:text-3xl text-md font-bold text-center">Successfully purchased your credits 🪙🥳</h1>
    </div>
    </>
  )
}

export default page
