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
        const data = await prisma.shirt.update({
            where: {
              id: req.body.id,
            },
            data:{
                player: req.body.player,
                number: parseInt(req.body.number),
                match: req.body.match.toString(),
                home: req.body.home == 1 ? true : false ,
                date: new Date(req.body.date),
                path: req.body.path
                
            }
          })
    res.status(200).json({ data: "success" })
}
