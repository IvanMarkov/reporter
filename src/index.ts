import express from "express";
import template from "./template";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());
app.options("*", cors());
const port = 3002;

app.post("/report", async (req, res) => {
  const localAxiosInstance = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 180000,
    responseType: "blob",
  });
  const image = await localAxiosInstance.post("/screenshot", req.body);

  const result = await template(image);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=export.pdf`);

  result.pipe(res);
});

app.listen(port, () => {
  console.log(`Reporter is running on port ${port}.`);
});
