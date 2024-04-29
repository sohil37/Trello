// Common Types
export type Column = "left" | "center" | "right" | "";

export type CardData = {
  title: string;
  desc: string;
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
  };
};

export type AppState = {
  appData: AppData;
  uiState: UIState;
};

// Dispatcher Action Types
export type AddCardAction = {
  cardData: CardData;
  column: Column;
};
