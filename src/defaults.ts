import { AxiosRequestConfig } from './types';
import { transformRequest, transformResponse } from './helpers/data';
import { processHeaders } from './helpers/headers';

const defaults: AxiosRequestConfig = {
    methed: 'get',
    timeout: 0,
    headers: {
        common: {
            Accept: 'application/json, text/plain, */*'
        }
    },

    xsrfCookieName: 'XSRF-TOKEN',

    xsrfHeaderName: 'X-XSRF-TOKEN',

    transformRequest: [
        function(data: any, headers: any): any {
            processHeaders(headers, data);
            return transformRequest(data);
        }
    ],

    transformResponse: [
        function(data: any): any {
            return transformResponse(data);
        }
    ]
}

const methedsNoData = ['delete', 'get', 'head', 'options'];

methedsNoData.forEach(methed => {
    defaults.headers[methed] = {}
})

const methedsWithData = ['post', 'put', 'patch'];

methedsWithData.forEach(methed => {
    defaults.headers[methed] = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

export default defaults;
