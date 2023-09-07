import Grid from "./Grid";
import Nav from "./common/nav/Nav";

function App() {
  return (
    <div className="App w-screen max-h-screen h-screen flex flex-col bg-slate-500 -">
      <Nav />
      <Grid />
    </div>
  );
}

export default App;
