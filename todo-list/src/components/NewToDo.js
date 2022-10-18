import React, { useState } from "react";
import axios from "axios";

const NewToDo = () => {
  const [content, setContent] = useState("");

  const onSubmit = async (e) => {
    //submit 이벤트가 발생했을 때 form태그 자동으로 전송되는 것을 막아줌
    // e.preventDefault();
    await axios.post("http://localhost:3001/incompleteToDos", {
      title: content,
      isCompleted: false,
    });
    setContent("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.nativeEvent.isComposing === false) {
      onSubmit();
      console.log("엔터");
    }
  };

  return (
    <form className="new" onSubmit={onSubmit}>
      <input
        autoFocus
        type="text"
        placeholder="할 일을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button className="btn" type="submit" disabled={content.length === 0}>
        Add
      </button>
    </form>
  );
};

export default NewToDo;
