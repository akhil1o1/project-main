import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

function Loader() {
   return (
      <Box
         sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "50vh",
         }}
      >
         <CircularProgress />
      </Box>
   );
}

export default Loader;
