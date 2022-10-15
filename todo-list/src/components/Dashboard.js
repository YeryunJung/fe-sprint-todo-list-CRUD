import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ToDoCard from "./ToDoCard";
import NewToDo from "./NewToDo";

const Dashboard = () => {
  const navigate = useNavigate();
  const incompleteToDos = useSelector(
    (state) => state.todo.todoList.incompleteToDos
  );
  const completeToDos = useSelector(
    (state) => state.todo.todoList.completeToDos
  );
  console.log(`state는 ${incompleteToDos}`);

  useEffect(() => {
    if (navigate) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="dashboard">
      <NewToDo />
      <div className="todos">
        {incompleteToDos &&
          incompleteToDos.map((todo) => <ToDoCard todo={todo} key={todo.id} />)}
      </div>
      <div className="todos">
        <h2 className="todos__title">Complete ToDo's</h2>
        {completeToDos &&
          completeToDos.map((todo) => <ToDoCard todo={todo} key={todo.id} />)}
      </div>
    </div>
  );
};

export default Dashboard;
