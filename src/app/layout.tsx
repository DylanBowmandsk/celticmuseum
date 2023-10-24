import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from "next/image"
import Link from 'next/link'
import Footer from "./components/footer";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Celtic Museum',
  description: 'The celtic museum is the home of the worlds largest collection of match worn celtic shirts',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <title>The Celtic Museum</title>
        <meta name="description" content="The celtic museum is the home of the worlds largest collection of match worn celtic tops" />
        <meta name="google-site-verification" content="dSFyhGzo9ow_WBNzgZkeOACgbc62s2mLh85NOJRXDt4" />
        <link rel="icon" href="/favicon.ico" sizes="any"/>
      </head>
      <body className={inter.className+" flex flex-col"}>
      <nav className='flex items-center justify-between bg-gradient-to-t from-green-800 to-green-700 text-white px-72'>
          <Link href="/"><div>
            <Image className='inline-block' src="/celtic-logo-vector-white.png" width={100} height={100} alt='Celtic Logo'/>
            <h1 className='inline text-xl  p-3'>The Celtic Museum</h1>
          </div></Link>
            <ul className='inline-block h-100'>
              <Link href="/"><li className='inline p-5 hover:text-slate-100'>Home</li></Link>
              <Link href="/shirts"><li className='inline p-5 hover:text-slate-100'>Collection</li></Link>
              <Link href="/contact"><li className='inline p-5 hover:text-slate-100'>Contact</li></Link>
            </ul>
        </nav>
        {children}
        <div className='relative bottom'>
        <Footer/>
        </div>
      </body>
    </html>
  )
}
