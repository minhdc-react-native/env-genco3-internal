import LoadingScreen from '@/components/loading-screen';
import { useData } from '@/hooks/zustand/useData';
import { useTab } from '@/hooks/zustand/useTab';
import React, { useEffect } from 'react';
import { BottomNavigation, useTheme } from 'react-native-paper';
import { BaseRoute } from 'react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation';
import EmployeeInfo from '.';
import ManageTraining from './manage-training';
import RegisterExams from './register-exams';
const routerBase = [
  { key: 'index', title: 'Thông tin NV', focusedIcon: 'account-check', unfocusedIcon: 'account-check-outline' },
  { key: 'register-exams', title: 'Đăng ký đợt thi', focusedIcon: 'calendar-multiple' },
  { key: 'manage-training', title: 'Quản lý đào tạo', focusedIcon: 'book-open-page-variant', unfocusedIcon: 'book-open-page-variant-outline' }
];
export default function TabLayout() {
  const index = useTab((state) => state.index);
  const setIndex = useTab((state) => state.setIndex);
  const currentExam = useData((state) => state.currentExam);
  const { colors } = useTheme();
  const [routes, setRouters] = React.useState<BaseRoute[]>([]);

  const renderScene = BottomNavigation.SceneMap({
    index: EmployeeInfo,
    'register-exams': RegisterExams,
    'manage-training': ManageTraining
  });

  useEffect(() => {
    setRouters(routerBase.map(el =>
      el.key === 'index'
        ? { ...el, badge: currentExam ? '1' : undefined }
        : el
    ));
  }, [currentExam]);

  if (routes.length === 0) {
    return <LoadingScreen />
  }
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      activeIndicatorStyle={{
        backgroundColor: colors.elevation.level5
      }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
