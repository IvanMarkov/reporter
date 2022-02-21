import express from "express";
import template from "./template";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.options("*", cors());
const port = 3002;

app.post("/report", async (req, res) => {
  const result = await template(req.body);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=export.pdf`);

  result.pipe(res);
});

app.listen(port, () => {
  console.log(`Reporter is running on port ${port}.`);
});
