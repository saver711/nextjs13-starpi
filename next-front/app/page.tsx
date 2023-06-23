import Image from "next/image"
import { Navbar } from "./components/navbar/navbar"
import DUBAI from "./assets/jeddah.jpg"
import LoadImage from "./components/LoadImage"
export default function Home() {
  return (
    <>
      <Navbar fixed />
      <header>
        <div className="h-[100vh] relative">
          <LoadImage src={DUBAI.src} alt="dubai" />
        </div>
      </header>
    </>
  )
}
