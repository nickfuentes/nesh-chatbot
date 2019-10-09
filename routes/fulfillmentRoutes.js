const { WebhookClient } = require("dialogflow-fulfillment");
const models = require("../models");
const utils = require("../utils/helpers");
const { Payload } = require("dialogflow-fulfillment");

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

        console.log(agent.parameters.Basin);
        console.log(wells);

        const wellLocations = wells.map(well => {
          let wellLocation = {
            long: well.dataValues.surfaceHoleLongitude,
            lat: well.dataValues.surfaceHoleLatitude
          };
          return wellLocation;
        });

        let locations = [];

        let location = {
          location: wellLocations
        };

        locations.push(location);
        console.log(locations);

        console.log(wellLocations);
        const responseText = `Here are the well locations for ${utils.titleCase(
          agent.parameters.Basin
        )}`;
        const wellsText = `${wellLocations}`;
        // agent.add(locations);
        agent.add(wellsText);
        // agent.add([location]);
        // agent.add(JSON.stringify(location));
        agent.add(responseText);
        // agent.add(`hey`);

        agent.add(
          new Payload("custom_payload", {
            results: [
              {
                Title: "Some text",
                Link: "example.com"
              }
            ]
          })
        );

        console.log(utils.titleCase(agent.parameters.Basin));
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
