import { ScrollView, View, Text, Alert } from "react-native";
import Footer from "@components/footer";
import Header from "@components/header";
import SideMenu from "@components/sideMenu";
import SidebarProvider from "@contexts/Sidebar";
import TouchableBlur from "@components/touchableBlur";
import { useEffect, useState } from "react";
import { api } from "@services/api";

export default function Home(){
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        api.get('articles').then((i: any)=>{
            setPosts(i)
        }).catch(()=>{
            Alert.alert('Erro', 'Ocorreu um erro, tente novamente', [{ text: 'OK' }])
        })
    },[])

    return(
        <SidebarProvider>
            <TouchableBlur/>
            <Header/>
            <SideMenu/>
    
            <ScrollView className="w-screen py-6 px-6 bg-[#00021C]">
                <View className="w-full p-4 rounded-xl bg-[#03dadbb2]">
                    <Text className="font-900 mb-3 text-white">Dúvidas sobre o diagnóstico ou conduta para o paciente?</Text>
                    <Text className="font-700 text-white">Publique seu caso clínico e encontre a melhor solução!</Text>
                </View>
                <View className="flex-row flex-wrap pt-6 pb-4 px-1 justify-between">
                    {/* {posts.length? posts.map((i) => {<ExamCard category="" exam="" name="" date=""/>}) : ''} */}
                </View>
            </ScrollView>
            <Footer/>
        </SidebarProvider>
    )
}