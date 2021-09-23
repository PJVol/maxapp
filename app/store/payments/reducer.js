import AsyncStorage from "@react-native-community/async-storage";
import { persistReducer } from "redux-persist";
import ActionTypes from "./actions";

const INITIAL_STATE = {
  paymentTypes: null,
  autopaymentEnabled: null,
  autopaymentLimit: null,
  cards: null,
  card_id: 0,
  paymentHistory: {},
  paymentServiceUrl: null
};

const paymentsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.SAVE_PAYMENT_TYPES: {
      let { types } = action;
      var filtered = types.filter(value => {
        return value != "paycard";
      });
      if (filtered != types) types = [...filtered, "paycard"];

      return {
        ...state,
        paymentTypes: types
      };
    }
    case ActionTypes.SAVE_AUTOPAYMENT_STATUS:
      return {
        ...state,
        autopaymentEnabled: action.status
      };
    case ActionTypes.SAVE_AUTOPAYMENT_LIMIT:
      return {
        ...state,
        autopaymentLimit: action.limit
      };
    case ActionTypes.SAVE_CARDS:
      return {
        ...state,
        cards: action.cards
      };
    case ActionTypes.SAVE_CARD_ID:
      return {
        ...state,
        card_id: action.id
      };
    case ActionTypes.SAVE_PAYMENT_HISTORY:
      state.paymentHistory[action.date] = action.paymentHistory;
      return {
        ...state
      };
    case ActionTypes.CLEAR_PAYMENTS_INFO:
      return {
        ...state,
        autopaymentEnabled: null,
        autopaymentLimit: null,
        paymentTypes: null,
        cards: null,
        paymentServiceUrl: null,
        paymentHistory: {}
      };
    case ActionTypes.SAVE_PAYMENT_SERVICE_URL:
      return {
        ...state,
        paymentServiceUrl: action.paymentUrl
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: "payment",
  storage: AsyncStorage,
  blacklist: ["paymentServiceUrl"]
};

export default persistReducer(persistConfig, paymentsReducer);
