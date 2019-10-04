const express = require("express");
const app = express();
const cors = require("cors");
const models = require("./models");

app.use(cors());
app.use(express.json());

require("./routes/fulfillmentRoutes")(app);

// Search  By API14
app.get("/oil-well", (req, res) => {
  models.Eagleford.findAll({
    where: {
      api14: 42051340170000
    }
  }).then(wellsinfo => {
    res.json(wellsinfo);
  });
});

// Search By Field
app.get("/field", (req, res) => {
  models.Eagleford.findAll({
    where: {
      field: "BRISCOE RANCH"
    }
  }).then(wellsinfo => {
    res.json(wellsinfo);
  });
});

// Search By Lease Name and Well Status
app.get("/lease-name-well-status", (req, res) => {
  models.Eagleford.findAll({
    where: {
      leaseName: "R.H. PICKENS, ET AL B19 UNIT",
      wellStatus: "ACTIVE"
    }
  }).then(wellsinfo => {
    res.json(wellsinfo);
  });
});

app.get("/all-wells", (req, res) => {
  models.Eagleford.findAll({
    limit: 10
  }).then(wellsinfo => {
    res.json(wellsinfo);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
