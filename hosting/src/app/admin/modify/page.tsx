"use client"
import { imageConfigDefault } from 'next/dist/shared/lib/image-config'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { match } from 'assert'


export default function Modify() {

    const searchParams: any = useSearchParams()
    const [id, setId] = useState(searchParams.get('id'))
    const [imageUrl, setImageUrl] = useState<string | null | ArrayBuffer>("/placeholder-image.JPG")
    const [image, setImage] = useState<string | null | ArrayBuffer>("/placeholder-image.JPG")
    const [player, setPlayer] = useState<string | null>(null)
    const [number, setNumber] = useState<number | null>(null)
    const [teamOne, setTeamOne] = useState<string | null>(null)
    const [teamTwo, setTeamTwo] = useState<string | null>(null)
    const [home, setHome] = useState<number | null>(null)
    const [date, setDate] = useState<string | null>(null)

    useEffect(() => {
        getShirt(id)
    }
    ,[])

    interface shirt {
        id : string
        player: string
        number : number
        match: string
        home : number
        date : string
        path : string

    }

    async function getShirt(id){
        const res = await fetch("/api/get-shirt/"+id)
        let data = await res.json()
        data = data.data
        setPlayer(data.player)
        setNumber(data.number)
        const teamOne = data.match.split(" ")[0]
        const teamTwo = data.match.split(" ")[2]
        setTeamOne(teamOne)
        setTeamTwo(teamTwo)
        setHome(data.home)
        const date = new Date(data.date)
        setDate(date.toLocaleDateString().slice(0,10).replace(/-/g,"/"))
        setImageUrl(data.path)

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


    async function modifyShirt() {
        const shirt : shirt = {
            id : id as string,
            player: player as string,
            number : number as number,
            match: teamOne + " Vs " + teamTwo as string,
            home : home as number,
            date : date as string,
            path : imageUrl as string,
    
        }

        const res = await fetch("/api/modify", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
            body: JSON.stringify(shirt),
        });
        window.location.href = "../admin" 
    }

    return (
        <div className="flex h-screen justify-center yw-1/4 my-14" >
            <div>
                <h1 className="text-4xl m-auto w-96 mt-2 mb-10 text-center">Modify shirt</h1>
                <label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">Player</label>
                <input type="text" defaultValue={player as string} name="player" onChange={e =>  setPlayer(e.target.value)} className="mb-4 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                <label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">Number</label>
                <input type="text" defaultValue={number as number} name="number" onChange={e =>  setNumber(parseInt(e.target.value))} className="mb-4 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                <label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">Match</label>
                <div>
                    <input type="text" defaultValue={teamOne as string} name="teamOne" onChange={e =>  setTeamOne(e.target.value)} className="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    <span className="mb-2 px-2 uppercase tracking-wide text-gray-700 text-xs font-bold">Vs</span>
                    <input type="text" defaultValue={teamTwo as string} name="match" onChange={e =>  setTeamTwo(e.target.value)} className="mb-4 appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
                <label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">Home/Away</label>
                <select name="home" defaultValue={home == 1? "Home": "Away"} onChange={e =>  setHome(parseInt(e.target.value))} className="mb-4 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                    <option value="1">Home</option>
                    <option value="0">Away</option>
                </select>
                <label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">Date worn</label>
                <input type="text" placeholder='dd/mm/yyy' defaultValue={date as string} name="date" onChange={e =>  setDate(e.target.value)} className=" mb-4 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                <label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">Shirt Image</label>
                <div>
                    <Image src={imageUrl as string} width={100} height={100} alt="default" className='pt-2 inline'></Image>
                    <input type="file" onChange={e => {getImage(e)}} id="myFile" name="filename" className='ml-16'></input>
                </div>
                <button type="submit"  onClick={modifyShirt} className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full my-5">Submit</button>
            </div>
        </div>
    )
}