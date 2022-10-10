import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { add_todo } from "../commons/actions";

// // import e from "express";
// import { text } from "express";

const NewToDo = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const onSubmit = (e) => {
    //submit 이벤트가 발생했을 때 form태그 자동으로 전송되는 것을 막아줌
    e.preventDefault();

    const todo = {
      title: content,
      isComplete: false,
    };

    console.log(todo);
    dispatch(add_todo(todo));
    setContent("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <form className="new" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="할 일을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button className="btn" type="submit" disabled={content.length === 0}>
        Add
      </button>
    </form>
  );
};

export default NewToDo;
