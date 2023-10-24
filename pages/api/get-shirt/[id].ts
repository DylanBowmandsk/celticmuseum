import prisma from "../../../prisma/prisma"

export default async function handler(req, res){
        const data = await prisma.shirt.findUnique({
            where: {
              id: req.query.id,
            },
          })
    res.status(200).json({ data })

}
