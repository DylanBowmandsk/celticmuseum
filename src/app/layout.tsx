import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from "next/image"
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Match Worn Celtic'
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <nav className='flex items-center justify-between bg-gradient-to-t from-green-800 to-green-700 text-white px-72'>
          <div>
            <Image className='inline-block' src="/celtic-logo-vector-white.png" width={100} height={100} alt='Celtic Logo'/>
            <h1 className='inline text-xl  p-3'>The Celtic Museum</h1>
          </div>
            <ul className='inline-block h-100'>
              <Link href="/"><li className='inline p-5'>Home</li></Link>
              <Link href="/admin"><li className='inline p-5'>Shirts</li></Link>
              <li className='inline p-5'>Wanted Shirts</li>
              <li className='inline p-5'>Contact</li>
            </ul>
        </nav>
        {children}
      </body>
    </html>
  )
}
