import { CustomTabBar } from "@/components/customTabBar";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import { SceneMap, TabView } from 'react-native-tab-view';
import HistoryExams from "../screen/history-exams";
import WorkProcessSalary from "./work-process-salary";

const renderScene = SceneMap({ salary: WorkProcessSalary, exams: HistoryExams });
const routes = [{ key: 'salary', title: 'Hưởng lương' }, { key: 'exams', title: 'Thi cử' },];

const WorkProcess = () => {
    const { colors } = useTheme();
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title="Quá trình công tác" />
            </Appbar.Header>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={(pros: any) => <CustomTabBar {...pros} setIndex={setIndex} />}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </View>
    );
}

export default WorkProcess;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    tabItem: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 12,
    },
    tabLabel: {
        color: "#888",
        fontWeight: "400",
    },
    tabLabelActive: {
        color: "#007aff",
        fontWeight: "700",
    },
    tabUnderline: {
        marginTop: 4,
        height: 2,
        width: "100%",
        backgroundColor: "#007aff",
    },
});