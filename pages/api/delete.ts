import prisma from "../../prisma/prisma"

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '8mb',
        }
    }
}

export default async function handler(req, res){
        const data = await prisma.shirt.delete({
            where: {
              id: req.body.id,
            },
          })
    res.status(200).json({ data: "success" })
}

