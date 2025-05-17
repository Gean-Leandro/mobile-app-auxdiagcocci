import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
         <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="light" backgroundColor="#235DFF"/>
            <Tabs screenOptions={{
                  tabBarStyle: {
                    backgroundColor:'#F2FBF4',
                  },
                  tabBarLabelStyle: {
                    fontSize: 15,
                    fontFamily: 'roboto'
                  }
              }}>
              
              <Tabs.Screen name='index'
                options={{
                  tabBarStyle: { display: 'none' },
                  headerShown: false,
                  href:null
                }}/>


              <Tabs.Screen name='home' options={{
                  title:"Inicio", 
                  headerShown: false,
                  tabBarIcon: ({ focused }) => {
                    if(focused){
                      return(
                        <Image source={require('@/assets/icons/homeIcon.png')} style={{height: 25, width: 25}} resizeMode="contain"/>
                      ) 
                    } else {
                      return(
                        <Image source={require('@/assets/icons/homeIconUnSelected.png')} style={{height: 25, width: 25}} resizeMode="contain"/>
                      ) 
                    }
                    },
                }}/>
              <Tabs.Screen name='glossary' options={{
                  title:"Glossário",
                  headerShown: false,
                  tabBarIcon: ({ focused }) => {
                      if(focused){
                        return(
                          <Image source={require('@/assets/icons/GlossaryIconLineBlu.png')} style={{height: 25, width: 25}} resizeMode="contain"/>
                        ) 
                      } else {
                        return(
                          <Image source={require('@/assets/icons/GlossaryIconLine.png')} style={{height: 25, width: 25}} resizeMode="contain"/>
                        ) 
                      }
                    },
                }}/>
              <Tabs.Screen name='references' options={{
                  title:"Refrência",
                  headerShown: false,
                  tabBarIcon: ({ focused }) => {
                    if(focused){
                      return(
                        <Image source={require('@/assets/icons/ReferecesIconBarOnSelected.png')} style={{height: 25, width: 25}} resizeMode="contain"/>
                      ) 
                    } else {
                      return(
                        <Image source={require('@/assets/icons/ReferecesIconBar.png')} style={{height: 25, width: 25}} resizeMode="contain"/>
                      ) 
                    }
                  },
                }}/>
              <Tabs.Screen name='specie'
                options={{
                  headerShown: false,
                  href:null
                }}/>
              <Tabs.Screen name='score'
                options={{
                  headerShown: false,
                  href:null
                }}/>
              
            </Tabs>
            
         </SafeAreaView>
     </SafeAreaProvider>
  );
}
