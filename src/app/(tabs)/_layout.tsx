import { useTab } from '@/hooks/zustand/useTab';
import React from 'react';
import { BottomNavigation } from 'react-native-paper';
import EmployeeInfo from '.';
import ManageTraining from './manage-training';
import RegisterExams from './register-exams';

export default function TabLayout() {
  const index = useTab((state) => state.index);
  const setIndex = useTab((state) => state.setIndex);

  const [routes] = React.useState([
    { key: 'index', title: 'Thông tin NV', focusedIcon: 'account-check', unfocusedIcon: 'account-check-outline' },
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
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
