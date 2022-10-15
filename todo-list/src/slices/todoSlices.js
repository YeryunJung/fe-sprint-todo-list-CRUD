import { createSlice } from "@reduxjs/toolkit";

function getTodoListfromLocalStorage() {
  const localStorageTodo = window.localStorage.getItem("todoList");
  if (localStorageTodo) return JSON.parse(localStorageTodo);
  const obj = {
    completeToDos: [{ id: 1, title: "open the gift", isComplete: true }],
    incompleteToDos: [
      { id: 2, title: "take a supplements", isComplete: false },
    ],
  };
  window.localStorage.setItem("todoList", JSON.stringify(obj));
  return obj;
}

// 초기화
const initialState = {
  todoList: getTodoListfromLocalStorage(),
};

export const todoSlice = createSlice({
  name: "todo", //  액션 생성 함수의 앞에 부분. 'study/START_STUDY' 의 study
  initialState,
  reducers: {
    // 액션 생성과 리듀서를 한번에 함수로 정의
    addTodo: (state, action) => {
      console.log(action.payload.isComplete);
      console.log("페이로드");
      console.log(initialState);
      state.todoList.incompleteToDos.push(action.payload);
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.incompleteToDos.push({ ...action.payload });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
      } else {
        window.localStorage.setItem(
          "todoList",
          JSON.stringify({ incompleteToDos: [{ ...action.payload }] })
        );
      }
    },
    deleteTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        if (!action.payload.isComplete) {
          todoListArr.incompleteToDos.forEach((todo, idx) => {
            if (todo.id === action.payload.id) {
              todoListArr.incompleteToDos.splice(idx, 1);
            }
          });
        } else if (action.payload.isComplete) {
          todoListArr.completeToDos.forEach((todo, idx) => {
            if (todo.id === action.payload.id) {
              todoListArr.completeToDos.splice(idx, 1);
            }
          });
        }
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
    updateTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      console.log(action.payload.title);

      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        console.log(todoListArr.incompleteToDos);
        if (!action.payload.isComplete) {
          todoListArr.incompleteToDos.forEach((todo) => {
            if (todo.id === action.payload.id) {
              action.payload.title = todo.title;
            }
          });
        }
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        console.log(`업데이트할 투두 : ${todoListArr.incompleteToDos}`);
        state.todoList = { ...todoListArr };
      }
      console.log("업데이트했다");
    },
  },
});

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
