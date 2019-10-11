const initialState = {
  text: "",
  wellsInfo: [],
  messages: [],
  cumBoe: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "GET_LAT_LONGS":
      return {
        ...state,
        wellsInfo: action.payload.wellsInfo,
        messages: action.payload.messages
      };
    case "GET_CUM_BOE":
      return {
        ...state,
        cumBoe: action.payload.cumBoe,
        messages: action.payload.messages
      }
    // case "DF_TEXT_QUERY":
    //   return {
    //     ...state,
    //     text: action.payload.text
    //   };
    default:
      return state;
  }
}
