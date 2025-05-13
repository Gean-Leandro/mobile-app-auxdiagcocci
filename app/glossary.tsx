import "@/global.css";
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { RobotoSerif_400Regular, RobotoSerif_700Bold } from '@expo-google-fonts/roboto-serif';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Glossary() {
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

    const glossary = [
        {
          word: "Caseosa",
          meaning: "O termo é comumente usado para se referir a substância caseosa que é uma secreção espessa, esbranquiçada, e pastosa"
        },
        {
          word: "Coalecente",
          meaning: "Que se refere a algo que se une, funde ou combina em um único todo"
        },
        {
          word: "Divertículo do saco vitelínico",
          meaning: "É um remanescente do pedúnculo vitelínico (tubo que liga o saco vitelínico ao intestino médio do embrião de aves) que se encontra na maioria das aves, e é mais desenvolvido nas mais jovens"
        },
        {
          word: "Embalonamento",
          meaning: "É um termo usado para descrever a distensão ou aumento de volume de uma região do corpo, muitas vezes relacionada a gases ou líquidos"
        },
        {
          word: "Exudato",
          meaning: "Líquidos, células ou outras substâncias celulares eliminados vagarosamente dos VASOS SANGUÍNEOS"
        },
        {
          word: "Morbidade",
          meaning: "É o termo usado para indicar a frequência ou proporção de indivíduos que apresentam uma determinada enfermidade dentro de um grupo específico. Diferentemente de Mortalidade, que é o numero de mortes causados por uma doença"
        },
        {
          word: "Período pré-patente",
          meaning: "É o intervalo entre a infecção e o aparecimento dos primeiros sinais de uma doença"
        },
        {
          word: "Petéquias",
          meaning: "Pequenos pontos vermelhos ou marrons causadas por pequenos sangramentos"
        },
        {
          word: "Serosa",
          meaning: "Tecido conjuntivo que reveste as cavidades do corpo, secretando um líquido claro que lubrifica as superfícies dos órgãos"
        },
        {
          word: "Tonsilas",
          meaning: "São estruturas do tecido linfático, localizadas na região da garganta e da cavidade oral, que fazem parte do sistema imunológico. Elas ajudam a combater infecções ao atuar como uma barreira contra microrganismos que entram pelo nariz e pela boca"
        },
        {
          word: "Trabéculas",
          meaning: "Refere-se a pequenas estruturas em forma de feixes ou redes dentro de tecidos, especialmente em ossos, coração e alguns órgãos"
        },
    ]

    const filteredGlossary = glossary.filter(s =>
        s.word.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
        <>
        <View className="w-[210%] z-10 -left-[55%] bg-[#235DFF] -top-[30%] h-[50%] px-[55%] rounded-b-[50%]"
            style={{shadowColor: '#00000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.5,
                shadowRadius: 14,
                elevation: 10,
            }}>
            <View className="flex-row mt-[63%] w-[100%] justify-between pt-4 px-6 items-center">
                <Image source={require('@/assets/icons/ArrowBackWhite.png')} style={{width: 30, height: 30}} resizeMode="contain"/>
                <View className='w-[60%] bg-white h-[1px] ml-2'></View>
                <Text className='text-end text-white ml-3 font-robotoBold text-[24px]'>Glossário</Text>
            </View>

            <View className='flex justify-center items-center mt-4'>
                <View className='flex justify-center items-center mt-5'>
                    <View className='w-[90%] rounded-[14px] bg-white flex-row'
                        style={{shadowColor: '#00000',
                            shadowOffset: { width: 0, height: 10 },
                            shadowOpacity: 0.5,
                            shadowRadius: 14,
                            elevation: 5,
                        }}>

                        <View className='flex justify-center items-center pl-4'>
                            <Image source={require('@/assets/icons/Filter.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                        </View>

                        <TextInput className=' w-[80%]' 
                            value={searchField}
                            onChangeText={setSearchField}/>

                        <View className='flex justify-center items-center pr-4'>
                            <Image source={require('@/assets/icons/search icon.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                        </View>
                    </View>
                </View>
            </View>
        </View>

        {/* Content */}
        <View className="bg-[#F2F2F7] -z-1 -top-[35%] px-2 flex justify-between h-[80%]">
            <ScrollView className='pt-[18%]'>
                
                {/* Score*/}
                <View className='px-4 mb-[30%]'>
                    
                    {filteredGlossary.map((item, index) => (
                        <View key={index} style={{shadowColor: '#00000',
                                shadowOffset: { width: 0, height: 10 },
                                shadowOpacity: 0.5,
                                shadowRadius: 14,
                                elevation: 3,
                            }} 
                            className='flex-row items-center m-1 bg-white rounded-[14px] w-[100%]'>
                            <View className={`w-[5%] h-[100%] rounded-l-[14px] bg-[#235DFF]`}></View>
                            <View className="w-[90%] pl-5 py-4">
                                <Text className='text-[18px] font-robotoBold'>
                                    {item.word}
                                </Text>
                                <Text className='text-[16px] mt-2 font-roboto'>
                                    {item.meaning}
                                </Text>
                            </View>
                        </View>))
                    }
                </View>
            </ScrollView>
        </View>

        <View className='bg-[#F2FBF4] w-[100%] absolute z-10 top-[94%] justify-between flex-row'>
            <TouchableOpacity onPress={() => router.replace('/home')}>
                <View className='flex justify-center items-center pl-10 py-2'>
                    <Image source={require('@/assets/icons/homeIconUnSelected.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                    <Text className='text-[16px] font-roboto'>Inicio</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.replace('/glossary')}>
                <View className='flex justify-center items-center pl-4 py-2'>
                    <Image source={require('@/assets/icons/GlossaryIconLineBlu.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                    <Text className='text-[16px] font-roboto'>Glossário</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.replace('/references')}>
                <View className='flex justify-center items-center py-2 pr-5'>
                    <Image source={require('@/assets/icons/ReferecesIconBar.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                    <Text className='text-[16px] font-roboto'>Referência</Text>
                </View>
            </TouchableOpacity>
        </View>
        </>
    )
}