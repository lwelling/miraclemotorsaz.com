let nextTodoId = 0;

// import * as c from 'constants';

export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text,
});


// export const ADD_TODO = 'ADD_TODO';
// export const COMPLETE_TODO = 'COMPLETE_TODO';