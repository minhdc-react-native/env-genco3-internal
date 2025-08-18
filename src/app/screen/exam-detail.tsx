import { router } from 'expo-router';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Card, Icon, Text, useTheme } from 'react-native-paper';

export default function ExamDetail() {
    const { colors } = useTheme();
    return (
        <View style={{ flex: 1, backgroundColor: '#F5FAFA' }}>
            {/* Appbar */}
            <Appbar.Header>
                <Appbar.BackAction onPress={() => router.back()} />
                {/* <Appbar.Content title="Chi tiết kỳ thi" /> */}
            </Appbar.Header>
            <Text variant="titleLarge" style={{ fontWeight: '600', marginBottom: 4, marginHorizontal: 20 }}>
                Thi giữ bậc - T3/2024
            </Text>
            <ScrollView contentContainerStyle={{ padding: 16 }} stickyHeaderIndices={[2]}>
                {/* Tiêu đề kỳ thi */}
                <Text variant="bodyMedium" style={{ color: 'gray', marginBottom: 16 }}>
                    Ngày thi: 05/04/2024
                </Text>

                {/* Box kết quả */}
                <View style={styles.resultRow}>
                    <Card style={styles.resultCard}>
                        <Card.Content style={{ alignItems: 'center' }}>
                            <Text style={styles.resultLabel}>Điểm TB</Text>
                            <Text style={styles.resultValue}>7.5</Text>
                        </Card.Content>
                    </Card>
                    <Card style={styles.resultCard}>
                        <Card.Content style={{ alignItems: 'center' }}>
                            <Text style={styles.resultLabel}>Kết quả</Text>
                            <Text style={[styles.resultValue, { color: 'green' }]}>Đạt</Text>
                        </Card.Content>
                    </Card>
                </View>

                {/* Chi tiết */}
                <View>
                    <View style={[styles.sectionHeader, { backgroundColor: colors.background, paddingHorizontal: 10 }]}>
                        <Icon source={"format-list-text"} size={24} color={colors.primary} />
                        <Text style={styles.sectionTitle}>Chi tiết</Text>
                    </View>
                </View>
                {/* Thông tin chi tiết */}
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Họ và tên</Text>
                    <Text style={styles.value}>Trần Việt Cường</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Mã nhân viên</Text>
                    <Text style={styles.value}>EPS-0072</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Chức danh</Text>
                    <Text style={styles.value}>Công nhân Sửa chữa Tuabin</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Phân xưởng</Text>
                    <Text style={styles.value}>I/PXSC CƠ-NHIỆT PHÚ MỸ</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Bậc thợ hiện tại</Text>
                    <Text style={styles.value}>6/7</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Bậc thợ thi</Text>
                    <Text style={styles.value}>6/7</Text>
                </View>
                {/* Thông tin chi tiết */}
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Họ và tên</Text>
                    <Text style={styles.value}>Trần Việt Cường</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Mã nhân viên</Text>
                    <Text style={styles.value}>EPS-0072</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Chức danh</Text>
                    <Text style={styles.value}>Công nhân Sửa chữa Tuabin</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Phân xưởng</Text>
                    <Text style={styles.value}>I/PXSC CƠ-NHIỆT PHÚ MỸ</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Bậc thợ hiện tại</Text>
                    <Text style={styles.value}>6/7</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Bậc thợ thi</Text>
                    <Text style={styles.value}>6/7</Text>
                </View>
                {/* Thông tin chi tiết */}
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Họ và tên</Text>
                    <Text style={styles.value}>Trần Việt Cường</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Mã nhân viên</Text>
                    <Text style={styles.value}>EPS-0072</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Chức danh</Text>
                    <Text style={styles.value}>Công nhân Sửa chữa Tuabin</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Phân xưởng</Text>
                    <Text style={styles.value}>I/PXSC CƠ-NHIỆT PHÚ MỸ</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Bậc thợ hiện tại</Text>
                    <Text style={styles.value}>6/7</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Bậc thợ thi</Text>
                    <Text style={styles.value}>6/7</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    resultRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    resultCard: {
        flex: 1,
        marginHorizontal: 4,
        backgroundColor: '#EDEFEF',
        borderRadius: 12,
    },
    resultLabel: {
        color: 'gray',
        fontWeight: '500',
        marginBottom: 4,
    },
    resultValue: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
        paddingBottom: 4,
        gap: 10
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    infoRow: {
        marginBottom: 16,
    },
    label: {
        fontSize: 13,
        color: 'gray',
        marginBottom: 2,
    },
    value: {
        fontSize: 15,
        fontWeight: '500',
        color: '#222',
    },
});
