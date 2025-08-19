import { useHelper } from "@/hooks/useHelper";
import { useData } from "@/hooks/zustand/useData";
import { router } from "expo-router";
import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Avatar, Card, Text, useTheme } from "react-native-paper";

export default function EmployeeProfile() {
    const user = useData((state) => state.user);
    const { colors } = useTheme();
    const { formatDate } = useHelper();
    return (
        <>
            {/* Appbar */}
            <Appbar.Header>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title="Hồ sơ nhân viên" />
            </Appbar.Header>
            {/* Nội dung */}
            <ScrollView style={[styles.container, { backgroundColor: colors.elevation.level1 }]}>
                <View style={{ alignItems: "center", marginBottom: 20, flexDirection: "row", gap: 50 }}>
                    <View style={[{ borderWidth: 2, borderRadius: 100, borderColor: colors.primary }]}>
                        <Avatar.Image
                            size={100}
                            source={{ uri: user?.imageUrl || "http://125.212.225.203:7024/media/avatars/300-2.png" }}
                        />
                    </View>
                    <View>
                        <Field label="Mã nhân viên" value={user?.code ?? ''} />
                        <Field label="Ngày sinh" value={formatDate(user?.birthDate, "dd/MM/yyyy HH:mm:ss", true)} />
                    </View>
                </View>
                <Card style={{ padding: 20, backgroundColor: colors.background }}>
                    <Field label="Họ và tên" value={user?.fullName ?? ''} />
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Field label="Hợp đồng" value={user?.contract ?? ''} />
                        <Field label="Ngày ký" value={formatDate(user?.contractSignedDate, "dd/MM/yyyy HH:mm:ss", true)} />
                    </View>
                    <Field label="Bậc hiện tại" value={`${user?.currentRank}/${user?.rankScale}`} />
                    <Field label="Chức danh" value={user?.positionName ?? ''} />
                    <Field label="Phòng ban" value={user?.departmentName ?? ''} />
                </Card>
            </ScrollView>
        </>
    );
}

function Field({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.field}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    field: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: "gray",
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        color: "#000",
    },
});
