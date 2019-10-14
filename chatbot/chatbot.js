"use strict";

const dialogflow = require("dialogflow");
const config = require("../config/nesh-config");
const uuid = require("uuid");
const sessionId = uuid.v4();
const structjson = require("structjson");
const pump = require("pump");
const fs = require("fs");
const { Transform } = require("stream");

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

  audioQuery: async () => {
    const filename = "./testfile.mp3";
    const { ReadableStreamBuffer } = require("stream-buffers");
    const buffer = new ReadableStreamBuffer();
    buffer.put(filename);
    buffer.stop();

    let self = module.exports;
    const sampleRateHertz = 16000;
    const encoding = "AUDIO_ENCODING_LINEAR_16";

    const through2 = require("through2");

    const initialStreamRequest = {
      session: sessionPath,
      queryInput: {
        audioConfig: {
          audioEncoding: encoding,
          sampleRateHertz: sampleRateHertz,
          languageCode: config.languageCode
        },
        singleUtterance: true
      }
    };

    const logQueryResult = (sessionClient, result) => {
      // Imports the Dialogflow library

      // Instantiates a context client
      const contextClient = new dialogflow.ContextsClient();

      console.log(result);
      console.log(`  Query: ${result.queryText}`);
      console.log(`  Response: ${result.fulfillmentText}`);
      if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
      } else {
        console.log(`  No intent matched.`);
      }
      const parameters = JSON.stringify(
        structjson.jsonToStructProto(result.parameters)
      );
      console.log(`  Parameters: ${parameters}`);
      if (result.outputContexts && result.outputContexts.length) {
        console.log(`  Output contexts:`);
        result.outputContexts.forEach(context => {
          const contextId = contextClient.matchContextFromContextName(
            context.name
          );
          const contextParameters = JSON.stringify(
            structjson.jsonToStructProto(context.parameters)
          );
          console.log(`    ${contextId}`);
          console.log(`      lifespan: ${context.lifespanCount}`);
          console.log(`      parameters: ${contextParameters}`);
        });
      }
    };

    // Create a stream for the streaming request.
    const detectStream = sessionClient
      .streamingDetectIntent()
      .on("error", console.error)
      .on("data", data => {
        if (data.recognitionResult) {
          console.log(
            `Intermediate transcript: ${data.recognitionResult.transcript}`
          );
        } else {
          console.log(`Detected intent:`);
          logQueryResult(sessionClient, data.queryResult);
        }
      });

    try {
      // Write the initial stream request to config for audio input.
      detectStream.write(initialStreamRequest);

      // Stream an audio file from disk to the Conversation API, e.g.
      // "./resources/audio.raw"
      // await pump(
      //   await fs.createReadStream(filename),
      //   // Format the audio stream into the request format.
      //   new Transform({
      //     objectMode: true,
      //     transform: (obj, _, next) => {
      //       next(null, { inputAudio: obj });
      //     }
      //   }),
      //   detectStream
      // );

      await pump(
        buffer,
        // Format the audio stream into the request format.
        through2.obj((obj, _, next) => {
          next(null, { inputAudio: obj });
        }),
        detectStream
      );
    } catch (error) {
      console.log(error);
    }
  },

  // no actions created yet. Once they are created they will go here.
  handleAction: responses => {
    return responses;
  }
};
