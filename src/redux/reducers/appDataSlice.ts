import { createSlice } from "@reduxjs/toolkit";

import { appConfig } from "../../config/appConfig";
import {
  AddCardAction,
  AppData,
  AppState,
  DeleteCardAction,
  ShowAddCardModalAction,
} from "../../types/Type";

import type { PayloadAction } from "@reduxjs/toolkit";

// Constants
const APPDATAKEY = appConfig.appDataKey;

/* ============= Initialize state from local storage ================ */
let initialState: AppState = {
  appData: { left: [], center: [], right: [] },
  uiState: { addCardModal: { visible: false, purpose: "add" } },
};

const appData = localStorage.getItem(APPDATAKEY);

if (appData) {
  initialState.appData = JSON.parse(appData);
}
/* ================================================================== */

export const appStateSlice = createSlice({
  name: "appState",
  initialState, //state of appState reducer
  reducers: {
    //reducer logics
    addCard: (state: AppState, action: PayloadAction<AddCardAction>) => {
      try {
        let newAppData = Object.assign({}, state.appData);
        newAppData[action.payload.cardData.column as keyof AppData].push(
          action.payload.cardData
        );
        localStorage.setItem(APPDATAKEY, JSON.stringify(newAppData));
        state.appData = newAppData;
      } catch (error) {
        console.error(error);
      }
    },
    deleteCard: (state: AppState, action: PayloadAction<DeleteCardAction>) => {
      try {
        let newAppData = Object.assign({}, state.appData);
        newAppData[action.payload.column as keyof AppData].splice(
          action.payload.index,
          1
        );
        localStorage.setItem(APPDATAKEY, JSON.stringify(newAppData));
        state.appData = newAppData;
      } catch (error) {
        console.error(error);
      }
    },
    showAddCardModal: (
      state: AppState,
      action: PayloadAction<ShowAddCardModalAction>
    ) => {
      try {
        state.uiState.addCardModal.visible = true;
        state.uiState.addCardModal.purpose = action.payload.purpose;
        if (action.payload.purpose === "edit" && action.payload.editCardInfo) {
          state.uiState.addCardModal.editCardInfo = action.payload.editCardInfo;
        }
      } catch (error) {
        console.error(error);
      }
    },
    closeAddCardModal: (state: AppState) => {
      try {
        state.uiState.addCardModal.visible = false;
        if (
          state.uiState.addCardModal.purpose === "edit" &&
          state.uiState.addCardModal.editCardInfo
        ) {
          delete state.uiState.addCardModal.editCardInfo;
        }
        state.uiState.addCardModal.purpose = "add";
      } catch (error) {
        console.error(error);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCard, deleteCard, showAddCardModal, closeAddCardModal } =
  appStateSlice.actions; //exporting actions for each reducer logic

export default appStateSlice.reducer; //exporting counter reducer logics
