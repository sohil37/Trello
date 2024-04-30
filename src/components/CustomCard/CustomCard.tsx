import { useDispatch } from "react-redux";

import { Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

import { showAddCardModal } from "../../redux/reducers/appDataSlice";
import { CardData } from "../../types/Type";

function CustomCard(props: { data: CardData; index: number }) {
  const dispatch = useDispatch();

  return (
    <Tooltip
      title="Click to edit or Click and Drag to move."
      arrow
      TransitionComponent={Fade}
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
          <Typography gutterBottom variant="h5" component="div">
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
