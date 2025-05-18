import "@/global.css";
import { eimeriaProps, EimeriaService } from "@/services/eimeriaService";
import { IScientificNames, ScientificNamesService } from "@/services/scientificNamesService";
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { RobotoSerif_400Regular, RobotoSerif_700Bold } from '@expo-google-fonts/roboto-serif';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Image, Modal, PanResponder, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function Score() {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        RobotoSerif_400Regular, 
        RobotoSerif_700Bold,
        Inter_400Regular, 
        Inter_700Bold
    });

    const { id, index } = useLocalSearchParams();
    const [eimeria, setEimeria] = useState<eimeriaProps|null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [scientifNames, setScientifNames] = useState<IScientificNames[]>([]);

    // Controle do zoom e pan dentro do modal
    const [zoom, setZoom] = useState(1);
    const scale = useRef(new Animated.Value(1)).current;
    const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    
    useEffect(() => {
        const fetchData = async () => {
            let query = null

            if (typeof(id) === "string"){
                try {
                    query = await EimeriaService.getEimeria(id);
                    setEimeria(query);
                } catch (error) {
                    console.log(error);
                }
            }

            try {
                const query = await ScientificNamesService.getScientificNames();
                if (query.status === "OK") {
                    setScientifNames(query.result);
                } else {
                    console.log('error')
                }
            } catch (error) {
                console.log(error);
            }
    
        }

        fetchData();
    }, [id, index]);

    const panResponder = useRef(
        PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
            return zoom > 1 && (Math.abs(gestureState.dx) > 2 || Math.abs(gestureState.dy) > 2);
        },
        onPanResponderMove: Animated.event(
            [
            null,
            { dx: pan.x, dy: pan.y }
            ],
            { useNativeDriver: false }
        ),
        onPanResponderRelease: () => {
            // Limites podem ser aplicados aqui se quiser
        },
        })
    ).current;

    const animateScale = (toValue: number) => {
        Animated.spring(scale, {
        toValue,
        useNativeDriver: true,
        }).start();
    };

    const zoomIn = () => {
        const newZoom = Math.min(zoom + 0.5, 4);
        setZoom(newZoom);
        animateScale(newZoom);
    };

    const zoomOut = () => {
        const newZoom = Math.max(zoom - 0.5, 1);
        setZoom(newZoom);
        animateScale(newZoom);
        if (newZoom === 1) {
        pan.setValue({ x: 0, y: 0 });
        }
    };

    if (!fontsLoaded) {
        return null; // Ou <AppLoading />
    }

    const TextoComItalico = ({ texto }: { texto: string }) => {
        const nomesLower = scientifNames.map(n => n.name.toLowerCase());
        const textoLower = texto.toLowerCase();
        const regex = new RegExp(`\\b(eimeria|e\\.)\\s?(${nomesLower.join('|')})\\b`, 'gi');
        const partes = [];
        let ultimoIndice = 0;
      
        texto.replace(regex, (match, prefixo, nome, offset) => {
          if (offset > ultimoIndice) {
            partes.push(texto.slice(ultimoIndice, offset));
          }
          partes.push(
            <Text key={offset} style={{ fontStyle: 'italic' }}>
              {texto.slice(offset, offset + match.length)} {/* Mantém o original */}
            </Text>
          );
          ultimoIndice = offset + match.length;
          return match;
        });
      
        if (ultimoIndice < texto.length) {
          partes.push(texto.slice(ultimoIndice));
        }
      
        return <Text>{partes}</Text>;
    };

    return (
        <>
        <View className="h-[100%]">
        <View className='z-10'>
            <View className='bg-[#FBFBFB] flex justify-center items-center pt-8 pb-4'>
                <View className='flex-row justify-start items-center w-[100%] pl-6'>
                    <TouchableOpacity onPress={() => router.navigate({pathname:'/specie', params: {id: id}})}>
                        <Image source={require('@/assets/icons/ArrowBack.png')} style={{width: 24, height: 24}} resizeMode="contain"></Image>
                    </TouchableOpacity>
                    <Text className='text-center w-[60%] font-robotoBold text-[24px] ml-12'>
                        Score {eimeria?.score[Number(index)].level}
                    </Text>
                </View>
            </View>

            <Image source={require('@/assets/images/Rectangle.png')} style={{width:"100%", height: 50}} resizeMode="stretch"/>
        </View>

        {/* Content */}
        <View className="bg-[#F2F2F7] -z-1 -top-[5%] px-2 flex justify-between h-[80%]">
            <ScrollView className='pt-[18%]'>

                {(eimeria?.score) && (eimeria.score[Number(index)].img !== "") ?
                    <View className='w-[100%] px-4 mb-6'>
                        <Image src={eimeria.score[Number(index)].img} 
                            style={{width: "100%", height: 200, borderRadius: 14}} resizeMode="cover"/>
                        <View className='absolute top-[80%] left-[93%]'>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Image source={require("@/assets/icons/Search-Circle.png")} style={{width: 30, height: 30}} resizeMode="contain"/>
                            </TouchableOpacity>
                        </View>
                    </View>:
                    <></>
                }
                {/* Descrição Geral */}
                <View className='px-4 mt-4'>
                    <View className='flex-row justify-between items-center mb-4'>
                        <Text className='font-robotoBold text-[18px]'>Detalhes</Text>
                        <View className='bg-[#2CAFD3] h-[1px] w-[65%]'></View>
                    </View>
                    <View>
                        {eimeria?.score[Number(index)].description.map((item, index) => (
                            <View key={index} className='flex-row items-center m-1'>
                                <View className='w-[12px] h-[12px] border-[2px] border-[#DD5413]  rounded-full'></View>
                                <Text className='ml-2 text-[16px] font-roboto'>
                                    <TextoComItalico texto={item}/>
                                </Text>
                            </View>))
                        }
                    </View>
                </View>
            </ScrollView>

            {/* Modal com imagem zoom + pan */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={false}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                <View style={styles.imageWrapper} {...panResponder.panHandlers}>
                    <Animated.Image
                    src={eimeria?.score[Number(index)].img} // mesma imagem
                    style={[
                        styles.image,
                        {
                        transform: [
                            { scale },
                            { translateX: pan.x },
                            { translateY: pan.y },
                            { rotate: '90deg' }
                        ]
                        }
                    ]}
                    resizeMode="contain"
                    />
                </View>

                <View style={styles.buttons}>
                    <TouchableOpacity onPress={zoomIn} style={styles.button}>
                    <Text style={styles.buttonText}>Zoom +</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={zoomOut} style={styles.button}>
                    <Text style={styles.buttonText}>Zoom -</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.button, { backgroundColor: 'gray' }]}>
                    <Text style={styles.buttonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
        </View>
            <View className='bg-[#F2FBF4] w-[100%] absolute z-10 pb-4 top-[92%] justify-between flex-row'>
                <TouchableOpacity onPress={() => router.push('/home')}>
                    <View className='flex justify-center items-center pl-10 py-2'>
                        <Image source={require('@/assets/icons/homeIconUnSelected.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
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


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    thumbnail: {
      width: 300,
      height: 200,
      borderRadius: 10,
    },
    loupeIcon: {
      position: 'absolute',
      bottom: 10,
      right: 10,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: '#000', // fundo preto no modal para destacar a imagem
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    imageWrapper: {
      width: '100%',
      height: '70%',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    buttons: {
      flexDirection: 'row',
      marginTop: 20,
      justifyContent: 'space-around',
      width: '100%',
    },
    button: {
      backgroundColor: '#235DFF',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 6,
      minWidth: 80,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });