import React from 'react'
import { Navbar } from '../components/navbar/navbar'
export default function articleLayout({ children }: { children: React.ReactNode }) {
  return <>
  <Navbar />
  {children}</>
}
