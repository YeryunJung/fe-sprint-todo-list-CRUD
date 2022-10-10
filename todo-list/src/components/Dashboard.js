import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ToDoCard from "./ToDoCard";
import NewToDo from "./NewToDo";

const Dashboard = () => {
  const navigate = useNavigate();
  const incompleteToDos = useSelector((state) => state.incompleteToDos);
  const completeToDos = useSelector((state) => state.completeToDos);
  console.log(incompleteToDos);
  console.log(completeToDos);

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
          incompleteToDos.map((toDo) => <ToDoCard toDo={toDo} key={toDo.id} />)}
      </div>
      <div className="todos">
        <h2 className="todos__title">Complete ToDo's</h2>
        {completeToDos &&
          completeToDos.map((toDo) => <ToDoCard toDo={toDo} key={toDo.id} />)}
      </div>
    </div>
  );
};

export default Dashboard;
