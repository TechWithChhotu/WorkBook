const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost/work_records", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const userSchema = new mongoose.Schema({
  username: String,
  workDays: [
    {
      date: {
        type: String,
        default: () => {
          const currentDate = new Date();
          return `${currentDate.getDate()} ${getMonthName(
            currentDate.getMonth()
          )} ${currentDate.getFullYear()}`;
        },
      },
      works: [
        {
          workName: String,
          startTime: Date,
          endTime: Date,
          totalTime: Number,
        },
      ],
    },
  ],
});

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

const User = mongoose.model("User", userSchema);

app.use(express.json());

app.post("/user", async (req, res) => {
  try {
    const { username } = req.body;
    const user = new User({ username });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/user/:userId/work", async (req, res) => {
  try {
    const { workName, startTime, endTime } = req.body;
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const today = getFormattedDate(new Date());
    let workDay = user.workDays.find((day) => day.date === today);

    if (!workDay) {
      workDay = {
        date: today,
        works: [],
      };
      user.workDays.push(workDay);
    }

    const newWork = {
      workName,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      totalTime: calculateTotalTime(new Date(startTime), new Date(endTime)),
    };

    workDay.works.push(newWork);
    await user.save();

    res.status(201).json(newWork);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

function getFormattedDate(date) {
  return `${date.getDate()} ${getMonthName(
    date.getMonth()
  )} ${date.getFullYear()}`;
}

function calculateTotalTime(startTime, endTime) {
  return Math.floor((endTime - startTime) / (1000 * 60)); // Convert milliseconds to minutes
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
