"use client";
const page = () => {
  
  // Define an array of plans
  const plans = [
    {
      id: 1,
      name: "Basic",
      price: "$9.99",
      features: [ "Basic Support"],
      credits: {
        credits: 100,
       
        bonusText: "Best for personal use",
      },
    },
    {
      id: 2,
      name: "Premium",
      price: "$19.99",
      features: ["Priority Support"],
      credits: {
        credits: 500,
      
        bonusText: "Best for  businesses",
      },
    },
    {
      id: 3,
      name: "Enterprise",
      price: "$49.99",
      features: [ "Dedicated Support"],
      credits: {
        credits: 5000,
       
        bonusText: "Best for large organizations",
      },
    },
  ];

  return (
    <>
      <div className="h-screen pt-14 ">
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