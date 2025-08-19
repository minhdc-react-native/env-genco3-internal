import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Text } from "react-native-paper";

const ContestInfo = () => {
    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title="Thông tin dự thi" />
            </Appbar.Header>
            <Text style={styles.label}>....thông tin .....</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        color: "#666",
        marginTop: 12,
        marginBottom: 4,
        textAlign: "center"
    }
});

export default ContestInfo;
