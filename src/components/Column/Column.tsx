import { CardData } from "../../types/Type";
import CustomCard from "../CustomCard/CustomCard";
import styles from "./column.module.css";

function Column(props: { data: CardData[] }) {
  return (
    <div className={styles.root}>
      {props.data.map((curCardData, index) => {
        return <CustomCard data={curCardData} key={index} index={index} />;
      })}
    </div>
  );
}

export default Column;
