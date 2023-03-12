import {
   Card,
   CardActions,
   CardContent,
   CardMedia,
   IconButton,
   Typography,
   Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import emoticon from "./assets/emoticon.png";

function JokeCard() {
   return (
      <Card variant="outlined" sx={{ maxWidth: 345 }}>
         <CardMedia
            component="img"
            alt="emoticon"
            height="140"
            image={emoticon}
         />
         <CardContent>
            <Typography gutterBottom variant="h5" component="div">
               Joke
            </Typography>
            <Typography variant="body2" color="text.secondary">
               Lizards are a widespread group of squamate reptiles, with over
               6,000 species, ranging across all continents except Antarctica
            </Typography>
         </CardContent>
         <CardActions>
            <Tooltip title="Delete">
               <IconButton>
                  <DeleteIcon />
               </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
               <IconButton>
                  <EditIcon />
               </IconButton>
            </Tooltip>
         </CardActions>
      </Card>
   );
}

export default JokeCard;
