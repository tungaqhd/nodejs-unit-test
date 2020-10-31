const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const converter = require("./converter");

app.post("/rgbToHex", (req, res) => {
  const { red, green, blue } = req.body;
  const hex = converter.rgbToHex(
    parseInt(red),
    parseInt(green),
    parseInt(blue)
  );
  res.json({ hex });
});

app.post("/hexToRgb", (req, res) => {
  const { hex } = req.body;
  const rgb = converter.hexToRgb(hex);
  res.json({ rgb });
});

app.listen(3000, () => console.log("App is listening on port 3000"));
module.exports = app;
