import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '8mb',
        }
    }
}

export default async function POST(req, res){
    const data = await prisma.shirt.create({data: {
        player: req.body.player,
        number: parseInt(req.body.number),
        match: req.body.match,
        home: req.body.home == 1 ? true : false ,
        date: new Date(req.body.date),
        path: req.body.path
    }
    })
    res.status(200).json({ data: "success" })
}