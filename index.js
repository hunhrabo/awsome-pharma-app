const express = require("express");
const path = require("path");
const cors = require("cors");
const exceltojson = require("xlsx-to-json-lc");
const excelfile = "./Mini case.xlsx";
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.static("build"));

app.get("/", (req, res) => {
  res.send("Hello world");
});

// route for salesperson sheet
app.get("/api/salespersons", (req, res) => {
  exceltojson(
    {
      input: path.resolve(excelfile),
      output: null,
      sheet: "Salesperson",
      lowerCaseHeaders: true
    },
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(result);
        res.json({ data: result });
      }
    }
  );
});

app.get("/api/orders", (req, res) => {
  exceltojson(
    {
      input: path.resolve(excelfile),
      output: null,
      sheet: "Orders",
      lowerCaseHeaders: true
    },
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(result);
        res.json({ data: result });
      }
    }
  );
});

app.get("/api/products", (req, res) => {
  exceltojson(
    {
      input: path.resolve(excelfile),
      output: null,
      sheet: "Products",
      lowerCaseHeaders: true
    },
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(result);
        res.json({ data: result });
      }
    }
  );
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
