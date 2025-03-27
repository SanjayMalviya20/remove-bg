import { Inter, Geo,Baloo_Bhai_2 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ClerkProvider,
} from '@clerk/nextjs'
 
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" , weight: ["400", "500", "600", "700"] });
const geo = Geo({ subsets: ["latin"], variable: "--font-geo" , weight: ["400"] });
const bhai = Baloo_Bhai_2({ subsets: ["latin"], variable: "--font-bhai" , weight: ["400", "500", "600", "700"] });
export const metadata = {
  title: "bg-remove by sanjay",
  description: "Remove background from image",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
     
        className={` ${inter.variable} ${geo.variable} ${bhai.variable}     bg-[#e3e3e3] text-black `}
      >
        <Navbar />
        
        {children}
        <Footer/>
      </body>
    </html>
    </ClerkProvider>
  );
}
