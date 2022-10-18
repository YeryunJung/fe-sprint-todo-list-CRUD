import React, { useRef, useState } from "react";
import axios from "axios";

const ToDoCard = ({ todo }) => {
  const { id, title, isCompleted } = todo;
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

    //미완료 > 완료
    if (!todo.isCompleted) {
      axios
        .all(
          [
            axios.post("http://localhost:3001/completeToDos", {
              ...todo,
              isCompleted: true,
            }),
          ],
          [
            axios.delete(
              `http://localhost:3001/incompleteToDos/${todo.id}`,
              todo
            ),
          ]
        )
        .then(() => {
          window.location.href = "http://localhost:3000";
        })
        .then(() => {
          console.log("상태변경 성공");
        })
        .catch(() => console.log("상태변경 실패"));
      //완료 > 미완료
    } else if (todo.isCompleted) {
      axios
        .all(
          [
            axios.post("http://localhost:3001/incompleteToDos", {
              ...todo,
              isCompleted: false,
            }),
          ],
          [axios.delete(`http://localhost:3001/completeToDos/${todo.id}`, todo)]
        )
        .then(() => {
          window.location.href = "http://localhost:3000";
        })
        .then(() => {
          console.log("상태변경 성공");
        })
        .catch(() => console.log("상태변경 실패"));
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm("삭제하시겠습니까?")) {
      if (!todo.isCompleted) {
        axios
          .delete(`http://localhost:3001/incompleteToDos/${todo.id}`)
          .then(() => {
            window.location.href = "http://localhost:3000";
          })
          .then(() => console.log("삭제요청"))
          .catch(() => console.log("삭제실패"));
      } else if (todo.isCompleted) {
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
    console.log(todo);
    if (!todo.isCompleted) {
      axios
        .put(`http://localhost:3001/incompleteToDos/${todo.id}`, todo)
        .then(() => {
          window.location.href = "http://localhost:3000";
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch(() => console.log("수정실패"));
    }
  };

  return (
    // 완료된 일인지 아닌지에 따라 className 다르게 주기
    <div className={`todo ${todo.isCompleted ? "todo--complete" : ""}`}>
      <input
        type="checkbox"
        checked={todo.isCompleted}
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
            {!todo.isCompleted && <button onClick={onEdit}>Edit</button>}
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
