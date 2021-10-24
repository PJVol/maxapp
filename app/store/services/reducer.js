import AsyncStorage from "@react-native-community/async-storage";
import { persistReducer } from "redux-persist";
import ActionTypes from "./actions";

const INITIAL_STATE = {
  direct: null,
  voip: null,
  iptv: null
};

const servicesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.SAVE_DIRECT:
      return {
        ...state,
        direct: action.direct
      };
    case ActionTypes.REMOVE_DIRECT:
      return {
        ...state,
        direct: null
      };
    case ActionTypes.SAVE_VOIP:
      return {
        ...state,
        voip: action.voip
      };
    case ActionTypes.REMOVE_VOIP:
      return {
        ...state,
        voip: null
      };
    case ActionTypes.SAVE_IPTV:
      return {
        ...state,
        iptv: action.iptv
      };
    case ActionTypes.REMOVE_IPTV:
      return {
        ...state,
        iptv: null
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: "services",
  storage: AsyncStorage
};

export default persistReducer(persistConfig, servicesReducer);
