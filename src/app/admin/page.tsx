"use client"
import { imageConfigDefault } from 'next/dist/shared/lib/image-config'
import Image from 'next/image'
import { useState } from 'react'

export default function Admin() {

    const [imageUrl, setImageUrl] = useState<string | null | ArrayBuffer>("/placeholder-image.JPG")
    const [image, setImage] = useState<string | null | ArrayBuffer>("/placeholder-image.JPG")
    const [player, setPlayer] = useState<string | null>(null)
    const [number, setNumber] = useState<number | null>(null)
    const [teamOne, setTeamOne] = useState<string | null>(null)
    const [teamTwo, setTeamTwo] = useState<string | null>(null)
    const [home, setHome] = useState<number | null>(null)
    const [date, setDate] = useState<string | null>(null)

    interface shirt {
        player: string
        number : number
        match: string
        home : number
        date : string
        path : string

    }

    function getImage(e) {
        if (e.target.files && e.target.files[0]){
            const reader = new FileReader();

            reader.addEventListener("load", () => {
                setImageUrl(reader.result)
                
            })
            setImage(e.target.files[0])
            reader.readAsDataURL(e.target.files[0])
        }
    }


    async function uploadImage() {
        const shirt : shirt = {
            path : imageUrl as string,
            player: player as string,
            number : number as number,
            match: teamOne as string,
            home : home as number,
            date : date as string
    
        }

        const res = await fetch("http://localhost:3000/api/upload", {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
    },
            body: JSON.stringify(shirt),
        });
    }

    return (
        <div className="flex justify-center yw-1/4 my-14" >
            <form >
                <label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">Player</label>
                <input type="text" name="player" onChange={e =>  setPlayer(e.target.value)} className="mb-4 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                <label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">Number</label>
                <input type="text" name="number" onChange={e =>  setNumber(parseInt(e.target.value))} className="mb-4 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                <label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">Match</label>
                <div>
                    <input type="text" name="teamOne" onChange={e =>  setTeamOne(e.target.value)} className="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    <span className="mb-2 px-2 uppercase tracking-wide text-gray-700 text-xs font-bold">Vs</span>
                    <input type="text" name="match" onChange={e =>  setTeamTwo(e.target.value)} className="mb-4 appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
                <label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">Home/Away</label>
                <select name="home" onChange={e =>  setHome(parseInt(e.target.value))} className="mb-4 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                    <option value="1">Home</option>
                    <option value="0">Away</option>
                </select>
                <label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">Date worn</label>
                <input type="text" name="date" onChange={e =>  setDate(e.target.value)} className=" mb-4 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                <label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">Shirt Image</label>
                <div>
                    <Image src={imageUrl as string} width={100} height={100} alt="default" className='pt-2 inline'></Image>
                    <input type="file" onChange={e => {getImage(e)}} id="myFile" name="filename" className='ml-16'></input>
                </div>
                <button type="submit" onClick={uploadImage} className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full my-5">Submit</button>
            </form>
        </div>
    )
}