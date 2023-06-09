import { TouchableOpacity, View, Text } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';

export default function Footer(){
    const { bottom } = useSafeAreaInsets()
    return (<>
    <View style={{paddingBottom : bottom}} className='bg-[#01061C] mt-auto border-t-2 border-t-[#1F2935] w-screen'>
        <View className='flex-row px-4 justify-between pt-3 pb-4 w-screen'>
        <FontAwesome name="home" size={24} color="white" />
        <FontAwesome name="list-ul" size={24} color="white" />
        <TouchableOpacity activeOpacity={0.9} className="rounded-full w-14 h-14 shadow-md items-center justify-center mt-[-34] bg-white"><Text className="text-[#03DADB] text-4xl">+</Text></TouchableOpacity>
        <FontAwesome name="gear" size={24} color="white" />
        <Ionicons name="person" size={24} color="white" />
        </View>
    </View>
    </>)
}