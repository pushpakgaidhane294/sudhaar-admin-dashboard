import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const [municipalId, setMunicipalId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      await signInWithEmailAndPassword(
        auth,
        municipalId.trim(),
        password
      );

      console.log("Login Successful");
    } catch (err) {
      console.error("Firebase Login Error:", err);
      console.error("Error Code:", err.code);
      console.error("Error Message:", err.message);

      alert(`Firebase Error: ${err.code}`);

      setError(err.code);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom, #FF9933 0%, #FFFFFF 50%, #138808 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          width: 430,
          padding: 5,
          borderRadius: 4,
          boxShadow: "0 8px 32px rgba(19,136,8,0.2)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <AccountBalanceIcon
            sx={{
              fontSize: 70,
              color: "#FF9933",
            }}
          />
        </Box>

        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          sx={{
            color: "#138808",
          }}
        >
          Sudhaar Admin
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          sx={{
            mb: 4,
            color: "#666",
          }}
        >
          Municipal Complaint Management
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Email"
          value={municipalId}
          onChange={(e) =>
            setMunicipalId(e.target.value)
          }
          onKeyDown={handleKeyPress}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon sx={{ color: "#FF9933" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#FF9933",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#138808",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#138808",
            },
          }}
        />

        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          label="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          onKeyDown={handleKeyPress}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon sx={{ color: "#FF9933" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#FF9933",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#138808",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#138808",
            },
          }}
        />

        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{
            mt: 3,
            py: 1.4,
            fontWeight: "bold",
            fontSize: 16,
            background:
              "linear-gradient(135deg, #FF9933 0%, #138808 100%)",
            "&:hover": {
              background:
                "linear-gradient(135deg, #E68820 0%, #0F6908 100%)",
            },
          }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography
          align="center"
          sx={{
            mt: 4,
            color: "gray",
            fontSize: 14,
          }}
        >
          © 2026 Sudhaar. All rights reserved.
        </Typography>
      </Paper>
    </Box>
  );
}