"use client"
import { context } from '@/context/Appcontext';
import { useClerk, useUser, UserButton, useAuth ,SignInButton} from '@clerk/nextjs';
import { ArrowRight02Icon, CoinsDollarIcon } from 'hugeicons-react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

const Navbar = () => {
  const { signOut, openSignIn } = useClerk();
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter()
  // const {getToken}= useAuth()
  // const gettoken=async()=>{
  //   const token =await getToken()
  //   console.log(token)
  // }
  // console.log(user?.id)
  const { Creadits, GenrateCreadits } = useContext(context)
  useEffect(() => {
    GenrateCreadits()
    // gettoken()
  }, [isSignedIn])
  // console.log(user?.id);
 
  return (
    <nav className="flex justify-between items-center py-4 px-2 bg-white">
      <div onClick={() => { router.push("/") }} className="flex cursor-pointer items-center">
        <h1 className="text-2xl font-bold text-black">Remove.bg</h1>
      </div>

      {
       
        isSignedIn && user ?
          <div className='flex gap-2 items-center flex-wrap-reverse lg:flex-nowrap justify-end '>
            <div onClick={() => { router.push("/buycredit") }} className='flex items-center gap-2 bg-[#fff719] cursor-pointer rounded-full p-2 hover:scale-105 duration-200'>
            <CoinsDollarIcon className='text-[#ff8800]  rounded-full ' size={25} />
            <p className=' '>Credits : {Creadits?Creadits:"0"}</p>
            </div>
            <p>Hi,{user?.fullName}</p>
            <UserButton  className="p-3 hover:scale-105 w-full duration-200" />
          </div> :
          <button onClick={() => { openSignIn() }} className='flex hover:scale-105 duration-200 items-center cursor-pointer gap-2 p-2 bg-black rounded-full text-white'>
            {/* <SignInButton mode='modal' className="cursor-pointer">Get Started</SignInButton> */}
            Get Started
            <ArrowRight02Icon size={20} />
          </button>
      }
    </nav>
  )
}

export default Navbar