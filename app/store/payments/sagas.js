import { takeLatest, takeEvery, call, put, select } from "redux-saga/effects";
import { API } from "../../services";
import ActionTypes, {
  GET_PAYMENT_METHODS,
  GET_AUTOPAYMENT_INFO,
  GET_PAYMENT_HISTORY,
  SET_AUTOPAYMENT_SETTINGS,
  REMOVE_CARD,
  PAY,
  ACTIVATE_PAY_CARD
} from "./actions";
import { SET_LOADING } from "../status/actions";
import { logError } from "../../utils";

function* getPaymentMethods() {
  try {
    yield put({ type: SET_LOADING, payload: { status: true } });

    let state = yield select();

    let data = yield call(
      API.client.get,
      `web/payment/methods?agreement=${state.info.agreement}`
    );
    yield put({
      type: ActionTypes.SAVE_PAYMENT_TYPES,
      types: data.paymethods
    });
  } catch (error) {
    logError(error);
  } finally {
    yield put({ type: SET_LOADING, payload: { status: false } });
  }
}

function* getAutoPaymentInfo() {
  try {
    yield put({ type: SET_LOADING, payload: { status: true } });

    let state = yield select();

    let data = yield call(
      API.client.get,
      `web/autopayment/info?agreement=${state.info.agreement}`
    );

    yield put({
      type: ActionTypes.SAVE_AUTOPAYMENT_STATUS,
      status: !!data.autopayment.enabled
    });
    yield put({
      type: ActionTypes.SAVE_AUTOPAYMENT_LIMIT,
      limit: parseInt(data.autopayment.limit)
    });
    yield put({ type: ActionTypes.SAVE_CARDS, cards: data.cards });
    yield put({ type: ActionTypes.SAVE_CARD_ID, id: data.autopayment.card_id });
  } catch (error) {
    logError(error);
  } finally {
    yield put({ type: SET_LOADING, payload: { status: false } });
  }
}

function* getPaymentHistory(action) {
  try {
    yield put({ type: SET_LOADING, payload: { status: true } });

    const { date } = action.payload;
    let state = yield select();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let data = yield call(
      API.client.get,
      `/web/customer/payments?agreement=${
        state.info.agreement
      }&from_year=${year}&from_month=${month}&to_year=${year}&to_month=${month}`
    );
    yield put({
      type: ActionTypes.SAVE_PAYMENT_HISTORY,
      date,
      paymentHistory: data
    });
  } catch (error) {
    logError(error);
  } finally {
    yield put({ type: SET_LOADING, payload: { status: false } });
  }
}

function* setAutoPaymentSettings(action) {
  try {
    yield put({ type: SET_LOADING, payload: { status: true } });

    const { limit, card, enabled } = action.payload;
    let state = yield select();

    let data = yield call(
      API.client.get,
      `web/autopayment/settings?agreement=${
        state.info.agreement
      }&limit=${limit}&card=${card}&enabled=${enabled | 0}`
    );

    yield put({
      type: ActionTypes.SAVE_AUTOPAYMENT_STATUS,
      status: !!data.autopayment.enabled
    });
    yield put({
      type: ActionTypes.SAVE_AUTOPAYMENT_LIMIT,
      limit: parseInt(data.autopayment.limit)
    });
    yield put({ type: ActionTypes.SAVE_CARDS, cards: data.cards });
    yield put({ type: ActionTypes.SAVE_CARD_ID, id: data.autopayment.card_id });
  } catch (error) {
    logError(error);
  } finally {
    yield put({ type: SET_LOADING, payload: { status: false } });
  }
}

function* removeCard(action) {
  try {
    yield put({ type: SET_LOADING, payload: { status: true } });

    const { card } = action.payload;
    let state = yield select();

    let data = yield call(
      API.client.get,
      `web/autopayment/remove?agreement=${state.info.agreement}&card=${card}`
    );

    yield put({
      type: ActionTypes.SAVE_AUTOPAYMENT_STATUS,
      status: !!data.autopayment.enabled
    });
    yield put({
      type: ActionTypes.SAVE_AUTOPAYMENT_LIMIT,
      limit: parseInt(data.autopayment.limit)
    });
    yield put({ type: ActionTypes.SAVE_CARDS, cards: data.cards });
    yield put({ type: ActionTypes.SAVE_CARD_ID, id: data.autopayment.card_id });
  } catch (error) {
    logError(error);
  } finally {
    yield put({ type: SET_LOADING, payload: { status: false } });
  }
}

function* pay(action) {
  try {
    yield put({ type: SET_LOADING, payload: { status: true } });

    const { service, amount, auto } = action.payload;
    let state = yield select();
    const isAuto = auto ? "&auto=1" : "";
    let url;

    switch (service) {
      case "YANDEX":
        url = `/web/payment/ya?agreement=${
          state.info.agreement
        }&amount=${amount}`;
        break;
      case "WEBMONEY":
        url = `/web/payment/webmoney?agreement=${
          state.info.agreement
        }&amount=${amount}`;
        break;
      case "PLASTICCARD":
        url = `/web/payment/plasticcard?agreement=${
          state.info.agreement
        }&amount=${amount}${isAuto}`;
        break;
    }

    const { externalService } = yield call(API.client.get, url);

    let paymentUrl = externalService.url;
    let params = externalService.params;
    if (params) {
      let i = 0;
      for (var key in params) {
        if (i++ == 0) {
          paymentUrl += "?";
        } else {
          paymentUrl += "&";
        }
        if (params.hasOwnProperty(key)) {
          paymentUrl += `${key}=${params[key]}`;
        }
      }
    }

    yield put({ type: ActionTypes.SAVE_PAYMENT_SERVICE_URL, paymentUrl });
  } catch (error) {
    logError(error);
  } finally {
    yield put({ type: SET_LOADING, payload: { status: false } });
  }
}

function* activatePaycard(action) {
  try {
    yield put({ type: SET_LOADING, payload: { status: true } });

    const { pin } = action.payload;
    let state = yield select();

    let data = yield call(
      API.client.get,
      `/web/payment/paycard?agreement=${state.info.agreement}&pincode=${pin}`
    );

    const { success, amount } = data;
    yield put({ type: "ACTIVATION_SUCCESS", success, amount });
  } catch (error) {
    logError(error);
  } finally {
    yield put({ type: SET_LOADING, payload: { status: false } });
  }
}

export default function* rootSaga() {
  yield takeLatest(GET_PAYMENT_METHODS, getPaymentMethods);
  yield takeLatest(GET_AUTOPAYMENT_INFO, getAutoPaymentInfo);
  yield takeEvery(GET_PAYMENT_HISTORY, getPaymentHistory);
  yield takeLatest(SET_AUTOPAYMENT_SETTINGS, setAutoPaymentSettings);
  yield takeEvery(REMOVE_CARD, removeCard);
  yield takeEvery(PAY, pay);
  yield takeEvery(ACTIVATE_PAY_CARD, activatePaycard);
}
