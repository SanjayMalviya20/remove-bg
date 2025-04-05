import { Inter, Geo, Baloo_Bhai_2 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import AppcontextProvider from "@/context/Appcontext";
import { ToastContainer } from "react-toastify";

//fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "600", "700"] });
const geo = Geo({ subsets: ["latin"], variable: "--font-geo", weight: ["400"] });
const bhai = Baloo_Bhai_2({ subsets: ["latin"], variable: "--font-bhai", weight: ["400", "500", "600", "700"] });

//metadata
export const metadata = {
  title: "remove.bg by sanjay",
  description: "Remove background from image for free ",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <AppcontextProvider>
        <html lang="en">
          <body
            className={` ${inter.variable} ${geo.variable} ${bhai.variable}     bg-[#e3e3e3] text-black `}
          >
            <ToastContainer className={"z-50 p-1"} position="bottom-right" />
            <Navbar />
            {children}
            <Footer />
          </body>
        </html>
      </AppcontextProvider>
    </ClerkProvider>
  );
}
