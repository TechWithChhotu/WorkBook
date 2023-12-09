import mongoose, { Schema } from "mongoose";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "email is required"],
  },
  name: {
    type: String,
    required: [true, "name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },

  /*----------------------Work Record----------------------*/
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
      todayTotalWork: {
        type: Number,
        default: 0,
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
  forgotPasswordToken: String,
  forgotPasswordExpire: Date,
});

/*=================>>Password increption<<=================*/
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
  comparePassword: async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
  },

  GenerateToken: async function () {
    return await JWT.sign(
      {
        id: this.id,
        email: this.email,
        name: this.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: 604800 }
    );
  },
};

const User = mongoose.model("User", userSchema);
export default User;
