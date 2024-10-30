import { createSlice } from "@reduxjs/toolkit";

export const todoList = createSlice({
  name: "todo",
  initialState: {
    newTodos: {},
    progressTodos: 
    {},
    completedTodos: {},
    cancledTodos: {},
  },
  reducers: {
    createNewTodo: (state, action)=>{
        state.newTodos = action.payload
    },
    createProgressTodo: (state, action)=>{
        state.progressTodos = action.payload
    },
    createCompletedTodo: (state, action)=>{
        state.completedTodos = action.payload
    },
    createCancledTodo: (state, action)=>{
        state.cancledTodos = action.payload
    },
  },
});

export const {
  createNewTodo,
  createProgressTodo,
  createCompletedTodo,
  createCancledTodo
} = todoList.actions;

export default todoList.reducer;


