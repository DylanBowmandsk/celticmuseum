import prisma from "../../../prisma/prisma";

export const dynamic = "force-dynamic";
export default async function handler(req, res){
        const data = await prisma.shirt.findMany()
    res.status(200).json({ data })

}
