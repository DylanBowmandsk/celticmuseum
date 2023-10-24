import AdminTable from "../components/adminTable";
import { PrismaClient } from "@prisma/client"
import Link from "next/link";

export default async function Admin() {

    return(
        <div className="flex flex-col">
            <Link href={"/admin/add"}><div className="flex justify-end mr-72"><button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-10 m-5 rounded-full">Add Shirt</button></div></Link>
            <h1 className="text-4xl m-auto w-96 mt-5 mb-20">Collection Admin </h1>
            <AdminTable/>
        </div>
    )
}
