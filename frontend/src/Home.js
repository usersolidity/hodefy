import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, Input, Modal, TextField, Typography } from "@mui/material";
import { useMoralis } from "react-moralis";
import LoadingButton from "@mui/lab/LoadingButton";

import logo from "./assets/images/logo.png";
import rocket from "./assets/images/rocket.png";
import axios from "axios";

export default function Home() {
  const [openForm, setOpenForm] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { authenticate, isAuthenticated, user, logout } = useMoralis();
  const [city, setCity] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [nftToken, setNftToken] = React.useState("");
  const [files, setFiles] = React.useState(null);
  const [isRequesting, setIsRequestion] = React.useState(false);

  const onOpenForm = () => {
    setOpenForm(true);
  };

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

  const directToList = () => {};

  const onCreate = () => {
    const property = {
      city,
      country,
      streetAddress: address,
      ownerAddress: user.getUsername(),
      nftToken,
      // files,
    };
    console.log(JSON.stringify(property, null, 2));
    var bodyFormData = new FormData();
    bodyFormData.append("ownerAddress", user.getUsername());
    bodyFormData.append("city", city);
    bodyFormData.append("country", country);
    bodyFormData.append("streetAddress", address);
    bodyFormData.append("files", files, files.name);
    bodyFormData.append("nftToken", nftToken);

    setIsRequestion(true);
    axios({
      method: "post",
      url: "http://localhost:4000/properties",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
        setOpenForm(false);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
        setIsRequestion(false);
      });
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
          {/* <Box sx={{ width: "30%" }}>
              <TextField
                id="margin-none"
                fullWidth
                variant={"outlined"}
                size="medium"
                margin="normal"
                sx={{ backgroundColor: "#FFF", borderRadius: 25 }}
              />
            </Box> */}

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
        {isAuthenticated && (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="container"
              sx={{ mt: 2, mr: 2 }}
              style={{
                backgroundColor: "#FFF",
                borderRadius: 30,
                height: 60,
              }}
              onClick={directToList}
            >
              {/* Property List */}
              <nav>
                <Link to="/list">PropertyList</Link>
              </nav>
            </Button>

            <Button
              variant="container"
              sx={{ mt: 2 }}
              style={{
                backgroundColor: "#ff308b",
                borderRadius: 30,
                height: 60,
              }}
              onClick={onOpenForm}
            >
              Create Property
            </Button>
          </Box>
        )}

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
            placeholder="NFT Token"
            onChange={(evt) => {
              setNftToken(evt.target.value);
            }}
          />
          <Box sx={{ height: 30 }} />
          <Box>
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={(evt) => setFiles(evt.target.files[0])}
              />
            </label>
          </Box>
          <Box sx={{ height: 30 }} />
          <TextField
            variant="outlined"
            sx={{ width: "100%" }}
            placeholder="city"
            onChange={(evt) => {
              setCity(evt.target.value);
            }}
          />
          <Box sx={{ height: 30 }} />
          <TextField
            variant="outlined"
            sx={{ width: "100%" }}
            placeholder="country"
            onChange={(evt) => {
              setCountry(evt.target.value);
            }}
          />
          <Box sx={{ height: 30 }} />
          <TextField
            variant="outlined"
            sx={{ width: "100%" }}
            placeholder="Site Address"
            onChange={(evt) => {
              setAddress(evt.target.value);
            }}
          />
          <Box sx={{ height: 30 }} />
          <LoadingButton
            sx={{ width: "100%", backgroundColor: "#7d54e1" }}
            size="large"
            variant="contained"
            loading={isRequesting}
            onClick={onCreate}
          >
            Create
          </LoadingButton>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
