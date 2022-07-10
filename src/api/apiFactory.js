import moment from 'moment';
import {getToken} from '../utils/authCookie';
import Axios from 'axios';

export function isValidDateTime(datetime) {
    return datetime && Object.prototype.toString.call(datetime) === '[object Date]' && !isNaN(datetime);
}

export function getQueryStringValue(value) {
    const sRet = isValidDateTime(value) ? moment(value).format('YYYY/MM/DD HH:mm:ss') : value;
    return encodeURIComponent(sRet);
}

export function checkIsNullOrUndefined(obj) {
    return (obj === undefined || obj === 'undefined' || obj === null || obj === '');
}

export const objectToParams = (obj) => Object.keys(obj).reduce(function (a, k) {
    if (!checkIsNullOrUndefined(obj[k])) {
        if (k === 'page') {
            const page = Number(obj[k]) >= 1 ? Number(obj[k]) - 1 : Number(obj[k]);
            a.push(`${k}=${getQueryStringValue(page)}`);
        } else {
            a.push(`${k}=${getQueryStringValue(obj[k])}`);
        }
    }
    return a;
}, []).join('&');

export const originalObjectToParam = (obj) => Object.keys(obj).reduce(function (a, k) {
    if (!checkIsNullOrUndefined(obj[k])) {
        a.push(`${k}=${getQueryStringValue(obj[k])}`);
    }
    return a;
}, []).join('&');

export const getHeader = () => ({
    Authorization: getToken(),
    cApiKey: process.env.VUE_APP_API_KEY,
    'Content-Type': 'application/json;charset=UTF-8'
})

class ApiFactory {
    /**
     * @param constantApi : {} config in ConstantAPI.MENU_CODE.ENDPOINT
     * @param payload : {} set {} when ignore
     * @param params: {} parameters list: not pass if ignore
     * @param pToken: ACCESS_TOKEN
     * */
    static callAPI(constantApi, payload = {}, params = {}, pToken = undefined) {
        const url = `${constantApi.url}?${objectToParams(params)}`;
        const method = constantApi.method;
        const headers = getHeader()
        if (pToken) {
            headers.Authorization = pToken
        }
        return Axios({
            method: method,
            url: url,
            data: payload,
            headers: headers
        }).then(res => {
            return res.data;
        }).catch(err => {
            return Promise.reject(err)
        });
    }

    static callAPIDetail(constantApi, payload = {}, params = {}, headerParams, path = '') {
        const url = `${constantApi.url}${path}?${originalObjectToParam(params)}`;
        const method = constantApi.method;
        return Axios({
            method: method,
            url: url,
            data: payload,
            headers: headerParams
        }).then(res => {
            return res.data;
        }).catch(err => {
            return Promise.reject(err)
        });
    }

    static get(endpoint, path, params = {}) {
        const uri = `${endpoint}/${path}?${objectToParams(params)}`;
        return Axios({
            method: 'GET',
            url: uri,
            headers: getHeader()
        }).then(res => {
            return res.data;
        }).catch(err => {
            return Promise.reject(err)
        });
    }

    /**
     * @param constantApi : {} config in ConstantAPI.MENU_CODE.ENDPOINT
     * @param fileName : string fileName to download
     * @param payload: {} body if POST
     * @param params : {} object request params
     **/
    static download(constantApi, fileName, payload, params) {
        const isParams = params ? `?${objectToParams(params)}` : '';
        const url = `${constantApi.url}${isParams}`;
        return Axios({
            method: constantApi.method,
            url: url,
            headers: getHeader(),
            data: payload,
            responseType: 'blob'
        }).then((res) => {
            const fileURL = window.URL.createObjectURL(new Blob([res.data]));
            const fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', fileName);
            document.body.appendChild(fileLink);
            fileLink.click();
        }).catch(err => {
            return Promise.reject(err)
        });
    }

    static downloadFile(constantApi, fileName, payload, params, headers, urlPath) {
        const isParams = params ? `${objectToParams(params)}` : '';
        const url = `${constantApi.url}${isParams}${urlPath}`;
        return Axios({
            method: constantApi.method,
            url: url,
            headers: headers,
            data: payload,
            responseType: 'blob'
        }).then((res) => {
            const fileURL = window.URL.createObjectURL(new Blob([res.data]));
            const fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', fileName);
            document.body.appendChild(fileLink);
            fileLink.click();
        }).catch(err => {
            return Promise.reject(err)
        });
        ;
    }

    static apiGetMenuByPermission(constantApi, accessToken, params) {
        const url = `${constantApi.url}?${objectToParams(params)}`;
        return Axios({
            url: url,
            method: constantApi.method,
            headers: {
                Authorization: accessToken,
                cApiKey: process.env.VUE_APP_API_KEY,
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then(res => {
            return res.data;
        }).catch(err => {
            return Promise.reject(err)
        });
    }

    static getUserInfo(constantApi, accessToken) {
        return Axios({
            url: constantApi.url,
            method: constantApi.method,
            headers: {
                Authorization: accessToken
            }
        }).then(res => {
            return res.data;
        }).catch(err => {
            return Promise.reject(err)
        });
    }

    static refreshToken(constantApi, token) {
        return Axios({
            url: constantApi.url,
            method: 'GET',
            headers: {Authorization: token}
        }).then(res => {
            return res.data
        }).catch(err => {
            return Promise.reject(err)
        });
    }

    /**
     * @param constantApi : {} config in ConstantAPI.MENU_CODE.ENDPOINT
     * @param fileName : string fileName to download
     * @param params : {} object request params
     * @param $this : Object component
     * */
    static downloadCtdt(constantApi, fileName, params, $this) {
        const url = `${constantApi['url']}?${objectToParams(params)}`
        return Axios({
            method: constantApi['method'],
            url: url,
            headers: getHeader(),
            responseType: 'blob'
        }).then((res) => {
            const fileURL = window.URL.createObjectURL(new Blob([res.data]))
            const fileLink = document.createElement('a')
            fileLink.href = fileURL
            fileLink.setAttribute('download', fileName)
            document.body.appendChild(fileLink)
            fileLink.click()
        })
    }
}

export default ApiFactory;
