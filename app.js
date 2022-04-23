const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const XLSX = require("xlsx");

app.listen(port, () => console.log(`Listening on port ${port}`));

//Gets data from file
app.get("/excelFile", (req, res) => {
  var workbook = XLSX.readFile("./client/public/files/HousePricing.xlsx");
  var sheet_name_list = workbook.SheetNames;
  var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  res.json(xlData);
});
