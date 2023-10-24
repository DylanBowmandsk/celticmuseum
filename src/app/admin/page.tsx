import AdminTable from "../components/adminTable";
import { PrismaClient } from "@prisma/client"
import Link from "next/link";
import Nextauth from "../../../pages/api/auth/[...nextauth]";
import { getServerSession } from 'next-auth'
import useSWR from 'swr'

export default async function Admin() {

    const prisma = new PrismaClient
    let shirts = await prisma.shirt.findMany()
    return(
        <div className="flex flex-col">
            <h1 className="text-4xl m-auto w-96 mt-10">Collection admin </h1>
            <Link href={"/admin/add"}><div className="flex justify-end"><button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-10 m-5 rounded-full">Add Shirt</button></div></Link>
            {shirts.length > 0 && <AdminTable shirts={shirts}/>}
            {shirts.length == 0 && <div className="m-auto h-20 w-40 mt-60 text-2xl"><h1>Nothing here</h1></div>}
        </div>
    )
}
