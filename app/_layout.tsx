import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
         <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="light" backgroundColor="#235DFF"/>
            <Stack screenOptions={{
              headerShown: false, // você pode mudar isso por tela
            }}/>
         </SafeAreaView>
     </SafeAreaProvider>
  );
}
