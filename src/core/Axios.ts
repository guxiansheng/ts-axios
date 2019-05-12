import { AxiosResponse, AxiosRequestConfig, AxiosPromise, Methed } from '../types';
import  dispatchRequest  from './dispatchRequest';
import InterceptorManager from './interceptorManager'

interface Interceptors {
    request: InterceptorManager<AxiosRequestConfig>
    response: InterceptorManager<AxiosResponse>
}

export default class Axios {
    interceptors: Interceptors

    constructor() {
        this.interceptors = {
            request: new InterceptorManager<AxiosRequestConfig>(),
            response: new InterceptorManager<AxiosResponse>()
        }
    }
    
    request(url: any, config?: any): AxiosPromise {
        if (typeof url === 'string') {
            if (!config) {
                config = {}
            }
            config.url = url;
        } else {
            config = url;
        }
        return dispatchRequest(config);
    } 

    get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethedWithoutData('get', url, config);
    }

    delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethedWithoutData('delete', url, config);
    }

    head(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethedWithoutData('head', url, config);
    }

    options(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethedWithoutData('options', url, config);
    }

    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethedWithData('post', url, data, config);
    }

    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethedWithData('put', url, data, config);
    }

    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethedWithData('patch', url, data, config);
    }
    

    _requestMethedWithoutData(
        methed: Methed,
        url: String,
        config?: AxiosRequestConfig
    ): AxiosPromise {
        return this.request(Object.assign(config||{}, {
            methed,
            url
        }))
    }

    _requestMethedWithData(
        methed: Methed,
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): AxiosPromise {
        return this.request(Object.assign(config||{}, {
            methed,
            url,
            data
        }))
    }
}