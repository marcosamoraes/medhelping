import { Image, Text, View } from "react-native";

const backgroundImage = require('../../assets/images/img-fundo-exame.png')

interface CategoriaProps {
    categoryname:string;
    image:string | null;
}

export default function CategoriaCard({categoryname, image}:CategoriaProps){
    return (
        <View style={{width: '30%'}} className="border mx-auto border-[#1F2935] rounded-xl mb-6 overflow-hidden">
            <Image className="w-full mb-1 rounded-xl h-20 object-cover" source={image? image : backgroundImage} />
            <Text className="px-2 my-auto py-1 font-800 text-sm text-center text-white">{categoryname}</Text>
        </View>
    )
}