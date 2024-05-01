import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";

import { Card, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { RootState } from "../../redux/store/store";
import { CardData, ColumnType, ColumnUI } from "../../types/Type";
import CustomCard from "../CustomCard/CustomCard";
import styles from "./column.module.css";

function Column(props: { data: CardData[]; columnName: ColumnType }) {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const appState = useSelector((state: RootState) => state.appState);

  return (
    <Card
      className={styles.root}
      variant="outlined"
      style={{
        backgroundColor:
          appState.uiState.columns[props.columnName as keyof ColumnUI]
            .backgroundColor,
      }}
    >
      <Typography
        variant="button"
        component={"div"}
        align="center"
        my={1}
        mb={smallScreen ? 0 : 1}
      >
        {props.columnName.charAt(0).toUpperCase() + props.columnName.slice(1)}
      </Typography>
      {props.data.map((curCardData, index) => {
        return (
          <Draggable
            draggableId={curCardData.id as string}
            index={index}
            key={curCardData.id as string}
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <CustomCard data={curCardData} index={index} />
              </div>
            )}
          </Draggable>
        );
      })}
    </Card>
  );
}

export default Column;
