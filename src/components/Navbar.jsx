"use client"
import { SignInButton,useClerk,useUser,UserButton } from '@clerk/nextjs';
import { ArrowRight02Icon } from 'hugeicons-react';

const Navbar = () => {
const { signOut,openSignIn } = useClerk();
  const { user, isLoaded ,isSignedIn} = useUser();
  return (
    <nav className="flex justify-between items-center py-4 px-2 bg-white">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-black">Remove.bg</h1>
      </div>
      {
        isSignedIn && user ?
        <div>
          <UserButton  className="p-3 hover:scale-105"/>
        </div>:
        <button onClick={()=>{openSignIn()}} className='flex hover:scale-105 duration-200 items-center cursor-pointer gap-2 p-2 bg-black rounded-full text-white'>
          {/* <SignInButton mode='modal' className="cursor-pointer">Get Started</SignInButton> */}
          Get Started
        <ArrowRight02Icon size={20} />
        </button>
      }
    </nav>
  )
}

export default Navbar