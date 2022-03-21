import { FunctionComponent, SetStateAction, useState } from "react";
import TodoStyles from "../styles/AddTodos.module.scss";
interface TodoProps {
  id: Number;
  name: string;
  status: boolean;
  __typename: string;
}
interface Props {
  TodoName: string;
  addTodo: () => Promise<unknown>;
  setTodoName: (value: SetStateAction<string>) => void;
  EditMode:boolean
}
const AddTodo: FunctionComponent<Props> = ({
  TodoName,
  setTodoName,
  addTodo,
  EditMode
}) => {
  return (
    <div className={TodoStyles.addTodos}>
      <div className={TodoStyles.wrapper}>
        <input
          type={"text"}
          value={TodoName}
          onChange={(e) => setTodoName(e.target.value)}
        />
        <span onClick={() => addTodo()}>{EditMode ?'Edit':'Add'}</span>
      </div>
    </div>
  );
};
export default AddTodo;
