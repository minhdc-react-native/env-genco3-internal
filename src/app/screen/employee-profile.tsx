import { router } from "expo-router";
import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Text } from "react-native-paper";

export default function EmployeeProfile() {
    return (
        <>
            {/* Appbar */}
            <Appbar.Header>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title="Hồ sơ nhân viên" />
            </Appbar.Header>

            {/* Nội dung */}
            <ScrollView style={styles.container}>
                <Field label="Mã nhân viên" value="EPS-0072" />
                <Field label="Họ và tên" value="Trần Việt Cường" />
                <Field label="Chuyên môn" value="Sửa chữa Tuabin" />
                <Field label="Chức danh" value="Công nhân" />
                <Field label="Bậc hiện tại" value="6/7" />
                <Field label="Phân xưởng" value="I/PXSC CƠ-NHIỆT PHÚ MỸ" />
                <Field label="Thâm niên" value="20 năm 1 tháng" />
                <Field label="Bảng lương" value="A1.1.2" />
                <Field label="Hệ số lương hiện tại" value="3.971" />
                <Field label="Ngày hưởng lương" value="01/07/2024" />
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
        backgroundColor: "#f5f9f8",
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
