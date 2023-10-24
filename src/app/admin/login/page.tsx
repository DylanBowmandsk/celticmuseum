"use client"
import { useState } from "react"
import {signIn} from "next-auth/react"
export default function Login() {

    const [password, setPassword] = useState<string | null>(null)

    async function login(){
        const res = await signIn("credentials",
        {password: password,redirect: false})
       res?.ok? window.location.href = "../admin": alert("invalid password")
    }

  return (
    <div className="flex h-screen flex-col w-1/4 mx-auto mt-40">
        <label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">Password</label>
        <input type="text" onChange={(e) => {setPassword(e.target.value)}} className="mb-4 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
        <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full my-5" onClick={login}>Submit</button>
    </div>
  )
}