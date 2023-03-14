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

function JokeCard({joke, setJokes}) {
   return (
      <Card variant="outlined" sx={{ maxWidth: 345 }}>
         <CardMedia
            component="img"
            alt="emoticon"
            height="140"
            image={emoticon}
         />
         <CardContent>
            <Typography gutterBottom fontWeight="bold" component="div">
               {`Posted by ${joke.creatorName}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
               {joke.text}
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
