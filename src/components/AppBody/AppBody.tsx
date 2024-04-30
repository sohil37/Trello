import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

import { Container, Grid } from "@mui/material";

import { updateCard } from "../../redux/reducers/appDataSlice";
import { RootState } from "../../redux/store/store";
import { AppData, ColumnType } from "../../types/Type";
import Column from "../Column/Column";
import styles from "./appBody.module.css";

function AppBody() {
  const dispatch = useDispatch();

  const appData = useSelector((state: RootState) => state.appState.appData);

  const handleOnDragEnd = (result: DropResult) => {
    try {
      if (
        result.destination &&
        result.source.droppableId != result.destination.droppableId
      ) {
        console.log(result);
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className={styles.root}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Grid container spacing={2} className={styles.columnsContainer}>
          <Grid item sm={6} md={4}>
            <Droppable droppableId="left">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`${styles.leftColumnContainer} ${styles.columnContainer}`}
                >
                  <Column data={appData.left}></Column>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Grid>
          <Grid item sm={6} md={4}>
            <Droppable droppableId="center">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`${styles.centerColumnContainer} ${styles.columnContainer}`}
                >
                  <Column data={appData.center}></Column>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Grid>
          <Grid item sm={6} md={4}>
            <Droppable droppableId="right">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`${styles.rightColumnContainer} ${styles.columnContainer}`}
                >
                  <Column data={appData.right}></Column>
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
