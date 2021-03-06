"use strict";

const dialogflow = require("dialogflow");
const config = require("../config/nesh-config");
const uuid = require("uuid");
const sessionId = uuid.v4();
const structjson = require("structjson");
const fs = require("fs");

let neshConfig = {
  credentials: {
    private_key: config.private_key,
    client_email: config.client_email
  }
};

const sessionClient = new dialogflow.SessionsClient(neshConfig);
const sessionPath = sessionClient.sessionPath(config.project_id, sessionId);

module.exports = {
  textQuery: async (text, parameters = {}) => {
    let self = module.exports;
    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: text,
          languageCode: config.languageCode
        }
      },
      queryParams: {
        payload: {
          data: parameters
        }
      }
    };
    // Send request and log result
    try {
      let responses = await sessionClient.detectIntent(request);
      responses = await self.handleAction(responses);
      return responses;
    } catch (error) {
      console.log(error);
    }
  },

  eventQuery: async (event, parameters = {}) => {
    let self = module.exports;
    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: event,
          parameters: structjson.jsonToStructProto(parameters),
          languageCode: config.languageCode
        }
      }
    };
    // Send request and log result
    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },

  // no actions created yet. Once they are created they will go here.
  handleAction: responses => {
    return responses;
  }
};
