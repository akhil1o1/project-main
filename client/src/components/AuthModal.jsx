import { useState, useContext } from "react";
import {
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Typography,
   Box,
   Button,
   TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { useHttpClient } from "./hooks/http-hook";
import { AuthContext } from "./context/auth-context.js";

function AuthModal() {
   const [isLoginMode, setLoginMode] = useState(true);
   const [formState, setFormState] = useState({
      name: "",
      email: "",
      password: "",
   });
   const { isLoading, error, sendRequest, clearError } = useHttpClient();

   const authCtx = useContext(AuthContext);
   const { isLoggedIn, logIn } = authCtx;
   console.log("isLoggedIn", isLoggedIn);

   const inputHandler = (event) => {
      const { name, value } = event.target;
      setFormState((prevFormState) => {
         return {
            ...prevFormState,
            [name]: value,
         };
      });
   };

   const clearInputs = () => {
      setFormState({
         name: "",
         email: "",
         password: "",
      });
   };

   const handleAuthMode = () => {
      setLoginMode((prev) => !prev);
   };

   const authSubmitHandler = async (event) => {
      event.preventDefault();
      if (isLoginMode) {
         //log in request
         try {
            const responseData = await sendRequest(
               `http://localhost:5000/api/users/login`,
               {
                  method: "POST",
                  headers: { "Content-type": "Application/json" },
                  body: JSON.stringify({
                     email: formState.email.trim(),
                     password: formState.password.trim(),
                  }),
               }
            );

            logIn(
               responseData.userId,
               responseData.token,
               responseData.name,
               responseData.role
            ); // jwt token for auth
         } catch (error) {}
      } else {
         //sign up request.
         try {
            const responseData = await sendRequest(
               `http://localhost:5000/api/users/signup`,
               {
                  method: "POST",
                  headers: { "Content-type": "Application/json" },
                  body: JSON.stringify({
                     name: formState.name.trim(),
                     email: formState.email.trim(),
                     password: formState.password.trim(),
                  }),
               }
            );

            logIn(
               responseData.userId,
               responseData.token,
               responseData.name,
               responseData.role
            ); // jwt token for auth
         } catch (error) {}
      }

      if(!error) {
         clearInputs();
      }
   };

   return (
      <Dialog open={!isLoggedIn} maxWidth="xs" fullWidth>
         <DialogTitle
            sx={{ fontSize: "2rem", fontWeight: 600, color: "#1976d2" }}
         >
            {isLoginMode ? "Login" : "Signup"}
         </DialogTitle>
         <DialogContent sx={{ my: "1rem", color: "#1976d2" }}>
            <form onSubmit={authSubmitHandler}>
               {!isLoginMode && (
                  <Box mb="1.5rem">
                     <Typography>Name</Typography>
                     <TextField
                        type="simple"
                        fullWidth
                        placeholder="Enter your Name"
                        name="name"
                        value={formState.name}
                        required
                        onChange={inputHandler}
                     />
                  </Box>
               )}

               <Box mb="1.5rem">
                  <Typography>Email</Typography>
                  <TextField
                     type="email"
                     inputType="email"
                     fullWidth
                     placeholder="Enter your Email"
                     name="email"
                     value={formState.email}
                     required
                     onChange={inputHandler}
                  />
               </Box>
               <Box mb="1.5rem">
                  <Typography>Password</Typography>
                  <TextField
                     type="password"
                     inputType="password"
                     fullWidth
                     placeholder="Enter your password (min 6 charecters)"
                     name="password"
                     value={formState.password}
                     required
                     onChange={inputHandler}
                  />
               </Box>
               <LoadingButton
                  loading={isLoading}
                  loadingIndicator={isLoginMode ? "Logging" : "Signing"}
                  variant="contained"
                  type="submit"
                  size="large"
               >
                  {isLoginMode ? "Login" : "SignUp"}
               </LoadingButton>
            </form>
         </DialogContent>
         <DialogActions
            sx={{
               px: "1.5rem",
               py: "1rem",
               flexDirection: "row",
               justifyContent: "flex-start",
               backgroundColor: "#e7ebf0",
            }}
         >
            <Typography color="#1976d2">
               {isLoginMode
                  ? "Don't have an account"
                  : "Already have an account?"}
            </Typography>
            <Button
               onClick={handleAuthMode}
               sx={{
                  color: "#CE0505",
                  textTransform: "none",
                  fontSize: "1rem",
               }}
               variant="text"
            >
               {isLoginMode ? "Sign UP" : "Log IN"}
            </Button>
         </DialogActions>
      </Dialog>
   );
}

export default AuthModal;
