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
    const [uploading, setUploading] = useState<boolean>(false)

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
                <div className='flex items-center'>
                    <button type="submit"  onClick={() => {modifyShirt(); setUploading(true)}} className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full my-5">Submit</button>
                    {uploading && <div role="status" className='ml-3'>
                        <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span>Uploading...</span>
                        <span className="sr-only">Loading...</span>
                    </div>}
                </div>
            </div>
        </div>
    )
}