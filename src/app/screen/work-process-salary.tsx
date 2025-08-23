import { StarRating } from "@/components/starRating";
import { useHelper } from "@/hooks/useHelper";
import { useData } from "@/hooks/zustand/useData";
import { api } from "@/utils/epsApi";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { Card, Text, useTheme } from "react-native-paper";

export default function WorkProcessSalary() {
    const [data, setData] = useState<IDataBase[]>([]);
    const { formatDate } = useHelper();
    const [loading, setLoading] = useState<boolean>(false);
    const user = useData((state) => state.user);
    const setItemData = useData((state) => state.setItemData);
    const onRefresh = () => {
        api.get({
            link: `/employees/salary-decision/${user?.id}`,
            callBack: (res) => {
                setData(res.returnData);
            },
            setLoading: setLoading
        })
    }

    useEffect(() => {
        onRefresh();
    }, []);
    const { colors } = useTheme();
    const renderItem = ({ item }: any) => (
        <View style={styles.row}>
            <Card style={[styles.card, { backgroundColor: item?.apply ? colors.elevation.level1 : colors.background }]}>
                <Pressable
                    style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10 }]}
                    onPress={() => {
                        setItemData(item);
                        router.navigate("/screen/work-process-salary-detail");
                    }}
                >
                    <Card.Content style={{ flex: 1, gap: 10 }}>
                        <Text variant="titleMedium" style={{ marginTop: 6 }}>
                            {`Ngạch ${item.payrollCode}- Bậc ${item.rank}`}
                        </Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={{ color: colors.secondary }}>{`Ngày áp dụng: ${formatDate(item.effectiveDate, "dd/MM/yyyy HH:mm:ss", true)}`}</Text>
                            {item?.apply && <MaterialCommunityIcons name="check" size={24} color="blue" />}
                        </View>
                        <StarRating value={item?.salaryPeriod ?? 0} max={item?.rankScale ?? 0} />
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
            {/* {<Appbar.Header>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title="Hưởng lương" />
                <Appbar.Action icon="magnify" onPress={() => { }} />
            </Appbar.Header>} */}

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 16 }}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={onRefresh}
                        colors={[colors.primary]} // màu vòng quay (Android)
                        tintColor={colors.primary}  // màu vòng quay (iOS)
                    />
                }
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
