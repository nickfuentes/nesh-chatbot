"use strict";

const dialogflow = require("dialogflow");
const config = require("../config/nesh-config");
const models = require("../models");

let neshConfig = {
  credentials: {
    private_key: config.private_key,
    client_email: config.client_email
  }
};

const entitiesClient = new dialogflow.EntityTypesClient(neshConfig);

const agentPath = entitiesClient.projectAgentPath(config.project_id);

const wells = async () => {
  const fetchWells = await models.Eagleford.findAll();
  const wellName = fetchWells
    .map(well => well.dataValues.diBasin)
    .filter(function(el) {
      return el != null;
    });
  const filteredWells = wellName.filter(function(item, pos) {
    return wellName.indexOf(item) == pos;
  });

  let wellNames = filteredWells.map(well => {
    let wellObj = {
      value: well
    };
    return wellObj;
  });
  //   console.log(wellNames);

  const wellNameEntityType = {
    displayName: "Basin",
    kind: "KIND_MAP",
    entities: wellNames
  };

  const wellRequest = {
    parent: agentPath,
    entityType: wellNameEntityType
  };

  entitiesClient.createEntityType(wellRequest).then(responses => {
    console.log("Created new entity type:", JSON.stringify(responses[0]));
  });
};

wells();
