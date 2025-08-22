import { router } from "expo-router";
import * as React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { Appbar, Button, Chip, Divider, IconButton, Modal, Portal, Searchbar, Text, useTheme } from "react-native-paper";

const notifications = [
    {
        id: "1",
        title: "Mở đăng ký thi nâng bậc đợt 2/2025",
        description: "Xin chào, chúng tôi đã mở",
        date: "10:32",
        file: "DanhSachThamGia",
    },
    {
        id: "2",
        title: "Kết quả thi giữ bậc T3/2024",
        description: "Description",
        date: "15/05/2024",
        file: "KetQuaNangBac_03/2024",
    },
    {
        id: "3",
        title: "Đăng ký đào tạo thi giữ bậc T3/2024",
        description: "Description",
        date: "03/04/2024",
        file: "DanhSachDeTai",
    },
    {
        id: "4",
        title: "Đăng ký đề tài thi giữ bậc T3/2024",
        description: "Description",
        date: "25/03/2024",
        file: "DanhSachDeTai",
    },
];
const filters = {
    topic: [
        { id: 'topic1', value: 'Thi nâng bậc' }, { id: 'topic2', value: 'Thi giữ bậc' },
        { id: 'topic3', value: 'Thi KTSHN' }, { id: 'topic4', value: 'Nâng lương' }, { id: 'topic5', value: 'Khác' }
    ],
    time: [
        { id: 'time1', value: 'Tất cả' }, { id: 'time2', value: '7 ngày' },
        { id: 'time3', value: '14 ngày' }, { id: 'time4', value: '30 ngày' }
    ]
}
export default function NotificationScreen() {
    const theme = useTheme();
    const [visible, setVisible] = React.useState(false);
    const { colors } = useTheme();
    const showFilter = () => setVisible(true);
    const hideFilter = () => setVisible(false);
    const [filerSelect, setFilterSelect] = React.useState<string[]>(['topic1', 'topic2', 'time1']);
    const onPresFilterItem = (item: any) => {
        if (filerSelect.includes(item.id)) {
            setFilterSelect((prev => prev.filter((f) => f !== item.id)));
        } else {
            setFilterSelect(prev => ([...prev, item.id]));
        }
    }
    const [searchQuery, setSearchQuery] = React.useState("");

    const filtered = notifications.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderItem = ({ item }: { item: typeof notifications[0] }) => (
        <Pressable
            style={({ pressed }) => [{
                opacity: pressed ? 0.7 : 1,
                paddingVertical: 12,
                borderBottomWidth: 0.5,
                borderBottomColor: theme.colors.outlineVariant,
            }]}
            onPress={() => router.replace("/screen/notification-detail")}
        >
            {/* Header row */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                }}
            >
                <Text variant="titleMedium" style={{ flex: 1, fontWeight: "600" }}>
                    {item.title}
                </Text>
                <Text variant="bodySmall" style={{ marginLeft: 8, color: theme.colors.onSurfaceVariant }}>
                    {item.date}
                </Text>
            </View>

            {/* Description */}
            <Text variant="bodyMedium" style={{ marginTop: 2, color: theme.colors.onSurfaceVariant }}>
                {item.description}
            </Text>

            {/* File chip */}
            {item.file && (
                <Button
                    mode="outlined"
                    icon="file-document-outline"
                    style={{ alignSelf: "flex-start", marginTop: 6 }}
                >
                    {item.file}
                </Button>
            )}
        </Pressable>
    );

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            {/* Appbar */}
            <Appbar.Header mode="center-aligned">
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title="Thông báo" />
            </Appbar.Header>

            <View style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
                <Searchbar
                    placeholder="Tìm nội dung"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={{ margin: 10, borderRadius: 20, flex: 1, backgroundColor: colors.elevation.level1, borderWidth: 0.2, borderColor: colors.backdrop }}
                />
                <Appbar.Action icon="filter-variant" onPress={showFilter} />
            </View>


            {/* List */}
            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingHorizontal: 12 }}
            />

            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={hideFilter}
                    contentContainerStyle={styles.modal}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={[styles.title, { flex: 1 }]}>Bộ lọc</Text>
                        <IconButton icon={"close"} onPress={hideFilter} />
                    </View>
                    <Divider style={{ marginBottom: 20 }} />
                    <Text>Chủ đề</Text>
                    <View style={styles.row}>
                        {filters.topic.map((f, idx) =>
                            <Chip key={f.id} mode={filerSelect.includes(f.id) ? 'flat' : 'outlined'} selected={filerSelect.includes(f.id)} onPress={() => onPresFilterItem(f)}>
                                {f.value}
                            </Chip>)}
                    </View>

                    <Text style={{ marginTop: 16 }}>Khoảng thời gian</Text>
                    <View style={styles.row}>
                        {filters.time.map((f, idx) =>
                            <Chip key={f.id} mode={filerSelect.includes(f.id) ? 'flat' : 'outlined'} selected={filerSelect.includes(f.id)} onPress={() => onPresFilterItem(f)}>
                                {f.value}
                            </Chip>)}
                    </View>
                </Modal>
            </Portal>
        </View>
    );
}


const styles = StyleSheet.create({
    modal: {
        backgroundColor: "white",
        padding: 20,
        margin: 20,
        borderRadius: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 8,
    },
});