import { useTab } from '@/hooks/zustand/useTab';
import { epsStorage } from '@/utils/epsStorage';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Appbar, Avatar, Badge, Button, Card, Divider, Icon, Text, useTheme } from "react-native-paper";
const { clearTokens } = epsStorage();
const EmployeeInfo = () => {
  const { colors } = useTheme();
  const setIndex = useTab((state) => state.setIndex);
  const logout = async () => {
    await clearTokens();
    router.replace("/(auth)/login");
  }
  return (
    <>
      {/* Header */}
      <Appbar.Header mode="center-aligned">
        <Image
          source={require("@/assets/images/splash-icon.png")}
          style={{ width: 80, height: 80, resizeMode: "contain", marginLeft: 20 }}
        />
        <Appbar.Content title="" />
        <View style={{ flexDirection: "row" }}>
          <Appbar.Action icon="bell-outline" onPress={() => router.navigate("/screen/notifications")} />
          <Badge size={8} style={{ position: "absolute", top: 10, right: 10 }} />
        </View>

        <Appbar.Action icon="logout" onPress={logout} />
      </Appbar.Header>

      {/* Avatar + Name */}
      <View style={[styles.profile]}>
        <View style={[{ borderWidth: 5, borderRadius: 150, borderColor: colors.primary }]}>
          <Avatar.Image
            size={150}
            source={{ uri: "http://125.212.225.203:7024/media/avatars/300-2.png" }}
          />
        </View>
        <Text style={styles.name}>Trần Việt Cường</Text>
      </View>

      {/* Info Cards */}
      <View style={styles.row}>
        <Card style={{ backgroundColor: colors.surfaceVariant }}>
          <Card.Content>
            <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
              <Avatar.Icon icon={"account"} style={{ backgroundColor: colors.background }} color={colors.primary} size={24} />
              <Text variant="titleSmall">Chức danh</Text>
            </View>
            <Text variant="bodyMedium">Công nhân Sửa chữa Tuabin</Text>
          </Card.Content>
        </Card>
        <Card style={{ backgroundColor: colors.surfaceVariant }}>
          <Card.Content>
            <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
              <Avatar.Icon icon={"star"} style={{ backgroundColor: colors.background }} color={colors.primary} size={24} />
              <Text variant="titleSmall">Bậc thợ</Text>
            </View>
            <Text variant="bodyMedium">6/7</Text>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.actions}>
        <Button mode="outlined" icon="chart-bar" onPress={() => router.navigate("/screen/history-exams")}>
          Lịch sử nâng bậc
        </Button>
        <Button mode="text" icon="arrow-right" contentStyle={{ flexDirection: "row-reverse" }} onPress={() => router.navigate("/screen/employee-profile")}>
          Chi Tiết
        </Button>
      </View>
      <Divider />
      {/* Activity */}
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center", paddingHorizontal: 15, marginTop: 10 }}>
        <Icon source={"timer"} size={24} color={colors.primary} />
        <Text variant="titleMedium">Hoạt Động</Text>
      </View>
      <Card style={styles.activityCard}>
        <Card.Content style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <Pressable style={(pressed) => [{ opacity: pressed ? 0.7 : 1, flexDirection: "row", alignItems: "center", paddingRight: 10 }]}
            onPress={() => setIndex(1)}
          >
            <View>
              <Text variant="titleMedium">Thi Nâng Bậc - Đợt 2/2025</Text>
              <Text variant="bodyMedium" style={{ marginTop: 4 }}>
                Bạn chưa xác nhận tham gia thi. Vui lòng thực hiện xác nhận trước thời gian quy định.
              </Text>
            </View>
            <Icon source={() => <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />} size={24} />
          </Pressable>
        </Card.Content>
      </Card>
    </>
  );
}

export default EmployeeInfo;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  profile: { alignItems: "center", marginTop: 16 },
  name: { marginTop: 8, fontSize: 18, fontWeight: "600" },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginVertical: 20,
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