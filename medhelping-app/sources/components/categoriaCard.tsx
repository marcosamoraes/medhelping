import { Image, Text, View } from "react-native";

const backgroundImage = require('../../assets/images/img-fundo-exame.png')

interface CategoriaProps {
    categoryname:string;
}

export default function CategoriaCard({categoryname}:CategoriaProps){
    return (
        <View style={{width: '30%'}} className="border mx-auto border-[#1F2935] rounded-xl mb-6 overflow-hidden">
            <Image className="w-full mb-1 rounded-xl h-20 object-cover" source={backgroundImage} />
            <Text className="px-2 py-1 font-900 text-sm text-center text-white">{categoryname}</Text>
        </View>
    )
}