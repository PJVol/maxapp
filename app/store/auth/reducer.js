import { persistReducer } from "redux-persist";
import createSensitiveStorage from "redux-persist-sensitive-storage";
import ActionTypes from "./actions";

const sensitiveStorage = createSensitiveStorage({
  keychainService: "maxappKeychain",
  sharedPreferencesName: "maxappSharedPrefs"
});

const INITIAL_STATE = {
  token: null,
  pin: null,
  usePin: true,
  useBiometry: true,
  pinLength: 4,
  timeout: 0,
  codeSent: false
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.SAVE_TOKEN:
      return {
        ...state,
        token: action.token
      };
    case ActionTypes.REMOVE_TOKEN:
      return {
        ...state,
        token: null
      };
    case ActionTypes.SAVE_PIN:
      return {
        ...state,
        pin: action.pin
      };
    case ActionTypes.REMOVE_PIN:
      return {
        ...state,
        pin: null
      };
    case ActionTypes.SAVE_USE_PIN:
      return {
        ...state,
        usePin: action.usePin
      };
    case ActionTypes.RESET_USE_PIN:
      return {
        ...state,
        usePin: true
      };
    case ActionTypes.SAVE_USE_BIOMETRY:
      return {
        ...state,
        useBiometry: action.useBiometry
      };
    case ActionTypes.RESET_USE_BIOMETRY:
      return {
        ...state,
        useBiometry: true
      };
    case ActionTypes.SAVE_PIN_LENGTH:
      return {
        ...state,
        pinLength: action.pinLength
      };
    case ActionTypes.RESET_PIN_LENGTH:
      return {
        ...state,
        pinLength: 4
      };
    case ActionTypes.SET_SMS_TIMEOUT:
      return {
        ...state,
        timeout: action.timeout,
        codeSent: false
      };
    case ActionTypes.CODE_SENT:
      return {
        ...state,
        codeSent: true,
        timeout: 0
      };
    case ActionTypes.RESET_CODE:
      return {
        ...state,
        codeSent: false,
        timeout: 0
      };
    default:
      return state;
  }
};

const authPersistConfig = {
  key: "auth",
  storage: sensitiveStorage,
  blacklist: ["timeout", "codeSent"]
};

export default persistReducer(authPersistConfig, authReducer);
