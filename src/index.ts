import express from "express";
import pdfTemplate from "./pdf-template";
import pptxTemplate from "./pptx-template";
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

  if (req.body.type === "pdf") {
    const result = await pdfTemplate(image);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=export.pdf`);

    result.pipe(res);
  } else if (req.body.type === "ppt") {
    const result = await pptxTemplate(image);
    res.send(result);
  } else {
    res.send(image.data);
  }
});

app.listen(port, () => {
  console.log(`Reporter is running on port ${port}.`);
});
