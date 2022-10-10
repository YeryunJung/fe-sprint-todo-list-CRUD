export const ADD = "ADD_TODO";
export const SET_INCOMPELETE = "SET_INCOMPLETE_TODO";
export const SET_COMPELETE = "SET_COMPLETE_TODO";
export const DELETE = "DELETE_TODO";

let id = 1;

// todo를 생성하기 위해
// 매개변수로 받은 todo 객체를 reducer 에게 반환
export const add_todo = (todo) => {
  console.log(todo);
  return {
    type: ADD,
    todo: {
      id: id++,
      title: todo.title,
      isComplete: todo.isComplete,
    },
  };
};

// todo를 삭제하기 위해서 삭제하려는 todo의 id만을 반환
export const delete_todo = (id) => {
  return {
    type: DELETE,
    id,
  };
};

export const update_todo = (todo) => {
  // 완료되지 않은 투두만 수정할 수 있다
  if (!todo.isComplete) {
    return {
      type: SET_INCOMPELETE,
      todo: {
        id: todo.id,
        title: todo.title,
        isComplete: todo.isComplete,
      },
    };
  }
};

// 완료로 설정
export const todo_complete = (id) => {
  return {
    type: SET_COMPELETE,
    id,
  };
};

// 미완료로 설정
export const todo_incomplete = (id) => {
  return {
    type: SET_INCOMPELETE,
    id,
  };
};
