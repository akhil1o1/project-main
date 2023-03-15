import { useState, useContext } from "react";
import { TextField, Box, Typography, Alert, AlertTitle } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LoadingButton from "@mui/lab/LoadingButton";

import { useHttpClient } from "./hooks/http-hook";
import { AuthContext } from "./context/auth-context.js";

function AddJoke({ setJokes }) {
   const [newJoke, setNewJoke] = useState("");

   const { isLoading, error, sendRequest, clearError } = useHttpClient();
   const authCtx = useContext(AuthContext);
   const { token } = authCtx;

   const inputHandler = (event) => {
      const { value } = event.target;
      setNewJoke(value);
   };

   console.log(newJoke);

   const jokeSubmitHandler = async (event) => {
      event.preventDefault();
      try {
         const responseData = await sendRequest(
            `http://localhost:5000/api/jokes/newJoke`,
            {
               method: "POST",
               headers: {
                  "Content-type": "Application/json",
                  authorization: `Bearer ${token}`,
               },
               body: JSON.stringify({
                  text: newJoke.trim(),
               }),
            }
         );
         setJokes((prevJokes) => [...prevJokes, responseData.joke]);
         setNewJoke("");
      } catch (error) {}
   };

   return (
      <>
         <Typography
            variant="h1"
            fontSize="2.5rem"
            mb="2rem"
            fontWeight="600"
            textAlign="center"
            color="#1976d2"
         >
            Add New Joke
         </Typography>
         {error && !isLoading && (
                  <Alert severity="error" onClose={clearError} sx={{mb:"1.5rem"}}>
                     <AlertTitle>Error</AlertTitle>
                     {error}
                  </Alert>
               )}
         <form onSubmit={jokeSubmitHandler}>
            <Box
               display="flex"
               flexDirection="row"
               alignItems="baseline"
               justifyContent="space-around"
               width="60%"
               mx="auto"
               gap={3}
            >
               <TextField
                  id="outlined-basic"
                  label="Enter new joke"
                  variant="outlined"
                  multiline
                  required
                  value={newJoke}
                  fullWidth
                  onChange={inputHandler}
                  sx={{ mb: "2rem" }}
               />
               <LoadingButton
                  type="submit"
                  size="large"
                  endIcon={<AddIcon />}
                  loading={isLoading}
                  loadingPosition="end"
                  variant="contained"
               >
                  Add
               </LoadingButton>
            </Box>
         </form>
      </>
   );
}

export default AddJoke;
