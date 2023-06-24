import { ScrollView, View, Text, Alert } from "react-native";
import Footer from "@components/footer";
import Header from "@components/header";
import SideMenu from "@components/sideMenu";
import SidebarProvider from "@contexts/Sidebar";
import TouchableBlur from "@components/touchableBlur";
import { useEffect, useState } from "react";
import { api } from "@services/api";
import ArticleCard from "@components/ArticleCard";
import IArticle from '@interfaces/IArticle';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";

export default function Home(){
    const [articles, setArticles] = useState<IArticle[]>({} as IArticle[])

    const navigation = useNavigation()

    const fetchArticles = async () => {
        try {
            const { data: { data } } = await api.get('/articles')
            setArticles(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchArticles()
    },[])

    return(
        <SidebarProvider>
            <TouchableBlur/>
            <Header/>
            <SideMenu/>
    
            <ScrollView className="w-screen py-6 px-6 bg-background">
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("publishArticle")}>
                    <View className="w-full p-4 rounded-xl bg-primary">
                        <Text className="font-900 mb-3 text-white">Dúvidas sobre o diagnóstico ou conduta para o paciente?</Text>
                        <Text className="font-700 text-white">Publique seu caso clínico e encontre a melhor solução!</Text>
                    </View>
                </TouchableOpacity>
                <View className="flex-row flex-wrap pt-6 pb-4 px-1 justify-between">
                    {articles.length > 0 && articles.map((article) => (
                        <ArticleCard article={article} />
                    ))}
                </View>
            </ScrollView>
            <Footer/>
        </SidebarProvider>
    )
}