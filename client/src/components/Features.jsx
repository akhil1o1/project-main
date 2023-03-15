import { Typography, Box, Link } from "@mui/material";

function Features() {
   return (
      <Box pt="2rem">
         <Typography my="1rem" color="#132d47">
            Structured source code for this web app can be found on{" "}
            <Link
               target="_blank"
               href="https://github.com/akhil1o1/project-main"
            >
               github.
            </Link>
         </Typography>
         <Typography my="1rem" color="#132d47" fontWeight="bold">
            Main Features of this web application.
         </Typography>
         <Typography my="0.5rem" color="#132d47">
            1. This web app is built using MERN stack.
         </Typography>
         <Typography my="0.5rem" color="#132d47">
            2. It has user SignUp/Login functionality implemented using JWT on
            backend.
         </Typography>
         <Typography my="0.5rem" color="#132d47">
            3. User has a login session of 1 hour.
         </Typography>
         <Typography my="0.5rem" color="#132d47">
            4. This web app has Admin/User functionality.
         </Typography>
         <Typography my="0.5rem" color="#132d47">
            5. User can post jokes and view jokes posted by others.
         </Typography>
         <Typography my="0.5rem" color="#132d47">
            6. User can edit/delete jokes posted by him.
         </Typography>
         <Typography my="0.5rem" color="#132d47">
            7. Admin can delete jokes posted by him as well as any user.
         </Typography>
         <Typography my="0.5rem" color="#132d47">
            8. This web app has proper client and server side
            authorization/validation.
         </Typography>
         <Typography my="0.5rem" color="#132d47">
            9. This web app has extensive error handling both on client and
            server side.
         </Typography>
         <Typography  mt="1.5rem" mb="2rem" color="#132d47">
            My linkedIn{" "}
            <Link
               target="_blank"
               href="https://www.linkedin.com/in/akhil-panwar-/"
            >
               profile,
            </Link>{" "}
            and my portfolio{" "}
            <Link
               target="_blank"
               href="https://akhilpanwar-portfolio.netlify.app/"
            >
                website.
            </Link>
         </Typography>
      </Box>
   );
}

export default Features;
