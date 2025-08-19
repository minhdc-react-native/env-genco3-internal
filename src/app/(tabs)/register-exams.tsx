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
    const register = useTab((state) => state.register);
    const [currentTab, setCurrentTab] = useState<IItem>(tabs[0]);

    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="Đăng ký bài thi" />
                <IconButton mode="contained-tonal" icon={"help"} size={24} iconColor={colors.primary} onPress={() => router.navigate("/screen/guide-exam")} />
            </Appbar.Header>
            <VcSelector data={tabs} value={currentTab.id} onChange={(value) => setCurrentTab(value)} />
            <Divider />
            <View style={{ flex: 1 }}>
                {currentTab.id === "current" ? (register === "Registered" ? <CurrentRouteTopic /> : <CurrentRoute />) : <History />}
            </View>
        </>
    );
}

export default RegisterExams;

const CurrentRoute = () => {
    const register = useTab((state) => state.register);
    const { colors } = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/17791/17791849.png' }}
                style={{ width: 120, height: 120, marginBottom: 16 }}
                resizeMode="contain"
            />
            <Text variant="titleMedium" style={styles.title}>
                Thi Nâng Bậc - Đợt 2/2025
            </Text>
            <Text variant="bodyMedium" style={{ color: colors.primary, marginBottom: 8 }}>
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
            </> :
                <Card mode="elevated" style={{ backgroundColor: colors.background, paddingHorizontal: 20, paddingBottom: 20 }}>
                    <Button
                        style={styles.registerBtn}
                        icon={() => (<AntDesign name="close" size={24} color="red" />)}
                    >
                        <Text style={{ color: 'red', fontWeight: "bold" }}>{"Đã hoãn thi"}</Text>
                    </Button>
                    <Text variant="bodyMedium" style={[styles.textCenter, { marginTop: 10 }]}>{"Lý do hoãn thi: tôi bận công việc đi...."}</Text>
                </Card>
            }

        </View>
    );
};
const CurrentRouteTopic = () => {
    const registerTopic = useTab((state) => state.registerTopic);
    const { colors } = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Image
                source={{ uri: registerTopic === "notRegister" ? 'https://cdn-icons-png.flaticon.com/512/2666/2666505.png' : 'https://cdn-icons-png.flaticon.com/512/18295/18295118.png' }}
                style={{ width: 120, height: 120, marginBottom: 16 }}
                resizeMode="contain"
            />
            <Text variant="titleMedium" style={styles.title}>
                Thi Nâng Bậc - Đợt 2/2025
            </Text>
            <Text variant="bodyMedium" style={{ color: colors.primary, marginBottom: 8 }}>
                {registerTopic === "notRegister" ? 'Đăng Ký Đề tài' : 'Hoàn thành đăng ký'}
            </Text>
            <Text variant="bodyMedium" style={styles.textCenter}>
                {registerTopic === "notRegister" ? 'Vui lòng đăng ký đề tài dự thị trong thời gian quy định.' :
                    'Bạn hãy theo dõi thông báo về kỳ thi bạn đã đăng ký!'}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                <IconButton icon="calendar" size={20} />
                <Text>{registerTopic === "notRegister" ? 'Thời Gian: 01/10/2025 - 05/10/2025' : 'Lịch thi: 10/10/2025'}</Text>
            </View>
            <View style={{ gap: 10 }}>
                <Button
                    icon={() => <AntDesign name="check" size={24} color={colors.primary} />}
                >
                    Đã đăng ký tham gia
                </Button>
                {registerTopic === "notRegister" ? <Button
                    mode="contained"
                    onPress={() => router.navigate("/screen/register-topic")}
                >
                    Đăng đề tài dự thi
                </Button> : <Button
                    icon={() => <AntDesign name="check" size={24} color={colors.primary} />}
                >
                    Đã đăng ký đề tài
                </Button>}
            </View>

            <Button
                onPress={() => router.navigate("/screen/contest-info")}
                style={{ marginTop: 8 }}
                mode="contained-tonal"
            >
                Thông tin dự thi
            </Button>
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
    const { colors } = useTheme();
    const renderItem = ({ item }: { item: IExam }) => (
        <Card style={[styles.cardItem, { backgroundColor: colors.elevation.level1 }]} mode="contained">
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
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20
    },
    card: {
        padding: 12,
        borderRadius: 12,
    },
    cardItem: {
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
