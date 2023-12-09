import { useState } from "react";
import logo from "../../assets/logo.png";
import WorkBookBackground from "../../assets/WorkBook.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { setAuth } from "../../store/record.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*----------------------State Variables & Methods----------------------*/
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*======================ClickOnLogin======================*/
  const clickOnLogin = async (e) => {
    e.preventDefault();
    const form = document.getElementById("signin-work-book");
    const formData = new FormData(form);

    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const response = await axios.post(
      "http://localhost:3000/api/v1/login",

      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    if (!response) {
      console.log(`Response never received`);
    } else {
      dispatch(setAuth());
      console.log(`Response ==> `);
      console.log(response);
      navigate(-1);
    }

    setEmail("");
    setPassword("");

    /*----------------------API call----------------------*/
  };

  return (
    <div className="grid grid-cols-5 border rounded overflow-hidden p-4 m-4">
      <div className="pr-10 col-span-2 py-8 ">
        <div className="w-full flex flex-col items-center">
          <img src={logo} alt="Work Book Logo" className="rounded-full w-28" />
          <h3 className="text-3xl mb-5 font-bold font-serif">Sign In</h3>
        </div>
        <form
          onSubmit={clickOnLogin}
          encType="multipart/form-data"
          id="signin-work-book"
        >
          {/* email */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="new-email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          {/* password */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              autoComplete="new-password"
              required
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              type="submit"
              className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  dark:bg-indigo-600 dark:focus:ring-indigo-700"
            >
              Submit
            </button>
            <br />
            if don`t have an account{" "}
            <Link to="/v1/api/auth/regiser" className="text-indigo-500">
              SignUp
            </Link>
          </div>
        </form>
      </div>

      <div className="inline-block col-span-3 h-full">
        <img className="h-full rounded" src={WorkBookBackground} alt="" />
      </div>
    </div>
  );
}

export default Login;
