import mongoose from "mongoose";
const DBConfig = async () => {
  const { connection } = await mongoose.connect(process.env.MONGO_URI);
  if (connection) {
    console.log(`Connection Successful`);
  } else {
    console.log(`Failed to connect to DB`);
  }
};

export default DBConfig;
