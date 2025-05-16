import "@/global.css";
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { RobotoSerif_400Regular, RobotoSerif_700Bold } from '@expo-google-fonts/roboto-serif';
import { router } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Score() {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        RobotoSerif_400Regular, 
        RobotoSerif_700Bold,
        Inter_400Regular, 
        Inter_700Bold
    });


    if (!fontsLoaded) {
        return null; // Ou <AppLoading />
    }

    const score ={
        level: 1,
        descricao: "Estrias brancas, com orientação transversa em relação às paredes intestinais. Até 5 lesões por cm",
        image: require('@/assets/images/maxima 1.png')
    }

    return (
        <>
        <View className="h-[105%]">
        <View className='z-10'>
            <View className='bg-[#FBFBFB] flex justify-center items-center pt-8 pb-4'>
                <View className='flex-row justify-start items-center w-[100%] pl-6'>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={require('@/assets/icons/ArrowBack.png')} style={{width: 24, height: 24}} resizeMode="contain"></Image>
                    </TouchableOpacity>
                    <Text className='text-center w-[60%] font-robotoBoldItalic text-[24px] ml-12'>
                        Score 1
                    </Text>
                </View>
            </View>

            <Image source={require('@/assets/images/Rectangle.png')} style={{width:"100%", height: 50}} resizeMode="stretch"/>
        </View>

        {/* Content */}
        <View className="bg-[#F2F2F7] -z-1 -top-[5%] px-2 flex justify-between h-[80%]">
            <ScrollView className='pt-[18%]'>
                <View className='w-[100%] px-4 mb-4'>
                    <Image source={score.image} style={{width: "100%", height: 200, borderRadius: 14}} resizeMode="cover"/>
                    <View className='absolute top-[80%] left-[93%]'>
                        <TouchableOpacity>
                            <Image source={require("@/assets/icons/Search-Circle.png")} style={{width: 30, height: 30}} resizeMode="contain"/>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Descrição Geral */}
                <View className='px-4'>
                    <View className='flex-row items-center m-1'>
                        <View className='w-[12px] h-[12px] border-[2px] border-[#DD5413]  rounded-full'></View>
                        <Text className='ml-2 text-[16px] font-roboto'>
                            {score.descricao}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
        </View>
        </>
    )
}