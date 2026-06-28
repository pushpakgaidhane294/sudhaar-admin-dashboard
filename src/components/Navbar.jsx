import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CircleIcon from "@mui/icons-material/Circle";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Box,
  Button,
  Chip,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { getUserData } from "../services/userService";

export default function Navbar({ onLogout }) {
const [adminName, setAdminName] = useState("Municipal Admin");

useEffect(() => {
  const loadUser = async () => {
    if (auth.currentUser) {
      const data = await getUserData(auth.currentUser.uid);

      if (data) {
        setAdminName(data.name);
      }
    }
  };

  loadUser();
}, []);

  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <AppBar
      position="static"
      elevation={2}
      sx={{
        background: "linear-gradient(90deg, #FF9933 0%, #138808 100%)",
        color: "white",
        borderRadius: "12px",
        marginBottom: "25px",
        boxShadow: "0 4px 12px rgba(19, 136, 8, 0.25)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Left */}

        <Box>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              color: "white",
            }}
          >
            🏛 Municipal Complaint Management
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
            }}
          >
            Government Administration Portal
          </Typography>
        </Box>

        {/* Right */}

        <Box
          display="flex"
          alignItems="center"
          gap={2}
        >
          <Chip
            icon={
              <CircleIcon
                sx={{
                  color: "#FFD700 !important",
                  fontSize: 14,
                }}
              />
            }
            label="System Online"
            color="success"
            variant="outlined"
            sx={{
              borderColor: "white",
              color: "white",
              "& .MuiChip-icon": {
                color: "#FFD700 !important",
              },
            }}
          />

          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.95)",
            }}
          >
            {today}
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            gap={1}
            sx={{
              borderLeft: "2px solid rgba(255, 255, 255, 0.3)",
              paddingLeft: 2,
            }}
          >
            <AccountCircleIcon
              sx={{
                color: "#FFD700",
              }}
            />

            <Typography
              fontWeight="bold"
              sx={{
                color: "white",
              }}
            >
              {adminName}
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<LogoutIcon />}
            onClick={onLogout}
            sx={{
              background: "white",
              color: "#138808",
              fontWeight: "bold",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.9)",
                transform: "scale(1.05)",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}