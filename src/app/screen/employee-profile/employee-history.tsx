import { Field } from "@/components/Field";
import { useHelper } from "@/hooks/useHelper";
import { useData } from "@/hooks/zustand/useData";
import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, useTheme } from "react-native-paper";

export default function EmployeeHistory() {
    const user = useData((state) => state.user);
    const { colors } = useTheme();
    const { formatDate } = useHelper();
    return (
        <View style={{ flex: 1, backgroundColor: colors.elevation.level1 }}>
            <ScrollView style={[styles.container]}>
                <Card style={{ padding: 20, backgroundColor: colors.background }}>
                    <Field label="Lịch sử công tác" value={'???'} />
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
