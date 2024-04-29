import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { modalConfig } from "../../config/modalConfig";
import { addCard, closeAddCardModal } from "../../redux/reducers/appDataSlice";
import { RootState } from "../../redux/store/store";
import { Column } from "../../types/Type";
import styles from "./addCardModal.module.css";

/* Constants */
const COLUMNS = modalConfig.columns;
const TITLEREGEX = modalConfig.titleRegex;

function AddCardModal() {
  /* Modal Fields State */
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [column, setColumn] = useState<Column>("");

  /* Modal Fields Error State  */
  const [showTitleError, setShowTitleError] = useState<boolean>(false);
  const [showDescError, setShowDescError] = useState<boolean>(false);
  const [showColumnError, setShowColumnError] = useState<boolean>(false);

  /* Modal UI State */
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  /* Redux Dispatcher */
  const dispatch = useDispatch();

  // Redux State Selector
  const addCardModalState = useSelector(
    (state: RootState) => state.appState.uiState.addCardModal
  );
  const open = addCardModalState.visible;

  /* Core Functions */
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      if (validateFormInputs()) {
        const cardData = { title, desc };
        dispatch(addCard({ cardData, column }));
        resetModal();
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* Utility Functions */
  const validateFormInputs = () => {
    try {
      let validInputs = true;

      // validate title
      if (!title || !TITLEREGEX.test(title)) {
        setShowTitleError(true);
        validInputs = false;
      }

      // validate description
      if (!desc || desc.length < 25) {
        setShowDescError(true);
        validInputs = false;
      }

      // validate column
      if (!COLUMNS.includes(column)) {
        setShowColumnError(true);
        validInputs = false;
      }

      return validInputs;
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    try {
      dispatch(closeAddCardModal());
    } catch (error) {
      console.error(error);
    }
  };

  const resetModal = () => {
    try {
      setTitle("");
      setDesc("");
      setColumn("");
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog fullScreen={fullScreen} open={open}>
      <DialogTitle>Add Card</DialogTitle>
      <form
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          handleFormSubmit(event);
        }}
      >
        <DialogContent className={styles.dialogContent}>
          <TextField
            required
            margin="normal"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            error={showTitleError}
            helperText={
              showTitleError && "Title should only contain alphabets."
            }
            value={title}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (showTitleError) setShowTitleError(false);
              setTitle(event.target.value);
            }}
          />
          <TextField
            required
            margin="normal"
            name="desc"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            error={showDescError}
            helperText={
              showDescError &&
              "Description should contain minimum 25 characters."
            }
            value={desc}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (showDescError) setShowDescError(false);
              setDesc(event.target.value);
            }}
          />
          <FormControl fullWidth error={showColumnError} margin="normal">
            <InputLabel>Column</InputLabel>
            <Select
              label="Column"
              defaultValue="left"
              fullWidth
              variant="outlined"
              required
              error={showColumnError}
              value={column}
              onChange={(event: SelectChangeEvent) => {
                if (showColumnError) setShowColumnError(false);
                setColumn(event.target.value as Column);
              }}
            >
              {COLUMNS.map((column) => (
                <MenuItem key={column} value={column}>
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                </MenuItem>
              ))}
            </Select>
            {showColumnError && (
              <FormHelperText error>
                Please select Left, Center or Right column.
              </FormHelperText>
            )}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Close</Button>
          <Button type="submit" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddCardModal;
