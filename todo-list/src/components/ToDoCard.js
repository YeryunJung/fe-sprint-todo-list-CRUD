import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  delete_todo,
  update_todo,
  todo_complete,
  todo_incomplete,
} from "../commons/actions";

const ToDoCard = ({ toDo }) => {
  const dispatch = useDispatch();

  const { id, title, isComplete } = toDo;

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

  const markAsComplete = (e) => {
    e.preventDefault();

    dispatch(todo_complete(toDo));
  };

  const markAsIncomplete = (e) => {
    e.preventDefault();

    dispatch(todo_incomplete(toDo));
  };

  const deleteToDo = (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to delete this ToDo?")) {
      dispatch(delete_todo(id));
    }
  };

  const editToDo = (e) => {
    e.preventDefault();

    dispatch(update_todo(toDo));
    // axios
    //   .put(`/api/todos/${toDo._id}`, { content })
    //   .then((res) => {
    //     updateTodo(res.data);
    //     setEditing(false);
    //   })
    //   .catch(() => {
    //     stopEditing();
    //   });
  };

  return (
    // 완료된 일인지 아닌지에 따라 className 다르게 주기
    <div className={`todo ${toDo.isComplete ? "todo--complete" : ""}`}>
      <input
        type="checkbox"
        checked={toDo.isComplete}
        // 완료된 일이 아니면 완료된 일로 바꿔라
        // 완료된 일이면 완료되지 않은 일로 바꿔라
        onChange={!toDo.isComplete ? markAsComplete : markAsIncomplete}
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
            {!toDo.isComplete && <button onClick={onEdit}>Edit</button>}
            <button onClick={deleteToDo}>Delete</button>
          </>
        ) : (
          // 편집 중일 때
          <>
            <button onClick={stopEditing}>Cancel</button>
            <button onClick={editToDo}>Save</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ToDoCard;
