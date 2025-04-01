import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import bg from '../assets/bg.png'

export default function Overlay() {

    const naivigate = useNavigate()
    const onLogin=()=>{
        naivigate("/login")
    }

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Darker Overlay with Gradient */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          color: "white",
        }}
      >
        {/* Animated Title */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
            Please Login to Get Access
          </Typography>
        </motion.div>

        {/* Subtext */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}>
          <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.8 }}>
            Unlock premium features by logging in to your account.
          </Typography>
        </motion.div>

        {/* Animated Button */}
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 1 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<LoginIcon />}
            sx={{ mt: 3, px: 4, py: 1.5, fontSize: "1rem", fontWeight: "bold", borderRadius: "8px" }}
            onClick={onLogin} // Function to navigate to login page
          >
            Login Now
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
}
