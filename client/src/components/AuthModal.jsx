import { useState } from "react";
import {
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Typography,
   Box,
   Button,
   TextField,
} from "@mui/material";

function AuthModal({ showAuthModal, setShowAuthModal }) {
   const [isLoginMode, setLoginMode] = useState(true);

   const handleClose = () => {
      setShowAuthModal(false);
   };

   const handleAuthMode = () => {
      setLoginMode((prev) => !prev);
   };

   return (
      <Dialog
         open={showAuthModal}
         onClose={handleClose}
         maxWidth="xs"
         fullWidth
      >
         <DialogTitle
            sx={{ fontSize: "2rem", fontWeight: 600, color: "#1976d2" }}
         >
            {isLoginMode ? "Login" : "Signup"}
         </DialogTitle>
         <DialogContent sx={{ my: "1rem", color: "#1976d2" }}>
            {!isLoginMode && (
               <Box mb="1.5rem">
                  <Typography>Name</Typography>
                  <TextField
                     type="simple"
                     fullWidth
                     placeholder="Enter your Name"
                  />
               </Box>
            )}

            <Box mb="1.5rem">
               <Typography>Email</Typography>
               <TextField
                  type="simple"
                  inputType="email"
                  fullWidth
                  placeholder="Enter your Email"
               />
            </Box>
            <Box mb="1.5rem">
               <Typography>Password</Typography>
               <TextField
                  type="simple"
                  inputType="password"
                  fullWidth
                  placeholder="Enter your password"
               />
            </Box>
            <Button size="large" variant="contained">
               {isLoginMode ? "Login" : "SignUp"}
            </Button>
         </DialogContent>
         <DialogActions
            sx={{
               px: "1.5rem",
               py: "1rem",
               flexDirection: "row",
               justifyContent: "flex-start",
               backgroundColor: "#e7ebf0",
            }}
         >
            <Typography color="#1976d2">
               {isLoginMode
                  ? "Don't have an account"
                  : "Already have an account?"}
            </Typography>
            <Button
               onClick={handleAuthMode}
               sx={{
                  color: "#CE0505",
                  textTransform: "none",
                  fontSize: "1rem",
               }}
               variant="text"
            >
               {isLoginMode ? "Sign UP" : "Log IN"}
            </Button>
         </DialogActions>
      </Dialog>
   );
}

export default AuthModal;
