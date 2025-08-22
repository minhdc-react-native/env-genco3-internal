import { Field } from "@/components/Field";
import { StarRating } from "@/components/starRating";
import { useHelper } from "@/hooks/useHelper";
import { useData } from "@/hooks/zustand/useData";
import { router } from "expo-router";
import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Card, Divider, useTheme } from "react-native-paper";

export default function WorkProcessSalaryDetail() {
    const itemData = useData((state) => state.itemData);
    const { colors } = useTheme();
    const { formatDate } = useHelper();
    return (
        <View style={{ flex: 1, backgroundColor: colors.elevation.level1 }}>
            {/* Appbar */}
            <Appbar.Header>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title={`Ngạch ${itemData?.payrollCode}- Bậc ${itemData?.rank}`} />
            </Appbar.Header>
            <Divider />
            {/* Nội dung */}
            <ScrollView style={[styles.container]}>
                <Card style={{ padding: 20, backgroundColor: colors.background }}>
                    <Field label="Loại" value={`????`} />
                    <Field label="Ngày hưởng lương" value={formatDate(itemData?.effectiveDate, "dd/MM/yyyy HH:mm:ss", true)} />
                    <Field label="Ngạch lương" value={itemData?.payrollCode} />
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Field label="Bậc lương" value={`${itemData?.salaryPeriod}/${itemData?.rankScale}`} />
                        <StarRating value={itemData?.salaryPeriod ?? 0} max={itemData?.rankScale ?? 0} />
                    </View>
                    <Field label="Hệ số lương" value={itemData?.coefficient} />
                    <Field label="Có áp dụng" value={itemData?.apply ? 'Có' : 'Không'} />

                    <Field label="Ngày kết thúc hưởng lương" value={formatDate(itemData?.salaryEndDate, "dd/MM/yyyy HH:mm:ss", true)} />
                    <Field label="Thời gian đã hưởng" value={`???`} />
                    <Field label="Mốc tính nâng lương" value={`???`} />
                    <Field label="Thời gian nâng lương tiếp theo" value={formatDate(itemData?.nextPromotionDate, "dd/MM/yyyy HH:mm:ss", true)} />
                    <Field label="Quyết định số" value={itemData?.number} />
                    <Field label="Ngày ký" value={formatDate(itemData?.signedDate, "dd/MM/yyyy HH:mm:ss", true)} />
                    <Field label="File" value={itemData?.fileName} />
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
