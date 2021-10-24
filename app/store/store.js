import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from "redux-persist";
import { fork } from "redux-saga/effects";
import statusReducer from "./status/reducer";
import agreementReducer from "./agreement/reducer";
import servicesReducer from "./services/reducer";
import paymentsReducer from "./payments/reducer";
import authReducer from "./auth/reducer";
import messagesReducer from "./messages/reducer";
import agreementSagas from "./agreement/sagas";
import authSagas from "./auth/sagas";
import paymentsSagas from "./payments/sagas";
import statusSagas from "./status/sagas/";
import servicesSaga from "./services/sagas";
import messagesSaga from "./messages/sagas";

const sagaMiddleware = createSagaMiddleware();
const middleWares = [sagaMiddleware, ReduxThunk];

let persistedReducer = combineReducers({
  info: agreementReducer,
  services: servicesReducer,
  payment: paymentsReducer,
  status: statusReducer,
  auth: authReducer,
  messages: messagesReducer
});

let store;

if (__DEV__) {
  const { createLogger } = require(`redux-logger`);
  const logger = createLogger({
    duration: true,
    collapsed: (getState, action, logEntry) => !logEntry.error,
    colors: {
      title: () => "lemonchiffon	",
      prevState: () => "peru",
      action: () => "dodgerblue",
      nextState: () => "springgreen",
      error: () => "crimson"
    }
  });
  middleWares.push(logger);

  store = createStore(
    persistedReducer,
    {},
    composeWithDevTools(applyMiddleware(...middleWares))
  );
} else {
  store = createStore(persistedReducer, {}, applyMiddleware(...middleWares));
}

function* root_saga() {
  yield fork(agreementSagas);
  yield fork(authSagas);
  yield fork(statusSagas);
  yield fork(paymentsSagas);
  yield fork(servicesSaga);
  yield fork(messagesSaga);
}

sagaMiddleware.run(root_saga);

persistStore(store);

export default store;
