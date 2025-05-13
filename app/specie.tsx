import logoIcon from '@/assets/icons/Logo icon.png';
import "@/global.css";
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { RobotoSerif_400Regular, RobotoSerif_700Bold } from '@expo-google-fonts/roboto-serif';
import { router } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Specie() {
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

    const specie = {
        id: '1', 
        name: 'E. ACERVULINA', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lectus ex, tempus a tellus nec', 
        image: require('@/assets/images/maxima 1.png'),
        image_Local: require('@/assets/images/acervulina.png'),
        local_de_acao: "Breve parágrafo sobre o local onda a Eimeria infecta. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lectus ex, tempus a tellus nec",
        sinais: [
            'Estrias transversais esbranquiçadas',
            'Parede espessada',
            'Fezes aquosas',
            'Perda de peso',
            'Infecções secundárias graves',
        ],
        scores: [
            {
                level: 1,
                descricao: "Estrias brancas, com orientação transversa em relação às paredes intestinais. Até 5 lesões por cm",
                image: require('@/assets/images/maxima 1.png')
            },
            {
                level: 2,
                descricao: "Lesões mais próximas, mas não coalescentes. Parede intestinal sem espessamento. Conteúdo intestinal normal",
                image: require('@/assets/images/maxima 1.png')
            },
            {
                level: 3,
                descricao: "Lesões menores, abundantes e coalescentes, parede intestinal engrossada e conteúdo aquoso que se estendem até a cicatriz do saco vitelínico",
                image: require('@/assets/images/maxima 1.png')
            },
            {
                level: 4,
                descricao: "Lesões completamente coalescentes na mucosa do duodeno, com aspecto acinzentado. Jejuno com estrias brancas. Mucosa espessa e com descamação celular",
                image: require('@/assets/images/maxima 1.png')
            }
        ]
    };

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
                        {specie.name}
                    </Text>
                </View>
            </View>
        </View>

        {/* Content */}
        <View className="bg-[#F2F2F7] -z-1 -top-[35%] px-2 flex justify-between h-[80%]">
            <ScrollView className='pt-[18%]'>
                <View className='w-[100%] px-4 mb-4'>
                    <Image source={specie.image} style={{width: "100%", height: 200, borderRadius: 14}} resizeMode="cover"/>
                </View>

                {/* Descrição Geral */}
                <View className='px-4'>
                    <View className='flex-row justify-between items-center mb-4'>
                        <Text className='font-robotoBold text-[16px]'>Descrição Geral</Text>
                        <View className='bg-[#2CAFD3] h-[1px] w-[65%]'></View>
                    </View>
                    <View>
                        <Text className='text-[14px] font-roboto'>
                            {specie.description}
                        </Text>
                    </View>
                </View>

                {/* Local de ação */}
                <View className='px-4 mt-6'>
                    <View className='flex-row justify-between items-center mb-4'>
                        <Text className='font-robotoBold text-[16px]'>Local de ação</Text>
                        <View className='bg-[#2CAFD3] h-[1px] w-[65%]'></View>
                    </View>

                    <View className='flex-row w-[100%]'>
                        <View className='w-[50%]'>
                            <Image source={specie.image_Local} style={{width: "100%", height: 176}} resizeMode="contain"/>
                        </View>
                        <Text className='text-[14px] w-[50%] font-roboto'>
                            {specie.local_de_acao}
                        </Text>
                    </View>
                </View>
                
                {/* Sinais clínicos */}
                <View className='px-4 mt-6'>
                    <View className='flex-row justify-between items-center mb-4'>
                        <Text className='font-robotoBold text-[16px]'>Sinais clínicos</Text>
                        <View className='bg-[#2CAFD3] h-[1px] w-[65%]'></View>
                    </View>
                    <View>
                        {specie.sinais.map((item, index) => (
                            <View key={index} className='flex-row items-center m-1'>
                                <View className='w-[12px] h-[12px] border-[2px] border-[#DD5413]  rounded-full'></View>
                                <Text className='ml-2 text-[14px] font-roboto'>
                                    {item}
                                </Text>
                            </View>))
                        }
                    </View>
                </View>
                
                {/* Score*/}
                <View className='px-4 mt-6 mb-[30%]'>
                    <View className='flex-row justify-between items-center mb-4'>
                        <Text className='font-robotoBold text-[16px]'>Scores</Text>
                        <View className='bg-[#2CAFD3] h-[1px] w-[65%]'></View>
                    </View>
                    
                    <Text className='font-roboto text-[14px] mb-4'>Score é uma nota ou grau (geralmente de 0 a 4) atribuída a uma 
                        lesão observada na necropsia de aves, permitindo avaliar a severidade 
                        da infecção por Eimeria com base em critérios visuais
                    </Text>

                    <View>
                        {specie.scores.map((item, index) => (
                            <View key={index} style={{shadowColor: '#00000',
                                    shadowOffset: { width: 0, height: 10 },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 14,
                                    elevation: 3,
                                }} 
                                className='flex-row items-center m-1 bg-white rounded-[14px] w-[100%] h-[100px]'>
                                <View className={`w-[5%] h-[100%] rounded-l-[14px] ${index == 0 && "bg-[#28CB41]"} ${index == 1 && "bg-[#D7DD24]"} ${index == 2 && "bg-[#EC8321]"} ${index == 3 && "bg-[#E23232]"}`}></View>
                                <Text className='pl-5 w-[60%] text-[16px] font-robotoBold'>
                                    Score - {item.level}
                                </Text>

                                <View className='w-[30%]'>
                                    <TouchableOpacity onPress={() => router.navigate('/score')}>
                                        <View style={{shadowColor: '#00000',
                                                shadowOffset: { width: 0, height: 10 },
                                                shadowOpacity: 0.5,
                                                shadowRadius: 14,
                                                elevation: 3,
                                            }}
                                            className='bg-[#1B5C9E] px-4 rounded-[4px] py-2'>
                                            <Text className='text-white font-robotoBold text-[14px] text-center'>Ver imagem</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>))
                        }
                    </View>
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