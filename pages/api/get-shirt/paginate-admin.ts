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
    const index = req.query.page
        const data = await prisma.shirt.findMany({take: 20, skip:parseInt(index),
            orderBy: {    
                created: "desc"
            }})
    res.status(200).json({ data })

}
