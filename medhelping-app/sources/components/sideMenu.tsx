import { Image, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SideMenu(){
    const { top, bottom } = useSafeAreaInsets()
    return(<View style={{paddingTop : top, paddingBottom: bottom}} className="w-full px-5 bg-[#00021C] h-full">
    <View className="w-full border-b pb-5 border-b-[#1F2935]">
    <Image source={require("../../assets/images/avatar-template.jpg")} className="h-20 w-20 object-cover rounded-full mx-auto my-4" />
    <Text className="font-900 text-white text-center text-xl">Roland de Gilead</Text>
    <Text className="font-500 text-white text-center text-base">Breve descrição e tal</Text>            
    </View>
    <View className=" py-3">
        <View className="flex-row py-2"><FontAwesome name="home" size={26} color="white" /><Text className="pt-1 pl-4 font-900 text-white text-xl">Início</Text></View>
        <View className="flex-row py-2"><Ionicons name="person" size={26} color="white" /><Text className="pt-1 pl-4 font-900 text-white text-xl">Perfil</Text></View>
        <View className="flex-row py-2"><FontAwesome name="plus" size={26} color="white" /><Text className="pt-1 pl-4 font-900 text-white text-xl">Publicar Diagnóstico</Text></View>
        <View className="flex-row py-2"><FontAwesome name="plus" size={26} color="white" /><Text className="pt-1 pl-4 font-900 text-white text-xl">Publicar Plantão</Text></View>
        <View className="flex-row py-2"><FontAwesome name="list-ul" size={26} color="white" /><Text className="pt-1 pl-4 font-900 text-white text-xl">Categorias</Text></View>
        <View className="flex-row py-2"><FontAwesome name="gear" size={26} color="white" /><Text className="pt-1 pl-4 font-900 text-white text-xl">Configurações</Text></View>
    </View>
    <TouchableOpacity activeOpacity={0.8} className="w-full mt-auto mb-6 mx-auto bg-[#db0303b2] justify-center pt-2 pb-1 rounded-xl items-center"><Text className="font-700 text-white text-base">Encerrar Sessão</Text></TouchableOpacity>
    </View>)
}