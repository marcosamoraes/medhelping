import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Share, ActivityIndicator, Pressable, Dimensions } from "react-native";
import Header from "@components/header";
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import SidebarProvider from "@contexts/Sidebar";
import SideMenu from "@components/sideMenu";
import TouchableBlur from "@components/touchableBlur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { api } from "@services/api";
import IArticle from "@interfaces/IArticle";
import { useNavigation } from "expo-router";
import ArticleComment from '../../sources/components/ArticleComment';
import IComment from "@interfaces/IComment";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { createURL } from "expo-linking";
import { ResizeMode, Video } from "expo-av";
import Carousel from 'react-native-reanimated-carousel';

const examBackground = require("../../assets/images/img-fundo-exame.png");

export default function VerPublicacao() {
    const route = useRoute();
    const { id }: any = route.params;

    const [article, setArticle] = useState<IArticle>({} as IArticle);
    const [refetch, setRefetch] = useState<number>(0);
    const [reply, setReply] = useState<string>('');
    const [replyAnonymous, setReplyAnonymous] = useState<boolean>(false)
    const [replyComment, setReplyComment] = useState<IComment|null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingComment, setLoadingComment] = useState<boolean>(false)
    const [loadingVideo, setLoadingVideo] = useState<boolean>(true)

    const video = useRef<any>(null);
    
    const navigation = useNavigation();

    const handleRefetch = () => {
        setRefetch(prev => prev + 1)
        setLoading(false)
        setLoadingComment(false)
    }

    const fetchArticle = async () => {
        setLoading(true)
        try {
            const { data: { article } } = await api.get(`/articles/${id}`);
            setArticle(article);
        } catch (error: any) {
            const message = error.response.data.message ?? 'Ocorreu um erro, tente novamente';
            Alert.alert('Erro', message, [{ text: 'OK' }])
            navigation.goBack()
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchArticle()
    }, [refetch, route])

    const handleLike = async () => {
        await api.post(`/articles/${id}/like`)
        handleRefetch()
    }

    const handleComment = async () => {
        setLoadingComment(true)
        try {
            const data: any = { message: reply, anonymous_publication: false }

            if (replyComment) {
                data.comment_id = replyComment.id
            }

            await api.post(`/articles/${id}/comment`, data)
            
            setReply('')
            setReplyComment(null)

            handleRefetch()
        } catch (error: any) {
            console.error('verPublicacao->handleComment: ', error.response.data.error)
            const message = error.response.data.message ?? 'Ocorreu um erro, tente novamente';
            Alert.alert('Erro', message, [{ text: 'OK' }])
        }
    }

    const prefix = createURL("/")

    const handleShare = async () => {
        await Share.share({
            message: `Compartilhando o artigo ${article.title} que vi no MedHelping`,
            url: `https://api.medhelping.com.br/api/app?prefix=${prefix}&path=viewPublication&id=${id}`
        })

        try {
            await api.post(`/articles/${id}/share`)
            handleRefetch()
        } catch (error: any) {
            console.error('verPublicacao->handleShare: ', error.response.data.error)
            const message = error.response.data.message ?? 'Ocorreu um erro, tente novamente';
            Alert.alert('Erro', message, [{ text: 'OK' }])
        }
    }

    const showImageFull = () => {
        if (!article.image) return
        
        navigation.navigate('viewPublicationImage', { image: article.image })
    }

    const showImageFull2 = () => {
        if (!article.image2) return
        
        navigation.navigate('viewPublicationImage', { image: article.image2 })
    }

    const showImageFull3 = () => {
        if (!article.image3) return
        
        navigation.navigate('viewPublicationImage', { image: article.image3 })
    }

    const handleDelete = () => {
        Alert.alert('Atenção', 'Deseja realmente excluir esta publicação?', [
            { text: 'Não' },
            { text: 'Sim', onPress: async () => {
                try {
                    await api.delete(`/articles/${id}`)
                    navigation.goBack()
                } catch (error: any) {
                    console.error('verPublicacao->handleDelete: ', error.response.data.error)
                    const message = error.response.data.message ?? 'Ocorreu um erro, tente novamente';
                    Alert.alert('Erro', message, [{ text: 'OK' }])
                }
            }}
        ])
    }

    const { bottom } = useSafeAreaInsets()
    const styles = StyleSheet.create({
        input: {
            borderColor: 'white',
            borderWidth: 1,
            color: 'white'
        }
    })

    const fileType = article?.image?.split('.').pop()?.toLowerCase()
    const fileType2 = article?.image2?.split('.').pop()?.toLowerCase()
    const fileType3 = article?.image3?.split('.').pop()?.toLowerCase()

    let articleFile = examBackground
    if (article?.image) {
        articleFile = { uri: article?.image }
    }

    const width = Dimensions.get('window').width;

    let carouselData = []

    if (article?.image) {
        carouselData.push({
            file: article?.image,
            fileType: fileType,
            fullFile: showImageFull
        })
    }

    if (article?.image2) {
        carouselData.push({
            file: article?.image2,
            fileType: fileType2,
            fullFile: showImageFull2
        })
    }

    if (article?.image3) {
        carouselData.push({
            file: article?.image3,
            fileType: fileType3,
            fullFile: showImageFull3
        })
    }

    return (
        <>
            <SidebarProvider>
                <TouchableBlur />
                <Header />
                <SideMenu />
            </SidebarProvider>
            <KeyboardAwareScrollView extraScrollHeight={15} className="w-screen bg-background h-full">
                {!loading ? (
                    <>
                        <View style={{ flex: 1 }}>
                            <Carousel
                                loop
                                width={width}
                                height={width / 2}
                                autoPlay={carouselData.length > 1}
                                data={carouselData}
                                scrollAnimationDuration={2000}
                                renderItem={({ item: { file, fileType, fullFile }, index }: any) => (
                                    <View>
                                        {(fileType === 'mp4' || fileType === 'mov') ? (
                                            <>
                                                {loadingVideo && (
                                                    <ActivityIndicator size="large" color="white" className="h-40" />
                                                )}
                                                <Video
                                                    ref={video}
                                                    className={`w-full ${!loadingVideo ? 'h-60' : ''}`}
                                                    source={{ uri: file }}
                                                    onPlaybackStatusUpdate={(status: any) => status.isLoaded && setLoadingVideo(false)}
                                                    useNativeControls
                                                    resizeMode={ResizeMode.CONTAIN}
                                                />
                                            </>
                                        ) : (
                                            <Pressable onPress={fullFile}>
                                                <Image className="w-full h-40 object-cover" source={{ uri: file }} defaultSource={examBackground} />
                                            </Pressable>
                                        )}
                                    </View>
                                )}
                            />
                        </View>
                        <View className="p-4 border-b mb-4 border-b-[#1F2935]">
                            <View className="w-full">
                                <Text className="text-white text-center font-900 text-xl py-2">
                                    {article.title}
                                </Text>
                                    
                                {article.is_the_owner && (
                                    <TouchableOpacity onPress={handleDelete}>
                                        <Text className="absolute right-0 -top-10">
                                            <Feather name='trash' size={24} color="red" />
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                            {article.user && !article.anonymous_publication ? (
                                <TouchableOpacity 
                                    className="flex flex-row justify-center"
                                    onPress={() => navigation.navigate('viewProfile', {id: article.user?.id})}
                                >
                                    <Text className="text-blue-500 text-center font-700 text-sm py-2">
                                        {article.user?.name}
                                    </Text>
                                    <Text className="text-white text-center font-500 text-sm py-2">
                                        {''} em {article.created_at?.substring(0, 10)}
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <Text className="text-white text-center font-500 text-sm py-2">
                                    Anônimo em {article.created_at?.substring(0, 10)}
                                </Text>
                            )}
                            <Text className="text-white text-center font-500 text-sm py-2">{article.description}</Text>
                            <View className="flex-row justify-between items-center px-2 my-2">
                                <View className="flex-row">
                                    <TouchableOpacity onPress={handleShare}>
                                        <FontAwesome5 name="share" size={24} color="white" />
                                    </TouchableOpacity>
                                    <Text className="text-white text-base pl-3">{article.quantity_shared}</Text>
                                </View>
                                <View className="flex-row">
                                    <Text className="text-white text-base pr-3">{article.likes}</Text>
                                    <TouchableOpacity onPress={handleLike}>
                                        <AntDesign name={article.userLiked ? 'like1' : 'like2'} size={24} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {article.comments?.map(comment => (
                            <View key={comment.id} className="w-full">
                                <ArticleComment comment={comment} setReplyComment={setReplyComment} handleRefetch={handleRefetch} setLoading={setLoading} canReply />
                                {comment.nodeComments && (
                                    <View className="pl-6 mb-4 border-l border-l-[#1F2935]">
                                        {comment.nodeComments?.map(nodeComment => (
                                            <ArticleComment key={nodeComment.id} comment={nodeComment} setReplyComment={setReplyComment} setLoading={setLoading} handleRefetch={handleRefetch} />
                                        ))}
                                    </View>
                                )}
                            </View>
                        ))}
                    </>
                ) : (
                    <View className="flex-1 justify-center h-40">
                        <ActivityIndicator size="large" color="white" />
                    </View>
                )}
                
                <View style={{ paddingBottom: bottom }} className='bg-background mt-auto border-t-2 border-t-[#1F2935] w-screen'>
                    {replyComment && (
                        <View className="flex-row justify-between px-4 items-center pt-3">
                            <View className="bg-[#1F2935] w-4/5 rounded-lg p-2">
                                <Text numberOfLines={1} className="text-white">{replyComment.message}</Text>
                            </View>
                            <TouchableOpacity 
                                onPress={() => setReplyComment(null)} 
                                className="w-8 h-8 bg-[#1F2935] rounded-full justify-center items-center"
                            >
                                <Text className="text-white font-700 text-lg">X</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    <View className='flex-row px-4 justify-between items-start py-3 w-screen'>
                        <View className="flex flex-col w-4/5">
                            <TextInput
                                style={styles.input}
                                placeholder='Adicionar um comentário'
                                className='h-10 w-4/5 rounded-xl text-sm font-400 px-4'
                                placeholderTextColor={'white'}
                                value={reply}
                                onChangeText={setReply}
                                maxLength={255}
                            />
                            <Text className={`pb-10 pl-2 ${reply.length == 255 ? 'text-red-500' : 'text-white'}`}>{reply.length}/255 caracteres</Text>
                        </View>
                        <TouchableOpacity 
                            onPress={handleComment} 
                            activeOpacity={0.6} 
                            disabled={loadingComment}
                            className="h-9 w-9 mb-5 rounded-full justify-center items-center bg-[#07acf7]"
                        >
                            {loadingComment ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                <Ionicons name="send" size={20} color="white" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </>
    )
}