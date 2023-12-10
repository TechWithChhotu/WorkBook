import app from "./app.js";
import { config } from "dotenv";
import DBConfig from "./config/Config.js";

config();

/*======================ForDeployment======================*/
import path, { dirname } from "path";
import express from "express";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "../Frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
});
/*======================ForDeploymentEnd======================*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await DBConfig();
  console.log(`server is running on http://localhost:${PORT}`);
});
