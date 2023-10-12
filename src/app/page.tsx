import Newest from "./components/newest";
import Promo from "./components/promo";
import Splash from "./components/splash";
import Link from "next/link";
export default function Home() {

  return (
    <main className="">
      <Splash />
      <Newest/>
      <Promo />
    </main>

  )
}
