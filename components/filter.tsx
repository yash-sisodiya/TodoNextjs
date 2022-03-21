import { FunctionComponent } from "react";
import FilterStyles from "../styles/Filter.module.scss";

interface Props {
  filterTodo: (type: string) => Promise<void>;
}
const Filter: FunctionComponent<Props> = ({ filterTodo }) => {
  return (
    <div className={FilterStyles.filter}>
      <div className={FilterStyles.wrapper}>
        <div className={FilterStyles.type} onClick={() => filterTodo("All")}>All</div>
        <div className={FilterStyles.type} onClick={() => filterTodo("Completed")}>Completed</div>
        <div className={FilterStyles.type} onClick={() => filterTodo("Uncompleted")}>Uncompleted</div>
      </div>
    </div>
  );
};
export default Filter;
