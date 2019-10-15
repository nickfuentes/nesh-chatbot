const express = require("express");
const app = express();
const cors = require("cors");
const models = require("./models");

app.use(cors());
app.use(express.json());

// All user input will go through the dialogFlowRoutes
require("./routes/dialogFlowRoutes")(app);
// If the intent for user's input has fulfillment enabled it will also go through the fulfillmentRoutes
require("./routes/fulfillmentRoutes")(app);
// Various well queries
require("./routes/wellRoutes")(app);

// search top 10 cum BOE
app.get("/max-boe", (req, res) => {
  models.Eagleford.findAll({
    limit: 10,
    order: [["cumBoe", "DESC NULLS LAST"]]
  }).then(wellsinfo => {
    res.json(wellsinfo);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Nesh Chatbot server is running on port ${PORT}...`);
});
