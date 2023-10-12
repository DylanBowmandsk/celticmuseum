"use client"
import { useState } from "react"

export default function Home() {

    const [name, setName] = useState<string | null>()
    const [subject, setSubject] = useState<string | null>()
    const [message, setMessage] = useState<string | null>()

    return(
        <div className="flex h-screen mt-32">
            <div className="w-1/2 pl-72">
                <h1 className="text-4xl">Get in contact!</h1>
                <h2 className="text-3xl mt-5">You can reach with any offers or queries regarding the collection </h2>
            </div>
            <div className="w-1/2 pr-72">
            <form>
                <label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">Name</label>
                <input type="text" name="name" pattern='^[a-zA-Z ]*$' onChange={e =>  setName(e.target.value)} className="mb-4 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                <label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">Subject</label>
                <input type="text" name="subject" pattern='^[a-zA-Z ]*$' onChange={e =>  setSubject(e.target.value)} className="mb-4 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                <label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">Message</label>
                <input type="text" name="subject" pattern='^[a-zA-Z ]*$' onChange={e =>  setMessage(e.target.value)} className="mb-4 appearance-none block w-full h-24 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                <button onClick={() => {window.location.href = `mailto:thecelticmuseum.mail@gmail.com?subject=${subject}&body=${message}`;}} className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-16 rounded-full my-5">Submit</button>
            </form>
            </div>
        </div>
    )
}