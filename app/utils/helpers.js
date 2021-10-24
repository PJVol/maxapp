import { StatusBar, Platform } from "react-native";
import MessageBarManager from "react-native-message-bar/MessageBarManager";

import store, { SET_MESSAGE_SHOWN } from "../store";
import { translate } from "../translation";

export default function strings(key) {
  return translate(key);
}
export function formatCurrencyText(value) {
  return value
    .toFixed(2)
    .toString()
    .replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/g, "\u200A");
}

export function isInArray(needle, haystack) {
  for (var i = 0; i < haystack.length; i++) {
    if (needle === haystack[i]) {
      return true;
    }
  }
  return false;
}

export function showMessageBar(message, type, shouldHide) {
  MessageBarManager.showAlert({
    message: message,
    alertType: type,
    shouldHideAfterDelay: shouldHide,
    onShow: () =>
      store.dispatch({
        type: SET_MESSAGE_SHOWN,
        payload: { messageShown: true }
      }),
    onHide: () =>
      store.dispatch({
        type: SET_MESSAGE_SHOWN,
        payload: { messageShown: false }
      }),
    duration: 3000,
    viewTopInset: Platform.OS === "ios" ? 30 : StatusBar.currentHeight + 10,
    messageStyle: {
      textAlign: "center"
    }
  });
}
