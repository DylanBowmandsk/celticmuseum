import { PrismaClient } from "@prisma/client"
import Image from 'next/image'

const prisma = new PrismaClient

export default async function Shirts() {
    type shirt = {
        id: string
        player: string
        number : number
        match: string
        home : number
        date : Date
        path : string

    }

    type decade = {decade : number,
    shirts : shirt[]}

 

    const shirts = await prisma.shirt.findMany()
    let decades : string[] = []
    const collection: decade[] = []
    for(let shirt of shirts){
        if(!decades.includes(shirt.date.getFullYear().toString().slice(0,3)+"0"))
            decades.push(shirt.date.getFullYear().toString().slice(0,3)+"0")
    }
    decades.sort()
    decades.reverse()

    for(const decade of decades){
        let element : decade = {decade: parseInt(decade),
            shirts : []}
        for(let shirt of shirts){
            if(shirt.date.getFullYear().toString().slice(0,3)+"0" == decade)
            element['shirts'].push({id: shirt.id,
                player :shirt.player,
                number: shirt.number,
                match: shirt.match,
                home: shirt.home == true ? 1 : 0,
                date: shirt.date,
                path: shirt.path
        } )
        }
        collection.push(element)
    }

    return (
        <div>
            {collection.map((element) =>
                <div key={element.decade}>
                    <h1 className="text-xl">{element.decade}</h1>
                    {element.shirts.map((shirt) => 
                        <div key={shirt.id} className="inline-block">
                            <div className="h-64 w-64 relative">
                            <Image src={shirt.path} layout="fill" alt="default" className="shadow-xl"></Image>
                            </div>
                            
                            {shirt.player}
                            {shirt.date.toISOString().slice(0,10).replace(/-/g,"/")}
                        
                        </div> )}
                </div>
            )}
        </div>
    )
}