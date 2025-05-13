import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
         <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
             <StatusBar translucent backgroundColor="transparent" style="light" />
            <Stack screenOptions={{
                headerShown: false,
                animation:"none"
            }}/>
         </SafeAreaView>
     </SafeAreaProvider>
  );
}
