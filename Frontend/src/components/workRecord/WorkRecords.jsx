import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

function WorkRecord() {
  const Storeres = useSelector((state) => state.recordSlice.workRecords) || {};
  const [data, setdata] = useState(Storeres);

  useEffect(() => {
    (async () => {
      setdata(Storeres);
    })();
  });

  const formatTimeFromMinutes = (totalMinutes) => {
    const duration = moment.duration(totalMinutes, "minutes");
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    if (!hours) return `${minutes} minutes.`;
    else return `${hours} hours, ${minutes} minutes.`;
  };

  const formatTime = (time) => {
    return moment(time).format("HH:mm");
  };

  return (
    <div className="bg-gray-900 text-white p-5 min-h-screen">
      <h2 className="text-lg">
        Today`s total working Time{" "}
        <span className="text-indigo-600">
          HH : MM :: {5} : {20}
        </span>
      </h2>

      <div className="relative overflow-x-auto mt-10 rounded">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                S.N.
              </th>
              <th scope="col" className="px-6 py-3">
                Work name
              </th>
              <th scope="col" className="px-6 py-3">
                Total time
              </th>
              <th scope="col" className="px-6 py-3">
                Time Period
              </th>
            </tr>
          </thead>
          <tbody>
            {data.works == undefined ? (
              <p>Love Your WOrk Book</p>
            ) : (
              Object.entries(data.works).map(([key, value]) => (
                <tr
                  key={key}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4"> {parseInt(key) + 1}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {value.workName}
                  </th>
                  <td className="px-6 py-4">
                    {" "}
                    {formatTimeFromMinutes(value.totalTime)}{" "}
                  </td>
                  <td className="px-6 py-4">
                    {formatTime(value.startTime)}-{formatTime(value.endTime)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WorkRecord;
