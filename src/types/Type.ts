// Common Types
export type ColumnType = "left" | "center" | "right" | "";

export type CardData = {
  title: string;
  desc: string;
  column: ColumnType;
  id?: string;
};

export type AddCardModalPurpose = "edit" | "add";

export type EditCardInfo = {
  column: ColumnType;
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
  column: ColumnType;
  index: number;
};

export type UpdateCardAction = {
  cardData: CardData;
  prevIndex: number;
  prevColumn: ColumnType;
};

export type ShowAddCardModalAction = {
  purpose: AddCardModalPurpose;
  editCardInfo?: EditCardInfo;
};
