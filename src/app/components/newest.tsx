import { PrismaClient } from "@prisma/client"
import Image from 'next/image'

const prisma = new PrismaClient

export default async function Newest() {
    const shirts = await prisma.shirt.findMany()

    return(
        <div className="px-72 py-20 bg-slate-100">
            <h1 className="text-3xl text-gray-700">Newest Shirts</h1>
            <div className="bg-green-600 h-1 w-56 mt-1"></div>
            <div className="flex justify-between my-10">
            {shirts.slice().map((shirt) =>
                <div>
                    <div className="h-80 w-64 relative">
                        <Image src={shirt.path} layout="fill" alt="default" className="shadow-xl"></Image>
                    </div>
                    <p className="text-xl text-gray-800 pt-1">{shirt.player}</p>
                    <p className="text-lg text-gray-800">{shirt.date.toISOString().slice(0,10).replace(/-/g,"/")}</p>
                </div>
            )}
            </div>
        </div>
    )
}