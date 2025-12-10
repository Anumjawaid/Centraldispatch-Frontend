import { AppRouter } from "./Router";
import SocketBootstrap from "./SocketBootstrap";

function App() {
  return (
    <>
      <SocketBootstrap />
      <AppRouter />
    </>
  );
}

export default App;
