import { useDispatch } from "react-redux";

import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { showAddCardModal } from "../../redux/reducers/appDataSlice";
import { CardData } from "../../types/Type";

function CustomCard(props: { data: CardData; index: number }) {
  const dispatch = useDispatch();

  return (
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
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.data.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.data.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CustomCard;
