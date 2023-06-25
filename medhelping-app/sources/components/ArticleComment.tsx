import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { api } from "@services/api";
import IComment from "@interfaces/IComment";
import { useNavigation } from "expo-router";

const avatarTemplate = require("../../assets/images/avatar-template.jpg")

type ArticleCommentProps = {
    comment: IComment
    setReplyComment: (comment: IComment) => void
    canReply?: boolean
    handleRefetch: () => void
}

export default function ArticleComment({ comment, setReplyComment, handleRefetch, canReply = false }: ArticleCommentProps) {
    const { id, user, anonymous_publication, message, is_the_owner, quantity_likes, user_liked } = comment;

    const navigation = useNavigation();

    const handleDelete = async () => {
        try {
            await api.delete(`/comments/${id}`)
            handleRefetch()
        } catch (error: any) {
            const message = error.response.data.message ?? 'Ocorreu um erro, tente novamente';
            Alert.alert('Erro', message, [{ text: 'OK' }])
        }
    }

    const handleLike = async () => {
        try {
            await api.post(`/comments/${id}/like`)
            handleRefetch()
        } catch (error: any) {
            console.error(error.response.data.error)
            const message = error.response.data.message ?? 'Ocorreu um erro, tente novamente';
            Alert.alert('Erro', message, [{ text: 'OK' }])
        }
    }

    const commentImage = user.image ? { uri: user.image } : avatarTemplate;
    
    return (
        <>
            <View className="flex-row justify-between w-full px-6 my-3">
                <View className="flex-row">
                    <Image className="w-10 h-10 object-cover rounded-full" source={commentImage} />
                    <View className="px-6">
                        {user && !comment.anonymous_publication ? (
                            <TouchableOpacity 
                                onPress={() => navigation.navigate('viewProfile', {id: user.id})}
                            >
                                <Text className="text-blue-500 font-900 text-sn">{user.name}</Text>
                            </TouchableOpacity>
                        ) : (
                            <Text className="text-white font-900 text-sn">
                                Anônimo
                            </Text>
                        )}
                        
                        <Text className="text-white font-500 text-sn">{message}</Text>
                    </View>
                </View>
                <TouchableOpacity className="items-center my-auto">
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