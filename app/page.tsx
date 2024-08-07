import Image from "next/image";
import Card from "./components/Card";
import Waves from "./components/Waves";

export default function Home() {
  return (
    <main>
      <div className="w-full  h-[120vh] mx-auto bg-[#290510]">
        <Waves>
          <div className="inline align-middle z-10 relative top-[3rem] fade">
              <img src="/kronbot.svg" className="w-[50rem] h-[50rem] inline-block relative m-[1rem]" />
            <img src="/logo.svg" className="w-[25rem] h-[25rem] inline-block relative top-[6rem] right-[-8rem] " />
            <div className="h-[0.5rem] bg-[#8E3036] w-[120%] relative bottom-[20rem] right-[38rem] rounded-[1rem] pop"></div>
            <div className="h-[2rem] bg-[#8E3036] w-[2rem] relative bottom-[21.3rem] right-[-54rem] rounded-[10rem] pop"></div>
            <br/>
            <h1 className="relative left-[4rem] top-[-21rem] text-[2rem] align-left font-[500] text-left">We dont predict the future, <br/> We invent it!</h1>
          </div>
      </Waves>
      </div>
    </main>
  );
}
