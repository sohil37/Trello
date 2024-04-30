import { useDispatch } from "react-redux";

import AddBoxSharpIcon from "@mui/icons-material/AddBoxSharp";
import { Container, IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { showAddCardModal } from "../../redux/reducers/appDataSlice";

function Navbar() {
  const dispatch = useDispatch();

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Trello
          </Typography>
          <IconButton
            size="large"
            aria-label="add card button"
            color="inherit"
            onClick={() => {
              dispatch(showAddCardModal({ purpose: "add" }));
            }}
          >
            <AddBoxSharpIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
