// Common Types
export type Column = "left" | "center" | "right" | "";

export type CardData = {
  title: string;
  desc: string;
  column: Column;
};

export type AddCardModalPurpose = "edit" | "add";

export type EditCardInfo = {
  column: Column;
  index: number;
};

// Redux State Types
export type AppData = {
  left: CardData[];
  center: CardData[];
  right: CardData[];
};

export type UIState = {
  addCardModal: {
    visible: boolean;
    purpose: AddCardModalPurpose;
    editCardInfo?: EditCardInfo;
  };
};

export type AppState = {
  appData: AppData;
  uiState: UIState;
};

// Dispatcher Action Types
export type AddCardAction = {
  cardData: CardData;
};

export type DeleteCardAction = {
  column: Column;
  index: number;
};

export type ShowAddCardModalAction = {
  purpose: AddCardModalPurpose;
  editCardInfo?: EditCardInfo;
};
