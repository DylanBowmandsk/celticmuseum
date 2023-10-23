"use client"
import Image from 'next/image'
import { useState } from 'react';
import useSWR from 'swr'

export default function Shirts() {

    const { data, error, isLoading } = useSWR('/api/get-shirt/paginate', fetcher)
    const [collection, setCollection] = useState<any>()
    const [sorted, setSorted]= useState(false)

    type shirt = {
        id: string
        player: string
        number : number
        match: string
        home : number
        date : Date
        path : string
        created: Date

    }

    type decade = {decade : number,
    shirts : shirt[]}


    async function fetcher (url){ 
        const response = await fetch(url);
        const data = await response.json()
        sortData(data)
        return data
    }

    function sortData(data){
        let decades : string[] = []
        const collection: decade[] = []
        for(let shirt of data.data){
            if(!decades.includes(shirt.date.slice(0,3)+"0"))
                decades.push(shirt.date.slice(0,3)+"0")
        }
        decades.sort()
        decades.reverse()
    
        for(const decade of decades){
            let element : decade = {decade: parseInt(decade),
                shirts : []}
            for(let shirt of data.data){
                if(shirt.date.slice(0,3)+"0" == decade)
                element['shirts'].push({id: shirt.id,
                    player :shirt.player,
                    number: shirt.number,
                    match: shirt.match,
                    home: shirt.home == true ? 1 : 0,
                    date: shirt.date,
                    path: shirt.path.toString(),
                    created: shirt.created
            } )
            }
            collection.push(element)
            setCollection(collection)
            setSorted(true)
            }
    }

    if(!isLoading){
    window.onscroll = function(ev) {
        if ((window.innerHeight + Math.round(window.scrollY + 100)) >= document.body.offsetHeight) {
            
        }
    };
}
    
    
    if (error) return <div className='text-2xl m-auto'>Failed to load</div>
    if(isLoading) return <div className='flex flex-col h-screen px-72 py-20" text-2xl m-auto'>Loading...</div>
    if (collection)
    return (
        <div className="flex flex-col px-72 py-20">
            {collection.map((element) =>
                <div key={element.decade} className="mb-2">
                    <h1 className="text-3xl text-gray-700">{element.decade}</h1>
                        <div className="bg-green-600 h-1 w-56 mt-1 mb-5"></div>
                    {element.shirts.map((shirt) => 
                        <div key={shirt.id} className="inline-block pr-10 pb-10">
                            <div className="h-80 w-64 relative">
                            <Image src={shirt.path.toString()} layout="fill" alt="default" className="shadow-xl hover:scale-110 transition duration-500 cursor-pointer"></Image>
                            </div>
                            <div>
                                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 pb-1 inline" xmlns="http://www.w3.org/2000/svg" stroke="#473333"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#7d7d7d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#7d7d7d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                <p className="text-xl pt-4 inline">{shirt.player} - No. {shirt.number}</p>
                            </div>
                            <div>
                                <svg fill="#7d7d7d" width="71px" height="71px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 pb-1 inline"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M824.2 699.9a301.55 301.55 0 0 0-86.4-60.4C783.1 602.8 812 546.8 812 484c0-110.8-92.4-201.7-203.2-200-109.1 1.7-197 90.6-197 200 0 62.8 29 118.8 74.2 155.5a300.95 300.95 0 0 0-86.4 60.4C345 754.6 314 826.8 312 903.8a8 8 0 0 0 8 8.2h56c4.3 0 7.9-3.4 8-7.7 1.9-58 25.4-112.3 66.7-153.5A226.62 226.62 0 0 1 612 684c60.9 0 118.2 23.7 161.3 66.8C814.5 792 838 846.3 840 904.3c.1 4.3 3.7 7.7 8 7.7h56a8 8 0 0 0 8-8.2c-2-77-33-149.2-87.8-203.9zM612 612c-34.2 0-66.4-13.3-90.5-37.5a126.86 126.86 0 0 1-37.5-91.8c.3-32.8 13.4-64.5 36.3-88 24-24.6 56.1-38.3 90.4-38.7 33.9-.3 66.8 12.9 91 36.6 24.8 24.3 38.4 56.8 38.4 91.4 0 34.2-13.3 66.3-37.5 90.5A127.3 127.3 0 0 1 612 612zM361.5 510.4c-.9-8.7-1.4-17.5-1.4-26.4 0-15.9 1.5-31.4 4.3-46.5.7-3.6-1.2-7.3-4.5-8.8-13.6-6.1-26.1-14.5-36.9-25.1a127.54 127.54 0 0 1-38.7-95.4c.9-32.1 13.8-62.6 36.3-85.6 24.7-25.3 57.9-39.1 93.2-38.7 31.9.3 62.7 12.6 86 34.4 7.9 7.4 14.7 15.6 20.4 24.4 2 3.1 5.9 4.4 9.3 3.2 17.6-6.1 36.2-10.4 55.3-12.4 5.6-.6 8.8-6.6 6.3-11.6-32.5-64.3-98.9-108.7-175.7-109.9-110.9-1.7-203.3 89.2-203.3 199.9 0 62.8 28.9 118.8 74.2 155.5-31.8 14.7-61.1 35-86.5 60.4-54.8 54.7-85.8 126.9-87.8 204a8 8 0 0 0 8 8.2h56.1c4.3 0 7.9-3.4 8-7.7 1.9-58 25.4-112.3 66.7-153.5 29.4-29.4 65.4-49.8 104.7-59.7 3.9-1 6.5-4.7 6-8.7z"></path> </g></svg>
                                <p className="text-xl font-light inline">{shirt.match}</p>
                            </div>
                            <div>
                                <svg width="91px" height="91px" viewBox="0 -0.5 25 25" fill="none" className="w-5 h-5 pb-1 inline" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.41728 18.9999C9.41728 19.4142 9.75307 19.7499 10.1673 19.7499C10.5815 19.7499 10.9173 19.4142 10.9173 18.9999H9.41728ZM10.1673 16.6669H9.41728H10.1673ZM14.0853 18.9999C14.0853 19.4142 14.4211 19.7499 14.8353 19.7499C15.2495 19.7499 15.5853 19.4142 15.5853 18.9999H14.0853ZM10.1673 19.7499C10.5815 19.7499 10.9173 19.4142 10.9173 18.9999C10.9173 18.5857 10.5815 18.2499 10.1673 18.2499V19.7499ZM7.83328 18.9999L7.82564 19.7499H7.83328V18.9999ZM5.80128 17.2529L5.0518 17.2807C5.05294 17.3116 5.056 17.3424 5.06095 17.373L5.80128 17.2529ZM5.53228 9.99395L6.28177 9.96617C6.2805 9.93188 6.27687 9.8977 6.27092 9.8639L5.53228 9.99395ZM6.64428 7.74195L6.3033 7.07392L6.29848 7.07642L6.64428 7.74195ZM11.5793 5.22295L11.9203 5.89096L11.9218 5.89017L11.5793 5.22295ZM13.4243 5.22295L13.0818 5.89017L13.0833 5.89096L13.4243 5.22295ZM18.3593 7.74195L18.7051 7.07641L18.7003 7.07394L18.3593 7.74195ZM19.4713 9.99395L18.7326 9.8639C18.7267 9.89767 18.7231 9.93181 18.7218 9.96607L19.4713 9.99395ZM19.2013 17.2529L19.9416 17.373C19.9466 17.3425 19.9496 17.3117 19.9508 17.2808L19.2013 17.2529ZM17.1693 18.9999V19.75L17.1769 19.7499L17.1693 18.9999ZM14.8353 18.2499C14.4211 18.2499 14.0853 18.5857 14.0853 18.9999C14.0853 19.4142 14.4211 19.7499 14.8353 19.7499V18.2499ZM10.1673 18.2499C9.75307 18.2499 9.41728 18.5857 9.41728 18.9999C9.41728 19.4142 9.75307 19.7499 10.1673 19.7499V18.2499ZM14.8353 19.7499C15.2495 19.7499 15.5853 19.4142 15.5853 18.9999C15.5853 18.5857 15.2495 18.2499 14.8353 18.2499V19.7499ZM10.9173 18.9999V16.6669H9.41728V18.9999H10.9173ZM10.9173 16.6669C10.9173 15.7921 11.6265 15.0829 12.5013 15.0829V13.5829C10.798 13.5829 9.41728 14.9637 9.41728 16.6669H10.9173ZM12.5013 15.0829C13.3761 15.0829 14.0853 15.7921 14.0853 16.6669H15.5853C15.5853 14.9637 14.2045 13.5829 12.5013 13.5829V15.0829ZM14.0853 16.6669V18.9999H15.5853V16.6669H14.0853ZM10.1673 18.2499H7.83328V19.7499H10.1673V18.2499ZM7.84092 18.25C7.1937 18.2434 6.64521 17.7718 6.54162 17.1329L5.06095 17.373C5.28137 18.7325 6.44847 19.7359 7.82564 19.7499L7.84092 18.25ZM6.55077 17.2252L6.28177 9.96617L4.7828 10.0217L5.0518 17.2807L6.55077 17.2252ZM6.27092 9.8639C6.16697 9.27348 6.45811 8.68388 6.99008 8.40747L6.29848 7.07642C5.18533 7.65481 4.57613 8.88855 4.79364 10.124L6.27092 9.8639ZM6.98526 8.40996L11.9203 5.89096L11.2383 4.55494L6.30331 7.07394L6.98526 8.40996ZM11.9218 5.89017C12.2859 5.70328 12.7177 5.70328 13.0818 5.89017L13.7668 4.55573C12.9727 4.14809 12.0309 4.14809 11.2368 4.55573L11.9218 5.89017ZM13.0833 5.89096L18.0183 8.40996L18.7003 7.07394L13.7653 4.55494L13.0833 5.89096ZM18.0135 8.40747C18.5455 8.68388 18.8366 9.27348 18.7326 9.8639L20.2099 10.124C20.4274 8.88855 19.8182 7.65481 18.7051 7.07642L18.0135 8.40747ZM18.7218 9.96607L18.4518 17.2251L19.9508 17.2808L20.2208 10.0218L18.7218 9.96607ZM18.461 17.1329C18.3574 17.7718 17.8089 18.2434 17.1616 18.25L17.1769 19.7499C18.5541 19.7359 19.7212 18.7325 19.9416 17.373L18.461 17.1329ZM17.1693 18.2499H14.8353V19.7499H17.1693V18.2499ZM10.1673 19.7499H14.8353V18.2499H10.1673V19.7499Z" fill="#7d7d7d"></path> </g></svg>
                                <p className="inline">{shirt.home == 0? "Home" : "Away"}</p>
                            </div>
                            <div>
                                <svg width="121px" height="121px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 pb-1 inline" stroke="#00000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M8 3V7M16 3V7" stroke="#7d7d7d" stroke-width="2" stroke-linecap="round"></path> <rect x="6" y="12" width="3" height="3" rx="0.5" fill="#7d7d7d"></rect> <rect x="10.5" y="12" width="3" height="3" rx="0.5" fill="#7d7d7d"></rect> <rect x="15" y="12" width="3" height="3" rx="0.5" fill="#7d7d7d"></rect> </g></svg>
                                <p className="inline">{shirt.date.slice(0,10).replace(/-/g,"/")}</p>
                            </div>    
                        </div> )}
                </div>
            )}
        </div>
    )
}