import axios from "axios";
import { useState } from "react";
import { setWorkRecord } from "../../store/record.slice";
import { useDispatch } from "react-redux";

function AddWorkRecord() {
  const dispatch = useDispatch();

  function getCurrentTime() {
    const now = new Date();

    return `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  }

  const [time1, setTime1] = useState(getCurrentTime());
  const [time2, setTime2] = useState(getCurrentTime());
  const [work, setWork] = useState("");

  /*======================Handle Submit======================*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const form = document.getElementById("work-record-form");
    // const formData = new FormData(form);

    // for (const pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

    const response = await axios.post(
      "http://localhost:3000/api/v1/send-work",
      {
        workName: work,
        startTime: `2023-04-02T${time1}:00`,
        endTime: `2023-04-02T${time2}:00`,
      },
      {
        withCredentials: true,
      }
    );
    if (!response) {
      console.log(`Something went wrong`);
    } else {
      (async () => {
        const response = await axios.get(
          "http://localhost:3000/api/v1/today-work",
          {
            withCredentials: true,
          }
        );
        if (!response) {
          console.log(`Response never received`);
        } else {
          dispatch(setWorkRecord(response.data.todayWorkDetails));
        }
      })();
    }
    setTime1(getCurrentTime());
    setTime2(getCurrentTime());
    setWork("");
  };
  return (
    <form
      encType="multipart/form-data"
      id="work-record-form"
      className=" bg-gray-900 text-white h-screen w-full flex flex-col  gap-8 justify-center items-center"
      onSubmit={handleSubmit}
    >
      <div className="w-full px-64 flex justify-between ">
        <div className="flex gap-5 ">
          <input
            type="time"
            className="bg-indigo-600 rounded-md px-3"
            value={time1}
            name="staringTime"
            id="staringTime"
            onChange={(e) => setTime1(e.target.value)}
          />

          {/* <ReactTimeDatePiker /> */}

          <span className="text-4xl">To</span>
          {/* <Datetime /> */}

          <input
            type="time"
            className="bg-indigo-600 rounded-md px-3"
            name="EndingTime"
            id="EndingTime"
            value={time2}
            onChange={(e) => setTime2(e.target.value)}
          />
        </div>

        <input
          type="text"
          className="w-[400px]  bg-transparent border-2 border-indigo-600 rounded-md h-11 outline-none px-2"
          value={work}
          name="Work"
          id="Work"
          onChange={(e) => setWork(e.target.value)}
        />
      </div>
      <button className="bg-green-700 hover:bg-green-600 py-2 px-10 rounded-md">
        Add
      </button>
    </form>
  );
}

export default AddWorkRecord;
