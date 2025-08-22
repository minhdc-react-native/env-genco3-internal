import VcSelector from "@/components/vcSelector";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { View } from "react-native";
import { Appbar, Divider, useTheme } from "react-native-paper";
import HistoryExams from "../screen/history-exams";
import WorkProcessSalary from "./work-process-salary";
interface IItem {
    id: string | number;
    value: string;
}
const tabs: IItem[] = [
    { id: 'salary', value: 'Hưởng lương' }, { id: 'exams', value: 'Thi cử' }
];
const MapComponent = {
    // worker: WorkProcessWorker,
    salary: WorkProcessSalary,
    exams: HistoryExams
} as const
const WorkProcess = () => {
    const { colors } = useTheme();
    const [currentTab, setCurrentTab] = useState<IItem>(tabs[0]);
    const ComponentView = useMemo(() => {
        return (MapComponent as any)[currentTab.id] ?? null;
    }, [currentTab]);
    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title="Quá trình công tác" />
            </Appbar.Header>
            <VcSelector containerStyle={{ paddingHorizontal: 50 }} data={tabs} value={currentTab.id} onChange={(value) => setCurrentTab(value)} type="line" />
            <Divider />
            <View style={{ flex: 1 }}>
                <ComponentView hideHeader={true} />
            </View>
        </View>
    );
}

export default WorkProcess;
