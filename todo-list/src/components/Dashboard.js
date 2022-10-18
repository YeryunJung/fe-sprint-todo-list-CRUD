import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ToDoCard from "./ToDoCard";
import NewToDo from "./NewToDo";

const Dashboard = () => {
  const navigate = useNavigate();
  const [complete, setCompelete] = useState([]);
  const [incomplete, setIncompelete] = useState([]);

  const readIncompelete = async () => {
    const { data } = await axios.get("http://localhost:3001/incompleteToDos");
    setIncompelete(data);
  };
  const readCompelete = async () => {
    const { data } = await axios.get("http://localhost:3001/completeToDos");
    setCompelete(data);
  };

  useEffect(() => {
    (async () => {
      await readIncompelete();
      await readCompelete();
    })();
  }, []);

  useEffect(() => {
    if (navigate) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="dashboard">
      <NewToDo />
      <div className="todos">
        {incomplete &&
          incomplete.map((todo) => (
            <ToDoCard
              todo={todo}
              key={todo.id}
              readIncompelete={readIncompelete}
            />
          ))}
      </div>
      <div className="todos">
        <h2 className="todos__title">Complete ToDo's</h2>
        {complete &&
          complete.map((todo) => (
            <ToDoCard todo={todo} key={todo.id} readCompelete={readCompelete} />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
