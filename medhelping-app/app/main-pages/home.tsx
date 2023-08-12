import { View, Text, ActivityIndicator } from "react-native";
import Footer from "@components/footer";
import Header from "@components/header";
import SideMenu from "@components/sideMenu";
import SidebarProvider from "@contexts/Sidebar";
import TouchableBlur from "@components/touchableBlur";
import { useContext, useEffect, useRef, useState } from "react";
import { api } from "@services/api";
import ArticleCard from "@components/ArticleCard";
import IArticle from '@interfaces/IArticle';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";
import ICategory from "@interfaces/ICategory";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RedirectContext } from "@contexts/Redirect";
import { AuthContext } from "@contexts/Auth";

export default function Home() {
    const route = useRoute();

    const [articles, setArticles] = useState<IArticle[]>({} as IArticle[])
    const [loading, setLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [hasMore, setHasMore] = useState<boolean>(false)
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

    const fetchArticles = async () => {
        setLoading(true)
        try {
            const { data: { data } } = await api.get(`/articles?per_page=1000&page=${page}`)

            if (articles.length > 0) {
                const newArticles = data.filter((article: IArticle) => !articles.find((a: IArticle) => a.id === article.id))

                if (newArticles.length < 16) {
                    setHasMore(false)
                }

                setArticles([...articles, ...newArticles])
            } else {
                setArticles(data)
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
            setHasMore(true)
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
                    if (firstFetchFinished) {
                        if (scrollViewRef.current) {
                            scrollViewRef.current.scrollToPosition(0, (articles.length / 2) * 100 - 250, true)
                        }
                    }
                }}
            >
                {articles.length > 0 && (
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
                            <ArticleCard key={article.id} article={article} />
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