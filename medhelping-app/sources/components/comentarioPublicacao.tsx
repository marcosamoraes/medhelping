import { Image, Text, View } from "react-native";

const avatarTemplate = require("../../assets/images/avatar-template.jpg")

interface ComentarioProps {
    username: string;
    content: string;
}

//Adicionar imagem como props
export default function ComentarioPublicacao({ username, content }: ComentarioProps) {
    return (<>
        <View className="flex-row w-full px-4 pb-6">
            <Image className="w-10 h-10 object-cover rounded-full" source={avatarTemplate} />
            <View className="pl-4 pr-9">
                <Text className="text-white font-900 text-sn">{username}</Text>
                <Text className="text-white font-500 text-sn">{content}</Text>
            </View>
        </View>
    </>)
}