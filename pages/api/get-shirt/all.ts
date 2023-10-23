import { PrismaClient } from "@prisma/client"

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '8mb',
            responseLimit: false,
            bodyParser: process.env.NODE_ENV !== 'production',
        }
    }
}
export const dynamic = "force-dynamic";
export default async function handler(req, res){
        const prisma = new PrismaClient
        const data = await prisma.shirt.findMany()
    res.status(200).json({ data })

}
