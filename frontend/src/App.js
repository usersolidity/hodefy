import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { useMoralis } from "react-moralis";

import logo from "./assets/images/logo.png";
import rocket from "./assets/images/rocket.png";
export default function App() {
  const [openForm, setOpenForm] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { authenticate, isAuthenticated, user, logout } = useMoralis();

  const connect = () => {};

  const openSignInForm = async () => {
    if (!isAuthenticated) {
      setIsLoading(true);
      await authenticate();
      setIsLoading(false);
    } else {
      setIsLoading(true);
      await logout();
      setIsLoading(false);
    }
    // setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const onSignIn = () => {
    setOpenForm(false);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        sx={{ p: 30, pt: 6, bgcolor: "#7d54e1", height: "100vh" }}
        style={{ maxWidth: "100%", paddingLeft: 60 }}
      >
        <Box
          sx={{
            p: 0,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={logo} style={{ width: 60, height: 60 }} />
            <span
              style={{
                marginLeft: 20,
                fontSize: 16,
                color: "#FFF",
                fontWeight: "bold",
              }}
              margin="dense"
            >
              HODEFY.
            </span>
          </Box>
          <Box sx={{ width: "30%" }}>
            <TextField
              id="margin-none"
              fullWidth
              variant={"outlined"}
              size="medium"
              margin="normal"
              sx={{ backgroundColor: "#FFF", borderRadius: 25 }}
            />
          </Box>

          <Button
            variant="container"
            style={{ backgroundColor: "#FFF", borderRadius: 30, height: 60 }}
            onClick={openSignInForm}
            disabled={isLoading}
          >
            {`${
              isAuthenticated ? `connected: ${user.getUsername()}` : "connect"
            } `}
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Box sx={{ width: "50%" }}>
            <p style={{ fontSize: 72, lineHeight: 0, marginTop: 100 }}>
              <span>HO</span>
              <span style={{ color: "#FFF" }}>DEFY</span>
            </p>
            <p
              style={{
                color: "#FFF",
                width: "70%",
                fontSize: 20,
                marginTop: -20,
              }}
            >
              A global marketplace to accelerate transactions and improve the
              traceability of the purchase, sale and lease of real estate
              through blockchain technology in order to ensure a greater
              transaparency in any operation involving and exchange of ownership
              of real estate.
            </p>
          </Box>
          <Box
            sx={{
              width: "50%",
              mt: 10,
            }}
          >
            <img src={rocket} style={{ width: 600, height: "auto" }} />
          </Box>
        </Box>
      </Container>
      <Modal
        open={openForm}
        onClose={handleCloseForm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#FFF",
            width: "50%",
            p: 8,
            borderRadius: 5,
          }}
        >
          <TextField
            variant="outlined"
            sx={{ width: "100%" }}
            placeholder="Username"
            mb={3}
          />
          <Box sx={{ height: 30 }} />
          <TextField
            variant="outlined"
            sx={{ width: "100%" }}
            placeholder="Email"
          />
          <Box sx={{ height: 30 }} />
          <Button
            sx={{ width: "100%", backgroundColor: "#7d54e1" }}
            size="large"
            variant="contained"
            onClick={onSignIn}
          >
            Sign in
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
