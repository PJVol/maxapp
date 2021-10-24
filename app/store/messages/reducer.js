import AsyncStorage from "@react-native-community/async-storage";
import { persistReducer } from "redux-persist";
import ActionTypes from "./actions";

const INITIAL_STATE = {
  push_token: "",
  list: {},
  unread: 0
};

const messagesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.PUSH_TOKEN:
      return {
        ...state,
        push_token: action.token
      };
    case ActionTypes.SAVE_MESSAGES:
      return {
        ...state,
        list: action.messages
      };
    case ActionTypes.UPDATE_UNREAD_COUNT:
      return {
        ...state,
        unread: action.unreadCount
      };
    case ActionTypes.MARK_MESSAGE: {
      let list = state.list;
      let { id, timestamp, isRead, message } = action.message;
      let unreadCount = state.unread;

      if (list[id].isRead != isRead) unreadCount--;
      list[id] = { isRead, timestamp, message };

      return { ...state, list, unread: unreadCount };
    }
    case ActionTypes.DELETE_MESSAGES:
      return {
        ...state,
        list: {},
        unread: 0
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: "messages",
  storage: AsyncStorage,
  whitelist: ["push_token", "list", "unread"]
};

export default persistReducer(persistConfig, messagesReducer);
