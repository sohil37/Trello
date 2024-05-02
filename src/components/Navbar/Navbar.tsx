import { useDispatch } from "react-redux";

import AddBoxSharpIcon from "@mui/icons-material/AddBoxSharp";
import { Container, IconButton, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { showAddCardModal } from "../../redux/reducers/appDataSlice";

function Navbar() {
  /* Redux Dispatcher */
  const dispatch = useDispatch();

  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar disableGutters>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Trello
          </Typography>
          <Tooltip arrow title="Add new card">
            <IconButton
              size="large"
              color="inherit"
              onClick={() => {
                dispatch(showAddCardModal({ purpose: "add" }));
              }}
            >
              <AddBoxSharpIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
