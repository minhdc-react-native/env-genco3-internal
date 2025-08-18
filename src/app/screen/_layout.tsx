import { theme } from '@/constants/Theme';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
    PaperProvider,
} from 'react-native-paper';
import 'react-native-reanimated';

export default function Layout() {
    return (
        <PaperProvider theme={theme}>
            <Stack>
                <Stack.Screen name="notifications" options={{ headerShown: false }} />
                <Stack.Screen name="notification-detail" options={{ headerShown: false }} />
                <Stack.Screen name="history-exams" options={{ headerShown: false }} />
                <Stack.Screen name='employee-profile' options={{ headerShown: false }} />
                <Stack.Screen name='exam-detail' options={{ headerShown: false }} />
                <Stack.Screen name='guide-exam' options={{ headerShown: false }} />
                <Stack.Screen name='employee-register-exam' options={{ headerShown: false }} />
                <Stack.Screen name='postpone-exam' options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
        </PaperProvider>
    );
}
