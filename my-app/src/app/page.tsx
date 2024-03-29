import Image from "next/image";
import Navbar from '@/components/global/Navbar'

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <section

      className="h-screen w-full bg-neutral-950 rounded-md !overflow-visible relative flex flex-col
      items-center antialiased
      "
      >
        {/* <div className="max-w-4xl mx-auto p-4 relative z-10 flex flex-center justify-center flex-col">

        </div> */}

        <div className="absolute inset-0  h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]">

        </div>

     </section>
      
    </main>
  );
}
