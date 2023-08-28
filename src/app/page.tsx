import Newest from "./components/newest";

export default function Home() {
  return (
    <main className="">

<div className="bg-[url(/background.jpg)] bg-cover bg-center">
   <div className="flex justify-center items-end">
      <div className="text-white bg-black bg-opacity-70 p-10 flex justify-between w-full">
         <div className="py-20 pl-60 pr-10 w-1/2">
            <h1 className="text-5xl py-4">Welcome</h1>
            <h3 className="text-xl font-thin">To the celtic museum</h3>
            <h2 className="text-xl py-7 font-bold">I have created this website to showcase my personal collection of Glasgow Celtic FC Match Shirts. None of the shirts I have on this site are for sale, please contact me if you have any Celtic FC Match Shirts for sale. Thank you</h2>
            <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-10 rounded-full">View Collection</button>
         </div>
         <div className="py-20 pr-60 pl-10 w-1/2">
            <h1 className="text-5xl py-4">Looking to sell?</h1>
            <h3 className="text-xl font-thin">Taking submissions for shirts</h3>
            <h2 className="text-xl pt-7 pb-28 font-bold">Submit your shirt and i will offer you a fair price that suits you</h2>
            <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-10 rounded-full">Sell Shirt</button>
         </div>
      </div>
   </div>
</div>

      <Newest />
    </main>

  )
}
