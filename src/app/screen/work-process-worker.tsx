import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { Appbar, Card, Text, useTheme } from "react-native-paper";

const timelineData = [
    { id: "1", date: "01/05/2025", title: "Thợ bậc 6/7", current: true },
    { id: "2", date: "01/04/2025", title: "Thợ bậc 6/7", current: false },
    { id: "3", date: "01/03/2025", title: "Thợ bậc 6/7", current: false },
    { id: "4", date: "01/02/2025", title: "Thợ bậc 6/7", current: false },
    { id: "5", date: "01/01/2025", title: "Thợ bậc 6/7", current: false },
];

interface IProg {
    hideHeader?: boolean
}
export default function WorkProcessWorker({ hideHeader = false }: IProg) {
    const { colors } = useTheme();
    const renderItem = ({ item }: any) => (
        <View style={styles.row}>
            <Card style={[styles.card, { backgroundColor: item?.current ? colors.elevation.level1 : colors.background }]}>
                <Pressable
                    style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10 }]}
                    onPress={() => router.navigate("/screen/work-process-worker-detail")}
                >
                    <Card.Content style={{ flex: 1 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={[styles.month]}>{`Ngày áp dụng: ${item.date}`}</Text>
                            {item?.current && <MaterialCommunityIcons name="check" size={24} color="blue" />}
                        </View>
                        <Text variant="titleMedium" style={{ marginTop: 6 }}>
                            {item.title}
                        </Text>
                    </Card.Content>
                    <MaterialCommunityIcons
                        name="chevron-right"
                        size={24}
                        color="gray"
                    />
                </Pressable>

            </Card>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
            {/* Header */}
            {!hideHeader && <Appbar.Header>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title="Bậc thợ" />
                <Appbar.Action icon="magnify" onPress={() => { }} />
            </Appbar.Header>}

            <FlatList
                data={timelineData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 16 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        marginBottom: 10,
    },
    timeline: {
        width: 20,
        alignItems: "center",
        position: "relative",
    },
    date: { fontWeight: "700", fontSize: 16 },
    month: { color: "#888", fontSize: 12, marginBottom: 6 },
    circle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 3,
        backgroundColor: "white",
        zIndex: 1,
    },
    line: {
        position: "absolute",
        top: 0,
        bottom: 0,
        width: 2,
        backgroundColor: "#ddd",
        marginTop: 30,
    },
    card: {
        flex: 1,
        marginLeft: 8,
        borderRadius: 12,
        elevation: 2,
    },
    chip: {
        alignSelf: "flex-start"
    },
    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    metaText: {
        marginLeft: 4,
        color: "#666",
        fontSize: 13,
    },
});
