const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// All user input will go through the dialogFlowRoutes
require("./routes/dialogFlowRoutes")(app);
// If the intent for user's input has fulfillment enabled it will also go through the fulfillmentRoutes
require("./routes/fulfillmentRoutes")(app);
// Various well queries
require("./routes/wellRoutes")(app);

// index.html for all page routes
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Nesh Chatbot server is running on port ${PORT}...`);
});
