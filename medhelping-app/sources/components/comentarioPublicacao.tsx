import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { api } from "@services/api";

const avatarTemplate = require("../../assets/images/avatar-template.jpg")

interface ComentarioProps {
    id: number;
    username: string;
    content: string;
    isResponse: boolean;
    is_the_owner: boolean;
    setResponseId: (id: number) => void;
}

//Adicionar imagem como props
export default function ComentarioPublicacao({ id, username, content, isResponse, setResponseId, is_the_owner }: ComentarioProps) {
    //funcao de deletar o comentario
    function handleDelete() {
        api.delete(`/comments/${id}`).then(() => {
            //fazer atualizar o componente pai?
            //pedir confirmacao?
        }).catch(() => {
            Alert.alert('Erro', 'Ocorreu um erro, tente novamente', [{ text: 'OK' }])
        })
    }
    function handleLike() {
        api.post(`/comments/${id}/like`).then(() => {
            //fazer atualizar o componente pai
        }).catch(() => {
            Alert.alert('Erro', 'Ocorreu um erro, tente novamente', [{ text: 'OK' }])
        })
    }
    
    return (<>

        <View className="flex-row justify-evenly w-full px-6 my-3">
            <Image className="w-10 h-10 object-cover rounded-full" source={avatarTemplate} />
            <View className="px-6">
                <Text className="text-white font-900 text-sn">{username}</Text>
                <Text className="text-white font-500 text-sn">{content}</Text>
            </View>
            <TouchableOpacity className="items-center my-auto">
                {is_the_owner? <TouchableOpacity onPress={handleDelete}><Feather name="trash-2" size={20} color="red" /></TouchableOpacity> : <TouchableOpacity onPress={handleLike}><AntDesign name="like1" size={20} color="white" /></TouchableOpacity>}
                
                
                <Text className="text-white pt-2">2</Text>
            </TouchableOpacity>
        </View>
        {isResponse ? '' : <TouchableOpacity onPress={() => setResponseId(1)} className="ml-auto mr-4 mb-2"><Text className="text-white font-300 text-sm italic">Responder comentário...</Text></TouchableOpacity>}
    </>)
}