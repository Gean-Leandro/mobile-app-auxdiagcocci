import "@/global.css";
import { eimeriaProps, EimeriaService } from '@/services/eimeriaService';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { RobotoSerif_400Regular, RobotoSerif_700Bold } from '@expo-google-fonts/roboto-serif';
import { router } from 'expo-router';
import { query } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, RefreshControl, SectionList, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Home() {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        RobotoSerif_400Regular, 
        RobotoSerif_700Bold,
        Inter_400Regular, 
        Inter_700Bold
    });

    const [refreshing, setRefreshing] = useState(false);
    const [searchField, setSearchField] = useState<string>('');
    const [eimerias, setEimerias] = useState<eimeriaProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEimerias = async () => {
            const query = await EimeriaService.getEimerias();
            if (query.status === "OK") {
                setEimerias(query.result);
                setLoading(false);
            } else {
                console.log('error')
            }
        }

        fetchEimerias();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
    
        setTimeout(async () =>  {
            const query = await EimeriaService.getEimerias();
            if (query.status === "OK") {
                setEimerias(query.result);
            } else {
                console.log('error')
            }
          setRefreshing(false);
        }, 2000);
      }, [query]);

    const filteredSpecies = eimerias.filter(s =>
        s.name.toLowerCase().includes(searchField.toLowerCase())
    );

    const sectionData = useMemo(() => {
        if (!filteredSpecies || filteredSpecies.length === 0) return [];
      
        // Ordem desejada
        const categoryOrder = [
          'Principais espécies',
          'Espécies menos frequentes',
          'Espécies menos patogênicas'
        ];
      
        // Agrupa por categoria
        const grouped = filteredSpecies.reduce((acc, item) => {
          if (!acc[item.category]) acc[item.category] = [];
          acc[item.category].push(item);
          return acc;
        }, {} as Record<string, eimeriaProps[]>);
      
        // Cria as seções com os dados ordenados por nome
        const sections = Object.entries(grouped).map(([title, data]) => ({
          title,
          data: data.sort((a, b) => a.name.localeCompare(b.name)),
        }));
      
        // Ordena as seções pela ordem personalizada
        const sortedSections = sections.sort((a, b) =>
          categoryOrder.indexOf(a.title) - categoryOrder.indexOf(b.title)
        );
      
        return sortedSections;
      }, [filteredSpecies]);

    if (!fontsLoaded || loading) {
        return (
            <View className='w-[100%] h-[100%] flex justify-center bg-white items-center'>
                <Image source={require('@/assets/icons/chickenLogo.png')} style={{width:300, height:300}} resizeMode='contain'/>
                <ActivityIndicator size="large" color="#235DFF" />
            </View>
        );
    }
    
    return (
        <>
        <View className='bg-white relative h-[100%]'>
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
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }
                renderSectionHeader={({ section: { title } }) => {
                let bgClass = 'bg-white';
                let textColor = 'text-black';
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
                
                return(
                    <View className={`${bgClass} w-[100%] py-4`}>
                        <View className={`${bgSpecie} w-[95%] ml-[2.5%] py-7 flex-row items-center justify-center rounded-[14px]`}>
                            <View className='w-[50%] items-center'>
                                <Image source={{uri: item.imgLocal}} style={{width: 86, height:208}} resizeMode="contain"/>
                            </View>
                            <View className='w-[50%] h-[208.98] items-center justify-center'>
                            <View className='h-[60%] w-[100%] justify-end items-center'>
                                <View>
                                <Text className={`text-${textColor} text-[24px] font-roboto italic`}>Eimeria</Text>
                                <Text className={`text-${textColor} text-[24px] italic font-bold  font-robotoMedium`}>{item.name}</Text>
                                </View>
                            </View>
                            <View className='h-[40%] justify-end'>
                                <TouchableOpacity onPress={() => {
                                    router.navigate({pathname:'/specie', params: {id: item.id}})}} className='rounded-[8px] w-[154.08] h-[41] items-center justify-center'
                                style={{ borderWidth: 1, borderColor: textColor, }}>
                                <Text className={`text-${textColor} font-roboto text-[15px] font-bold`}>VER MAIS</Text>
                                </TouchableOpacity>
                            </View>
                            </View>
                        </View>
                    </View>
                )}}
                contentContainerStyle={{ paddingTop: "10%", backgroundColor: "white", borderRadius:50, paddingBottom: "8%"}}
            />

            <View className='bg-[#F2FBF4] w-[100%] absolute z-10 pb-4 top-[92%] justify-between flex-row'>
                <TouchableOpacity onPress={() => router.push('/home')}>
                    <View className='flex justify-center items-center pl-10 py-2'>
                        <Image source={require('@/assets/icons/homeIcon.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                        <Text className='text-[16px] font-roboto'>Inicio</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/glossary')}>
                    <View className='flex justify-center items-center pl-4 py-2'>
                        <Image source={require('@/assets/icons/GlossaryIconLine.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                        <Text className='text-[16px] font-roboto'>Glossário</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/references')}>
                    <View className='flex justify-center items-center py-2 pr-5'>
                        <Image source={require('@/assets/icons/ReferecesIconBar.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                        <Text className='text-[16px] font-roboto'>Referência</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        </>
    )
}