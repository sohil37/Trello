import { useDispatch } from "react-redux";

import { Tooltip, useMediaQuery } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Fade from "@mui/material/Fade";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { showAddCardModal } from "../../redux/reducers/appDataSlice";
import { CardData } from "../../types/Type";
import styles from "./customCard.module.css";

function CustomCard(props: { data: CardData; index: number }) {
  /* Redux Dispatcher */
  const dispatch = useDispatch();

  /* Media Query */
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Tooltip
      title="Click to edit or Click and Drag to move"
      arrow
      TransitionComponent={Fade}
      className={styles.root}
    >
      <Card
        variant="outlined"
        onClick={() => {
          dispatch(
            showAddCardModal({
              purpose: "edit",
              editCardInfo: { column: props.data.column, index: props.index },
            })
          );
        }}
      >
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className={styles.title}
            fontSize={smallScreen ? "1.25rem" : "1.5rem"}
          >
            {props.data.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.data.desc}
          </Typography>
        </CardContent>
      </Card>
    </Tooltip>
  );
}

export default CustomCard;
