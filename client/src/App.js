import ResponsiveAppBar from './components/Navbar';
import JokeList from './components/Jokelist';

import './App.css';

function App() {
  return (
    <div className="App">
      <header>
      <ResponsiveAppBar/>
      </header>
      <main>
        <JokeList/>
      </main>
    </div>
  );
}

export default App;
