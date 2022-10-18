import { createSlice } from "@reduxjs/toolkit";

// localStorage 버전
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
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        if (!action.payload.isComplete) {
          console.log(action.payload.id);
          todoListArr.incompleteToDos.forEach((todo) => {
            if (todo.id === action.payload.id) {
              console.log(action.payload.status);
              todo.title = action.payload.title;
            }
          });
        }
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        console.log(`업데이트할 투두 : ${todoListArr.incompleteToDos}`);
        state.todoList = { ...todoListArr };
      }
    },
    // 배열 안 요소 바꾸기
    updateStatus: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      const todoListArr = JSON.parse(todoList);
      if (todoList) {
        if (!action.payload.isComplete) {
          todoListArr.incompleteToDos.forEach((todo, idx) => {
            if (todo.id === action.payload.id) {
              todo.isComplete = true;
              todoListArr.incompleteToDos.splice(idx, 1);
              todoListArr.completeToDos.push(todo);
              console.log(todoListArr);
            }
          });
        } else if (action.payload.isComplete) {
          todoListArr.completeToDos.forEach((todo, idx) => {
            if (todo.id === action.payload.id) {
              todo.isComplete = false;
              todoListArr.completeToDos.splice(idx, 1);
              todoListArr.incompleteToDos.push(todo);
              console.log(todoListArr);
            }
          });
        }
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = { ...todoListArr };
      }
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, updateStatus } =
  todoSlice.actions;
export default todoSlice.reducer;
