import { Image, Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const avatarTemplate = require("../../assets/images/avatar-template.jpg")

interface ComentarioProps {
    username: string;
    content: string;
    isResponse: boolean;
    setResponseId: (id: number) => void;
}

//Adicionar imagem como props
export default function ComentarioPublicacao({ username, content, isResponse, setResponseId }: ComentarioProps) {
    return (<>

        <View className="flex-row justify-evenly w-full px-6 my-3">
            <Image className="w-10 h-10 object-cover rounded-full" source={avatarTemplate} />
            <View className="px-6">
                <Text className="text-white font-900 text-sn">{username}</Text>
                <Text className="text-white font-500 text-sn">{content}</Text>
            </View>
            <TouchableOpacity className="items-center my-auto">
                <AntDesign name="like1" size={20} color="white" />
                {/* <Feather name="trash-2" size={20} color="red" /> */}
                <Text className="text-white pt-2">2</Text>
            </TouchableOpacity>
        </View>
        {isResponse ? '' : <TouchableOpacity onPress={() => setResponseId(1)} className="ml-auto mr-4 mb-2"><Text className="text-white font-300 text-sm italic">Responder comentário...</Text></TouchableOpacity>}
    </>)
}