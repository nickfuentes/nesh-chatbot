const chatbot = require("../chatbot/chatbot");

module.exports = app => {
  app.get("/", (req, res) => {
    res.send("NESH!!!");
  });

  app.post("/api/df_text_query", async (req, res) => {
    let responses = await chatbot.textQuery(req.body.text, req.body.parameters);
    res.status(200).send(responses);
  });

  app.post("/api/df_event_query", async (req, res) => {
    let responses = await chatbot.eventQuery(
      req.body.event,
      req.body.parameters
    );
    res.status(200).send(responses);
  });
};
