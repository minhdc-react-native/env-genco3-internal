import LoadingScreen from '@/components/loading-screen';
import { StarRating } from '@/components/starRating';
import { EXAM_STATUS } from '@/constants/EpsData';
import { useAuth } from '@/hooks/useAuth';
import { useData } from '@/hooks/zustand/useData';
import { useTab } from '@/hooks/zustand/useTab';
import { api } from '@/utils/epsApi';
import { AntDesign } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Appbar, Avatar, Badge, Button, Card, Divider, Icon, Text, useTheme } from "react-native-paper";
const sizeLogo = { width: 874, height: 537 }
const EmployeeInfo = () => {
  const { colors } = useTheme();
  const setIndex = useTab((state) => state.setIndex);
  const user = useData((state) => state.user);
  const [loading, setLoading] = useState(false);
  const currentExam = useData((state) => state.currentExam);
  const setCurrentExam = useData((state) => state.setCurrentExam);
  const { logout } = useAuth();

  const onGetCurrentExam = useCallback(() => {
    api.get({
      link: `/exams/employee/${user?.id}/exam-periods`,
      callBack: (res) => {
        if (res && res.returnData) {
          const dataExams: any[] = res.returnData;
          const exam = dataExams.find(item => item.employeeExamPeriod.status === EXAM_STATUS.REGISTRATION);
          setCurrentExam(exam ? exam : null);
        }
      },
      setLoading: setLoading
    })
  }, [user?.id, setLoading])

  useFocusEffect(
    useCallback(() => {
      onGetCurrentExam();
    }, [onGetCurrentExam])
  )

  return (
    <>
      {/* Header */}
      <Appbar.Header mode="center-aligned">
        <Image
          source={require("@/assets/images/splash-icon.png")}
          style={{ width: 1 / 10 * sizeLogo.width, height: 1 / 10 * sizeLogo.height, resizeMode: "cover", marginLeft: 20 }}
        />
        <Appbar.Content title="" />
        <View style={{ flexDirection: "row" }}>
          <Appbar.Action icon="bell-outline" onPress={() => router.navigate("/screen/notifications")} />
          {currentExam && <Badge size={15} style={{ position: "absolute", top: 10, right: 10 }} >1</Badge>}
        </View>
        <Appbar.Action icon={() => <AntDesign name="logout" size={24} color={colors.primary} />} onPress={logout} />
      </Appbar.Header>

      {/* Avatar + Name */}
      <View style={[styles.profile]}>
        <View style={[{ borderWidth: 5, borderRadius: 150, borderColor: colors.primary }]}>
          <Avatar.Image
            size={200}
            source={{ uri: user?.imageUrl || "http://125.212.225.203:7024/media/avatars/300-2.png" }}
          />
        </View>
        <Text variant='titleMedium' style={{ fontWeight: "bold" }}>{user?.code}</Text>
        <Text variant='titleMedium' style={{ color: colors.secondary }}>{user?.fullName}</Text>
      </View>

      {/* Info Cards */}
      <View style={styles.row}>
        <Card style={{ backgroundColor: colors.elevation.level2, flex: 1 }}>
          <Card.Content>
            <View style={{ flexDirection: "row", gap: 10, alignItems: "center", marginBottom: 10 }}>
              <Avatar.Icon icon={"account"} style={{ backgroundColor: colors.background }} color={colors.primary} size={24} />
              <Text variant="titleSmall">Chức danh</Text>
            </View>
            <Text variant="bodyMedium" style={{ fontWeight: "bold", color: colors.onErrorContainer }}>{user?.positionName}</Text>
          </Card.Content>
        </Card>
        <Card style={{ backgroundColor: colors.elevation.level2 }}>
          <Card.Content>
            <View style={{ flexDirection: "row", gap: 10, alignItems: "center", marginBottom: 10 }}>
              <Avatar.Icon icon={"star"} style={{ backgroundColor: colors.background }} color={colors.primary} size={24} />
              <Text variant="titleSmall">Bậc thợ <Text style={{ fontWeight: "bold", color: colors.onErrorContainer }}>{`${user?.currentRank}/${user?.rankScale}`}</Text></Text>
            </View>
            <StarRating value={user?.currentRank ?? 0} max={user?.rankScale} />
          </Card.Content>
        </Card>
      </View>

      <View style={styles.actions}>
        <Button mode="outlined" icon="chart-bar" onPress={() => router.navigate("/screen/work-process")}>
          Quá trình công tác
        </Button>
        <Button mode="text" icon="arrow-right" contentStyle={{ flexDirection: "row-reverse" }} onPress={() => router.navigate("/screen/employee-profile")}>
          Chi tiết hồ sơ
        </Button>
      </View>
      <Divider />
      {/* Activity */}
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center", paddingHorizontal: 15, marginTop: 10 }}>
        <Icon source={"timer"} size={24} color={colors.primary} />
        <Text variant="titleMedium">Hoạt Động</Text>
      </View>
      {loading ? <LoadingScreen /> : <Card style={styles.activityCard}>
        <Card.Content style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1, flexDirection: "row", alignItems: "center", paddingRight: 10 }]}
            onPress={() => setIndex(1)}
          >
            {currentExam ? <View>
              <Text variant="titleMedium" style={{ fontWeight: "bold" }}>{`${currentExam?.employeeExamPeriod?.examType?.name} (${currentExam?.employeeExamPeriod?.name})`}</Text>
              <Text variant="bodyMedium" style={{ marginTop: 4 }}>
                Bạn chưa xác nhận tham gia thi. Vui lòng thực hiện xác nhận trước thời gian quy định.
              </Text>
            </View> : <Text style={{ flex: 1 }}>
              Bạn không có thông tin kỳ thi nào!
            </Text>}
            <Icon source={() => <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />} size={24} />
          </Pressable>
        </Card.Content>
      </Card>}
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
    marginHorizontal: 20
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