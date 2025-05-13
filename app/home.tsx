import logoIcon from '@/assets/icons/Logo icon.png';
import "@/global.css";
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { RobotoSerif_400Regular, RobotoSerif_700Bold } from '@expo-google-fonts/roboto-serif';
import { router } from 'expo-router';
import { useState } from 'react';
import { Dimensions, FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";

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

    if (!fontsLoaded) {
        return null; // Ou <AppLoading />
    }

    const species = [
        { id: '1', name: 'E. ACERVULINA', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lectus ex, tempus a tellus nec', image: require('@/assets/images/maxima 1.png') },
        { id: '2', name: 'E. TENELLA', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lectus ex, tempus a tellus nec', image: require('@/assets/images/maxima 1.png') },
        { id: '3', name: 'E. MAXIMA', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lectus ex, tempus a tellus nec', image: require('@/assets/images/maxima 1.png') },
        { id: '4', name: 'E. PAREOCOX', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lectus ex, tempus a tellus nec', image: require('@/assets/images/maxima 1.png') },
        { id: '5', name: 'E. MITIS', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lectus ex, tempus a tellus nec', image: require('@/assets/images/maxima 1.png') },
        { id: '6', name: 'E. BRUNETTI', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lectus ex, tempus a tellus nec', image: require('@/assets/images/maxima 1.png') },
        { id: '7', name: 'E. BRUNETTI', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lectus ex, tempus a tellus nec', image: require('@/assets/images/maxima 1.png') },
        { id: '8', name: 'E. BRUNETTI', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lectus ex, tempus a tellus nec', image: require('@/assets/images/maxima 1.png') },
    ];

    const windowWidth = Dimensions.get('window').width;
    const cardWidth = (windowWidth - 48) / 2;

    const filteredSpecies = species.filter(s =>
        s.name.toLowerCase().includes(searchField.toLowerCase())
    );

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

        <View className="bg-[#235DFF] -z-1 -top-[35%] px-2 flex justify-between h-[80%]">
            <FlatList
            data={filteredSpecies}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={{ paddingTop: "15%", paddingBottom: 24, paddingLeft: 10, paddingRight: 10 }}
            renderItem={({ item }) => (
            <View className="bg-white rounded-xl p-3 mb-4 shadow" style={{ 
                width: cardWidth, 
                shadowColor: '#00000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.5,
                shadowRadius: 14,
                elevation: 5,
                }}>
                <Image source={item.image} style={{width:"100%", height:82, borderTopLeftRadius: 10, borderTopRightRadius: 10}} resizeMode="cover" />
                <Text className="font-bold text-sm mb-1 mt-2 text-[19px] text-black">{item.name}</Text>
                <Text className="text-[12px] font-roboto text-[#696969] mb-2" numberOfLines={3}>
                    {item.description}
                </Text>
                <View className='flex justify-center items-end'>
                    <TouchableOpacity onPress={() => router.navigate('/specie')}>
                        <Text className="text-orange-500 font-robotoBold underline text-end text-[16px]">Ver mais</Text>
                    </TouchableOpacity>
                </View>
            </View>
            )}
        />
        </View>
        <View className='bg-[#F2FBF4] w-[100%] absolute z-10 top-[94%] justify-between flex-row'>
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