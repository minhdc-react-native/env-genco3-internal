import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { Chip, Icon, IconButton, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type HistoryItem = {
    id: string;
    date: string;
    title: string;
    status: "success" | "fail";
    oldValue?: string;
    newValue?: string;
};

const data: HistoryItem[] = [
    {
        id: "1",
        date: "06/05/2024",
        title: "Thi nâng bậc T3/2024 - Đạt",
        status: "success",
        oldValue: "5",
        newValue: "6",
    },
    {
        id: "2",
        date: "31/06/2023",
        title: "Thi giữ bậc T6/2023 - Đạt",
        status: "success",
    },
    {
        id: "3",
        date: "06/03/2023",
        title: "Thi giữ bậc T3/2023 thất bại (lần 1)",
        status: "fail",
    },
    {
        id: "4",
        date: "06/05/2024",
        title: "Tăng hệ số lương",
        status: "success",
        oldValue: "3.453",
        newValue: "3.971",
    },
];

const filters = [
    { id: 'topic1', value: 'Thi nâng bậc' }, { id: 'topic2', value: 'Thi giữ bậc' },
    { id: 'topic3', value: 'Thi KTSHN' }, { id: 'topic4', value: 'Nâng lương' }, { id: 'topic5', value: 'Khác' }
];
export default function HistoryExams() {
    const { colors } = useTheme();
    const [filerSelect, setFilterSelect] = React.useState<string[]>(['topic1', 'topic3']);
    const onPresFilterItem = (item: any) => {
        if (filerSelect.includes(item.id)) {
            setFilterSelect((prev => prev.filter((f) => f !== item.id)));
        } else {
            setFilterSelect(prev => ([...prev, item.id]));
        }
    }
    const renderItem = ({ item }: { item: HistoryItem }) => (
        <View style={styles.row}>
            {/* Timeline Dot */}
            <View style={styles.timeline}>
                {/* <View style={styles.circle} /> */}
                <Icon source={() => <MaterialIcons name="radio-button-checked" size={24} color={colors.primary} />} size={20} />
                <View style={styles.line} />
            </View>

            {/* Content */}
            <View style={styles.content}>
                <Text style={styles.date}>{item.date}</Text>
                <Text
                    style={[
                        styles.title,
                        item.status === "fail" ? { color: "red" } : { color: "green" },
                    ]}
                >
                    {item.title}
                </Text>

                {item.oldValue && item.newValue && (
                    <View style={styles.box}>
                        <View style={styles.boxItem}>
                            <Text style={styles.label}>Cũ</Text>
                            <Text style={styles.value}>{item.oldValue}</Text>
                        </View>
                        <Text style={styles.arrow}>→</Text>
                        <View style={styles.boxItem}>
                            <Text style={styles.label}>Mới</Text>
                            <Text style={styles.value}>{item.newValue}</Text>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                <IconButton
                    icon="arrow-left"
                    size={30}
                    onPress={() => router.back()}
                />
                <Text style={styles.headerTitle}>Lịch sử nâng bậc</Text>
            </View>
            {/* Filter Tabs */}
            <View style={[styles.filter]}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {filters.map((f, idx) =>
                        <Chip key={f.id} mode={filerSelect.includes(f.id) ? 'flat' : 'outlined'} selected={filerSelect.includes(f.id)} onPress={() => onPresFilterItem(f)} style={{ marginRight: 10 }}>
                            {f.value}
                        </Chip>)}

                </ScrollView>
            </View>
            {/* Timeline List */}
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 40 }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6FAFA",
        padding: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    filter: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        height: 50
    },
    tab: {
        marginRight: 8,
        borderRadius: 20,
    },
    row: {
        flexDirection: "row",
        marginBottom: 24,
    },
    timeline: {
        alignItems: "center",
        width: 30,
    },
    circle: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#00796B",
        backgroundColor: "#fff",
    },
    line: {
        flex: 1,
        width: 2,
        backgroundColor: "#ccc",
        marginTop: 2,
    },
    content: {
        flex: 1,
    },
    date: {
        color: "gray",
        marginBottom: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
    },
    box: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F1F3F4",
        borderRadius: 10,
        padding: 10,
        marginTop: 6,
    },
    boxItem: {
        flex: 1,
        alignItems: "center",
    },
    label: {
        color: "gray",
        marginBottom: 4,
    },
    value: {
        fontWeight: "bold",
        fontSize: 16,
    },
    arrow: {
        marginHorizontal: 12,
        fontSize: 18,
        fontWeight: "bold",
    },
});
