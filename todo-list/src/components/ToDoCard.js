import React, { useRef, useState } from "react";
import axios from "axios";
// import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo, updateStatus } from "../slices/todoSlices";

const ToDoCard = ({ todo }) => {
  const dispatch = useDispatch();

  // const history = useHistory();

  const { id, title, isComplete } = todo;
  const [content, setContent] = useState(title);
  const [editing, setEditing] = useState(false);

  const input = useRef(null);

  const onEdit = (e) => {
    e.preventDefault();

    setEditing(true);
    input.current.focus();
  };

  const stopEditing = (e) => {
    if (e) {
      e.preventDefault();
    }

    setEditing(false);
    setContent(title);
  };

  const handleStatus = (e) => {
    e.preventDefault();

    dispatch(updateStatus(todo));
  };

  // const markAsIncomplete = (e) => {
  //   e.preventDefault();

  //   // dispatch(todo_incomplete(toDo));
  // };

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this ToDo?")) {
      if (!todo.isComplete) {
        axios
          .delete(`http://localhost:3001/incompleteToDos/${todo.id}`)
          .then(() => {
            window.location.href = "http://localhost:3000";
          })
          .then(() => console.log("삭제요청"))
          .catch(() => console.log("삭제실패"));
        // readIncompelete();
      } else if (todo.isComplete) {
        axios
          .delete(`http://localhost:3001/completeToDos/${todo.id}`)
          .then(() => {
            window.location.href = "http://localhost:3000";
          })
          .then(() => console.log("삭제요청"))
          .catch(() => console.log("삭제실패"));
      }
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    setEditing(false);
    setContent(content);
    todo = {
      ...todo,
      title: content,
    };
    dispatch(updateTodo(todo));
  };

  return (
    // 완료된 일인지 아닌지에 따라 className 다르게 주기
    <div className={`todo ${todo.isComplete ? "todo--complete" : ""}`}>
      <input
        type="checkbox"
        checked={todo.isComplete}
        // 완료된 일이 아니면 완료된 일로 바꿔라
        // 완료된 일이면 완료되지 않은 일로 바꿔라
        // onChange={!todo.isComplete ? markAsComplete : markAsIncomplete}
        onChange={handleStatus}
      />
      <input
        type="text"
        ref={input}
        value={content}
        readOnly={!editing}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="todo__controls">
        {/* 편집 중이 아닐 때 */}
        {!editing ? (
          <>
            {/* 완료되지 않은 일 */}
            {!todo.isComplete && <button onClick={onEdit}>Edit</button>}
            <button onClick={handleDelete}>Delete</button>
          </>
        ) : (
          // 편집 중일 때
          <>
            <button onClick={stopEditing}>Cancel</button>
            <button onClick={handleUpdate}>Save</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ToDoCard;
