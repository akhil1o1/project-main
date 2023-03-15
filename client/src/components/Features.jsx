import { Typography, Box } from "@mui/material";

function Features() {
   return (
      <Box pt="2rem">
         <Typography my="1rem" color="#132d47">
            Main Features of this web application.
         </Typography>
         <Typography my="0.5rem" color="#132d47">
            1. It has user SignUp/Login functionality implemented using JWT on
            backend.
         </Typography>
         <Typography my="0.5rem" color="#132d47">
            2. User has a login session of 1 hour.
         </Typography>
         <Typography my="0.5rem" color="#132d47">
            3. This web app has Admin/User functionality.
         </Typography>
         <Typography my="0.5rem" color="#132d47">
            4. User can post jokes and view jokes posted by others.
         </Typography>
         <Typography my="0.5rem" color="#132d47">
            5. User can edit/delete jokes posted by him.
         </Typography>
         <Typography my="0.5rem" color="#132d47">
            6. Admin can delete jokes posted by any user.
         </Typography>
         <Typography my="0.5rem" color="#132d47">
            7. This web app has proper client and server side
            authorization/validation.
         </Typography>
      </Box>
   );
}

export default Features;
