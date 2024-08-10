import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Auth from "./components/Auth";
import Chat from "./components/Chat";
import Callane from "./components/Callane";

function App() {
  return (
    <section className="py-10 px-5 bg h-[200vh] ">
      <Callane />
      <Auth />
      <Chat />
      <div className="grid grid-rows-2 grid-cols-[auto,1fr] gap-x-4 items-center  w-64 p-5 border-green-300 bg-green-100/60 rounded-xl border-2">
        <div className="row-span-2 content-center bg-green-300 p-[0.6rem] rounded-md">
          <IoMdCheckmarkCircleOutline className="text-green-600 w-6 h-6" />
        </div>
        <div className="text-green-500 font-semibold text-lg translate-y-0.5">
          Passed
        </div>
        <div className="text-gray-700 font-bold -translate-y-0.5">Tests</div>
      </div>
    </section>
  );
}

export default App;
