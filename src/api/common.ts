import Axios from "axios";
import { getAPIUrl } from "@/config/env";
import toast from "react-hot-toast";
import { CommonApiResponse, CommonApiError, CommonApiOptions, ResponseStatusCode } from "@/api/types";
import { TokenLocalStorageKey, NotAuthPages } from "@/config/constant";

const axiosInstance = Axios.create({
    baseURL: getAPIUrl(),
    timeout: 100000,
    // withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=utf-8'
    },
    params: {},
    data: {}
});

axiosInstance.interceptors.request.use((config: any) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    if (window.globalAccountInfo?.provider && config.url.startsWith('/api/alicloud')) {
        config.url = config.url.replace(/api\/alicloud/, `api/${window.globalAccountInfo?.provider}`);
    }
    return config;
}, error => {
    Promise.reject(error)
});

axiosInstance.interceptors.response.use((response: any): any => {
    const { message, code } = response?.data || {};
    // || code === '2003'
    if ((message === 'Unauthorized') && !NotAuthPages.includes(window.location.pathname)) {
        toast.error("Authentication has expired，please login again");
        const redirect = encodeURIComponent(`${window.location.pathname}${window.location.search}`)
        window.location.href = `${window.location.origin}/signin?redirect=${redirect}`;
    }
    return response;
}, error => {
    return Promise.reject(error)
})

Axios.defaults.baseURL = getAPIUrl();

export const postReq = async (path: string, data: any, token?: string) => {
    return await Axios.post(path, data, token ? {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    } : {});
}

/**
 * 通用Post接口请求
 * @returns {Promise<[CommonApiError, T | null]>}
 */
export async function commonAxiosPostRequest<T, Q>(path: string, params?: Q, options?: CommonApiOptions): Promise<[CommonApiError, T | null]> {
    let tid;
    if (options?.showLoading) {
        tid = toast.loading('Loading...');
    }
    try {
        const token = localStorage.getItem(TokenLocalStorageKey);
        const result = await axiosInstance.post<Q, ({ data: CommonApiResponse<T> })>(path, params || {}, {
            headers: { Authorization: token ? `Bearer ${token || ''}` : '' },
            ...(options?.timeout ? { timeout: options.timeout } : {}),
        });
        const { code, data, message } = result?.data || {};
        if (code === ResponseStatusCode.OPERATING_SUCCESSFULLY) {
            return [null, data];
        }
        const errorMessage = (typeof data === 'string' && data ? data : message);
        return [{ message: errorMessage, code }, null];
    } catch (error: any) {
        const { code, message } = error || {};
        return [{ message: message || 'request error', code }, null];
    } finally {
        tid && toast.dismiss(tid);
    }
}

/**
 * 通用Get接口请求
 * @returns {Promise<[CommonApiError, T | null]>}
 */
export async function commonAxiosGetRequest<T, Q>(path: string, params?: Q, options?: CommonApiOptions): Promise<[CommonApiError, T | null]> {
    let tid;
    if (options?.showLoading) {
        tid = toast.loading('Loading...');
    }
    try {
        const token = localStorage.getItem(TokenLocalStorageKey);
        const result = await axiosInstance.get<Q, ({ data: CommonApiResponse<T> })>(path, {
            headers: { Authorization: token ? `Bearer ${token || ''}` : '' },
            params,
            ...(options?.timeout ? { timeout: options.timeout } : {}),
        });
        const { code, data, message } = result?.data || {};
        if (code === ResponseStatusCode.OPERATING_SUCCESSFULLY) {
            return [null, data];
        }
        const errorMessage = (typeof data === 'string' && data ? data : message);
        return [{ message: errorMessage, code }, null];
    } catch (error: any) {
        const { code, message } = error || {};
        return [{ message: message || 'request error', code }, null];
    } finally {
        tid && toast.dismiss(tid);
    }
}

export async function commonAxiosMock<T>(data: T, delay?: number, listLen?: number): Promise<[CommonApiError, T | null]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const result = listLen ? new Array(listLen).fill({}).map(() => data) : data;
            resolve([null, result as T]);
        }, delay || 1000);
    });
}

export default axiosInstance;