import VcSelector from "@/components/vcSelector";
import { EXAM_REGISTRATION_STATUS } from "@/constants/EpsData";
import { useHelper } from "@/hooks/useHelper";
import { useData } from "@/hooks/zustand/useData";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Appbar, Button, Card, Divider, IconButton, Text, useTheme } from "react-native-paper";
import HistoryExams from "../screen/history-exams";
import NoneExam from "../screen/none-exam";
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
    const currentExam = useData((state) => state.currentExam);
    const register = currentExam?.examRegistration?.registrationStatus;
    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="Đăng ký bài thi" />
                <IconButton mode="contained-tonal" icon={"help"} size={24} iconColor={colors.primary} onPress={() => router.navigate("/screen/guide-exam")} />
            </Appbar.Header>
            <VcSelector containerStyle={{ paddingHorizontal: 50 }} data={tabs} value={currentTab.id} onChange={(value) => setCurrentTab(value)} type="line" />
            <Divider />
            <View style={{ flex: 1 }}>
                {currentTab.id === "current" ?
                    (currentExam ? (register !== EXAM_REGISTRATION_STATUS.SIGNED ? <CurrentRoute /> : <CurrentRouteTopic />) : <NoneExam />) : <HistoryExams hideHeader={true} />}
            </View>
        </>
    );
}

export default RegisterExams;

const CurrentRoute = () => {
    const currentExam = useData((state) => state.currentExam);
    const register = currentExam?.examRegistration?.registrationStatus;
    const { colors } = useTheme();
    const { formatDate } = useHelper();
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/17791/17791849.png' }}
                style={{ width: 120, height: 120, marginBottom: 16 }}
                resizeMode="contain"
            />
            <Text variant="titleMedium" style={styles.title}>
                {currentExam?.employeeExamPeriod?.name}
            </Text>
            <Text variant="bodyMedium" style={{ color: colors.primary, marginBottom: 8 }}>
                Đăng Ký Tham Gia
            </Text>
            <Text variant="bodyMedium" style={styles.textCenter}>
                {`Bạn nằm trong danh sách ${currentExam?.employeeExamPeriod?.examType?.name} đợt ${formatDate(currentExam?.employeeExamPeriod?.examMonth)}, vui lòng xác nhận đăng ký tham gia trước thời hạn.`}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                <IconButton icon="calendar" size={20} />
                <Text>{`Thời Gian: ${formatDate(currentExam?.employeeExamPeriod?.registrationStartDate)} - ${formatDate(currentExam?.employeeExamPeriod?.registrationEndDate)}`}</Text>
            </View>
            {register === EXAM_REGISTRATION_STATUS.PENDING ? <>
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
    const currentExam = useData((state) => state.currentExam);
    const register = currentExam?.examRegistration?.registrationStatus;
    const registerTopic = 'notRegister';
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20
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
});
