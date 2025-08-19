import { useTab } from "@/hooks/zustand/useTab";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Button, Divider, Text, useTheme } from "react-native-paper";

export default function EmployeeRegister() {
    const setRegister = useTab((state) => state.setRegister);
    const { colors } = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Appbar */}
            <Appbar.Header>
                <Appbar.BackAction onPress={() => router.back()} />
            </Appbar.Header>

            {/* Nội dung */}
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Thi Nâng Bậc - Đợt 2/2025</Text>
                <Text style={styles.description}>
                    Bạn nằm trong danh sách thi nâng bậc đợt tháng 9/2025. Vui lòng kiểm tra lại
                    thông tin bên dưới trước khi đăng ký tham gia.
                </Text>

                {/* Thông tin dự thi */}
                <View style={styles.sectionHeader}>
                    <MaterialCommunityIcons
                        name="text-box-outline"
                        size={20}
                        color={colors.primary}
                    />
                    <Text style={styles.sectionHeaderText}> Thông tin dự thi</Text>
                </View>
                <Divider />

                {/* Thông tin chi tiết */}
                <View style={[styles.infoBox, { backgroundColor: colors.elevation.level1 }]}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Loại thi</Text>
                        <Text style={styles.value}>Nâng bậc</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Đợt</Text>
                        <Text style={styles.value}>2 (Tháng 9)</Text>
                        <Text style={styles.label}>Năm</Text>
                        <Text style={styles.value}>2025</Text>
                    </View>
                    <Divider />
                    <View style={styles.row}>
                        <Text style={styles.label}>Bậc thợ hiện tại</Text>
                        <Text style={styles.value}>6/7</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Bậc thợ thi</Text>
                        <Text style={styles.value}>7/7</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Nút xác nhận */}
            <View style={styles.footer}>
                <Button
                    mode="contained"
                    onPress={() => {
                        setRegister("Registered");
                        router.back();
                    }}
                    style={{ marginHorizontal: 50 }}
                >
                    Xác Nhận Tham Gia
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 50
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: "#444",
        marginBottom: 16,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    sectionHeaderText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#333",
    },
    infoBox: {
        borderRadius: 8,
        padding: 12,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 6,
        flexWrap: "wrap",
    },
    label: {
        fontSize: 14,
        color: "#555",
        flex: 1,
    },
    value: {
        fontSize: 14,
        fontWeight: "600",
        flex: 1,
        textAlign: "right",
    },
    footer: {
        padding: 16,
    },
});
