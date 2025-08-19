import { useLoading } from "@/components/dialog/loadingProvider";
import { usePopup } from "@/components/dialog/popupProvider";
import { useToast } from "@/components/dialog/useToast";
import { api } from "@/utils/epsApi";
import { epsStorage } from "@/utils/epsStorage";
import { router } from "expo-router";
import { useState } from "react";
import { useTheme } from "react-native-paper";
import { useData } from "./zustand/useData";
import { useTab } from "./zustand/useTab";
const { getToken, setToken, setLogin, removeLogin, clearTokens } = epsStorage();

export const useAuth = () => {
    const { colors } = useTheme();
    const [isLogin, setIsLogin] = useState<boolean | null>(null);
    const { show, hide } = useLoading();
    const { showToast } = useToast();
    const { showPopup } = usePopup();
    // các biến toàn ứng dụng
    const setUser = useData((state) => state.setUser);
    const setIndex = useTab((state) => state.setIndex);
    const setRegister = useTab((state) => state.setRegister);
    const setRegisterTopic = useTab((state) => state.setRegisterTopic);
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
    const logout = async () => {
        showPopup({
            message: `Bạn có muốn thoát không?`,
            onConfirm: async () => {
                api.post({
                    link: `/auth/logout`,
                    callBack: async () => {
                        await clearTokens();
                        router.replace("/(auth)/login");
                        setUser(null);
                        setRegister("notRegister");
                        setRegisterTopic("notRegister");
                        setIndex(0);
                    },
                    setLoading: (loading) => loading ? show("Đăng xuất...") : hide(),
                })
            },
            showCancel: true,
            confirmText: "Có thoát", cancelText: "Không",
            iconType: "question",
            color: colors.primary
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
    const checkLogin = async () => {
        const token = await getToken();
        if (token) {
            await getDataBegin();
            setIsLogin(true);
            router.replace("/(tabs)");
        } else {
            setIsLogin(false);
        }
    }

    return {
        isLogin,
        checkLogin,
        login,
        logout
    }
}