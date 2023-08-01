import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import Footer from "@components/footer";
import Header from "@components/header";
import SideMenu from "@components/sideMenu";
import SidebarProvider from "@contexts/Sidebar";
import TouchableBlur from "@components/touchableBlur";
import { useContext, useEffect, useRef, useState } from "react";
import { api } from "@services/api";
import ArticleCard from "@components/ArticleCard";
import IArticle from '@interfaces/IArticle';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { debounce } from "lodash";
import ICategory from "@interfaces/ICategory";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RedirectContext } from "@contexts/Redirect";
import { AuthContext } from "@contexts/Auth";

export default function Home() {
    const route = useRoute();
    const { id }: any = route.params ?? { id: 0 };

    const [articles, setArticles] = useState<IArticle[]>({} as IArticle[])
    const [loading, setLoading] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')
    const [category, setCategory] = useState<ICategory>({} as ICategory)

    const { logout } = useContext(AuthContext)
    const { path, id: pathId, deleteRedirectUrl } = useContext(RedirectContext)

    const navigation = useNavigation()

    useEffect(() => {
        if (path && pathId) {
            navigation.navigate('viewPublication', { id: pathId })
            deleteRedirectUrl()
        }
    }, [path])
    
    const debouncedFetch = useRef(
        debounce(async (text: string) => fetchArticles(text), 500)
    ).current

    useEffect(() => {
        return () => {
            debouncedFetch.cancel()
        }
    }, [debouncedFetch])

    const handleSearch = (text: string) => {
        setSearch(text)
        debouncedFetch(text)
    }

    const fetchArticles = async (text?: string) => {
        setLoading(true)
        try {
            const { data: { data } } = await api.get(`/articles?category=${id}&search=${text ?? search}`)
            setArticles(data)

            if (id) {
                const { data: { category } } = await api.get(`/categories/${id}`)
                setCategory(category)
            } else {
                setCategory({} as ICategory)
            }
        } catch (error: any) {
            console.error('home: ', error.response.data.message)
            if (error.response?.data?.message === 'Unauthenticated.') {
                logout()
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchArticles()
    }, [route])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchArticles()
        });
    
        return unsubscribe;
    }, [navigation]);

    return (
        <SidebarProvider>
            <TouchableBlur />
            <Header />
            <SideMenu />

            <KeyboardAwareScrollView className="w-screen py-6 px-6 bg-background">
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
                            <Text className="font-900 mb-3 text-sm text-white">Dúvida no diagnóstico ou conduta para o seu paciente?</Text>
                            <Text className="mb-3 text-xs text-white">Publique seu caso clínico e encontre a melhor solução.</Text>
                        </View>
                    </TouchableOpacity>
                )}
                <View className="flex-row flex-wrap pt-6 pb-4 px-1 justify-between">
                    {loading ? (
                        <ActivityIndicator color="white" size={40} className="flex-1 h-60" />
                    ) : (
                        articles.length > 0 ? articles.map((article) => (
                            <ArticleCard key={article.id} article={article} category={category} />
                        )) : (
                            <View className="w-full p-4 rounded-xl bg-primary">
                                <Text className="font-700 text-white">Nenhuma publicação encontrada.</Text>
                            </View>
                        )
                    )}
                </View>
            </KeyboardAwareScrollView>
            <Footer />
        </SidebarProvider>
    )
}