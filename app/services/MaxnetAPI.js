import axios from "axios";
import { logHTTPRequest, logHTTPResponse } from "../utils";

export const client = axios.create({
  baseURL: "https://api.maxnet.ru/v2/api/",
  responseType: "json"
});

if (__DEV__) {
  client.interceptors.request.use(request => {
    request.metadata = {
      startTime: new Date()
    };
    logHTTPRequest(request);
    return request;
  });
}

client.interceptors.response.use(response => {
  response.config.metadata.endTime = new Date();
  if (__DEV__) {
    logHTTPResponse(response);
  }

  let { status, data } = response.data;
  if (status.response_code !== 0) {
    throw new Error(status.response_message);
  }
  return data;
});
