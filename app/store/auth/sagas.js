import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import {
  takeLatest,
  takeEvery,
  call,
  put,
  select,
  delay
} from "redux-saga/effects";
import { API } from "../../services";
import { GET_AGREEMENT_LIST, CLEAR_USER_DATA } from "../agreement/actions";
import ActionTypes, {
  LOGOUT,
  SET_PIN,
  UNSET_PIN,
  SET_USE_PIN,
  SET_USE_BIOMETRY,
  SET_PIN_LENGTH,
  RESET_PIN_SETTINGS,
  AUTHENTICATE,
  SMS_CODE,
  RESET_SMS,
  SMS_TIMEOUT
} from "./actions";
import { SET_LOGIN_STATUS, SET_LOADING } from "../status/actions";
import { logError } from "../../utils";

function* smsCode(action) {
  try {
    yield put({ type: SET_LOADING, payload: { status: true } });

    const { phone } = action.payload;
    let data = yield call(
      API.client.get,
      `web/auth/code-by-sms?phone=${phone}`
    );

    const { timeout } = data;
    if (timeout > 0) {
      yield put({ type: SMS_TIMEOUT, payload: { timeout } });
    } else {
      yield put({ type: ActionTypes.CODE_SENT });
    }
  } catch (error) {
    logError(error);
  } finally {
    yield put({ type: SET_LOADING, payload: { status: false } });
  }
}

function* smsTimeout(action) {
  const { timeout } = action.payload;

  for (let i = 0; i < timeout; i++) {
    yield put({ type: ActionTypes.SET_SMS_TIMEOUT, timeout: timeout - i });
    yield delay(1000);
  }
  yield put({ type: ActionTypes.RESET_CODE });
}

function* resetSmsCode() {
  yield put({ type: SMS_TIMEOUT, payload: { timeout: 0 } });
}

function* login(action) {
  try {
    yield put({ type: SET_LOADING, payload: { status: true } });

    const { id, pass, type } = action.payload;
    let url =
      type === "AGREEMENT"
        ? `web/auth/get-token-by-agreement?agreement=${id}&password=${pass}`
        : `web/auth/get-token-by-code?phone=${id}&code=${pass}`;
    let state = yield select();

    let data = yield call(API.client.post, url, {
      id: DeviceInfo.getUniqueID(),
      name: DeviceInfo.getDeviceName(),
      token: state.status.push_token,
      model: DeviceInfo.getDeviceId(),
      os: Platform.OS,
      locale: DeviceInfo.getDeviceLocale()
    });

    if (data && data["access-token"]) {
      yield put({
        type: ActionTypes.SAVE_TOKEN,
        token: data["access-token"]
      });
      yield put({ type: SET_LOGIN_STATUS, payload: { loggedIn: true } });

      API.client.defaults.baseURL = data["baseurl"];
      API.client.defaults.headers.common["Authorization"] = `Bearer ${
        data["access-token"]
      }`;

      yield put({ type: GET_AGREEMENT_LIST });
    }
  } catch (error) {
    logError(error);
  } finally {
    yield put({ type: SET_LOADING, payload: { status: false } });
  }
}

function* logout(action) {
  yield put({ type: ActionTypes.REMOVE_TOKEN });
  yield put({ type: UNSET_PIN });
  yield put({ type: CLEAR_USER_DATA });
  delete API.client.defaults.headers.common["Authorization"];
  yield put({ type: SET_LOGIN_STATUS, payload: { loggedIn: false } });
  yield call(action.payload.callback);
}

function* setPin(action) {
  const { pin } = action.payload;
  yield put({ type: ActionTypes.SAVE_PIN, pin });
}

function* removePin() {
  yield put({ type: ActionTypes.REMOVE_PIN });
  yield put({ type: RESET_PIN_SETTINGS });
}

function* setPinUse(action) {
  const { usePin } = action.payload;
  yield put({ type: ActionTypes.SAVE_USE_PIN, usePin });
}

function* setUseBiometry(action) {
  const { useBiometry } = action.payload;
  yield put({ type: ActionTypes.SAVE_USE_BIOMETRY, useBiometry });
}

function* setPinLength(action) {
  const { pinLength } = action.payload;
  yield put({ type: ActionTypes.SAVE_PIN_LENGTH, pinLength });
}

function* resetPinSettings() {
  yield put({ type: ActionTypes.REMOVE_PIN });
  yield put({ type: ActionTypes.RESET_PIN_LENGTH });
  yield put({ type: ActionTypes.RESET_USE_BIOMETRY });
}

export default function* rootSaga() {
  yield takeLatest(SET_PIN, setPin);
  yield takeLatest(UNSET_PIN, removePin);
  yield takeLatest(SET_USE_PIN, setPinUse);
  yield takeLatest(SET_USE_BIOMETRY, setUseBiometry);
  yield takeLatest(SET_PIN_LENGTH, setPinLength);
  yield takeLatest(RESET_PIN_SETTINGS, resetPinSettings);
  yield takeLatest(AUTHENTICATE, login);
  yield takeLatest(LOGOUT, logout);
  yield takeLatest(SMS_CODE, smsCode);
  yield takeEvery(RESET_SMS, resetSmsCode);
  yield takeLatest(SMS_TIMEOUT, smsTimeout);
}
