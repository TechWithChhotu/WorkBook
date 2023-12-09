/*----------------------getMonthName----------------------*/
function getMonthName(monthIndex) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[monthIndex];
}

/*----------------------getFormattedDate----------------------*/
function getFormattedDate(date) {
  return `${date.getDate()} ${getMonthName(
    date.getMonth()
  )} ${date.getFullYear()}`;
}

/*----------------------calculateTotalTime----------------------*/
function calculateTotalTime(startTime, endTime) {
  return Math.floor((endTime - startTime) / (1000 * 60)); // Convert milliseconds to minutes
}

function getFormattedTime() {
  // Create a new Date object with the current date and time
  const currentDate = new Date();

  // Get individual date components
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  // Concatenate the components to form the desired format
  const formattedDateTime = `${year}-${month}-${day}T`;

  // Print the formatted date and time
  console.log(formattedDateTime);
  return formattedDateTime;
}

export { getMonthName, getFormattedDate, calculateTotalTime, getFormattedTime };
