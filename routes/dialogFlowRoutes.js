const chatbot = require("../chatbot/chatbot");

module.exports = app => {
  app.get("/", (req, res) => {
    res.send("NESH!!!");
  });

  // for text queries
  app.post("/api/df_text_query", async (req, res) => {
    let responses = await chatbot.textQuery(req.body.text, req.body.parameters);
    res.status(200).send(responses);
  });

  // for event queries
  app.post("/api/df_event_query", async (req, res) => {
    let responses = await chatbot.eventQuery(
      req.body.event,
      req.body.parameters
    );
    res.status(200).send(responses);
  });

  // for audio queries
  app.post("/api/df_audio_query", async (req, res) => {
    let responses = await chatbot.audioQuery();
    res.status(200).send(responses);
  });
};
