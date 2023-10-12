import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '8mb',
            bodyParser: process.env.NODE_ENV !== 'production',
        }
    }
}

export default async function handler(req, res){
    const prisma = new PrismaClient
        const data = await prisma.shirt.delete({
            where: {
              id: req.body.id,
            },
          })
    res.status(200).json({ data: "success" })
}

