import app from "./app.js";
import { config } from "dotenv";
import DBConfig from "./config/Config.js";
config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await DBConfig();
  console.log(`server is running on http://localhost:${PORT}`);
});
