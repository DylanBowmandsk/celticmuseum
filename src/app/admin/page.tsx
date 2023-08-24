import Image from 'next/image'

export default function Admin() {
    return (
        <div className="flex justify-center yw-1/4 my-14" >
            <form action="api/upload" method="post">
                <label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">Player</label>
                <input type="text" name="player" className="mb-4 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                <label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">Number</label>
                <input type="text" name="number" className="mb-4 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                <label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">Match</label>
                <div>
                    <input type="text" name="teamOne" className="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    <span className="mb-2 px-2 uppercase tracking-wide text-gray-700 text-xs font-bold">Vs</span>
                    <input type="text" name="match" className="mb-4 appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
                <label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">Home/Away</label>
                <select name="home" className="mb-4 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                    <option value="1">True</option>
                    <option value="0">False</option>
                </select>
                <label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">Date worn</label>
                <input type="text" name="date" className=" mb-4 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                <label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">Shirt Image</label>
                <div>
                    <Image src="/default-shirt.JPG" width={100} height={100} alt="default" className='pt-2 inline'></Image>
                    <input type="file" id="myFile" name="filename" className='ml-16'></input>
                </div>
                <button type="submit" className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full my-5">Submit</button>
            </form>
        </div>
    )
}