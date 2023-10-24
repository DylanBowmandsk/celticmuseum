import prisma from "../../../prisma/prisma";

export const dynamic = "force-dynamic";
export default async function handler(req, res){
        const data = await prisma.shirt.findMany({skip:10,take:10})
    res.status(200).json({ data })

}
