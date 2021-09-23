import AsyncStorage from "@react-native-community/async-storage";
import { persistReducer } from "redux-persist";
import ActionTypes from "./actions";

const INITIAL_STATE = {
  loading: false,
  loadingCount: 0,
  push_token: "",
  push_body: null,
  push_data: null,
  browserOpened: false,
  locale: null,
  isConnected: true,
  messageShown: false,
  isLoggedIn: false
};

const statusReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.LOADING: {
      const { isLoading } = action;
      let { loadingCount } = state;

      if (isLoading) {
        loadingCount++;
      } else {
        if (loadingCount > 0) loadingCount--;
      }
      return {
        ...state,
        loading: loadingCount > 0,
        loadingCount: loadingCount
      };
    }
    case ActionTypes.BROWSER_STATUS_UPDATE:
      return {
        ...state,
        browserOpened: action.status
      };
    case ActionTypes.SET_LOCALE:
      return {
        ...state,
        locale: action.locale
      };
    case ActionTypes.SET_CONNECTION_STATUS:
      return {
        ...state,
        isConnected: action.isConnected
      };
    case ActionTypes.SET_MESSAGE_SHOW:
      return {
        ...state,
        messageShown: action.messageShown
      };
    case ActionTypes.SET_LOGIN_STATUS:
      return {
        ...state,
        isLoggedIn: action.loggedIn
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: "status",
  storage: AsyncStorage,
  whitelist: ["isLoggedIn", "push_token"]
};

export default persistReducer(persistConfig, statusReducer);
