import { useLoading } from "@/components/dialog/loadingProvider";
import { useToast } from "@/components/dialog/useToast";
import { api } from "@/utils/epsApi";
import { epsStorage } from "@/utils/epsStorage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useData } from "./zustand/useData";
const { getToken, setToken, setLogin, removeLogin, clearTokens } = epsStorage();

export const useAuth = () => {
    const setUser = useData((state) => state.setUser);
    const [isLogin, setIsLogin] = useState<boolean | null>(null);
    const { show, hide } = useLoading();
    const { showToast } = useToast();
    const getDataBegin = async () => {
        await api.get({
            link: `/employees/current-user/`,
            callBack: (res) => {
                if (res) setUser(res.returnData);
            },
            callError: (err) => {
                console.log("err get current user>>", err);
            }
        });
    }
    const login = async (login: ILogin) => {
        api.post({
            link: `/auth/login`,
            data: login,
            callBack: async (res) => {
                if (res && res.error) {
                    showToast(res.message, { type: "error" });
                } else {
                    await setToken(res);
                    await getDataBegin();
                    if (login.remember) {
                        await setLogin(login);
                    } else {
                        await removeLogin();
                    }
                    router.replace("/(tabs)");
                }
            },
            setLoading: (loading) => loading ? show("Truy cập...") : hide(),
            callError: (err) => console.log('err login>>', err)
        })

    }

    useEffect(() => {
        const _start = async () => {
            const token = await getToken();
            if (token) {
                await getDataBegin();
                setIsLogin(true);
                router.replace("/(tabs)");
            } else {
                setIsLogin(false);
            }
        }
        _start();
    }, [])

    return {
        isLogin,
        login
    }
}