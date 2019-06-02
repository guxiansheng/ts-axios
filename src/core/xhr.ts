import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types';
import { parseHeaders } from '../helpers/headers';
import { createError } from "../helpers/error";
import { isURLSameOrigin } from '../helpers/url';
import cookie from '../helpers/cookie';

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { 
      url,
      methed = 'get', 
      data = null, 
      headers, 
      responseType, 
      timeout, 
      cancelToken, 
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName
    } = config;

    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType;
    }

    if (timeout) {
      request.timeout = timeout;
    }

    if (withCredentials) {
      request.withCredentials = withCredentials;
    }

    request.open(methed.toLocaleUpperCase(), url!, true);

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders());
      const responseData = responseType !== 'text' ? request.response : request.responseText;
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response);
    }

    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request));
    }

    if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName ) {
      const xsrfValue = cookie.read(xsrfCookieName);
      if (xsrfValue && xsrfHeaderName) {
        headers[xsrfHeaderName] = xsrfValue;
      }
    }

    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request));
    }

    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name];
      } else {
        request.setRequestHeader(name, headers[name]);
      }
    })

    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort();
        reject(reason)
      })
    }

    request.send(data);

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      } else {
        reject(createError(`Request failed with status code${response.status}`, config, null, request, response));
      }
    }
  })
}
