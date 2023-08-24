import Newest from "./components/newest";

export default async function Home() {
  return (
    <main className="">
      <div className="bg-[url(/background.jpg)] bg-fill">
        <div className="flex justify-around text-white bg-black bg-opacity-70 p-10">
          <div className="py-20 px-60">
            <h1 className="text-5xl py-4">Welcome</h1>
            <h3 className="text-xl font-thin">To match worn celtic</h3>
            <h2 className="text-xl py-7 font-bold">The #1 collection of match worn celtic shirts in the world</h2>
            <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-10 rounded-full">View Collection</button>
          </div>
          <div className="py-20 px-60">
            <h1 className="text-5xl py-4">Looking to sell?</h1>
            <h3 className="text-xl font-thin">Taking submissions for shirts</h3>
            <h2 className="text-xl py-7 font-bold">Submit your shirt and i will offer you a fair price that suits you</h2>
            <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-16 rounded-full">Sell Shirt</button>
          </div>
        </div>
      </div>
      <Newest></Newest>
    </main>

  )
}
