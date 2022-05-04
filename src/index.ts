import express from "express";
import pdfTemplate from "./pdf-template";
import pptxTemplate from "./pptx-template";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import { Data } from "./types";

dotenv.config();
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.options("*", cors());
const port = process.env.PORT;
const screenshotterUrl = process.env.SCREENSHOTTER_URL;

app.post("/report", async (req, res) => {
  const data = req.body as Data;
  const localAxiosInstance = axios.create({
    baseURL: screenshotterUrl,
    timeout: 180000,
    responseType: "blob",
  });
  const images = [];

  if (data.multiple_view) {
    for (var i = 0; i < data.comparative_context.comparativePanelsNumber; i++) {
      const image = await localAxiosInstance.post("/screenshot", {
        ...data,
        data_context: data.data_contexts[i],
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
