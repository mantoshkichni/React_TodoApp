import { useReducer, useState } from "react";
import "./styles.css";
const reducer = (todos, action) => {
  switch (action.type) {
    case "add_todo":
      if (action.payload.task != "")
        return [...todos, newTodo(action.payload.task)];
    case "delete_todo":
      return todos.filter((todo) => todo.id !== action.payload.id);

    default:
      return todos;
  }
};
function newTodo(task) {
  return { id: Date.now(), task: task, complete: false };
}
export default function App() {
  const [task, setTask] = useState("");
  const [todos, dispatch] = useReducer(reducer, []);
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(task);
    // dispatch({ type: "add_todo", payload: { task: task } });
    dispatch({ type: "add_todo", payload: { task } });
    setTask("");
    var d = new Date(Date.now());
    console.log(d);
  };
  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Create Todo</button>
      </form>
      {todos.map((todo) => {
        return (
          <div className="todo">
            <h1>{todo.task}</h1>
            <button
              className="del_button"
              onClick={() =>
                dispatch({ type: "delete_todo", payload: { id: todo.id } })
              }
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
