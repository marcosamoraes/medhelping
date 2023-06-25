import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import Footer from "@components/footer";
import Header from "@components/header";
import SideMenu from "@components/sideMenu";
import SidebarProvider from "@contexts/Sidebar";
import TouchableBlur from "@components/touchableBlur";
import { useCallback, useEffect, useState } from "react";
import { api } from "@services/api";
import ArticleCard from "@components/ArticleCard";
import IArticle from '@interfaces/IArticle';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { debounce } from "lodash";

export default function Home() {
    const route = useRoute();
    const { id }: any = route.params ?? { id: 0 };

    const [articles, setArticles] = useState<IArticle[]>({} as IArticle[])
    const [loading, setLoading] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')

    const navigation = useNavigation()

    const debouncedFetch = useCallback(
		debounce(() => fetchArticles(), 1000)
    , [])

    const handleSearch = (text: string) => {
        setSearch(text)
        debouncedFetch()
    }

    const fetchArticles = async () => {
        console.log('fetching')
        console.log(`/articles?category=${id}&search=${search}`)
        setLoading(true)
        try {
            const { data: { data } } = await api.get(`/articles?category=${id}&search=${search}`)
            setArticles(data)
        } catch (error: any) {
            console.log(error.response)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        return navigation.addListener('focus', () => {
            fetchArticles()
        });
    }, [navigation]);

    useEffect(() => {
        fetchArticles()
    }, [id])

    return (
        <SidebarProvider>
            <TouchableBlur />
            <Header />
            <SideMenu />

            <ScrollView className="w-screen py-6 px-6 bg-background">
                {id ? (
                    <TextInput
                        placeholder='Busque pelo título ou autor'
                        className='h-10 w-full rounded-xl text-sm font-400 my-2 px-4 bg-background border border-white text-white'
                        placeholderTextColor={'white'}
                        onChangeText={(text) => handleSearch(text)}
                        value={search}
                    />
                ) : articles.length > 0 && (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("publishArticle")}>
                        <View className="w-full p-4 rounded-xl bg-primary">
                            <Text className="font-900 mb-3 text-white">Dúvidas sobre o diagnóstico ou conduta para o paciente?</Text>
                        </View>
                    </TouchableOpacity>
                )}
                <View className="flex-row flex-wrap pt-6 pb-4 px-1 justify-between">
                    {loading ? (
                        <ActivityIndicator color="white" size={40} className="flex-1 h-60" />
                    ) : (
                        articles.length > 0 ? articles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        )) : (
                            <View className="w-full p-4 rounded-xl bg-primary">
                                <Text className="font-700 text-white">Nenhum artigo encontrado.</Text>
                            </View>
                        )
                    )}
                </View>
            </ScrollView>
            <Footer />
        </SidebarProvider>
    )
}