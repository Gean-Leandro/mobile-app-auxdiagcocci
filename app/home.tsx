import acervulina_img from '@/assets/icons/acervulina.png';
import brunetti_img from '@/assets/icons/brunetti.png';
import maxima_img from '@/assets/icons/maxima.png';
import mitis_img from '@/assets/icons/mitis.png';
import necatrix_img from '@/assets/icons/necatrix.png';
import praecox_img from '@/assets/icons/praecox.png';
import tenella_img from '@/assets/icons/Tenella.png';
import "@/global.css";
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { RobotoSerif_400Regular, RobotoSerif_700Bold } from '@expo-google-fonts/roboto-serif';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Dimensions, Image, SectionList, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Home() {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        RobotoSerif_400Regular, 
        RobotoSerif_700Bold,
        Inter_400Regular, 
        Inter_700Bold
    });

    const [searchField, setSearchField] = useState<string>('');

    const species = [
        {
          name: 'acervulina',
          img: acervulina_img,
          category: 'Principais espécies'
        },
        {
          name: 'maxima',
          img: maxima_img,
          category: 'Principais espécies'
        },
        {
          name: 'tenella',
          img: tenella_img,
          category: 'Principais espécies'
        },
        {
          name: 'brunetti',
          img: brunetti_img,
          category: 'Espécies menos frequentes'
        },
        {
          name: 'necatrix',
          img: necatrix_img,
          category: 'Espécies menos frequentes'
        },
        {
          name: 'mitis',
          img: mitis_img,
          category: 'Espécies menos patogências'
        },
        {
          name: 'praecox',
          img: praecox_img,
          category: 'Espécies menos patogências'
        },
      ]

    const windowWidth = Dimensions.get('window').width;
    const cardWidth = (windowWidth - 48) / 2;

    const filteredSpecies = species.filter(s =>
        s.name.toLowerCase().includes(searchField.toLowerCase())
    );

    const sectionData = useMemo(() => {
        if (!filteredSpecies || filteredSpecies.length === 0) return [];
      
        return Object.entries(
          filteredSpecies.reduce((acc, item) => {
            if (!acc[item.category]) acc[item.category] = [];
            acc[item.category].push(item);
            return acc;
          }, {} as Record<string, {name: string, img:any, category:string}[]>)
        ).map(([title, data]) => ({ title, data }));
    }, [filteredSpecies]);

    if (!fontsLoaded) {
        return null; // Ou <AppLoading />
    }
    return (
        <>
        {/* <View className="w-[210%] z-10 -left-[55%] bg-white -top-[30%] h-[700px] px-[55%] rounded-b-[50%]"
            style={{shadowColor: '#00000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.5,
                shadowRadius: 14,
                elevation: 10,
            }}>
            <View className="flex-row mt-[63%] w-[100%] justify-center pt-4 items-start">
                <View className='w-[10%] h-[60px] flex justify-center items-center'>
                    <Image source={logoIcon} style={{width: 50, height: 50}} resizeMode="contain"/>
                </View>
                <View className='w-[80%]'>
                    <Text className='text-center pr-12 font-roboto tracking-[0.02em] text-[26px]'>Guia ilustrativo da</Text>
                    <Text className='text-center pr-12 font-robotoBold text-[26px]'>Coccidiose Aviária</Text>
                </View>
            </View>

            <View className='flex justify-center items-center mt-4'>
                <View className='w-[90%] bg-[#1B5C9E] h-[1px]'></View>
            </View>
            
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
        </View> */}

        <View className='z-10'>
            <View className='bg-[#235DFF] w-[100%] flex justify-center items-center'>
                <View>
                    <Text className='text-center pr-12 text-white font-roboto tracking-[0.02em] text-[26px]'>Guia ilustrativo da</Text>
                    <Text className='text-center pr-12 text-white font-robotoBold text-[26px]'>Coccidiose Aviária</Text>
                </View>
            </View>

            <View className='flex bg-[#235DFF] justify-center items-center pt-4'>
                <View className='w-[90%] bg-white h-[1px]'></View>
            </View>
            <View className='bg-[#235DFF] flex justify-center items-center pt-5'>
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
            <Image source={require('@/assets/images/Rectangle blu.png')} style={{width:"100%", height: 50}} resizeMode="stretch"/>
        </View>

        <View className="-z-1 flex -top-10 justify-between h-[80%]">
            <SectionList
                sections={sectionData}
                keyExtractor={(item) => item.name}
                renderSectionHeader={({ section: { title } }) => {
                let bgClass = 'bg-white';
                let textColor = 'text-black';
                if (title === 'Espécies menos frequentes') {
                    bgClass = 'bg-mygray-300';
                } else if (title === 'Espécies menos patogências') {
                    bgClass = 'bg-mygray-800';
                    textColor = 'text-white'
                }
                
                return (
                    <View className={`${bgClass} w-[100%] flex-row justify-center items-center pt-5`}>
                    <View className='bg-mygray-500 w-[33px] h-[4px]'></View>
                    <Text className={`text-[22px] font-roboto w-[70%] text-center font-bold ${textColor} uppercase`}>{title}</Text>
                    <View className='bg-mygray-500 w-[33px] h-[4px]'></View>
                    </View>
                )}}
                renderItem={({ item, index, section }) => {
                let bgClass = 'bg-white';
                let bgSpecie = index % 2 === 0 ? 'bg-white' : 'bg-mygray-300';
                let textColor = 'black';

                if (section.title === 'Espécies menos frequentes') {
                    bgClass = 'bg-mygray-300';
                    bgSpecie = index % 2 === 0 ? 'bg-mygray-300' : 'bg-[#bfbfbf]';
                } else if (section.title === 'Espécies menos patogências') {
                    bgClass = 'bg-mygray-800';
                    textColor = 'white'
                    bgSpecie = index % 2 === 0 ? 'bg-mygray-800' : 'bg-mygray-900';
                }
                
                return(
                    <View className={`${bgClass} w-[100%]`}>
                    <View className={`${bgSpecie} w-[95%] ml-[2.5%] my-4 py-7 flex-row items-center justify-center rounded-[5px]`}>
                        <View className='w-[50%] items-center'>
                            <Image source={item.img} style={{width: 86, height:208}} resizeMode="contain"/>
                        </View>
                        <View className='w-[50%] h-[208.98] items-center justify-center'>
                        <View className='h-[60%] w-[100%] justify-end items-center'>
                            <View>
                            <Text className={`text-${textColor} text-[24px] font-roboto italic`}>Eimeria</Text>
                            <Text className={`text-${textColor} text-[24px] italic font-bold  font-robotoMedium`}>{item.name}</Text>
                            </View>
                        </View>
                        <View className='h-[40%] justify-end'>
                            <TouchableOpacity onPress={() => router.navigate({pathname:'/specie'})} className='rounded-[8px] w-[154.08] h-[41] items-center justify-center'
                            style={{ borderWidth: 1, borderColor: textColor, }}>
                            <Text className={`text-${textColor} font-roboto text-[15px] font-bold`}>VER MAIS</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </View>
                    </View>
                )}}
                contentContainerStyle={{ paddingTop: "10%", backgroundColor: "white", paddingBottom: 20}}
            />
        </View>
        <View className='bg-[#F2FBF4] w-[100%] absolute z-10 top-[94%] justify-between flex-row border-t'>
            <TouchableOpacity>
                <View className='flex justify-center items-center pl-10 py-2'>
                    <Image source={require('@/assets/icons/homeIcon.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                    <Text className='text-[16px] font-roboto'>Inicio</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.navigate('/glossary')}>
                <View className='flex justify-center items-center pl-4 py-2'>
                    <Image source={require('@/assets/icons/GlossaryIconLine.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                    <Text className='text-[16px] font-roboto'>Glossário</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.navigate('/references')}>
                <View className='flex justify-center items-center py-2 pr-5'>
                    <Image source={require('@/assets/icons/ReferecesIconBar.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                    <Text className='text-[16px] font-roboto'>Referência</Text>
                </View>
            </TouchableOpacity>
        </View>
        </>
    )
}