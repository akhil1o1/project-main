import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import JokeCardList from "./components/JokeCardList";
import AddJoke from "./components/AddJoke";
import AuthModal from "./components/AuthModal";
import Loader from "./components/Loader";
import { AuthContext } from "./components/context/auth-context";
import { useAuth } from "./components/hooks/auth-hook";
import { useHttpClient } from "./components/hooks/http-hook";

import "./App.css";

console.log(localStorage.getItem("userData"));

function App() {
   const [jokes, setJokes] = useState([]);
   const { token, logIn, logOut, userId, userName, userRole } = useAuth();

   const { isLoading, error, sendRequest, clearError } = useHttpClient();

   useEffect(() => {
      //fetching jokes uploaded by user.
      const fetchJokes = async () => {
         try {
            const responseData = await sendRequest(`http://localhost:5000/api/jokes`,);
            setJokes(responseData.jokes);
         } catch (error) {}
      };

      fetchJokes();
   }, [sendRequest, userId,]);

   return (
      <AuthContext.Provider
         value={{ isLoggedIn: !!token, token, logIn, logOut, userId, userName, userRole}} // !!token => if token is undefined/null evaluates to false and else if token is defined evaluates to true
      >
         <div className="App">
            <header>
               <Navbar />
            </header>
            <main className="main">
               <AuthModal />
               <AddJoke setJokes={setJokes} />
               {isLoading && <Loader/>}
               {!isLoading && <JokeCardList jokes={jokes} setJokes={setJokes}/>}
            </main>
         </div>
      </AuthContext.Provider>
   );
}

export default App;
