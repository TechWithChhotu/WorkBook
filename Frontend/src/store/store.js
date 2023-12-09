import { configureStore } from "@reduxjs/toolkit";
import recordSlice from "./record.slice";

const store = configureStore({
  reducer: { recordSlice },
});

export default store;
