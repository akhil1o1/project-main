import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

function Navbar({ setShowAuthModal }) {
   const handleClickOpen = () => {
      setShowAuthModal(true);
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
                  onClick={handleClickOpen}
                  variant="outlined"
                  sx={{ color: "#fff" }}
               >
                  LogIn
               </Button>
            </Toolbar>
         </Container>
      </AppBar>
   );
}
export default Navbar;
