import prisma from "../../prisma/prisma"

export default async function handler(req, res){
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
