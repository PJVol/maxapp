import AsyncStorage from "@react-native-community/async-storage";
import { persistReducer } from "redux-persist";
import ActionTypes from "./actions";

const INITIAL_STATE = {
  balance: 0,
  agreement: null,
  agreements: null,
  signed: null,
  person: null,
  org_name: null,
  techsup: null
};

const agreementReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.SAVE_BALANCE:
      return {
        ...state,
        balance: action.balance
      };
    case ActionTypes.SAVE_AGREEMENT_LIST:
      return {
        ...state,
        agreements: action.list
      };
    case ActionTypes.SAVE_AGREEMENT_INFO:
      return {
        ...state,
        signed: action.signed,
        person: action.person,
        org_name: action.org_name,
        techsup: action.techsup
      };
    case ActionTypes.SAVE_CURRENT_AGREEMENT:
      return {
        ...state,
        agreement: action.agreement
      };
    case ActionTypes.REMOVE_CURRENT_AGREEMENT:
      return {
        ...state,
        agreement: null
      };
    case ActionTypes.CLEAR_ALL_DATA:
      return {
        ...state,
        agreements: null
      };
    case ActionTypes.CLEAR_AGREEMENT_DATA:
      return {
        ...state,
        balance: 0,
        agreement: null,
        signed: null,
        person: null,
        org_name: null,
        techsup: null
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: "agreement",
  storage: AsyncStorage
};

export default persistReducer(persistConfig, agreementReducer);
