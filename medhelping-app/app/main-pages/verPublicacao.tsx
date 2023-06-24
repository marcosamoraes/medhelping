import { Image, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Footer from "@components/footer";
import Header from "@components/header";
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ComentarioPublicacao from "@components/comentarioPublicacao";
import SidebarProvider from "@contexts/Sidebar";
import SideMenu from "@components/sideMenu";
import TouchableBlur from "@components/touchableBlur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { api } from "@services/api";

const examBackground = require("../../assets/images/img-fundo-exame.png");

export default function VerPublicacao({ route }: any) {
    const { id } = route.params;
    const [pubInfo, setPubInfo] = useState([])
    let reload_variable = 0
    useEffect(() => {
        api.get(`/articles/${id}`).then((i: any) => {
            setPubInfo(i.data.article)
        }).catch(() => {
            Alert.alert('Erro', 'Ocorreu um erro, tente novamente', [{ text: 'OK' }])
        })
    }, [reload_variable])
    console.log(pubInfo)

    const [responseId, setResponseId] = useState(0)
    const { bottom } = useSafeAreaInsets()
    const styles = StyleSheet.create({
        input: {
            borderColor: 'white',
            borderWidth: 1,
            color: 'white'
        }
    })

    return (
        <>
            <SidebarProvider>
                <TouchableBlur />
                <Header />
                <SideMenu />
            </SidebarProvider>
            <ScrollView className="w-screen bg-[#00021C]">
                <Image className="w-full h-40 object-cover" source={pubInfo.image ? pubInfo.image : examBackground} />
                <View className="p-4 border-b mb-4 border-b-[#1F2935]">
                    <Text className="text-white text-center font-900 text-xl py-2">{pubInfo.title}</Text>
                    <Text className="text-white text-center font-500 text-sm py-2">{pubInfo.anonymous_publication ? 'Anônimo' : pubInfo.author} em {pubInfo.created_at?.substring(0, 10)}</Text>
                    <Text className="text-white text-center font-500 text-sm py-2">{pubInfo.description}</Text>
                    <View className="flex-row justify-between items-center px-2 my-2">
                        <View className="flex-row">
                            <FontAwesome5 name="share" size={24} color="white" />
                            <Text className="text-white text-base pl-3">{pubInfo.quantity_shared}</Text>
                            
                        </View>
                        <View className="flex-row">
                            <Text className="text-white text-base pr-3">{pubInfo.likes}</Text>
                            <AntDesign name="like2" size={24} color="white" />
                        </View>
                    </View>
                </View>
                {/* Adicionar imagem como props no componente depois */}
                <ComentarioPublicacao isResponse={false} setResponseId={setResponseId} username='Usuario 1' content='O incentivo ao avanço tecnológico, assim como a execução dos pontos do programa nos obriga à análise de alternativas às soluções ortodoxas.' />
                <View className="ml-6 mb-4 border-l border-l-[#1F2935]">
                    <ComentarioPublicacao isResponse={true} username='Usuario 1' setResponseId={setResponseId} content='O incentivo ao avanço tecnológico, assim como a execução dos pontos do programa nos obriga à análise de alternativas às soluções ortodoxas.' />
                    <ComentarioPublicacao isResponse={true} username='Usuario 1' setResponseId={setResponseId} content='O incentivo ao avanço tecnológico, assim como a execução dos pontos do programa nos obriga à análise de alternativas às soluções ortodoxas.' />

                </View>
                <ComentarioPublicacao setResponseId={setResponseId} isResponse={false} username='Usuario 1' content='O incentivo ao avanço tecnológico, assim como a execução dos pontos do programa nos obriga à análise de alternativas às soluções ortodoxas.' />
                <ComentarioPublicacao setResponseId={setResponseId} isResponse={false} username='Usuario 1' content='O incentivo ao avanço tecnológico, assim como a execução dos pontos do programa nos obriga à análise de alternativas às soluções ortodoxas.' />

            </ScrollView>

            <View style={{ paddingBottom: bottom }} className='bg-[#01061C] mt-auto border-t-2 border-t-[#1F2935] w-screen'>
                {!responseId ? '' : <View className="flex-row justify-between px-4 items-center pt-3"><View className="bg-[#1F2935] w-4/5 rounded-lg p-2"><Text numberOfLines={1} className="text-white">O incentivo ao avanço tecnológico, assim</Text></View><TouchableOpacity onPress={() => setResponseId(0)} className="w-8 h-8 bg-[#1F2935] rounded-full justify-center items-center"><Text className="text-white font-700 text-lg">X</Text></TouchableOpacity></View>}
                <View className='flex-row px-4 justify-between items-center py-1 w-screen'>
                    <TextInput
                        style={styles.input}
                        placeholder='Adicionar um comentário'
                        className='h-10 w-4/5 rounded-xl text-sm font-400 my-3 px-4'
                        placeholderTextColor={'white'}
                    />
                    <TouchableOpacity activeOpacity={0.6} className="h-9 w-9 rounded-full justify-center items-center bg-[#07acf7]"><Ionicons name="send" size={20} color="white" /></TouchableOpacity>
                </View>
            </View>
        </>
    )
}