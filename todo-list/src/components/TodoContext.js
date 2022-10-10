import React, { createContext, useContext, useReducer, useRef } from "react";
// useReducer 를 사용하여 상태를 관리하는 TodoProvider 라는 컴포넌트

const initialTodos = [
  {
    id: 1,
    text: "프로젝트 생성하기",
    done: true,
  },
  {
    id: 2,
    text: "컴포넌트 스타일링하기",
    done: true,
  },
  {
    id: 3,
    text: "Context 만들기",
    done: false,
  },
  {
    id: 4,
    text: "기능 구현하기",
    done: false,
  },
];

function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return state.concat(action.todo);
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// state 와 dispatch 를 Context 통하여 다른 컴포넌트에서 바로 사용 할 수 있도록
// 두개의 Context 를 만들어서 따로 따로 넣어준다
// dispatch 만 필요한 컴포넌트에서 불필요한 렌더링을 방지 및 사용 편리
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
// nextId 가 의미하는 값은 새로운 항목을 추가 할 때 사용 할 고유 ID
// useRef로 관리
const TodoNextIdContext = createContext();

export function TodoProvider({ childeren }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {childeren}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

// 다른 컴포넌트에서 state 나 dispatch를 사용하고 싶을 때

// import React, { useContext } from 'react';
// import { TodoStateContext, TodoDispatchContext } from '../TodoContext';

// function Sample() {
//   const state = useContext(TodoStateContext);
//   const dispatch = useContext(TodoDispatchContext);
//   return <div>Sample</div>;
// }

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}

// 위를 추가로 export 해주면 아래처럼 사용할 수 있다

// import React from 'react';
// import { useTodoState, useTodoDispatch } from '../TodoContext';

// function Sample() {
//   const state = useTodoState();
//   const dispatch = useTodoDispatch();
//   return <div>Sample</div>;
// }

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}

// nextId 값을 위한 Context 를 만들 때에도 마찬가지로
// useTodoNextId 라는 커스텀 Hook을 따로 만들어준다
