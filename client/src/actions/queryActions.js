import axios from "axios";

export const df_text_query = text => {
  return dispatch => {
    console.log(text);

    axios.post("/api/df_text_query", { text }).then(res => {
      console.log(res);

      if (
        res.data[0].queryResult.webhookPayload &&
        res.data[0].queryResult.intent.displayName == "Map Wells"
      ) {
        const cords =
          res.data[0].queryResult.webhookPayload.fields.null.listValue.values;
        const locations = cords.map(cord => {
          let coordinate = {
            lat: cord.structValue.fields.lat.numberValue,
            long: cord.structValue.fields.long.numberValue
          };
          return coordinate;
        });

        console.log("MAP the WELLS");
        console.log(locations);
        dispatch({
          type: "GET_LAT_LONGS",
          payload: {
            wellsInfo: locations
          }
        });
        return locations;
      }

      //   dispatch({
      //     type: "DF_TEXT_QUERY",
      //     payload: {
      //       text: text
      //     }
      //   });
    });
  };
};

//     async df_text_query(text) {
//     let says = {
//       speaks: "user",
//       msg: {
//         text: {
//           text: text
//         }
//       }
//     };

//     this.setState({ messages: [...this.state.messages, says] });

//     const res = await axios.post("/api/df_text_query", { text });
//     console.log(res);

//     if (
//       res.data[0].queryResult.webhookPayload &&
//       res.data[0].queryResult.intent.displayName == "Map Wells"
//     ) {
//       const cords =
//         res.data[0].queryResult.webhookPayload.fields.null.listValue.values;
//       const locations = cords.map(cord => {
//         let coordinate = {
//           lat: cord.structValue.fields.lat.numberValue,
//           long: cord.structValue.fields.long.numberValue
//         };
//         return coordinate;
//       });

//       console.log(locations);
//       console.log("MAP the WELLS");
//     } else if (
//       res.data[0].queryResult.webhookPayload &&
//       res.data[0].queryResult.intent.displayName == "Cumulative BOE"
//     ) {
//       const wellData =
//         res.data[0].queryResult.webhookPayload.fields.null.listValue.values;
//       const graphData = wellData.map(data => {
//         let cumData = {
//           wellName: data.structValue.fields.wellName.stringValue,
//           cumBoe: data.structValue.fields.cumBoe.numberValue
//         };
//         return cumData;
//       });
//       console.log(graphData);
//       console.log("Cumulative BOE is the intent");
//     } else {
//       console.log("Other");
//     }

//     for (let msg of res.data[0].queryResult.fulfillmentMessages) {
//       console.log(msg);
//       says = {
//         speaks: "nesh",
//         msg: msg
//       };
//       this.setState({ messages: [...this.state.messages, says] });
//     }
//   }
