import { PushNotificationIOS } from "react-native";

import store, { PUSH_NOTIFICATION_RECEIVED, SET_PUSH_TOKEN } from "../store";
import { logError } from "../utils";

const registerPushNotifications = async () => {
  PushNotificationIOS.requestPermissions();

  PushNotificationIOS.addEventListener("register", onPushRegistered);

  PushNotificationIOS.addEventListener(
    "registrationError",
    onPushRegistrationFailed
  );

  PushNotificationIOS.addEventListener(
    "notification",
    onPushNotificationReceived
  );

  try {
    let notification = await PushNotificationIOS.getInitialNotification();
    if (!notification) {
      return;
    }
    store.dispatch({
      type: PUSH_NOTIFICATION_RECEIVED,
      payload: { data: notification.getData(), body: notification.getMessage() }
    });
  } catch (err) {
    logError(err);
  }
};

const unregisterPushNotifications = () => {
  PushNotificationIOS.removeEventListener("register", onPushRegistered);
  PushNotificationIOS.removeEventListener(
    "notification",
    onPushRegistrationFailed
  );
  PushNotificationIOS.removeEventListener(
    "notification",
    onPushNotificationReceived
  );
};

const onPushRegistered = token => {
  store.dispatch({ type: SET_PUSH_TOKEN, payload: { token } });
};

const onPushRegistrationFailed = registrationError => {
  console.log(registrationError.details.NSLocalizedDescription);
};

const onPushNotificationReceived = notification => {
  if (!notification) {
    return;
  }
  store.dispatch({
    type: PUSH_NOTIFICATION_RECEIVED,
    payload: { data: notification.getData(), body: notification.getMessage() }
  });
};

export { registerPushNotifications, unregisterPushNotifications };
