import { useState } from "react";
import Navbar from "./components/Navbar";
import JokeCardList from "./components/JokeCardList";
import AddJoke from "./components/AddJoke";
import AuthModal from "./components/AuthModal";
import { AuthContext } from "./components/context/auth-context";
import { useAuth } from "./components/hooks/auth-hook";

import "./App.css";

console.log(localStorage.getItem("userData"));

function App() {
   const [jokes, setJokes] = useState([]);
   const { token, logIn, logOut, userId } = useAuth();

   return (
      <AuthContext.Provider
         value={{ isLoggedIn: !!token, token, logIn, logOut, userId }} // !!token => if token is undefined/null evaluates to false and else if token is defined evaluates to true
      >
         <div className="App">
            <header>
               <Navbar />
            </header>
            <main className="main">
               <AuthModal/>
               <AddJoke setJokes={setJokes}/>
               <JokeCardList />
            </main>
         </div>
      </AuthContext.Provider>
   );
}

export default App;
