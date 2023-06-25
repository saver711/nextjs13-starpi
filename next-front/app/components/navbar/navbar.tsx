import Image from "next/image"
import Link from "next/link"
import { LogButton } from "../utils/log-button"
import { Username } from "../user/username"

export const Navbar = async ({ fixed }: { fixed?: boolean }) => {

  return (
    <nav
      className={`flex justify-between items-center p-4 ${
        fixed ? `fixed top-0 start-0 w-full z-40` : "bg-slate-700 mb-10"
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
        <Username />
        {/* <h4>{session?.user?.name}</h4> */}
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
