import prisma from "../../../prisma/prisma";

export default async function handler(req, res){
    const index = req.query.page
        const data = await prisma.shirt.findMany({take: 1, skip:parseInt(index)})
    res.status(200).json({ data })

}
