const initialState = {
  text: "",
  wellsInfo: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "GET_LAT_LONGS":
      return {
        ...state,
        wellsInfo: action.payload.wellsInfo
      };
    case "DF_TEXT_QUERY":
      return {
        ...state,
        text: action.payload.text
      };
    default:
      return state;
  }
}
