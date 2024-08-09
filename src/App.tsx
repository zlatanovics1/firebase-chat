import Auth from "./components/Auth";
import Chat from "./components/Chat";

function App() {
  return (
    <section className="py-10 px-5 bg-gray-300 h-[200vh] ">
      <Auth />
      <Chat />
    </section>
  );
}

export default App;
