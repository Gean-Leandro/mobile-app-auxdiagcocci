import "@/global.css";
import { eimeriaProps, EimeriaService } from '@/services/eimeriaService';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { RobotoSerif_400Regular, RobotoSerif_700Bold } from '@expo-google-fonts/roboto-serif';
import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Image, SectionList, Text, TextInput, TouchableOpacity, View } from "react-native";

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
    const [eimerias, setEimerias] = useState<eimeriaProps[]>([]);

    useEffect(() => {
        const fetchEimerias = async () => {
            const query = await EimeriaService.getEimerias();
            if (query.status === "OK") {
                setEimerias(query.result);
            } else {
                console.log('error')
            }
        }

        fetchEimerias();
    }, []);

    const filteredSpecies = eimerias.filter(s =>
        s.name.toLowerCase().includes(searchField.toLowerCase())
    );

    const sectionData = useMemo(() => {
        if (!filteredSpecies || filteredSpecies.length === 0) return [];
      
        return Object.entries(
          filteredSpecies.reduce((acc, item) => {
            if (!acc[item.category]) acc[item.category] = [];
            acc[item.category].push(item);
            return acc;
          }, {} as Record<string, eimeriaProps[]>)
        ).map(([title, data]) => ({ title, data }));
    }, [filteredSpecies]);

    if (!fontsLoaded) {
        return null; // Ou <AppLoading />
    }
    
    return (
        <>
        <View className='bg-white h-[105%]'>
            <View className='z-10'>
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

            <SectionList
                className='-z-1 flex -top-10 px-2'
                sections={sectionData}
                keyExtractor={(item) => item.name}
                renderSectionHeader={({ section: { title } }) => {
                let bgClass = 'bg-white';
                let textColor = 'text-black';
                // if (title === 'Espécies menos frequentes') {
                //     bgClass = 'bg-mygray-300';
                // } else if (title === 'Espécies menos patogências') {
                //     bgClass = 'bg-mygray-800';
                //     textColor = 'text-white'
                // }
                
                return (
                    <View className={`${bgClass} w-[100%] flex-row justify-center items-center pt-5`}>
                        <View className='bg-mygray-500 w-[33px] h-[4px]'></View>
                            <Text className={`text-[22px] font-roboto w-[75%] text-center font-bold ${textColor} uppercase`}>{title}</Text>
                        <View className='bg-mygray-500 w-[33px] h-[4px]'></View>
                    </View>
                )}}
                renderItem={({ item, index, section }) => {
                let bgClass = 'bg-white';
                let bgSpecie = index % 2 === 0 ? 'bg-white' : 'bg-mygray-300';
                let textColor = 'black';

                // if (section.title === 'Espécies menos frequentes') {
                //     bgClass = 'bg-mygray-300';
                //     bgSpecie = index % 2 === 0 ? 'bg-mygray-300' : 'bg-[#bfbfbf]';
                // } else if (section.title === 'Espécies menos patogências') {
                //     bgClass = 'bg-mygray-800';
                //     textColor = 'white'
                //     bgSpecie = index % 2 === 0 ? 'bg-mygray-800' : 'bg-mygray-900';
                // }
                
                return(
                    <View className={`${bgClass} w-[100%] py-4`}>
                        <View className={`${bgSpecie} w-[95%] ml-[2.5%] py-7 flex-row items-center justify-center rounded-[14px]`}>
                            <View className='w-[50%] items-center'>
                                <Image src={item.imgLocal} style={{width: 86, height:208}} resizeMode="contain"/>
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
                contentContainerStyle={{ paddingTop: "10%", backgroundColor: "white", borderRadius:50}}
            />
        </View>
        </>
    )
}