import { useState, useContext } from "react";
import {
   Card,
   CardActions,
   CardContent,
   CardMedia,
   IconButton,
   Typography,
   Tooltip,
   Alert,
   AlertTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useHttpClient } from "./hooks/http-hook";
import { AuthContext } from "./context/auth-context";
import EditJokeModal from "./EditJokeModal";

import emoticon from "./assets/emoticon.png";

function JokeCard({ joke, setJokes }) {
   const [editMode, setEditMode] = useState(false);

   const { isLoading, error, sendRequest, clearError } = useHttpClient();
   const authCtx = useContext(AuthContext);
   const { userName, userRole, token } = authCtx;

   const editModeHandler = () => {
      setEditMode(true);
   };

   const deleteJokeHandler = async (event) => {
      try {
         await sendRequest(
            `https://joke-app-backend-production.up.railway.app/api/jokes/deleteJoke/${joke.id}`,
            {
               method: "DELETE",
               headers: {
                  "Content-type": "Application/json",
                  authorization: `Bearer ${token}`,
               },
            }
         );
         setJokes((prevJokes) =>
            prevJokes.filter((jokeItem) => jokeItem.id !== joke.id)
         );
      } catch (error) {}
   };

   return (
      <Card variant="outlined" sx={{ maxWidth: 345 }}>
         <CardMedia
            component="img"
            alt="emoticon"
            height="140"
            image={emoticon}
         />
         <CardContent>
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
            <Typography gutterBottom fontWeight="bold" component="div">
               {`Posted by ${joke.creatorName}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
               {joke.text}
            </Typography>
         </CardContent>
         <CardActions>
            {(userName === joke.creatorName || userRole === "admin") && (
               <Tooltip title="Delete">
                  <IconButton onClick={deleteJokeHandler}>
                     <DeleteIcon />
                  </IconButton>
               </Tooltip>
            )}
            {userName === joke.creatorName && (
               <Tooltip title="Edit">
                  <IconButton onClick={editModeHandler}>
                     <EditIcon />
                  </IconButton>
               </Tooltip>
            )}
         </CardActions>
         {editMode && (
            <EditJokeModal
               joke={joke}
               setJokes={setJokes}
               editMode={editMode}
               setEditMode={setEditMode}
            />
         )}
      </Card>
   );
}

export default JokeCard;
