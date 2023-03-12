import { TextField, Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
function AddJoke() {
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
         <Box
            display="flex"
            flexDirection="row"
            alignItems="baseline"
            justifyContent="space-around"
            gap={3}
         >
            <TextField
               id="outlined-basic"
               label="Enter new joke"
               variant="outlined"
               multiline
               fullWidth
               sx={{ mb: "2rem" }}
            />
            <Button size="large" variant="contained" endIcon={<AddIcon />}>
               Add
            </Button>
         </Box>
      </>
   );
}

export default AddJoke;
