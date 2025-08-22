import { Field } from "@/components/Field";
import { StarRating } from "@/components/starRating";
import { useHelper } from "@/hooks/useHelper";
import { useData } from "@/hooks/zustand/useData";
import { router } from "expo-router";
import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Card, Divider, useTheme } from "react-native-paper";

export default function WorkProcessWorkerDetail() {
    const user = useData((state) => state.user);
    const { colors } = useTheme();
    const { formatDate } = useHelper();
    return (
        <View style={{ flex: 1, backgroundColor: colors.elevation.level1 }}>
            {/* Appbar */}
            <Appbar.Header>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title="Bậc 3/5" />
            </Appbar.Header>
            <Divider />
            {/* Nội dung */}
            <ScrollView style={[styles.container]}>
                <Card style={{ padding: 20, backgroundColor: colors.background }}>
                    <Field label="Ngày sinh" value={formatDate(user?.birthDate, "dd/MM/yyyy HH:mm:ss", true)} />
                    <Field label="Email" value={user?.email ?? ''} />
                    <Field label="Số điện thoại" value={user?.phone ?? ''} />
                    <Field label="Phòng ban" value={user?.departmentName ?? ''} />
                    <Field label="Tổ nhóm" value={user?.teamName ?? ''} />
                    <Field label="Chức vụ" value={user?.positionName ?? ''} />
                    <Field label="Chuyên môn" value={user?.positionName ?? ''} />

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Field label="Bậc hiện tại" value={`${user?.currentRank}/${user?.rankScale}`} />
                        <StarRating value={user?.currentRank ?? 0} max={user?.rankScale ?? 0} />
                    </View>
                    <Field label="Ngày vào đơn vị" value={formatDate(user?.dateOfJoining, "dd/MM/yyyy HH:mm:ss", true)} />
                    <Field label="Ngày vào đơn vị ký HĐLĐ" value={formatDate(user?.contractSignedDate, "dd/MM/yyyy HH:mm:ss", true)} />
                    <Field label="Hợp đồng lao động" value={user?.contract ?? ''} />
                    <Field label="Ngày Nghỉ hưu" value={formatDate(user?.retiredDate, "dd/MM/yyyy HH:mm:ss", true)} />
                </Card>
                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    }
});
