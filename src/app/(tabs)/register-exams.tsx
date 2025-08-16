import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import {
    Appbar,
    Button,
    Text
} from "react-native-paper";

const RegisterExams = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: "current", title: "Hiện Tại" },
        { key: "history", title: "Lịch Sử" },
    ]);

    const renderScene = ({ route }: any) => {
        switch (route.key) {
            case "current":
                return <CurrentTab />;
            case "history":
                return (
                    <View style={styles.center}>
                        <Text>Lịch sử các đợt thi</Text>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <Appbar.Header mode="center-aligned">
                <Appbar.Content title="Đăng Ký Bài Thi" />
                <Appbar.Action icon="help-circle-outline" onPress={() => { }} />
            </Appbar.Header>

            {/* Tabs */}
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={(props) => (
                    <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: "#00796B" }}
                        style={{ backgroundColor: "#fff" }}
                        inactiveColor="#555"
                        activeColor="#00796B"
                    />
                )}
            />
        </View>
    );
};

const CurrentTab = () => {
    return (
        <View style={styles.content}>
            {/* Illustration */}
            <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/942/942748.png" }}
                style={{ width: 120, height: 120, alignSelf: "center", marginVertical: 16 }}
            />

            {/* Title */}
            <Text style={styles.title}>Thi Nâng Bậc - Đợt 2/2025</Text>
            <Text style={styles.subtitle}>Đăng Ký Tham Gia</Text>

            {/* Description */}
            <Text style={styles.description}>
                Bạn nằm trong danh sách thi nâng bậc đợt tháng 9/2025, vui lòng xác nhận
                đăng ký tham gia trước thời hạn.
            </Text>

            {/* Time */}
            <View style={styles.timeRow}>
                <Appbar.Action icon="calendar" />
                <Text style={styles.timeText}>Thời Gian: 03/09/2025 - 05/09/2025</Text>
            </View>

            {/* Buttons */}
            <Button
                mode="contained"
                style={styles.primaryBtn}
                onPress={() => console.log("Đăng ký thi")}
            >
                Đăng Ký Thi
            </Button>
            <Button
                mode="text"
                textColor="red"
                onPress={() => console.log("Hoãn thi")}
            >
                Hoãn Thi?
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f9f9f9" },
    content: { flex: 1, padding: 16 },
    title: { fontSize: 18, fontWeight: "700", textAlign: "center", marginTop: 8 },
    subtitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#00796B",
        textAlign: "center",
        marginBottom: 12,
    },
    description: {
        fontSize: 14,
        textAlign: "center",
        color: "#555",
        marginHorizontal: 16,
        marginBottom: 16,
    },
    timeRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
    },
    timeText: { fontSize: 14, color: "#333" },
    primaryBtn: {
        borderRadius: 50,
        marginHorizontal: 32,
        paddingVertical: 6,
        backgroundColor: "#00796B",
    },
    center: { flex: 1, alignItems: "center", justifyContent: "center" },
});

export default RegisterExams;
