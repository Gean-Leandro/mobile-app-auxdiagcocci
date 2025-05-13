import "@/global.css";
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { RobotoSerif_400Regular, RobotoSerif_700Bold } from '@expo-google-fonts/roboto-serif';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Linking, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function References() {
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

    const handlePress = (url:string | undefined) => {
        if (url !== undefined) {
            Linking.openURL(url);
        }
    };

    const references = [
        {
            autores: "COTRIM, Gilberto",
            titulo: "História global: Brasil e geral",
            edicao: "10. ed",
            local: "São Paulo",
            editora: "Saraiva",
            ano: 2005,
            type: "livro"
        },
        {
            autores: "COTRIM, Gilberto",
            titulo: "Desenvolvimento sustentável na Amazônia",
            tituloProvisorio: "Revista Brasileira de Geografia",
            edicao: "10. ed",
            local: "Rio de Janeiro",
            volume: 12,
            numero: 2,
            paginas: "45-60",
            mes: "abr./jun",
            ano: 2010,
            type: "artigo"
        },
        {
            autores: "COTRIM, Gilberto",
            titulo: "História global: Brasil e geral",
            edicao: "10. ed",
            local: "São Paulo",
            editora: "Saraiva",
            ano: "2005",
            type: "livro"
        },
        {
            autores: "COTRIM, Gilberto",
            titulo: "História global: Brasil e geral",
            nomeSite: "Planalto",
            anoSite: 1988,
            url: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm",
            diaAcesso: 12,
            mesAcesso: "maio",
            anoAcesso: 2025,
            type: "site"
        },
        {
            autores: "COTRIM, Gilberto",
            titulo: "História global: Brasil e geral",
            edicao: "10. ed",
            local: "São Paulo",
            editora: "Saraiva",
            ano: 2005,
            type: "livro"
        },
        {
            autores: "COTRIM, Gilberto",
            titulo: "Desenvolvimento sustentável na Amazônia",
            tituloProvisorio: "Revista Brasileira de Geografia",
            edicao: "10. ed",
            local: "Rio de Janeiro",
            volume: 12,
            numero: 2,
            paginas: "45-60",
            mes: "abr./jun",
            ano: 2010,
            type: "artigo"
        },
        {
            autores: "COTRIM, Gilberto",
            titulo: "História global: Brasil e geral",
            edicao: "10. ed",
            local: "São Paulo",
            editora: "Saraiva",
            ano: "2005",
            type: "livro"
        },
        {
            autores: "COTRIM, Gilberto",
            titulo: "História global: Brasil e geral",
            nomeSite: "Planalto",
            anoSite: 1988,
            url: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm",
            diaAcesso: 12,
            mesAcesso: "maio",
            anoAcesso: 2025,
            type: "site"
        },
    ]

    const filteredReferences = references.filter(s =>
        s.titulo.toLowerCase().includes(searchField.toLowerCase())
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
                <Text className='text-end text-white ml-3 font-robotoBold text-[24px]'>Referências</Text>
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
                    
                    {filteredReferences.map((item, index) => (
                        <View key={index} style={{shadowColor: '#00000',
                            shadowOffset: { width: 0, height: 10 },
                            shadowOpacity: 0.5,
                            shadowRadius: 14,
                            elevation: 3,
                        }} 
                        className='flex-row items-center m-1 bg-white rounded-[14px] w-[100%]'>
                            <View className={`w-[5%] h-[100%] rounded-l-[14px] bg-[#235DFF]`}></View>

                                {/* Livro */}
                                {item.type === "livro" && <>
                                    <View className="w-[80%] pl-5 py-4">
                                        <Text className='text-[18px] font-robotoBold'>
                                            {item.titulo}
                                        </Text>
                                        <Text className='text-[16px] mt-2 font-roboto'>
                                            {item.autores}. {item.titulo}. {item.edicao}. ed. {item.local}: {item.editora}, {item.ano}
                                        </Text>
                                    </View>
                                    <View className="flex justify-center items-center w-[12%]">
                                        <Image source={require('@/assets/icons/Open book.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                                    </View>
                                </>}

                                {/* artigo */}
                                {item.type === "artigo" && <>
                                    <View className="w-[80%] pl-5 py-4">
                                        <Text className='text-[18px] font-robotoBold'>
                                            {item.titulo}
                                        </Text>
                                        <Text className='text-[16px] mt-2 font-roboto'>
                                            {item.autores}. {item.titulo}. {item.tituloProvisorio}, {item.local}, v. {item.volume}, n. {item.numero}, p. {item.paginas}, {item.mes}. {item.ano}. 
                                        </Text>
                                    </View>
                                    <View className="flex justify-center items-center w-[12%]">
                                        <Image source={require('@/assets/icons/PDF.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                                    </View>
                                </>}
                                {/* site */}
                                {item.type === "site" && <>
                                    <View className="w-[80%] pl-5 py-4">
                                        <Text className='text-[18px] font-robotoBold'>
                                            {item.titulo}
                                        </Text>
                                        <Text className='text-[16px] mt-2 font-roboto'>
                                            {item.autores}. {item.titulo}. {item.nomeSite}, 
                                            {item.anoSite}. Disponivel em:{" "}
                                            <Text onPress={() => handlePress(item.url)} 
                                                className="text-[16px] font-roboto text-blue-600 underline">
                                                {item.url}
                                            </Text>
                                            . Acesso em: 
                                            {item.diaAcesso} 
                                            {item.mesAcesso} 
                                            {item.anoAcesso}. 
                                        </Text>
                                    </View>
                                    <View className="flex justify-center items-center w-[12%]">
                                        <Image source={require('@/assets/icons/Internet.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                                    </View>
                                </>}
                                
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

            <TouchableOpacity onPress={() => router.navigate('/glossary')}>
                <View className='flex justify-center items-center pl-4 py-2'>
                    <Image source={require('@/assets/icons/GlossaryIconLine.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                    <Text className='text-[16px] font-roboto'>Glossário</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View className='flex justify-center items-center py-2 pr-5'>
                    <Image source={require('@/assets/icons/ReferecesIconBarOnSelected.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                    <Text className='text-[16px] font-roboto'>Referência</Text>
                </View>
            </TouchableOpacity>
        </View>
        </>
    )
}