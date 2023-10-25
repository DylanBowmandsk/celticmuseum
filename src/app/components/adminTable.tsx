"use client"
import Image from 'next/image'
import { useState } from 'react';
import useSWR from 'swr'
import { useSession } from 'next-auth/react';
import { SessionProvider } from 'next-auth/react';


export default function AdminTable(){

    const [filteredShirts, setFilteredShirts] = useState<shirt[]>([])
    const [pageIndex, setPageIndex] = useState(0)
    const [fetchedData, setFetchedData]= useState<shirt[]>([])
    const [sorting, setSorting] = useState(true)
    const { data, error, isLoading } = useSWR(`/api/get-shirt/paginate-admin?page=${pageIndex}`, fetcher)

    type shirt = {
        id: string,
        player: string
        number : number
        match: string
        home : number
        date : Date
        path : string
        created: Date
    }

    async function fetcher (url){ 
        setSorting(true)
        const response = await fetch(url);
        const data = await response.json()
        if(fetchedData?.length < 1){
            setFetchedData(data.data.slice())
        }
        else{   
            let temp = fetchedData.slice()
            const joined = [ ...temp,...data.data]
            setFetchedData(joined)
        }
        setSorting(false)
        return data
    }

    async function deleteShirt(id) {
        const res = await fetch("/api/delete", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({id: id}),
        });
        window.location.reload()
    }
    if (error) return <div className='text-2xl m-auto'>Failed to load</div>

    if(!isLoading && fetchedData.length > 15){
        window.onscroll = function(ev) {
            if ((window.innerHeight + Math.round(window.scrollY + 100)) >= document.body.offsetHeight) {
                setPageIndex(pageIndex + 20)
            }
        };
    }

    return(
        <div className='flex flex-col w-full justify-center m-auto bg-slate-50'>
            {(isLoading && fetchedData.length < 1) || sorting?(
                <div className="h-screen w-full px-72 pt-20 pb-44 bg-white-50">
                    <div role="status" className='h-20 w-20 mx-auto my-40'>
                        <svg aria-hidden="true" className="inline w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ):""}
            <table className="table-auto mt-5 px-20">
                <thead>
                    <tr>
                    <th className="font-semibold text-xl">Image</th>
                    <th className="font-semibold text-xl">Match
                        <Image src={"/up-arrow.png"} onClick={() => {setFilteredShirts(fetchedData.sort((a,b) => a.match > b.match? 1:-1 ))}}  className="inline"width={25} height={25} alt="arrows"></Image>
                        <Image src={"/down-arrow.png"} onClick={() => {setFilteredShirts(fetchedData.sort((a,b) => a.match < b.match? 1:-1 ))}}  className="inline"width={25} height={25} alt="arrows"></Image>
                    </th>
                    <th className="font-semibold text-xl">Player
                        <Image src={"/up-arrow.png"} onClick={() => {setFilteredShirts(fetchedData.sort((a,b) => a.player > b.player? 1:-1 ))}}  className="inline"width={25} height={25} alt="arrows"></Image>
                        <Image src={"/down-arrow.png"} onClick={() => {setFilteredShirts(fetchedData.sort((a,b) => a.player < b.player? 1:-1 ))}}  className="inline"width={25} height={25} alt="arrows"></Image>
                        </th>
                    <th className="font-semibold text-xl">Number</th>
                    <th className="font-semibold text-xl">Date
                        <Image src={"/up-arrow.png"} onClick={() => {setFilteredShirts(fetchedData.sort((a,b) => a.date > b.date? 1:-1 ))}}  className="inline"width={25} height={25} alt="arrows"></Image>
                        <Image src={"/down-arrow.png"} onClick={() => {setFilteredShirts(fetchedData.sort((a,b) => a.date < b.date? 1:-1 ))}}  className="inline"width={25} height={25} alt="arrows"></Image>
                    </th>
                    <th className="font-semibold text-xl">Created
                        <Image src={"/up-arrow.png"} onClick={() => {setFilteredShirts(fetchedData.sort((a,b) => a.created > b.created? 1:-1 ))}}  className="inline"width={25} height={25} alt="arrows"></Image>
                        <Image src={"/down-arrow.png"} onClick={() => {setFilteredShirts(fetchedData.sort((a,b) => a.created < b.created? 1:-1 ))}}  className="inline"width={25} height={25} alt="arrows"></Image>
                    </th>
                    </tr>
                </thead>
                <tbody>
                {filteredShirts &&
                filteredShirts.map((shirt,key) => 
                    <tr key={key}>
                        <td>
                            <div className="h-32 w-32 relative inline-block">
                            <Image src={shirt.path.toString()} layout="fill" alt="default" className="shadow-xl"></Image>
                            </div>
                        </td>
                        <td><p className="text-xl p-16 text-center">{shirt.match}</p></td>
                        <td><p className="text-xl p-16 text-center">{shirt.player}</p></td>
                        <td><p className="text-xl p-16 text-center">{shirt.number}</p></td>
                        <td><p className="text-xl p-16 text-center">{new Date(shirt.date).toLocaleDateString().slice(0,10).replace(/-/g,"/")}</p></td>
                        <td><p className="text-xl p-16 text-center">{new Date(shirt.created).toString().slice(0,21).replace(/-/g,"/")}</p></td>
                        <td><Image className='filter grayscale contrast-400 hover:filter-none' src={"/delete-icon.png"} onClick={() => deleteShirt(shirt.id)} alt="default" width={40} height={40}></Image></td>
                        <td><Image className='pb-1 ml-2 filter grayscale contrast-400 hover:filter-none' src={"/edit.png"} onClick={() => window.location.href = "admin/modify?id="+shirt.id} alt="default" width={30} height={30}></Image></td>
                    </tr>
                )
                }
                {filteredShirts.length < 1 &&
                 fetchedData.map((shirt,key) => 
                    <tr key={key}>
                        <td>
                            <div className="h-32 w-32 relative inline-block">
                            <Image src={shirt.path.toString()} layout="fill" alt="default" className="shadow-xl"></Image>
                            </div>
                        </td>
                        <td><p className="text-xl p-16 text-center">{shirt.match}</p></td>
                        <td><p className="text-xl p-16 text-center">{shirt.player}</p></td>
                        <td><p className="text-xl p-16 text-center">{shirt.number}</p></td>
                        <td><p className="text-xl p-16 text-center">{new Date(shirt.date).toLocaleDateString().slice(0,10).replace(/-/g,"/")}</p></td>
                        <td><p className="text-xl p-16 text-center">{new Date(shirt.created).toString().slice(0,21).replace(/-/g,"/")}</p></td>
                        <td><Image className='filter grayscale contrast-400 hover:filter-none' src={"/delete-icon.png"} onClick={() => deleteShirt(shirt.id)} alt="default" width={40} height={40}></Image></td>
                        <td><Image className='pb-1 ml-2 filter grayscale contrast-400 hover:filter-none' src={"/edit.png"} onClick={() => window.location.href = "admin/modify?id="+shirt.id} alt="default" width={30} height={30}></Image></td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}