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

export default function Articles() {
    const route = useRoute();
    const { id }: any = route.params ?? { id: 0 };

    const [articles, setArticles] = useState<IArticle[]>({} as IArticle[])
    const [loading, setLoading] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')
    const [category, setCategory] = useState<ICategory>({} as ICategory)
    const [page, setPage] = useState<number>(1)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [firstFetchFinished, setFirstFetchFinished] = useState<boolean>(false)

    const { checkIsLogged } = useContext(AuthContext)
    const { path, id: pathId, deleteRedirectUrl } = useContext(RedirectContext)

    const scrollViewRef = useRef<KeyboardAwareScrollView>(null)

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
            const { data: { data } } = await api.get(`/articles?per_page=16&page=${page}&category=${id}&search=${text ?? search}`)

            if (articles.length > 0) {
                const newArticles = data.filter((article: IArticle) => !articles.find((a: IArticle) => a.id === article.id))

                if (newArticles.length < 16) {
                    setHasMore(false)
                }

                setArticles([...articles, ...newArticles])
            } else {
                if (data.length < 16) {
                    setHasMore(false)
                }
                setArticles(data)
            } 

            if (id) {
                const { data } = await api.get(`/categories/${id}`)
                setCategory(data.category[0])
            } else {
                setCategory({} as ICategory)
            }
        } catch (error: any) {
            console.error('home: ', error.response.data.message)
            if (error.response?.data?.message === 'Unauthenticated.') {
                checkIsLogged()
            }
        } finally {
            setLoading(false)
            setTimeout(() => {
                setFirstFetchFinished(true)
            }, 1000)
        }
    }

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}: any) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    };

    const fetchNewPageArticles = () => {
        if (!hasMore || loading) return
        setPage(prev => prev + 1)
    }

    useEffect(() => {
        fetchArticles()
    }, [route, page])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setFirstFetchFinished(false)
            setArticles([])
            fetchArticles()
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <SidebarProvider>
            <TouchableBlur />
            <Header />
            <SideMenu />

            <KeyboardAwareScrollView 
                className="w-screen py-6 px-6 bg-background" 
                onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                        fetchNewPageArticles();
                    }
                }}
                scrollEventThrottle={400}
                ref={scrollViewRef}
                onContentSizeChange={() => {
                    if (firstFetchFinished && articles.length > 16) {
                        if (scrollViewRef.current) {
                            scrollViewRef.current.scrollToPosition(0, (articles.length / 2) * 100 - 250, true)
                        }
                    }
                }}
            >
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