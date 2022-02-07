import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import logo from "./assets/images/logo.png";
import axios from "axios";

import {
  Divider,
  ListItemAvatar,
  ListItemText,
  ListItem,
  Typography,
  Avatar,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";

import { FixedSizeList } from "react-window";

function renderRow(props) {
  const { index, style, data } = props;

  const displayImg =
    data.links.length > 0
      ? data.links[0]
      : "https://i.guim.co.uk/img/media/58b3ba5ab7937c8de41a8bf87402e01389f17413/108_0_1000_600/master/1000.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=2a220443816da07944e021ecd5d42739";
  return (
    <>
      <ListItem style={{ height: 250, width: 860 }}>
        <Box sx={{ height: 250, width: "100%", display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={displayImg} height={"auto"} width={150} />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              // justifyContent: "center",
              //   alignItems: "center",
              flexDirection: "column",
            }}
            ml={10}
          >
            <ListItemText>{`OwnerAddress: ${data.ownerAddress}`}</ListItemText>
            <ListItemText>{`NFT Token: ${data.nftToken}`}</ListItemText>
            <ListItemText>{`Street Address: ${data.streetAddress}`}</ListItemText>
            <ListItemText>{`City: ${data.city}`}</ListItemText>
            <ListItemText>{`Country: ${data.country}`}</ListItemText>
          </Box>
        </Box>
      </ListItem>
      <Box sx={{ backgroundColor: "red", height: 2, width: 860 }} />
    </>
  );
}

export default function PropertyListPage() {
  const [list, setList] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("http://localhost:4000/properties")
      .then(function (response) {
        // handle success
        setList(response.data.reverse());
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        fixed
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
              {`HODEFY. ${list.length}`}
            </span>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: 860,
              maxHeight: 860,
              maxWidth: 860,
              bgcolor: "background.paper",
            }}
            style={{ overflow: "auto" }}
          >
            <FixedSizeList
              height={860}
              width={860}
              itemSize={10}
              itemCount={list.length}
              layout="horizontal"
            >
              {(prop) => renderRow({ ...prop, data: list[prop.index] })}
            </FixedSizeList>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
