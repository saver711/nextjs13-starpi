import { Metadata } from "next"
import React from "react"
import { Navbar } from "../components/navbar/navbar"

export const metadata: Metadata = {
  title: "articles",
  description: "Brightskies articles",
}
export default function articlesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="px-7">{children}</main>
    </>
  )
}
