import { blue, grey } from "@mui/material/colors";

/* Common Types */
type CardData = {
  title: string;
  desc: string;
  column: ColumnType;
  id?: string;
};

type ColumnType = "left" | "center" | "right" | "";

type Colors = (typeof grey)[50] | (typeof blue)[50];

type ColumnColor = "grey" | "blue";

type AddCardModalPurpose = "edit" | "add";

type EditCardInfo = {
  column: ColumnType;
  index: number;
};

/* Redux State Types */
type AppState = {
  appData: AppData;
  uiState: UIState;
};

type AppData = {
  left: CardData[];
  center: CardData[];
  right: CardData[];
};

type UIState = {
  addCardModal: {
    visible: boolean;
    purpose: AddCardModalPurpose;
    editCardInfo?: EditCardInfo;
  };
  columns: ColumnUI;
};

type ColumnUI = {
  left: {
    backgroundColor: Colors;
  };
  center: {
    backgroundColor: Colors;
  };
  right: {
    backgroundColor: Colors;
  };
};

/* Dispatcher Action Types */
type AddCardAction = {
  cardData: CardData;
};

type DeleteCardAction = {
  column: ColumnType;
  index: number;
};

type UpdateCardAction = {
  cardData: CardData;
  prevIndex: number;
  prevColumn: ColumnType;
};

type ShowAddCardModalAction = {
  purpose: AddCardModalPurpose;
  editCardInfo?: EditCardInfo;
};

type ChangeColumnBgAction = {
  column: ColumnType;
  color: ColumnColor;
};

/* App Config Type */
type AppConfig = {
  columns: ColumnType[];
  titleRegex: RegExp;
  appDataKey: string;
  greyBg: Colors;
  blueBg: Colors;
};

export type {
  ColumnType,
  CardData,
  AddCardModalPurpose,
  EditCardInfo,
  Colors,
  ColumnColor,
  ColumnUI,
  AppData,
  UIState,
  AppState,
  AddCardAction,
  DeleteCardAction,
  UpdateCardAction,
  ShowAddCardModalAction,
  ChangeColumnBgAction,
  AppConfig,
};
