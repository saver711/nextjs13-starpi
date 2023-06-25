import Image from "next/image"
import DUBAI from "./assets/jeddah.jpg"
import { Navbar } from "./components/navbar/navbar"
export default function Home() {
  return (
    <>
      <Navbar fixed />
      <header>
        <div className="h-[100vh] relative">
          <Image src={DUBAI.src} fill alt="dubai" className="object-cover" />
        </div>
      </header>
    </>
  )
}
