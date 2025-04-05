"use client";
import { useAuth } from "@clerk/nextjs";
import {  useEffect } from "react";
import { toast } from "react-toastify";
const page = () => {
  const {getToken} = useAuth();
  // Define an array of plans
  const plans = [
    {
      id: 1,
      name: "Basic",
      price: "₹50",
      features: [ "Purchase"],
      credits: {
        credits: 30,
       
        bonusText: "Best for personal use",
      },
    },
    {
      id: 2,
      name: "Premium",
      price: "₹250",
      features: ["Purchase"],
      credits: {
        credits: 100,
      
        bonusText: "Best for  businesses",
      },
    },
    {
      id: 3,
      name: "Enterprise",
      price: "₹500",
      features: [ "Purchase"],
      credits: {
        credits: 400,
       
        bonusText: "Best for large organizations",
      },
    },
  ];

  const payementHandler = async (plans) => {
    if (!plans) {
      return toast.error("Please select a plan");
    }
   
    const token = await getToken();
    const response = await fetch(`https://remove-bg-hdc8.vercel.app/api/payment/?plan=${plans}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token":`${token}`,
      },
    });
    const data = await response.json();
    // console.log(data);
    window.location.href = data?.url;
    localStorage.setItem("sessionId", data.sessionId);
    setSessionid(data.sessionId)
      }

      
  return (
    <>
      <div className=" pt-14 ">
        <div className="container mx-auto p-4 pt-6">
          <div className="w-full flex justify-center flex-col items-center">
            <button className="btn btn-outline hover:text-white border-[#000000] text-black font-bold py-2 px-4 rounded">
              Our Plans
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              Choose your plan that fits your needs
            </h1>
          </div>
          <div className="flex gap-3 lg:flex-nowrap md:flex-nowrap flex-wrap justify-center mt-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="w-full bg-white  shadow-[0px_0px_1px_black] hover:scale-105 duration-300 md:w-1/3 xl:w-1/3 p-6 text-center"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h2>
                <p className="text-lg text-gray-600 mb-4">
                  Price: {plan.price}
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  Credits: {plan.credits.credits}  
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  {plan.credits.bonusText}
                </p>
                <>
                  {plan.features.map((feature) => (
                    <button 
                      onClick={() => payementHandler(plan?.name)}
                      key={feature}
                      className="btn"
                    >
                      {feature}
                    </button>
                  ))}
                </>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;