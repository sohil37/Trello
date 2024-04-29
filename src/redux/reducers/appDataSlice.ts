import { createSlice } from "@reduxjs/toolkit";

import { AddCardAction, AppData, AppState } from "../../types/Type";

import type { PayloadAction } from "@reduxjs/toolkit";

/* ============= Initialize state from local storage ================ */
let initialState: AppState = {
  appData: { left: [], center: [], right: [] },
  uiState: { addCardModal: { visible: false } },
};

const appData = localStorage.getItem("appData");

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
        newAppData[action.payload.column as keyof AppData].push(
          action.payload.cardData
        );
        localStorage.setItem("appData", JSON.stringify(newAppData));
        state.appData = newAppData;
      } catch (error) {
        console.error(error);
      }
    },
    showAddCardModal: (state: AppState) => {
      try {
        state.uiState.addCardModal.visible = true;
      } catch (error) {
        console.error(error);
      }
    },
    closeAddCardModal: (state: AppState) => {
      try {
        state.uiState.addCardModal.visible = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCard, showAddCardModal, closeAddCardModal } =
  appStateSlice.actions; //exporting actions for each reducer logic

export default appStateSlice.reducer; //exporting counter reducer logics
