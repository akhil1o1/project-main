import { nanoid } from "nanoid";
import { Grid } from "@mui/material";
import JokeCard from "./JokeCard";

function JokeCardList({ jokes, setJokes }) {
   return (
      <Grid
         container
         spacing={{ xs: 2, md: 3 }}
         columns={{ xs: 4, sm: 8, md: 12 }}
      >
         {jokes.map((joke) => (
            <Grid item xs={12} sm={4} md={4} key={nanoid()}>
               <JokeCard joke={joke} setJokes={setJokes}/>
            </Grid>
         ))}
      </Grid>
   );
}

export default JokeCardList;
