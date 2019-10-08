const { WebhookClient } = require("dialogflow-fulfillment")
const models = require("../models")
const utils = require("../utils/helpers")

module.exports = app => {
  app.post("/", async (req, res) => {
    const agent = new WebhookClient({ request: req, response: res })

    mapWells = async agent => {
      try {
        const wells = await models.Eagleford.findAll({
          where: {
            diBasin: agent.parameters.Basin
          }
        })

        console.log(agent.parameters.Basin)
        console.log(wells)

        const wellLocations = wells.map(well => {
          let wellLocation = {
            long: well.dataValues.surfaceHoleLongitude,
            lat: well.dataValues.surfaceHoleLatitude
          }
          return wellLocation
        })

        console.log(wellLocations)
        const responseText = `Here are the well locations for ${utils.titleCase(
          agent.parameters.Basin
<<<<<<< HEAD
        )}`
        const wellsText = `${JSON.stringify(wellLocations)}`

        agent.add(wellsText)
        agent.add(responseText)
        console.log(utils.titleCase(agent.parameters.Basin))
=======
        )}`;
        const wellsText = `${wellLocations}`;
        agent.add(wellsText);
        agent.add(responseText);
        console.log(utils.titleCase(agent.parameters.Basin));
>>>>>>> ab8453eef69e2049266b5c5630dc05cdbd037f9a
      } catch (error) {
        console.log(error)
      }
    }

    function fallback(agent) {
      agent.add(`Webhook I didn't understand`)
      agent.add(`Webhook I'm sorry, can you try again?`)
    }

    let intentMap = new Map()
    intentMap.set("Map Wells", mapWells)
    intentMap.set("Default Fallback Intent", fallback)
    agent.handleRequest(intentMap)
  })
}
