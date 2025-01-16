const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;
const mockdata = JSON.parse(fs.readFileSync(`${__dirname}/mockdata.json`));

app.use(express.json());
app.listen(3000, () => {
  console.log(`Server is running on port: ${port}`);
});

app.get("/me", (req, res) => {
  res.status(200).json({ status: "success", data: mockdata });
});

app.post("/me", (req, res) => {});

app.delete("/me", (req, res) => {});
