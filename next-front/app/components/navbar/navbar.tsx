import Image from "next/image"
import Link from "next/link"
import { UserInfo } from "../user/userInfo"
import { LogButton } from "../utils/LogButton"
import { getSession } from "next-auth/react"
import { authOptions } from "@/app/api/auth/authOptions"
import { getServerSession } from "next-auth"


export const Navbar = async ({ fixed }: { fixed?: boolean }) => {

  // ممكن استخدم دي عادي في اي سيرفر كمبوننت
  const session = await getServerSession(authOptions)
  console.log(`Navbar ~ session:`, session)

  return (
    <nav
      className={`flex justify-between items-center p-4 ${
        fixed ? `fixed top-0 start-0 w-full z-50` : "bg-slate-700"
      }`}
    >
      <div className="flex items-center">
        <Image
          className="me-4"
          src="/logo.png"
          alt="logo"
          width={70}
          height={70}
        />
        <UserInfo />
      </div>
      <div className="flex">
        <ul className="flex [&>*:not(:last-child)]:me-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/articles">Articles</Link>
          </li>
        </ul>
        <div className="ms-6">
          <LogButton />
        </div>
      </div>
    </nav>
  )
}
