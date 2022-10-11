import { ADD, SET_INCOMPELETE, SET_COMPELETE, DELETE } from "./actions";

// 무조건 let
let initialState = {};

// 해당 액션이 어떤 결과를 내어야 하는지를 이 reducer 에서 정의
export const reducer = (state = initialState, action) => {
  // todo 배열에 새로운 항목을 추가한 새로운 state를 반환
  if (action.type === ADD) {
    return {
      // 만약 다른 state 가 존재한다면 전개 연산 ...state 를 해야함
      // 하지만 현재 state 에는 todos 하나 뿐이라 todos 만 반환하면 됨
      incompleteToDos: [action.todo, ...state.incompleteToDos],
    };
    // id가 동일한 todo 객체를 삭제한 todos를 반환
  } else if (action.type === DELETE) {
    if (action.todo.isComplete) {
      state.completeToDos.filter((todo) => todo.id !== action.todo.id);
    } else {
      state.incompleteToDos.filter((todo) => todo.id !== action.todo.id);
    }
  } else if (action.type === SET_COMPELETE) {
    state.incompleteToDos = state.incompleteToDos.filter(
      (todo) => todo.id !== action.todo.id
    );
    return {
      completeToDos: [action.todo, ...state.todos],
    };
  }
  // } else if (action.type === SET_INCOMPELETE) {
  //   state.completeToDos = state.completeToDos.filter((todo) => todo.id !== action.todo.id),
  //   return {
  //     incompleteToDos: [action.todo, ...state.todos],
  //   }
  else {
    return state;
  }
};
