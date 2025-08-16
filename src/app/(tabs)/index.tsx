import { Image, StyleSheet, View } from "react-native";
import { Appbar, Avatar, Button, Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const EmployeeInfo = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Appbar.Header mode="center-aligned">
        <Image
          source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/5/5e/EVN_logo.png" }}
          style={{ width: 40, height: 40, resizeMode: "contain", marginLeft: 8 }}
        />
        <Appbar.Content title="" />
        <Appbar.Action icon="bell-outline" onPress={() => { }} />
        <Appbar.Action icon="cog-outline" onPress={() => { }} />
      </Appbar.Header>

      {/* Avatar + Name */}
      <View style={styles.profile}>
        <Avatar.Image
          size={80}
          source={{ uri: "https://i.pravatar.cc/150?img=3" }}
        />
        <Text style={styles.name}>Trần Việt Cường</Text>
      </View>

      {/* Info Cards */}
      <View style={styles.row}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="labelMedium">Chức danh</Text>
            <Text variant="bodyMedium">Công nhân Sửa chữa Tuabin</Text>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="labelMedium">Bậc thợ</Text>
            <Text variant="bodyMedium">6/7</Text>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.actions}>
        <Button mode="outlined" icon="chart-bar">
          Lịch sử nâng bậc
        </Button>
        <Button mode="text" icon="chevron-right">
          Chi Tiết
        </Button>
      </View>

      {/* Activity */}
      <Text style={styles.sectionTitle}>Hoạt Động</Text>
      <Card style={styles.activityCard}>
        <Card.Content>
          <Text variant="titleMedium">Thi Nâng Bậc - Đợt 2/2025</Text>
          <Text variant="bodyMedium" style={{ marginTop: 4 }}>
            Bạn chưa xác nhận tham gia thi. Vui lòng thực hiện xác nhận trước thời gian quy định.
          </Text>
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
}

export default EmployeeInfo;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  profile: { alignItems: "center", marginTop: 16 },
  name: { marginTop: 8, fontSize: 18, fontWeight: "600" },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  card: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: "#E6F4F1",
    borderRadius: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 12,
  },
  sectionTitle: {
    marginTop: 24,
    marginLeft: 16,
    fontWeight: "600",
    fontSize: 16,
  },
  activityCard: {
    margin: 16,
    borderRadius: 12,
    backgroundColor: "#f2f2f2",
  },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});