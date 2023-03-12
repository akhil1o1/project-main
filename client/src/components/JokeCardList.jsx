import { Grid } from "@mui/material";
import JokeCard from "./JokeCard";

function JokeCardList() {
   return (
      <Grid
         container
         spacing={{ xs: 2, md: 3 }}
         columns={{ xs: 4, sm: 8, md: 12 }}
      >
         {Array.from(Array(6)).map((_, index) => (
            <Grid item xs={12} sm={4} md={4} key={index}>
               <JokeCard />
            </Grid>
         ))}
      </Grid>
   );
}

export default JokeCardList;
