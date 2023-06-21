import { Image, Text, View } from "react-native";
interface CategoriaProps {
    categoryname:string;
    username: string;
    date: string;
   }
export default function CategoriaCard({categoryname, username, date}:CategoriaProps){
    return (<>
    <View style={{width: '47%'}} className="border border-[#1F2935] rounded-xl mb-6 overflow-hidden">
        <Image className="w-full mb-1 rounded-xl h-20 object-cover" source={require('../../assets/images/img-fundo-exame.png')} />
    <Text className="px-2 py-1 font-900 text-base text-white">{categoryname}</Text>
    <Text className="px-2 pb-1 font-400 text-sm text-white">{username} em</Text>
    <Text className="px-2 pb-2 font-400 text-sm text-white">{date}</Text>
    </View>
    </>)
}