import prisma from "../../prisma/prisma"

export default async function handler(req, res){
        const data = await prisma.shirt.delete({
            where: {
              id: req.body.id,
            },
          })
    res.status(200).json({ data: "success" })
}

