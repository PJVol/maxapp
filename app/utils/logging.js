import { Sentry, SentrySeverity } from "react-native-sentry";
import { formatTime } from "./time";

const errorHeader = [
  "color: crimson; font-weight: bolder;",
  "color: darksalmon; font-weight: regular;",
  "color: lightcoral; font-weight: lighter;"
];

export function logError(error) {
  if (__DEV__) {
    console.groupCollapsed(
      "%c error %c" + error.name + " %c@ " + formatTime(new Date()),
      ...errorHeader
    );
    console.info(error.message);
    console.trace();
    console.groupEnd();
  }

  Sentry.captureBreadcrumb({
    category: "Error",
    message: error.name,
    data: {
      message: error.message
    },
    level: SentrySeverity.Error
  });
}

const infoHeader = [
  "color: lightskyblue; font-weight: lighter;",
  "color: lightsteelblue; font-weight: regular;",
  "color: powderblue; font-weight: lighter;"
];

export function logInfo(message) {
  if (__DEV__) {
    console.info(
      "%c info %c" + message + " %c@ " + formatTime(new Date()),
      ...infoHeader
    );
  }

  Sentry.captureBreadcrumb({
    category: "Info",
    message: message,
    level: SentrySeverity.Info
  });
}

const requestHeader = [
  "color: navajowhite; font-weight: lighter;",
  "color: lightblue; font-weight: bolder;",
  "inherit",
  "color: darkgray; font-weight: lighter;"
];

export function logHTTPRequest(request) {
  console.groupCollapsed(
    "%c axios %c" +
      request.method.toUpperCase() +
      " %c" +
      request.url +
      "%c @ " +
      formatTime(new Date()) +
      " (in " +
      request.timeout +
      " ms)",
    ...requestHeader
  );
  console.info("Base url", request.baseURL);
  console.info("Response type", request.responseType);
  console.info("Headers", request.headers);
  console.groupEnd();
}

const responseHeader = [
  "color: navajowhite; font-weight: lighter;",
  "color: wheat; font-weight: regular;",
  "inherit",
  "color: lightblue; font-weight: bolder;",
  "inherit",
  "color: darkgray; font-weight: lighter;"
];

export function logHTTPResponse(response) {
  let duration =
    response.config.metadata.endTime - response.config.metadata.startTime;

  console.groupCollapsed(
    "%c axios %c" +
      response.status +
      " %c(%c" +
      response.config.method.toUpperCase() +
      " %c" +
      response.config.url +
      ")%c @ " +
      formatTime(new Date()) +
      " (in " +
      duration +
      " ms)",
    ...responseHeader
  );
  console.info("Headers", response.headers);
  console.groupCollapsed("Data");
  console.info("Status", response.data.status);
  console.info("Data", response.data.data);
  console.groupEnd();
  console.groupEnd();
}
