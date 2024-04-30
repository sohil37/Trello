import { Draggable } from "react-beautiful-dnd";

import { CardData } from "../../types/Type";
import CustomCard from "../CustomCard/CustomCard";
import styles from "./column.module.css";

function Column(props: { data: CardData[] }) {
  return (
    <div className={styles.root}>
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
    </div>
  );
}

export default Column;
