import {
  DragDropContext,
  DragUpdate,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

import { Container, Grid } from "@mui/material";

import { changeColumnBg, updateCard } from "../../redux/reducers/appDataSlice";
import { RootState } from "../../redux/store/store";
import { AppData, ColumnType } from "../../types/Type";
import Column from "../Column/Column";
import styles from "./appBody.module.css";

function AppBody() {
  /* Redux Dispatcher */
  const dispatch = useDispatch();

  /* Getting App Data from Redux Store*/
  const appData = useSelector((state: RootState) => state.appState.appData);

  /* Utility Functions */
  const functionResetColumnBg = () => {
    try {
      dispatch(
        changeColumnBg({
          column: "left",
          color: "grey",
        })
      );
      dispatch(
        changeColumnBg({
          column: "center",
          color: "grey",
        })
      );
      dispatch(
        changeColumnBg({
          column: "right",
          color: "grey",
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const updateColumnBg = (result: DragUpdate) => {
    try {
      if (result.destination?.droppableId === "left") {
        dispatch(
          changeColumnBg({
            column: "left",
            color: "blue",
          })
        );
        dispatch(
          changeColumnBg({
            column: "center",
            color: "grey",
          })
        );
        dispatch(
          changeColumnBg({
            column: "right",
            color: "grey",
          })
        );
      } else if (result.destination?.droppableId === "center") {
        dispatch(
          changeColumnBg({
            column: "left",
            color: "grey",
          })
        );
        dispatch(
          changeColumnBg({
            column: "center",
            color: "blue",
          })
        );
        dispatch(
          changeColumnBg({
            column: "right",
            color: "grey",
          })
        );
      } else {
        dispatch(
          changeColumnBg({
            column: "left",
            color: "grey",
          })
        );
        dispatch(
          changeColumnBg({
            column: "center",
            color: "grey",
          })
        );
        dispatch(
          changeColumnBg({
            column: "right",
            color: "blue",
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* Core Functions */
  const handleOnDragEnd = (result: DropResult) => {
    try {
      if (
        result.destination &&
        result.source.droppableId != result.destination.droppableId
      ) {
        const sourceColumn = result.source.droppableId as ColumnType;
        const sourceColumnIndex = result.source.index;
        const destColumn = result.destination.droppableId as ColumnType;
        let cardData = Object.assign(
          {},
          appData[sourceColumn as keyof AppData][sourceColumnIndex]
        );
        cardData.column = destColumn;
        dispatch(
          updateCard({
            cardData: cardData,
            prevColumn: sourceColumn,
            prevIndex: sourceColumnIndex,
          })
        );
      }

      functionResetColumnBg();
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnDragUpdate = (result: DragUpdate) => {
    try {
      updateColumnBg(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className={styles.root}>
      <DragDropContext
        onDragEnd={handleOnDragEnd}
        onDragUpdate={handleOnDragUpdate}
      >
        <Grid container spacing={2} className={styles.columnsContainer}>
          <Grid item xs={6} sm={6} md={4}>
            <Droppable droppableId="left">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Column data={appData.left} columnName="left"></Column>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Grid>
          <Grid item xs={6} sm={6} md={4}>
            <Droppable droppableId="center">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Column data={appData.center} columnName="center"></Column>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Grid>
          <Grid item xs={6} sm={6} md={4}>
            <Droppable droppableId="right">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Column data={appData.right} columnName="right"></Column>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Grid>
        </Grid>
      </DragDropContext>
    </Container>
  );
}

export default AppBody;
