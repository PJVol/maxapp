import { takeLatest, takeEvery, put, select, call } from "redux-saga/effects";
import ActionTypes, {
  SET_PUSH_TOKEN,
  PUSH_NOTIFICATION_RECEIVED,
  GET_MESSAGES,
  MARK_READ,
  CLEAR_MESSAGES
} from "./actions";
import { API } from "../../services";
import { logError } from "../../utils";
import { SET_LOADING } from "../status/actions";

function* setPushToken(action) {
  const { token } = action.payload;

  yield put({ type: ActionTypes.PUSH_TOKEN, token });
}

function* registerNotification(action) {
  const { data, body } = action.payload;
  console.log(data, body);
  yield put({ type: GET_MESSAGES });
}

function* getMessages() {
  try {
    yield put({ type: SET_LOADING, payload: { status: true } });

    let state = yield select();

    const { messages } = yield call(
      API.client.get,
      `web/messages/list?agreement=${state.info.agreement}`
    );

    let unreadCount = 0;
    let list = {};
    messages.forEach(element => {
      const { id, timestamp, isRead, message } = element;

      if (!isRead) unreadCount++;
      list[id] = { isRead, timestamp, message };
    });

    yield put({ type: ActionTypes.SAVE_MESSAGES, messages: list });
    yield put({ type: ActionTypes.UPDATE_UNREAD_COUNT, unreadCount });
  } catch (error) {
    logError(error);
  } finally {
    yield put({ type: SET_LOADING, payload: { status: false } });
  }
}

function* markRead(action) {
  try {
    yield put({ type: SET_LOADING, payload: { status: true } });

    const { id } = action.payload;
    let state = yield select();

    const { messages } = yield call(
      API.client.get,
      `web/messages/mark?agreement=${state.info.agreement}&msgid=${id}`
    );

    yield put({ type: ActionTypes.MARK_MESSAGE, message: messages[0] });
  } catch (error) {
    logError(error);
  } finally {
    yield put({ type: SET_LOADING, payload: { status: true } });
  }
}

function* clearMessages() {
  yield put({ type: ActionTypes.DELETE_MESSAGES });
}

export default function* rootSaga() {
  yield takeLatest(SET_PUSH_TOKEN, setPushToken);
  yield takeLatest(GET_MESSAGES, getMessages);
  yield takeEvery(PUSH_NOTIFICATION_RECEIVED, registerNotification);
  yield takeEvery(MARK_READ, markRead);
  yield takeLatest(CLEAR_MESSAGES, clearMessages);
}
