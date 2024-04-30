import { ChangeEvent, FormEvent, useEffect, useState } from "react";
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

import { appConfig } from "../../config/appConfig";
import {
  addCard,
  closeAddCardModal,
  deleteCard,
  updateCard,
} from "../../redux/reducers/appDataSlice";
import { RootState } from "../../redux/store/store";
import { CardData, ColumnType } from "../../types/Type";
import styles from "./addCardModal.module.css";

/* Constants */
const COLUMNS = appConfig.columns;
const TITLEREGEX = appConfig.titleRegex;
const APPDATAKEY = appConfig.appDataKey;

function AddCardModal() {
  /* ============== Redux State Selector ===============*/
  const addCardModalState = useSelector(
    (state: RootState) => state.appState.uiState.addCardModal
  );
  const open = addCardModalState.visible;
  const purpose = addCardModalState.purpose;

  /* Modal Fields State */
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [column, setColumn] = useState<ColumnType>("");
  const [id, setId] = useState<string>("");

  /* Modal Fields Error State  */
  const [showTitleError, setShowTitleError] = useState<boolean>(false);
  const [showDescError, setShowDescError] = useState<boolean>(false);
  const [showColumnError, setShowColumnError] = useState<boolean>(false);

  /* Modal UI State */
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  /* Redux Dispatcher */
  const dispatch = useDispatch();

  /* Core Functions */
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      if (validateFormInputs()) {
        const cardData = { title, desc, column, id };
        if (purpose === "edit" && addCardModalState.editCardInfo) {
          dispatch(
            updateCard({
              cardData: cardData,
              prevColumn: addCardModalState.editCardInfo.column,
              prevIndex: addCardModalState.editCardInfo.index,
            })
          );
        } else {
          dispatch(addCard({ cardData }));
        }
        resetModal();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = () => {
    try {
      if (purpose === "edit" && addCardModalState.editCardInfo) {
        dispatch(
          deleteCard({
            column: addCardModalState.editCardInfo.column,
            index: addCardModalState.editCardInfo.index,
          })
        );
        resetModal();
      } else {
        console.error("Something went wrong.");
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

  /* Hooks */
  useEffect(() => {
    try {
      let useDefault = true;
      // setting modal fields for edit card
      if (purpose === "edit" && addCardModalState.editCardInfo) {
        let editCardInfo = addCardModalState.editCardInfo;
        const appDataString = localStorage.getItem(APPDATAKEY);
        if (appDataString) {
          const appData = JSON.parse(appDataString);
          const cardData: CardData =
            appData[editCardInfo.column][editCardInfo.index];
          setTitle(cardData.title);
          setDesc(cardData.desc);
          setColumn(cardData.column);
          setId(cardData.id as string);
          useDefault = false;
        }
      }
      // setting modal fields for add card
      if (useDefault) {
        setTitle("");
        setDesc("");
        setColumn("");
      }
      setShowTitleError(false);
      setShowDescError(false);
      setShowColumnError(false);
    } catch (error) {
      console.error(error);
    }
  }, [purpose]);

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
                setColumn(event.target.value as ColumnType);
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
          {purpose === "edit" && (
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          )}
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
