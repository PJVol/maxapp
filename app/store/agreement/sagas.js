import { takeLatest, call, put, select } from "redux-saga/effects";
import { API } from "../../services";
import ActionTypes, {
  CLEAR_AGREEMENT,
  GET_BALANCE,
  GET_AGREEMENT_LIST,
  SET_AGREEMENT,
  REMOVE_AGREEMENT,
  GET_INFO,
  CLEAR_USER_DATA
} from "./actions";
import PaymentActions from "../payments/actions";
import { logError } from "../../utils";
import { SET_LOADING } from "../status/actions";
import { CLEAR_SERVICES } from "../services/actions";
import { CLEAR_MESSAGES } from "../messages/actions";

function* getBalance() {
  try {
    yield put({ type: SET_LOADING, payload: { status: true } });

    let state = yield select();

    const { account } = yield call(
      API.client.get,
      `web/customer/balance?agreement=${state.info.agreement}`
    );
    yield put({ type: ActionTypes.SAVE_BALANCE, balance: account });
  } catch (error) {
    logError(error);
  } finally {
    yield put({ type: SET_LOADING, payload: { status: false } });
  }
}

function* getAgreementList() {
  try {
    yield put({ type: SET_LOADING, payload: { status: true } });

    const list = yield call(API.client.get, "web/customer/list");
    yield put({ type: ActionTypes.SAVE_AGREEMENT_LIST, list });
    if (list.length === 1) {
      yield put({
        type: SET_AGREEMENT,
        payload: { agreement: list[0].agreement }
      });
    }
  } catch (error) {
    logError(error);
  } finally {
    yield put({ type: SET_LOADING, payload: { status: false } });
  }
}

function* setCurrentAgreement(action) {
  yield put({
    type: ActionTypes.SAVE_CURRENT_AGREEMENT,
    agreement: action.payload.agreement
  });
  yield put({ type: GET_INFO });
}

function* removeCurrentAgreement() {
  yield put({ type: ActionTypes.REMOVE_CURRENT_AGREEMENT });
}

function* getAgreementInfo() {
  try {
    yield put({ type: SET_LOADING, payload: { status: true } });

    let state = yield select();

    let data = yield call(
      API.client.get,
      `web/customer/info?agreement=${state.info.agreement}`
    );

    var regexp = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
    var dateArray = regexp.exec(data.signed);

    yield put({
      type: ActionTypes.SAVE_AGREEMENT_INFO,
      signed: new Date(+dateArray[1], +dateArray[2] - 1, +dateArray[3]),
      person: data.person,
      org_name: data.org_name,
      techsup: data.techsup
    });
    yield put({
      type: PaymentActions.SAVE_PAYMENT_TYPES,
      types: data.paymethods
    });
    yield put({
      type: PaymentActions.SAVE_AUTOPAYMENT_STATUS,
      status: !!data.autopayment.enabled
    });
    yield put({
      type: PaymentActions.SAVE_AUTOPAYMENT_LIMIT,
      limit: parseInt(data.autopayment.limit)
    });
  } catch (error) {
    logError(error);
  } finally {
    yield put({ type: SET_LOADING, payload: { status: false } });
  }
}

function* clearAgreementData() {
  yield put({ type: CLEAR_SERVICES });
  yield put({ type: PaymentActions.CLEAR_PAYMENTS_INFO });
  yield put({ type: ActionTypes.CLEAR_AGREEMENT_DATA });
  yield put({ type: CLEAR_MESSAGES });
}

function* clearAllUserData() {
  yield put({ type: CLEAR_AGREEMENT });
  yield put({ type: ActionTypes.CLEAR_ALL_DATA });
}

export default function* rootSaga() {
  yield takeLatest(GET_BALANCE, getBalance);
  yield takeLatest(GET_AGREEMENT_LIST, getAgreementList);
  yield takeLatest(SET_AGREEMENT, setCurrentAgreement);
  yield takeLatest(REMOVE_AGREEMENT, removeCurrentAgreement);
  yield takeLatest(GET_INFO, getAgreementInfo);
  yield takeLatest(CLEAR_USER_DATA, clearAllUserData);
  yield takeLatest(CLEAR_AGREEMENT, clearAgreementData);
}
