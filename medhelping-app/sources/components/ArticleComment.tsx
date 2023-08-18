import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { api } from "@services/api";
import IComment from "@interfaces/IComment";
import { useNavigation } from "expo-router";

const avatarTemplate = require("../../assets/images/user.png")

type ArticleCommentProps = {
    comment: IComment
    setReplyComment: (comment: IComment) => void
    canReply?: boolean
    handleRefetch: () => void
    setLoading: (value: boolean) => void
}

export default function ArticleComment({ comment, setReplyComment, handleRefetch, canReply = false, setLoading }: ArticleCommentProps) {
    const { id, user, anonymous_publication, message, is_the_owner, quantity_likes, user_liked } = comment;

    const navigation = useNavigation();

    const handleDelete = async () => {
        setLoading(true)
        try {
            await api.delete(`/comments/${id}`)
            handleRefetch()
        } catch (error: any) {
            const message = error.response.data.message ?? 'Ocorreu um erro, tente novamente';
            Alert.alert('Erro', message, [{ text: 'OK' }])
        } finally {
            setLoading(false)
        }
    }

    const handleLike = async () => {
        setLoading(true)
        try {
            await api.post(`/comments/${id}/like`)
            handleRefetch()
        } catch (error: any) {
            console.error('articleComment: ', error.response.data.error)
            const message = error.response.data.message ?? 'Ocorreu um erro, tente novamente';
            Alert.alert('Erro', message, [{ text: 'OK' }])
        } finally {
            setLoading(false)
        }
    }

    const commentImage = user.image ? { uri: user.image } : avatarTemplate;
    
    return (
        <>
            <View className="flex-row justify-between w-full px-6 my-3">
                <View className="flex-row w-10/12">
                    <Image className="w-10 h-10 object-cover rounded-full" source={commentImage} />
                    <View className="px-6">
                        {user && !comment.anonymous_publication ? (
                            <TouchableOpacity 
                                onPress={() => navigation.navigate('viewProfile', {id: user.id})}
                            >
                                <Text className="text-blue-500 font-900 text-sm">{user.name}</Text>
                            </TouchableOpacity>
                        ) : (
                            <Text className="text-white font-900 text-sm">
                                Anônimo
                            </Text>
                        )}
                        
                        <Text className="text-white font-500 text-sm">{message}</Text>
                    </View>
                </View>
                <TouchableOpacity className="items-center my-auto w-1/12">
                    {is_the_owner ? (
                        <TouchableOpacity onPress={handleDelete}>
                            <Feather name="trash-2" size={20} color="red" />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={handleLike}>
                            <AntDesign name={user_liked ? 'like1' : 'like2'} size={20} color="white" />
                        </TouchableOpacity>
                    )}
                    
                    <Text className="text-white pt-2">{quantity_likes}</Text>
                </TouchableOpacity>
            </View>
            {canReply && (
                <TouchableOpacity onPress={() => setReplyComment(comment)} className="ml-auto mr-4 mb-2">
                    <Text className="text-white font-300 text-sm italic">Responder comentário...</Text>
                </TouchableOpacity>
            )}
        </>
    )
}