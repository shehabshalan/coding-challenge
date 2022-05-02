import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useUserAuth } from "../context/UserAuthContext";
import { useHistory } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";

function Login() {
  const [loading, setLoading] = useState(false);

  const { logIn } = useUserAuth();
  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      setLoading(true);
      await logIn(data.get("email"), data.get("password"));
      history.push("/");
    } catch (err) {
      setLoading(false);
      alert(err.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <LoadingButton
            type="submit"
            fullWidth
            loading={loading}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </LoadingButton>

          <Link
            href="/register"
            variant="body2"
            style={{ textAlign: "center" }}
          >
            {"Don't have an account? Register an account"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
export default Login;
