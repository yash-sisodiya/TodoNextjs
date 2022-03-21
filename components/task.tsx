import { FunctionComponent } from "react";
import TodoStyles from "../styles/Todos.module.scss";
interface TodoProps {
  id: Number;
  name: string;
  status: boolean;
  __typename: string;
}
interface Props {
  todo: TodoProps;
  deleteTodo: (id: Number) => Promise<unknown>;
  markTodo: (id: Number, status: boolean) => Promise<void>;
  updateTodo: (data: TodoProps) => Promise<void>;
}
const Todo: FunctionComponent<Props> = ({
  todo,
  deleteTodo,
  markTodo,
  updateTodo,
}) => {
  return (
    <div className={TodoStyles.wrapper}>
      <div className={TodoStyles.left}>
        <p>{todo.name}</p>
      </div>
      <div className={TodoStyles.right}>
        <span>
          <input
            type={"checkbox"}
            defaultChecked={todo.status}
            onClick={() => markTodo(todo.id, !todo.status)}
          />
        </span>
        <span onClick={()=>updateTodo(todo)}>&#9998;</span>
        <span onClick={() => deleteTodo(todo.id)}>&#10005;</span>
      </div>
    </div>
  );
};
export default Todo;
