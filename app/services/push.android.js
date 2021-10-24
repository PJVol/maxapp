import firebase from "react-native-firebase";

import store, { SET_PUSH_TOKEN, PUSH_NOTIFICATION_RECEIVED } from "../store";
import { logError } from "../utils";

let onTokenRefreshListener = null;
let notificationDisplayedListener = null;
let notificationListener = null;
let notificationOpenedListener = null;

const registerPushNotifications = async () => {
  try {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      const fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        store.dispatch({ type: SET_PUSH_TOKEN, payload: { token: fcmToken } });
      }

      onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
        store.dispatch({ type: SET_PUSH_TOKEN, payload: { token: fcmToken } });
      });

      notificationDisplayedListener = firebase
        .notifications()
        .onNotificationDisplayed(notification => {
          store.dispatch({
            type: PUSH_NOTIFICATION_RECEIVED,
            payload: { data: notification.data, body: notification.body }
          });
        });

      notificationListener = firebase
        .notifications()
        .onNotification(notification => {
          store.dispatch({
            type: PUSH_NOTIFICATION_RECEIVED,
            payload: { data: notification.data, body: notification.body }
          });
        });

      notificationOpenedListener = firebase
        .notifications()
        .onNotificationOpened(notificationOpen => {
          const notification = notificationOpen.notification;
          store.dispatch({
            type: PUSH_NOTIFICATION_RECEIVED,
            payload: { data: notification.data, body: notification.body }
          });
          firebase
            .notifications()
            .removeDeliveredNotification(notification.notificationId);
        });

      const notificationOpen = await firebase
        .notifications()
        .getInitialNotification();
      if (notificationOpen) {
        const notification = notificationOpen.notification;
        store.dispatch({
          type: PUSH_NOTIFICATION_RECEIVED,
          payload: { data: notification.data, body: notification.body }
        });
        firebase
          .notifications()
          .removeDeliveredNotification(notification.notificationId);
      }
    } else {
      await firebase.messaging().requestPermission();
      registerPushNotifications();
    }
  } catch (err) {
    logError(err);
  }
};

const unregisterPushNotifications = () => {
  onTokenRefreshListener();
  notificationDisplayedListener();
  notificationListener();
  notificationOpenedListener();
};

export { registerPushNotifications, unregisterPushNotifications };
