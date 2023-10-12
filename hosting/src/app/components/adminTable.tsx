"use client"
import Image from 'next/image'
import { useState } from 'react';

export default function AdminTable({shirts}){
    
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
    
    const [filteredShirts, setFilteredShirts] = useState(shirts)

    return(
        <div className='flex justify-center m-auto bg-slate-50'>
            <table className="table-auto mt-5 px-20">
                <thead>
                    <tr>
                    <th className="font-semibold text-xl">Image</th>
                    <th className="font-semibold text-xl">Match
                        <Image src={"/up-arrow.png"} onClick={() => {setFilteredShirts([].concat(shirts.sort((a,b) => a.match > b.match? 1:-1 )))}}  className="inline"width={25} height={25} alt="arrows"></Image>
                        <Image src={"/down-arrow.png"} onClick={() => {setFilteredShirts([].concat(shirts.sort((a,b) => a.match < b.match? 1:-1 )))}}  className="inline"width={25} height={25} alt="arrows"></Image>
                    </th>
                    <th className="font-semibold text-xl">Player
                        <Image src={"/up-arrow.png"} onClick={() => {setFilteredShirts([].concat(shirts.sort((a,b) => a.player > b.player? 1:-1 )))}}  className="inline"width={25} height={25} alt="arrows"></Image>
                        <Image src={"/down-arrow.png"} onClick={() => {setFilteredShirts([].concat(shirts.sort((a,b) => a.player < b.player? 1:-1 )))}}  className="inline"width={25} height={25} alt="arrows"></Image>
                        </th>
                    <th className="font-semibold text-xl">Number</th>
                    <th className="font-semibold text-xl">Date
                        <Image src={"/up-arrow.png"} onClick={() => {setFilteredShirts([].concat(shirts.sort((a,b) => a.date > b.date? 1:-1 )))}}  className="inline"width={25} height={25} alt="arrows"></Image>
                        <Image src={"/down-arrow.png"} onClick={() => {setFilteredShirts([].concat(shirts.sort((a,b) => a.date < b.date? 1:-1 )))}}  className="inline"width={25} height={25} alt="arrows"></Image>
                    </th>
                    </tr>
                </thead>
                <tbody>
                {filteredShirts.map((shirt,key) => 
                    <tr key={key}>
                    
                        <td>
                            <div className="h-32 w-32 relative inline-block">
                            <Image src={shirt.path.toString()} layout="fill" alt="default" className="shadow-xl"></Image>
                            </div>
                        </td>
                        <td><p className="text-xl p-16 text-center">{shirt.match}</p></td>
                        <td><p className="text-xl p-16 text-center">{shirt.player}</p></td>
                        <td><p className="text-xl p-16 text-center">{shirt.number}</p></td>
                        <td><p className="text-xl p-16 text-center">{shirt.date.toISOString().slice(0,10).replace(/-/g,"/")}</p></td>
                        <td><Image className='filter grayscale contrast-400 hover:filter-none' src={"/delete-icon.png"} onClick={() => deleteShirt(shirt.id)} alt="default" width={40} height={40}></Image></td>
                        <td><Image className='pb-1 ml-2 filter grayscale contrast-400 hover:filter-none' src={"/edit.png"} onClick={() => window.location.href = "admin/modify?id="+shirt.id} alt="default" width={30} height={30}></Image></td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}