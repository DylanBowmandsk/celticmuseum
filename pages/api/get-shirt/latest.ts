import prisma from "../../../prisma/prisma";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '8mb',
            bodyParser: process.env.NODE_ENV !== 'production',
        }
    }
}
export const dynamic = "force-dynamic";
export default async function handler(req, res){
        const data = await prisma.shirt.findMany({
            orderBy: {
                created: 'desc',
            },
            take: 4,
    })
    res.status(200).json({ data })}