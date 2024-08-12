import Auth from "./components/Auth";
import Chat from "./components/Chat";
import Callane from "./components/Callane";
import UsersGrid from "./components/UsersGrid";
import { ToastContainer } from "react-toastify";
import useFCM from "./hooks/useFCM";
import "react-toastify/dist/ReactToastify.css";
import UploadImage from "./components/UploadImage";

function App() {
  useFCM();
  return (
    <>
      <section className="py-10 px-5 bg h-[200vh] ">
        <Callane />
        <Auth />
        <Chat />
        <UsersGrid />
        <UploadImage />
      </section>
      <ToastContainer />
    </>
  );
}

export default App;
