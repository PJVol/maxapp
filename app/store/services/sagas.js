import { takeLatest, put, select, call } from "redux-saga/effects";
import { logError } from "../../utils";
import { SET_LOADING } from "../status/actions";
import { API } from "../../services";
import ActionTypes, {
  GET_DIRECT,
  GET_IPTV,
  GET_VOIP,
  GET_SERVICES,
  CLEAR_SERVICES
} from "./actions";

function* getDirect() {
  try {
    yield put({ type: SET_LOADING, payload: { status: true } });

    let state = yield select();

    const { direct } = yield call(
      API.client.get,
      `web/direct/list?agreement=${state.info.agreement}`
    );
    yield put({ type: ActionTypes.SAVE_DIRECT, direct });
  } catch (error) {
    logError(error);
  } finally {
    yield put({ type: SET_LOADING, payload: { status: false } });
  }
}

function* getIptv() {
  try {
    yield put({ type: SET_LOADING, payload: { status: true } });

    let state = yield select();

    const { iptv } = yield call(
      API.client.get,
      `web/iptv/list?agreement=${state.info.agreement}`
    );
    yield put({ type: ActionTypes.SAVE_IPTV, iptv });
  } catch (error) {
    logError(error);
  } finally {
    yield put({ type: SET_LOADING, payload: { status: false } });
  }
}

function* getVoip() {
  try {
    yield put({ type: SET_LOADING, payload: { status: true } });

    let state = yield select();

    const { voip } = yield call(
      API.client.get,
      `web/voip/list?agreement=${state.info.agreement}`
    );
    yield put({ type: ActionTypes.SAVE_DIRECT, voip });
  } catch (error) {
    logError(error);
  } finally {
    yield put({ type: SET_LOADING, payload: { status: false } });
  }
}

function* getServices() {
  try {
    yield put({ type: SET_LOADING, payload: { status: true } });

    let state = yield select();

    const { direct, iptv, voip } = yield call(
      API.client.get,
      `web/customer/services?agreement=${state.info.agreement}`
    );
    yield put({ type: ActionTypes.SAVE_DIRECT, direct });
    yield put({ type: ActionTypes.SAVE_VOIP, voip });
    yield put({ type: ActionTypes.SAVE_IPTV, iptv });
  } catch (error) {
    logError(error);
  } finally {
    yield put({ type: SET_LOADING, payload: { status: false } });
  }
}

function* clearServices() {
  yield put({ type: ActionTypes.REMOVE_DIRECT });
  yield put({ type: ActionTypes.REMOVE_IPTV });
  yield put({ type: ActionTypes.REMOVE_VOIP });
}

export default function* rootSaga() {
  yield takeLatest(GET_DIRECT, getDirect);
  yield takeLatest(GET_IPTV, getIptv);
  yield takeLatest(GET_VOIP, getVoip);
  yield takeLatest(GET_SERVICES, getServices);
  yield takeLatest(CLEAR_SERVICES, clearServices);
}
