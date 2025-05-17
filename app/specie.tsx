import "@/global.css";
import { eimeriaProps, EimeriaService } from "@/services/eimeriaService";
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Roboto_400Regular, Roboto_700Bold, Roboto_700Bold_Italic, useFonts } from '@expo-google-fonts/roboto';
import { RobotoSerif_400Regular, RobotoSerif_700Bold } from '@expo-google-fonts/roboto-serif';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Specie() {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        Roboto_700Bold_Italic,
        RobotoSerif_400Regular, 
        RobotoSerif_700Bold,
        Inter_400Regular, 
        Inter_700Bold
    });

    const { id } = useLocalSearchParams();

    const [eimeria, setEimeria] = useState<eimeriaProps|null>(null);

    useEffect(() => {
        const fetchEimerias = async () => {
            let query = null

            if (typeof(id) === "string"){
                try {
                    query = await EimeriaService.getEimeria(id);
                    setEimeria(query);
                } catch (error) {
                    console.log(error);
                }
            }
        }

        fetchEimerias();
    }, [id]);

    if (!fontsLoaded) {
        return null; // Ou <AppLoading />
    }

    
    let gradienteHeight = 123;

    if ((eimeria?.score) && (eimeria.score.length > 0)){
        gradienteHeight = eimeria?.score.length * (123 + 11)
    }

    return (
        <>
        <View className="h-[105%]">
        <View className='z-10'>

            <View className='bg-[#FBFBFB] flex justify-center items-center pt-8 pb-4'>
                <View className='flex-row justify-start items-center w-[100%] pl-6'>
                    <TouchableOpacity onPress={() => router.replace('/home')}>
                        <Image source={require('@/assets/icons/ArrowBack.png')} style={{width: 24, height: 24}} resizeMode="contain"></Image>
                    </TouchableOpacity>
                    <Text className='text-center w-[60%] font-robotoBoldItalic text-[24px] ml-12'>
                        Eimeria <Text className="font-robotoBoldItalic text-[24px] lowercase">{eimeria?.name}</Text>
                    </Text>
                </View>
            </View>

            <Image source={require('@/assets/images/Rectangle.png')} style={{width:"100%", height: 50}} resizeMode="stretch"/>
        </View>

        {/* Content */}
        <View className="bg-[#F2F2F7] -z-1 -top-[5%] px-2 flex justify-between h-[89%]">
            <ScrollView className='pt-[18%]'>
                {(eimeria?.score) && (eimeria.score.length > 0) && (eimeria.score[0].img !== "") ?
                    <View className='w-[100%] px-4 mb-4'>
                        <Image src={eimeria.score[0].img} style={{width: "100%", height: 200, borderRadius: 14}} resizeMode="cover"/>
                    </View>:
                <></>
                }

                {/* Descrição Geral */}
                <View className='px-4'>
                    <View className='flex-row justify-between items-center mb-4'>
                        <Text className='font-robotoBold text-[18px]'>Descrição Geral</Text>
                        <View className='bg-[#2CAFD3] h-[1px] w-[65%]'></View>
                    </View>
                    <View>
                        <Text className='text-[16px] font-roboto'>
                            {eimeria?.general_description}
                        </Text>
                    </View>
                </View>

                {/* Local de ação */}
                <View className='px-4 mt-6'>
                    <View className='flex-row justify-between items-center mb-4'>
                        <Text className='font-robotoBold text-[18px]'>Local de ação</Text>
                        <View className='bg-[#2CAFD3] h-[1px] w-[65%]'></View>
                    </View>

                    <View className='flex-row w-[100%]'>
                        <View className='w-[50%]'>
                            <Image src={eimeria?.imgLocal} style={{width: "100%", height: 176}} resizeMode="contain"/>
                        </View>
                        <Text className='text-[16px] w-[50%] font-roboto'>
                            {eimeria?.place_of_action}
                        </Text>
                    </View>
                </View>
                
                {/* Sinais clínicos */}
                <View className='px-4 mt-6'>
                    <View className='flex-row justify-between items-center mb-4'>
                        <Text className='font-robotoBold text-[18px]'>Sinais clínicos</Text>
                        <View className='bg-[#2CAFD3] h-[1px] w-[65%]'></View>
                    </View>
                    <View>
                        {eimeria?.clinical_signs.map((item, index) => (
                            <View key={index} className='flex-row items-center m-1'>
                                <View className='w-[12px] h-[12px] border-[2px] border-[#DD5413]  rounded-full'></View>
                                <Text className='ml-2 text-[16px] font-roboto'>
                                    {item}
                                </Text>
                            </View>))
                        }
                    </View>
                </View>
                
                {/* Score*/}

                {(eimeria?.score) && (eimeria.score.length > 0)  && 
                
                    <View className='px-4 mt-6 mb-[30%]'>
                        <View className='flex-row justify-between items-center mb-4'>
                            <Text className='font-robotoBold text-[18px]'>Scores</Text>
                            <View className='bg-[#2CAFD3] h-[1px] w-[65%]'></View>
                        </View>
                        
                        <Text className='font-roboto text-[16px] mb-4'>Score é uma nota ou grau (geralmente de 0 a 4) atribuída a uma 
                            lesão observada na necropsia de aves, permitindo avaliar a severidade 
                            da infecção por Eimeria com base em critérios visuais
                        </Text>

                        
                        <View className="w-[100%] flex-row px-5">
                            <View className={`w-5 rounded-[10px] items-center`} 
                                style={{
                                    width: 16,
                                    height: gradienteHeight,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: '#8A8A8A', 
                                    overflow: 'hidden'}}>

                                <LinearGradient
                                colors={["#FFF1BB", "#E7810C", "#CB0000"]} // Amarelo para Laranja
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{ width: 16, height: gradienteHeight, borderRadius:10}}
                                />
                            </View>
                            {/* Imagens do score */}
                            <View className="w-[90%]">

                                {eimeria.score.map((score, index) => 
                                    <View key={index} className="flex-row w-[100%] mb-[15px]">
                                        <View className="w-[10%] mr-3 justify-center items-center">
                                            <Text className="text-[20px] font-roboto font-bold">{score.level}</Text>
                                        </View>

                                        {score.img !== "" ?
                                            <View className="w-[80%] mr-4 justify-center items-center">
                                                <Image src={score.img} 
                                                    style={{
                                                        width:255, 
                                                        height:123,
                                                        borderRadius: 10,
                                                        borderWidth: 1,
                                                        borderColor: '#8A8A8A', 
                                                        overflow: 'hidden'}}/>
                                            </View>:

                                            <View className="w-[80%] h-[123px] rounded-lg mr-4 justify-center items-center border border-black">
                                                <Text className="text-[16px] text-center px-4 font-roboto font-bold">
                                                    Não há imagem disponível para esta seção
                                                </Text>
                                            </View>
                                        }

                                        <View className="w-[10%] justify-center items-end">
                                            <TouchableOpacity onPress={() => router.navigate({pathname:'/score', params: {id: eimeria.id, index: index}})}>
                                                <Image source={require('@/assets/icons/search icon.png')} style={{width:25, height:25}}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                }
            </ScrollView>
        </View>
        
        </View>
        </>
    )
}