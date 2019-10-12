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
          },
          limit: 100
        });

        const wellLocations = wells.map(well => {
          let wellLocation = {
            long: well.dataValues.surfaceHoleLongitude,
            lat: well.dataValues.surfaceHoleLatitude
          };
          return wellLocation;
        });

        const responseText = agent.parameters.Basin
          ? `Here's the well locations for ${utils.titleCase(
              agent.parameters.Basin
            )}`
          : `Here's all the wells`;
        // console.log(responseText);

        // console.log(agent.parameters);

        let payload = new Payload("PLATFORM_UNSPECIFIED", {});
        const pay = payload.setPayload(wellLocations);
        agent.add(pay);
        agent.add(responseText);
        // console.log(payload);
      } catch (error) {
        console.log(error);
      }
    };

    cumBOE = async agent => {
      try {
        const wells = await models.Eagleford.findAll({
          limit: 10,
          order: [["cumBoe", "DESC NULLS LAST"]]
        });

        const wellBOEs = wells.map(well => {
          let wellBOE = {
            wellName: well.dataValues.wellName,
            cumBoe: well.dataValues.cumBoe
          };
          return wellBOE;
        });

        const responseText =
          "Here are the wells with the highest cumulative BOE";

        let payload = new Payload("PLATFORM_UNSPECIFIED", {});
        const pay = payload.setPayload(wellBOEs);
        agent.add(pay);
        agent.add(responseText);
        // console.log(payload);
      } catch (error) {
        console.log(error);
      }
    };

    function fallback(agent) {
      // agent.add(`I didn't understand`);
      agent.add(`I'm sorry, can you try again?`);
    }

    let intentMap = new Map();
    intentMap.set("Map Wells", mapWells);
    intentMap.set("Cumulative BOE", cumBOE);
    intentMap.set("Default Fallback Intent", fallback);
    agent.handleRequest(intentMap);
  });
};
