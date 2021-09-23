import { takeLatest, takeEvery, put } from "redux-saga/effects";
import ActionTypes, {
  SET_CONNECTION_STATUS,
  SET_LOGIN_STATUS,
  SET_MESSAGE_SHOWN,
  SET_DEVICE_LOCALE,
  SET_BROWSER_STATUS,
  SET_LOADING
} from "./actions";

function* setLoading(action) {
  const { status } = action.payload;

  yield put({ type: ActionTypes.LOADING, isLoading: status });
}

function* setBrowserStatus(action) {
  const { status } = action.payload;

  yield put({ type: ActionTypes.BROWSER_STATUS_UPDATE, status });
}

function* setLocale(action) {
  const { locale } = action.payload;

  yield put({ type: ActionTypes.SET_LOCALE, locale });
}

function* setConnectionStatus(action) {
  const { isConnected } = action.payload;

  yield put({ type: ActionTypes.SET_CONNECTION_STATUS, isConnected });
}

function* setMessageShown(action) {
  const { messageShown } = action.payload;

  yield put({ type: ActionTypes.SET_MESSAGE_SHOW, messageShown });
}

function* setLoginStatus(action) {
  const { loggedIn } = action.payload;

  yield put({ type: ActionTypes.SET_LOGIN_STATUS, loggedIn });
}

export default function* rootSaga() {
  yield takeLatest(SET_CONNECTION_STATUS, setConnectionStatus);
  yield takeLatest(SET_LOGIN_STATUS, setLoginStatus);
  yield takeLatest(SET_MESSAGE_SHOWN, setMessageShown);
  yield takeLatest(SET_DEVICE_LOCALE, setLocale);
  yield takeLatest(SET_BROWSER_STATUS, setBrowserStatus);
  yield takeLatest(SET_LOADING, setLoading);
}
