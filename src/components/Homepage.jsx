"use client"
import Header from "./Header"
import Section from "./Section"
import Sectiontwo from "./Sectiontwo"
import Testimonials from "./Testimonials"
import Upload from "./Upload"
const Homepage = () => {
  return (
    <div  className="flex flex-col  h-auto scroll-smooth  ">
    <Header/>
    <Section/>
    <Sectiontwo/>
    <Testimonials/>
    <Upload/>
    
    </div>
  )
}

export default Homepage
