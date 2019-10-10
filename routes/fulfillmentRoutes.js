const { WebhookClient, Payload } = require("dialogflow-fulfillment");
const models = require("../models");
const utils = require("../utils/helpers");
const { Response } = require("node-fetch");

module.exports = app => {
  app.post("/", async (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });

    mapWells = async agent => {
      try {
        const wells = await models.Eagleford.findAll({
          where: {
            diBasin: agent.parameters.Basin
          }
        });

        const wellLocations = wells.map(well => {
          let wellLocation = {
            long: well.dataValues.surfaceHoleLongitude,
            lat: well.dataValues.surfaceHoleLatitude
          };
          return wellLocation;
        });

        const responseText = `Here are the well locations for ${utils.titleCase(
          agent.parameters.Basin
        )}`;

        let payload = new Payload("PLATFORM_UNSPECIFIED", {});
        const pay = payload.setPayload(wellLocations);
        agent.add(pay);
        agent.add(responseText);
        console.log(payload);
      } catch (error) {
        console.log(error);
      }
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
