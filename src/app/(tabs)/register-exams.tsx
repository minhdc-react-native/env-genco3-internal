import VcSelector from "@/components/vcSelector";
import { useTab } from "@/hooks/zustand/useTab";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import { Appbar, Button, Card, Divider, IconButton, Text, useTheme } from "react-native-paper";
interface IItem {
    id: string | number;
    value: string;
}
const tabs: IItem[] = [
    { id: 'current', value: 'Hiện tại' }, { id: 'history', value: 'Lịch sử' }
];
const RegisterExams = () => {
    const { colors } = useTheme();

    const [currentTab, setCurrentTab] = useState<IItem>(tabs[0]);
    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="Đăng ký bài thi" />
                <IconButton icon={"help"} size={24} iconColor={colors.primary} onPress={() => router.navigate("/screen/guide-exam")} />
            </Appbar.Header>
            <VcSelector data={tabs} value={currentTab.id} onChange={(value) => setCurrentTab(value)} />
            <Divider />
            <View style={{ flex: 1 }}>
                {currentTab.id === "current" ? <CurrentRoute /> : <History />}
            </View>
        </>
    );
}

export default RegisterExams;

const CurrentRoute = () => {
    const register = useTab((state) => state.register);
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            {/* ảnh minh hoạ */}
            <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/942/942748.png' }}
                style={{ width: 120, height: 120, marginBottom: 16 }}
                resizeMode="contain"
            />
            <Text variant="titleMedium" style={styles.title}>
                Thi Nâng Bậc - Đợt 2/2025
            </Text>
            <Text variant="bodyMedium" style={{ color: '#00796B', marginBottom: 8 }}>
                Đăng Ký Tham Gia
            </Text>
            <Text variant="bodyMedium" style={styles.textCenter}>
                Bạn nằm trong danh sách thi nâng bậc đợt tháng 9/2025, vui lòng xác nhận
                đăng ký tham gia trước thời hạn.
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                <IconButton icon="calendar" size={20} />
                <Text>Thời Gian: 03/09/2025 - 05/09/2025</Text>
            </View>
            {register === "notRegister" ? <>
                <Button
                    mode="contained"
                    style={styles.registerBtn}
                    onPress={() => router.navigate("/screen/employee-register-exam")}
                >
                    Đăng Ký Thi
                </Button>

                <Button
                    onPress={() => router.navigate("/screen/postpone-exam")}
                    textColor="red"
                    style={{ marginTop: 8 }}
                >
                    Hoãn Thi?
                </Button>
            </> : <Button
                mode="outlined"
                style={styles.registerBtn}
                // contentStyle={{ flexDirection: "row-reverse" }}
                icon={() => (register === "Registered" ? <AntDesign name="checkcircle" size={24} color={colors.primary} /> : <AntDesign name="closecircle" size={24} color="red" />)}
            >
                <Text style={{ color: register === "Registered" ? colors.primary : 'red', fontWeight: "bold" }}>{register === "Registered" ? "Đã đăng ký tham gia" : "Đã hoãn thi"}</Text>
            </Button>}

        </View>
    );
};
type IExam = {
    id: string;
    title: string;
    date: string;
    status: string;
};
const DATA: IExam[] = [
    { id: '1', title: 'Thi giữ bậc - T1/2024', date: '10/01/2024', status: 'Đạt' },
    { id: '2', title: 'Thi nâng bậc - T2/2024', date: '01/02/2024', status: 'Trượt' },
    { id: '3', title: 'Thi giữ bậc - T3/2024', date: '10/03/2024', status: 'Đạt' },
];

const History = () => {
    const renderItem = ({ item }: { item: IExam }) => (
        <Card style={styles.cardItem} mode="contained">
            <Pressable style={(pressed) => [{ opacity: pressed ? 0.7 : 1 }, styles.row]} onPress={() => router.navigate("/screen/exam-detail")}>
                <View style={{ flex: 1 }}>
                    <Text variant="titleMedium" style={styles.titleItem}>{item.title}</Text>
                    <Text variant="bodySmall" style={{ color: '#666' }}>Ngày thi: {item.date}</Text>
                </View>
                <Text style={[styles.status, item.status === "Trượt" && { color: 'red' }]}>{item.status}</Text>
                <IconButton icon="chevron-right" size={20} />
            </Pressable>
        </Card>
    );

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 12 }}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F5FAFA',
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20
    },
    card: {
        padding: 12,
        borderRadius: 12,
    },
    cardItem: {
        backgroundColor: '#EDEFEF',
        borderRadius: 12,
        padding: 12,
    },
    titleItem: {
        marginBottom: 4,
        fontWeight: '500',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 4,
        textAlign: 'center',
    },
    textCenter: {
        textAlign: 'center',
        marginBottom: 12,
        color: '#555',
    },
    registerBtn: {
        marginTop: 16,
        borderRadius: 25,
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    status: {
        color: 'green',
        fontWeight: '600',
        marginRight: 4,
    },
});
