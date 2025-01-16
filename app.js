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

app.post("/me", (req, res) => {
  console.log(req.body);
  const newData = { ...req.body };
  mockdata.push(newData);
  fs.writeFile(
    `${__dirname}/mockdata.json`,
    JSON.stringify(mockdata),
    (err) => {
      if (err) {
        console.log("Error:", err);
        return res
          .status(500)
          .json({ status: "error", message: "Data posting failed." });
      }
      res.status(201).json({
        status: "success",
        data: newData,
      });
    }
  );
});

app.patch("/me/:name", (req, res) => {
  const user = mockdata.find((item) => `${item.name}` === req.params.name);

  if (!user) {
    res.status(404).json({
      status: "Not found",
      message: "Invalid name",
    });
  }

  const updatedData = mockdata.map((item) => {
    if (`${item.name}` === req.params.name) {
      return { ...item, ...req.body };
    }
    return item;
  });

  fs.writeFile(
    `${__dirname}/mockdata.json`,
    JSON.stringify(updatedData),
    () => {
      res.status(201).json({
        status: "success",
        data: updatedData,
      });
    }
  );
});

app.delete("/me/:name", (req, res) => {
  const nameDelete = mockdata.find(
    (item) => `${item.name}` === req.params.name
  );

  if (!nameDelete) {
    return res.status(404).json({
      status: "Not found",
      message: "Invalid name",
    });
  }
  const newData = mockdata.filter((item) => `${item.name}` !== req.params.name);

  fs.writeFile(`${__dirname}/mockdata.json`, JSON.stringify(newData), () => {
    res.status(201).json({
      status: "Success",
      data: newData,
    });
  });
});
