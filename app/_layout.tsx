import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
         <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="light"/>
            <Stack screenOptions={{
              headerShown: false,
            }}/>
         </SafeAreaView>
     </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
