// axiosApiHelper.ts
import { AxiosRequestConfig } from 'axios';
import epsAxios, { getErrorMessage } from './epsAxios';

interface IApiParams {
    link: string;
    data?: any;
    config?: AxiosRequestConfig<any>;
    setLoading?: (loading: boolean) => void;
    callBack?: (res: any) => void;
    callError?: (error: any) => void;
}

export const api = {
    get: async ({ link, config, setLoading, callBack, callError }: IApiParams): Promise<any> => {
        try {
            setLoading?.(true);
            const res = await epsAxios.get(link, config);
            if (res?.data?.error) {
                callError?.(res.data);
                return Promise.reject(res.data);
            }
            callBack?.(res.data || res);
            return res.data || res;
        } catch (error: any) {
            const msg = getErrorMessage(error?.response?.data || error);
            callError?.(msg);
            __DEV__ && console.log('GET error:', error?.response?.data || error);
            return Promise.reject(msg);
        } finally {
            setLoading?.(false);
        }
    },

    post: async ({ link, data, config, setLoading, callBack, callError }: IApiParams): Promise<any> => {
        try {
            setLoading?.(true);
            const res = await epsAxios.post(link, data, config);
            if (res?.data?.error) {
                callError?.(res.data);
                return Promise.reject(res.data);
            }
            callBack?.(res);
            return res;
        } catch (error: any) {
            const msg = getErrorMessage(error?.response?.data || error);
            callError?.(msg);
            console.log('link>>', link, data);
            __DEV__ && console.log(`POST error:`, error?.response?.data || error);
            return Promise.reject(msg);
        } finally {
            setLoading?.(false);
        }
    },

    put: async ({ link, data, config, setLoading, callBack, callError }: IApiParams): Promise<any> => {
        try {
            setLoading?.(true);
            const res = await epsAxios.put(link, data, config);
            if (res?.data?.error) {
                callError?.(res.data);
                return Promise.reject(res.data);
            }
            callBack?.(res);
            return res;
        } catch (error: any) {
            const msg = getErrorMessage(error?.response?.data || error);
            callError?.(msg);
            __DEV__ && console.log('PUT error:', error?.response?.data || error);
            return Promise.reject(msg);
        } finally {
            setLoading?.(false);
        }
    },

    delete: async ({ link, config, setLoading, callBack, callError }: IApiParams): Promise<any> => {
        try {
            setLoading?.(true);
            const res = await epsAxios.delete(link, config);
            if (res?.data?.error) {
                callError?.(res.data);
                return Promise.reject(res.data);
            }
            callBack?.(res);
            return res;
        } catch (error: any) {
            const msg = getErrorMessage(error?.response?.data || error);
            callError?.(msg);
            __DEV__ && console.log('DELETE error:', error?.response?.data || error);
            return Promise.reject(msg);
        } finally {
            setLoading?.(false);
        }
    },
};
