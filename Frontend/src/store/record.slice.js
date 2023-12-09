import { createSlice } from "@reduxjs/toolkit";

/*----------------------Initial State----------------------*/
const initialState = {
  login: false,
  workRecords: null,
  todosRecord: null,
  Available: false,
};

/*----------------------record slice----------------------*/
const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.login = action.payload;
      state.login = true;
    },
    setLogout: (state) => {
      state.login = false;
    },
    setWorkRecord: (state, action) => {
      state.workRecords = action.payload;
      state.Available = true;
      state.login = true;
    },
    setOneMoreWorkRecord: (state, action) => {
      state.workRecords += action.payload;
      state.Available = true;
    },
    getWorkRecord: (state) => {
      return state.workRecords;
    },
    setTodoRecord: (state, action) => {
      state.todosRecord = action.payload;
    },
    getTodoRecord: (state) => {
      return state.todosRecord;
    },
  },
});

export const {
  setAuth,
  getTodoRecord,
  setTodoRecord,
  getWorkRecord,
  setWorkRecord,
  setOneMoreWorkRecord,
  setLogout,
} = recordSlice.actions;

export default recordSlice.reducer;
