import { useState, useContext, useEffect } from "react";
import {
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Box,
   TextField,
   Alert,
   AlertTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LoadingButton from "@mui/lab/LoadingButton";

import { useHttpClient } from "./hooks/http-hook";
import { AuthContext } from "./context/auth-context.js";

function EditJokeModal({ joke, setJokes, editMode, setEditMode }) {
   const [jokeText, setJokeText] = useState("");

   const { isLoading, error, sendRequest, clearError } = useHttpClient();
   const authCtx = useContext(AuthContext);
   const { token } = authCtx;

   const inputHandler = (event) => {
      const { value } = event.target;
      setJokeText(value);
   };

   console.log(jokeText);
   useEffect(() => {
      setJokeText(joke.text);
   }, [joke.text]);

   const editJokeHandler = async (event) => {
      event.preventDefault();
      try {
         const responseData = await sendRequest(
            `http://localhost:5000/api/jokes/editJoke/${joke.id}`,
            {
               method: "PATCH",
               headers: {
                  "Content-type": "Application/json",
                  authorization: `Bearer ${token}`,
               },
               body: JSON.stringify({
                  text: jokeText.trim(),
               }),
            }
         );
         setJokeText("");
         setJokes((prevJokes) =>
            prevJokes.map((joke) =>
               joke.id === responseData.joke.id ? responseData.joke : joke
            )
         );
      } catch (error) {}
   };

   return (
      <Dialog
         open={editMode}
         onClose={() => setEditMode(false)}
         maxWidth="xs"
         fullWidth
      >
         <DialogTitle
            sx={{ fontSize: "2rem", fontWeight: 600, color: "#1976d2" }}
         >
            Edit Joke
         </DialogTitle>
         <DialogContent sx={{ my: "1rem", color: "#1976d2" }}>
            {error && !isLoading && (
               <Alert
                  severity="error"
                  onClose={clearError}
                  sx={{ mb: "1.5rem" }}
               >
                  <AlertTitle>Error</AlertTitle>
                  {error}
               </Alert>
            )}
            <form onSubmit={editJokeHandler}>
               <Box mb="1.5rem">
                  <TextField
                     type="simple"
                     fullWidth
                     placeholder="Enter joke text"
                     value={jokeText}
                     required
                     multiline
                     onChange={inputHandler}
                  />
               </Box>
               <LoadingButton
                  type="submit"
                  size="large"
                  endIcon={<EditIcon />}
                  loading={isLoading}
                  loadingPosition="end"
                  variant="contained"
               >
                  Update
               </LoadingButton>
            </form>
         </DialogContent>
         <DialogActions
            sx={{
               px: "1.5rem",
               py: "1.5rem",
               flexDirection: "row",
               justifyContent: "flex-start",
               backgroundColor: "#e7ebf0",
            }}
         ></DialogActions>
      </Dialog>
   );
}

export default EditJokeModal;
