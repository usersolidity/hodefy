import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, Modal, TextField, Typography } from "@mui/material";

import RLogin, { RLoginButton } from "@rsksmart/rlogin";
import WalletConnectProvider from "@walletconnect/web3-provider";

// construct rLogin pop-up in DOM
const rLogin = new RLogin({
  cachedProvider: true, // change to true to cache user's wallet choice
  providerOptions: {
    // read more about providers setup in https://github.com/web3Modal/web3modal/
    walletconnect: {
      package: WalletConnectProvider, // setup wallet connect for mobile wallet support
      options: {
        rpc: {
          31: "https://public-node.testnet.rsk.co", // use RSK public nodes to connect to the testnet
        },
      },
    },
  },
  supportedChains: [31], // enable rsk testnet network
});

export default function App() {
  const [openForm, setOpenForm] = React.useState(false);
  const [account, setAccount] = React.useState(null);
  const [provider, setProvider] = React.useState(null);

  const connect = () =>
    rLogin.connect().then(({ provider }) => {
      // the provider is used to operate with user's wallet
      setProvider(provider);

      console.log("request => ", JSON.stringify(provider, null, 2));
      // request user's account
      provider
        .request({ method: "eth_accounts" })
        .then(([account]) => setAccount(account));
    });

  const openSignInForm = () => {
    setOpenForm(true);
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
            <img
              src={require("./assets/images/logo.png")}
              style={{ width: 60, height: 60 }}
            />
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
          <RLoginButton onClick={connect}>Connect wallet</RLoginButton>
          {/* <Button
            variant="container"
            style={{ backgroundColor: "#FFF", borderRadius: 30, height: 60 }}
            onClick={openSignInForm}
          >
            Login/Register
          </Button> */}
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
              <span>{(`    Account connected: `, account)}</span>
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
            <img
              src={require("./assets/images/rocket.png")}
              style={{ width: 600, height: "auto" }}
            />
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
