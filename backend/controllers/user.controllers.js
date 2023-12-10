import User from "../models/user.models.js";
import {
  getFormattedDate,
  calculateTotalTime,
} from "../helper/controllers.helpers.js";

/*======================GetTodaysWork======================*/
const getTodaysWork = async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);

  const today = getFormattedDate(new Date());
  const workDay = user.workDays.find((day) => day.date === today);

  // if (workDay.todayTotalWork == 0) {
  //   res.status(204);
  // }

  res.status(201).json({
    sucess: true,
    todayWorkDetails: workDay,
  });
};

/*======================AddWork======================*/
const addWork = async (req, res) => {
  try {
    const { workName, startTime, endTime } = req.body;

    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const today = getFormattedDate(new Date());
    let workDay = user.workDays.find((day) => day.date === today);

    const newWork = {
      workName,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      totalTime: calculateTotalTime(new Date(startTime), new Date(endTime)),
    };

    if (!workDay) {
      workDay = {
        date: today,
        works: [],
      };
      user.workDays.push(workDay);
      workDay = user.workDays.find((day) => day.date === today);
    }

    workDay.works.push(newWork);

    user.workDays[0].todayTotalWork += newWork.totalTime; // Update total work for the day
    await user.save();

    res.status(201).json(newWork);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

/*======================Register======================*/
const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      res.status(201).json({
        sucess: false,
        message: "Please fill all the field",
      });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(201).json({
        sucess: false,
        message: "User already exist",
      });
    }
    const today = getFormattedDate(new Date());

    const newUser = await User.create({
      email,
      name,
      password,
      workDays: {
        date: today,
        todayTotalWork: 0,
        works: [],
      },
    });

    if (!newUser) {
      res.status(201).json({
        sucess: false,
        message: "Something went wrong!! in create user",
      });
    }

    const token = await newUser.GenerateToken();
    res.cookie("WRT", token);

    newUser.password = undefined;

    res.status(201).json({
      sucess: true,
      message: "Register successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(201).json({
      sucess: false,
      message: "Something went wrong!! in create user ========",
    });
  }
};

/*======================Login======================*/
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(201).json({
      sucess: false,
      message: "Please fill all the field",
    });
  }

  const userExist = await User.findOne({ email }).select("password");
  if (!userExist) {
    res.status(201).json({
      sucess: false,
      message: "User does not exist",
    });
  }

  if (!userExist.comparePassword(password)) {
    res.status(201).json({
      sucess: false,
      message: "invalid email or password",
    });
  }
  const token = await userExist.GenerateToken();
  res.cookie("WRT", token);

  res.status(201).json({
    sucess: true,
    message: "Login successfully",
  });
};

/*======================Logout======================*/
const logout = (req, res) => {
  res.clearCookie("WRT");

  // Optionally, you can also set additional cookie options
  // res.clearCookie('WRT', { path: '/', httpOnly: true, secure: true, sameSite: 'strict' });

  res.status(200).json({
    success: true,
    message: "Cookie deleted successfully",
  });
};

export { addWork, register, login, getTodaysWork, logout };
