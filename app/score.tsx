import logoIcon from '@/assets/icons/Logo icon.png';
import "@/global.css";
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { RobotoSerif_400Regular, RobotoSerif_700Bold } from '@expo-google-fonts/roboto-serif';
import { router } from 'expo-router';
import { useState } from 'react';
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

    const [searchField, setSearchField] = useState<string>('');

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
        <View className="w-[210%] z-10 -left-[55%] bg-white -top-[30%] h-[50%] px-[55%] rounded-b-[50%]"
            style={{shadowColor: '#00000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.5,
                shadowRadius: 14,
                elevation: 10,
            }}>
            <View className="flex mt-[63%] w-[100%] justify-center pt-4 items-start">
                <Image source={logoIcon} style={{width: 150, height: 42}} resizeMode="cover"/>
            </View>

            <View className='flex justify-center items-center mt-4'>
                <View className='w-[90%] bg-[#1B5C9E] h-[1px]'></View>
            </View>
            
            <View className='flex justify-center items-center mt-5 h-[15%]'>
                <View className='flex-row justify-start items-center w-[100%] pl-6'>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={require('@/assets/icons/ArrowBack.png')} style={{width: 24, height: 24}} resizeMode="contain"></Image>
                    </TouchableOpacity>
                    <Text className='text-center w-[60%] font-robotoBold text-[24px] ml-12'>
                        Score {score.level}
                    </Text>
                </View>
            </View>
        </View>

        {/* Content */}
        <View className="bg-[#F2F2F7] -z-1 -top-[35%] px-2 flex justify-between h-[80%]">
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
                    <Text className='text-[16px] font-roboto'>
                        {score.descricao}
                    </Text>
                </View>
            </ScrollView>
        </View>

        <View className='bg-[#F2FBF4] w-[100%] absolute z-10 top-[93%] justify-between flex-row px-10'>
            <TouchableOpacity>
                <View className='flex justify-center items-center py-2'>
                    <Image source={require('@/assets/icons/Glossary icon.png')} style={{width: 50, height: 50}} resizeMode="contain"/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View className='flex justify-center items-center py-2'>
                    <Image source={require('@/assets/icons/Reference Icon.png')} style={{width: 50, height: 50}} resizeMode="contain"/>
                </View>
            </TouchableOpacity>
        </View>
        </>
    )
}