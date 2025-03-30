"use client"
import { useAuth, useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { createContext, useState } from "react"
export const context = createContext()
import React from 'react'
import { toast } from "react-toastify"

const AppcontextProvider = (props) => {
  const [Creadits, setCreadits] = useState(null);
  const [loader, setloader] = useState(false);
  const { getToken, isSignedIn } = useAuth()
  const { openSignIn } = useClerk();
  const [image, setimage] = useState(null);
  const [resultImage, setresultImage] = useState(null);
  const router = useRouter()
  const GenrateCreadits = async () => {
    try {
      const token = await getToken()
      const res = await fetch("https://remove-bg-hdc8.vercel.app/api/getcredits", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "token": `${token}`
        }
      })
      const data = await res.json()
      if (data) {
        setCreadits(data?.creadits)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const removebgFromImage = async (url) => {
    const token = await getToken()

    if (!isSignedIn) {
      openSignIn()
      return toast.error("You are not logged in")
    }
    if (!url) {
      return toast.error("Please upload an image")
    }
    if (Creadits === 0) {
      router.push("/buycredit")
      return toast.error("You have no credits")
    }
    setimage(url)
    const formdata = new FormData()
    formdata.append('file', url)
    setloader(true)
    router.push("/result")
    const response = await fetch('https://remove-bg-hdc8.vercel.app/api/imageController', {
      method: 'POST',
      headers: {
        "token": `${token}`
      },
      body: formdata

    })
    const data = await response.json();
    setresultImage(data?.url)
   
    setloader(false)
    // console.log(data)
    GenrateCreadits()

  }
  console.log(resultImage)
  return (
    <context.Provider value={{ Creadits, GenrateCreadits, setCreadits, removebgFromImage, image, resultImage, loader }}>
      {props.children}
    </context.Provider>
  )
}

export default AppcontextProvider
