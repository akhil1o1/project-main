import { useState, useEffect } from "react";
import { Alert, AlertTitle } from "@mui/material";
import Navbar from "./components/Navbar";
import JokeCardList from "./components/JokeCardList";
import AddJoke from "./components/AddJoke";
import AuthModal from "./components/AuthModal";
import Features from "./components/Features";
import Loader from "./components/Loader";
import { AuthContext } from "./components/context/auth-context";
import { useAuth } from "./components/hooks/auth-hook";
import { useHttpClient } from "./components/hooks/http-hook";

import "./App.css";

function App() {
   const [jokes, setJokes] = useState([]);
   const { token, logIn, logOut, userId, userName, userRole } = useAuth();
   const { isLoading, error, sendRequest, clearError } = useHttpClient();

   useEffect(() => {
      //fetching jokes uploaded by user.
      const fetchJokes = async () => {
         try {
            const responseData = await sendRequest(
               `https://joke-app-backend-production.up.railway.app/api/jokes`
            );
            setJokes(responseData.jokes);
         } catch (error) {}
      };
      fetchJokes();
   }, [sendRequest, userId]);

   return (
      <AuthContext.Provider
         value={{
            isLoggedIn: !!token,
            token,
            logIn,
            logOut,
            userId,
            userName,
            userRole,
         }} // !!token => if token is undefined/null evaluates to false and else if token is defined evaluates to true
      >
         <div className="App">
            <header>
               <Navbar />
            </header>
            <main className="main">
               <AuthModal />
               <AddJoke setJokes={setJokes} />
               {error && !isLoading && (
                  <Alert severity="error" onClose={clearError}>
                     <AlertTitle>Error</AlertTitle>
                     {error}
                  </Alert>
               )}
               {isLoading && <Loader />}
               {!isLoading && (
                  <JokeCardList jokes={jokes} setJokes={setJokes} />
               )}
               <Features />
            </main>
         </div>
      </AuthContext.Provider>
   );
}

export default App;
