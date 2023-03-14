import { useState } from "react";
import { TextField, Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useHttpClient } from "./hooks/http-hook";
import { AuthContext } from "./context/auth-context.js";

function AddJoke() {
   const [newJoke, setNewJoke] = useState("");

   const inputHandler = (event) => {
      const { value } = event.target;
      setNewJoke(value.trim());
   };

   console.log(newJoke);

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
         <form>
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
            <Button type="submit" size="large" variant="contained" endIcon={<AddIcon />}>
               Add
            </Button>
         </Box>
         </form>
      </>
   );
}

export default AddJoke;
