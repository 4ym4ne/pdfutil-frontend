import './App.css';
import Header from './components/header/header';
import Tabs from "./components/tabs/Tabs";

function App() {
  return (
    <div className="App">
      <Header />
        <div className="container mx-auto min-h-screen pt-10 max-w-screen-md p-2">
            <Tabs />
        </div>

    </div>
  );
}

export default App;