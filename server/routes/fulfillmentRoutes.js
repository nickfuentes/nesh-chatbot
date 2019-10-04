const { WebhookClient } = require("dialogflow-fulfillment");
const models = require("../models");

module.exports = app => {
  app.post("/", async (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });

    mapWells = async agent => {
      const wells = await models.Eagleford.findAll({
        where: {
          wellName: "STANLEY RANCH"
        }
      });

      const wellLocations = wells.map(well => {
        let wellLocation = {
          long: well.dataValues.surfaceHoleLongitude,
          lat: well.dataValues.surfaceHoleLatitude
        };
        return wellLocation;
      });

      console.log(wellLocations);
      const responseText = `Here are the well locations for STANLEY RANCH`;
      const wellsText = ` \n\n ${wellLocations}`;
      agent.add(wellsText);
      agent.add(responseText);
      console.log(agent.parameters);
    };

    function fallback(agent) {
      agent.add(`Webhook I didn't understand`);
      agent.add(`Webhook I'm sorry, can you try again?`);
    }

    let intentMap = new Map();
    intentMap.set("Map Wells", mapWells);
    intentMap.set("Default Fallback Intent", fallback);
    agent.handleRequest(intentMap);
  });
};
