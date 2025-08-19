import { router } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Appbar, List, useTheme } from "react-native-paper";

const topics = [
    { id: "DT-001", title: "Lập hồ sơ chuẩn bị và chỉ huy thực hiện công tác gia công trục, ống lót bộ phân ly, NMNĐ Vĩnh Tân 2" },
    { id: "DT-002", title: "Lập phương thuật đại tu bộ Debris Filter ST14 PM1" },
    { id: "DT-003", title: "Lập phương án kỹ thuật hàn phục hồi vỏ bơm chân không 1B, NMNĐ Mông Dương 1" },
    { id: "DT-004", title: "Lập hồ sơ chuẩn bị và chỉ huy trực tiếp công tác thay thế xích cào SDCC tổ máy S2 - Nhà máy Nhiệt điện Vĩnh Tân 4" },
    { id: "DT-005", title: "Nghiên cứu tối ưu quy trình súc rửa lò hơi số 2, NMNĐ Vĩnh Tân 4" },
    { id: "DT-006", title: "Lập phương án sửa chữa hệ thống băng tải than, NMNĐ Duyên Hải 1" },
    { id: "DT-007", title: "Thử nghiệm và hiệu chỉnh hệ thống đo lường nhiệt độ tuabin cao áp, NMNĐ Quảng Ninh" },
    { id: "DT-008", title: "Đề tài nghiên cứu cải tiến công nghệ xử lý tro bay cho lò hơi tầng sôi, NMNĐ Cẩm Phả" },
    { id: "DT-009", title: "Lập quy trình bảo dưỡng định kỳ cho máy nghiền than số 3, NMNĐ Mông Dương 2" },
    { id: "DT-010", title: "Đánh giá hiệu quả kinh tế - kỹ thuật khi thay thế vật liệu chịu lửa buồng đốt lò hơi, NMNĐ Vĩnh Tân 2" },
    { id: "DT-011", title: "Lập hồ sơ kỹ thuật và giám sát lắp đặt bơm nước tuần hoàn, NMNĐ Duyên Hải 3" },
    { id: "DT-012", title: "Đề xuất giải pháp cải tiến hệ thống khử lưu huỳnh (FGD), NMNĐ Vĩnh Tân 4" },
    { id: "DT-013", title: "Lập phương án thử tải máy phát điện số 1, NMNĐ Quảng Ninh" },
    { id: "DT-014", title: "Nghiên cứu ứng dụng công nghệ IoT trong giám sát độ rung tuabin, NMNĐ Mông Dương 1" },
    { id: "DT-015", title: "Xây dựng kế hoạch bảo dưỡng lớn định kỳ tổ máy S2, NMNĐ Vĩnh Tân 4" },
    { id: "DT-016", title: "Thí nghiệm hiệu chỉnh hệ thống điều khiển khói bụi ESP, NMNĐ Duyên Hải 1" },
];

const RegisterTopic = () => {
    const { colors } = useTheme();
    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title="Chọn Đề Tài" />
            </Appbar.Header>

            <FlatList
                data={topics}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <List.Item
                        title={item.id}
                        description={item.title}
                        descriptionNumberOfLines={2}
                        onPress={() => router.replace({
                            pathname: "/screen/register-topic-detail",
                            params: { sTopic: JSON.stringify(item) }
                        })}
                        style={[styles.listItem, { backgroundColor: colors.background }]}
                    />
                )}
                ListFooterComponent={<View style={{ height: 100 }} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    listItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
});

export default RegisterTopic;
