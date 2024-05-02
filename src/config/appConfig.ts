import { blue, grey } from "@mui/material/colors";

import { AppConfig } from "../types/Type";

export const appConfig: AppConfig = {
  columns: ["left", "center", "right"],
  titleRegex: /^[a-zA-Z\s]+$/,
  appDataKey: "appData",
  greyBg: grey[50],
  blueBg: blue[50],
};
