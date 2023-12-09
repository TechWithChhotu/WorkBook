import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layout/Layout";
import axios from "axios";
import { setWorkRecord } from "./store/record.slice";
import { useDispatch } from "react-redux";

import {
  AddTodoPage,
  AddWorkRecordsPage,
  SignInPage,
  SignUpPage,
  RecordsWorkPage,
} from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<Layout />}>
      {/* Temprarly */}
      <Route path="" element={<AddWorkRecordsPage />}></Route>

      <Route path="v1/api/">
        <Route path="auth">
          <Route path="login" element={<SignInPage />}></Route>
          <Route path="regiser" element={<SignUpPage />}></Route>
        </Route>
        {/*--------------------------------------------*/}
        <Route path="work-records" element={<RecordsWorkPage />}></Route>
        <Route path="add-work-record" element={<AddWorkRecordsPage />}></Route>
        <Route path="add-todo" element={<AddTodoPage />}></Route>
      </Route>
    </Route>
  )
);

function App() {
  const dispatch = useDispatch();
  (async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/today-work",
      {
        withCredentials: true,
      }
    );
    if (!response || response.data == "") {
      console.log(`Response never received || Login First`);
    } else {
      console.log(response);
      dispatch(setWorkRecord(response.data.todayWorkDetails));
    }
  })();

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
