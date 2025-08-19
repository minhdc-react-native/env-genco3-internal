import { useTab } from '@/hooks/zustand/useTab';
import React from 'react';
import { BottomNavigation, useTheme } from 'react-native-paper';
import { BaseRoute } from 'react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation';
import EmployeeInfo from '.';
import ManageTraining from './manage-training';
import RegisterExams from './register-exams';

export default function TabLayout() {
  const index = useTab((state) => state.index);
  const setIndex = useTab((state) => state.setIndex);
  const { colors } = useTheme();
  const [routes] = React.useState<BaseRoute[]>([
    { key: 'index', title: 'Thông tin NV', focusedIcon: 'account-check', unfocusedIcon: 'account-check-outline', badge: '1' },
    { key: 'register-exams', title: 'Đăng ký đợt thi', focusedIcon: 'calendar-multiple' },
    { key: 'manage-training', title: 'Quản lý đào tạo', focusedIcon: 'book-open-page-variant', unfocusedIcon: 'book-open-page-variant-outline' }
  ]);
  const renderScene = BottomNavigation.SceneMap({
    index: EmployeeInfo,
    'register-exams': RegisterExams,
    'manage-training': ManageTraining
  });
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
