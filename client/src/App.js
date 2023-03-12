import { useState } from "react";
import Navbar from "./components/Navbar";
import JokeCardList from "./components/JokeCardList";
import AddJoke from "./components/AddJoke";
import AuthModal from "./components/AuthModal";

import "./App.css";

function App() {
   const [showAuthModal, setShowAuthModal] = useState(false);

   return (
      <div className="App">
         <header>
            <Navbar setShowAuthModal={setShowAuthModal}/>
         </header>
         <main className="main">
            <AuthModal showAuthModal={showAuthModal} setShowAuthModal={setShowAuthModal} />
            <AddJoke />
            <JokeCardList />
         </main>
      </div>
   );
}

export default App;
