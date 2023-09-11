import Grid from "./Grid";
import Nav from "./common/nav/Nav";

function App() {
  return (
    <div className="App w-screen max-h-screen h-screen flex flex-col bg-background">
      <Nav />
      <Grid />
    </div>
  );
}

export default App;
