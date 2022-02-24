import express from "express";
import pdfTemplate from "./pdf-template";
import pptxTemplate from "./pptx-template";
import cors from "cors";
import axios from "axios";
import { Data } from "./types";

const app = express();
app.use(express.json());
app.use(cors());
app.options("*", cors());
const port = 3002;

app.post("/report", async (req, res) => {
  const data = req.body as Data;
  const localAxiosInstance = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 180000,
    responseType: "blob",
  });
  const images = [];

  if (!data.chart) {
    for (var i = 0; i < data.comparative_context.comparativePanelsNumber; i++) {
      const image = await localAxiosInstance.post("/screenshot", {
        ...data,
        legend: data.dashboard_context.legends.value[i],
        chart: data.dashboard_context.charts.value[i],
        filter_context: { ...data.filter_context, comparativeIndex: i },
      });
      images.push(image);
    }
  } else {
    const image = await localAxiosInstance.post("/screenshot", data);
    images.push(image);
  }

  if (data.type === "pdf") {
    const result = await pdfTemplate(images);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=export.pdf`);

    result.pipe(res);
  } else if (data.type === "ppt") {
    const result = await pptxTemplate(images);
    res.send(result);
  } else {
    res.send(images[0].data);
  }
});

app.listen(port, () => {
  console.log(`Reporter is running on port ${port}.`);
});
