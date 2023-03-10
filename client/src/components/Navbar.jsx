import { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

import { AuthContext } from "./context/auth-context";

function Navbar({ setShowAuthModal }) {
   const authCtx = useContext(AuthContext);
   const { logOut } = authCtx;

   const logOutHandler = () => {
      logOut();
   };

   return (
      <AppBar position="static">
         <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
               <EmojiEmotionsIcon
                  sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
               />
               <Typography
                  variant="h6"
                  noWrap
                  sx={{
                     mr: 2,
                     display: { xs: "none", md: "flex" },
                     fontFamily: "monospace",
                     fontWeight: 700,
                     letterSpacing: ".3rem",
                     color: "inherit",
                     textDecoration: "none",
                  }}
               >
                  JOKE APP
               </Typography>
               <EmojiEmotionsIcon
                  sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
               />
               <Typography
                  variant="h5"
                  noWrap
                  sx={{
                     mr: 2,
                     display: { xs: "flex", md: "none" },
                     flexGrow: 1,
                     fontFamily: "monospace",
                     fontWeight: 700,
                     letterSpacing: ".3rem",
                     color: "inherit",
                     textDecoration: "none",
                  }}
               >
                  JOKE APP
               </Typography>
               <Button
                  onClick={logOutHandler}
                  // onClick={() => setShowAuthModal(true)}
                  variant="outlined"
                  sx={{ color: "#fff" }}
               >
                  LOGOUT
               </Button>
            </Toolbar>
         </Container>
      </AppBar>
   );
}
export default Navbar;
