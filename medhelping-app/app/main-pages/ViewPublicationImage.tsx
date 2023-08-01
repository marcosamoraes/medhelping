import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import Header from "@components/header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";

export default function ViewPublicationImage() {
    const route = useRoute();
    const { image }: any = route.params;

    const [ loading, setLoading ] = useState<boolean>(true)

    const navigation = useNavigation();

    const { top } = useSafeAreaInsets()

    return (
        <View style={{paddingTop : top}} className="w-screen bg-background h-full">
            <TouchableOpacity 
                activeOpacity={0.8} 
                className="flex-row w-full bg-none justify-start ml-5 py-2 rounded-xl my-3 items-center"
                onPress={() => navigation.goBack()}
            >
                <Feather name="arrow-left" size={18} color="white" />
                <Text className="text-white font-700 text-sm ml-2">Voltar</Text>
            </TouchableOpacity>
            <View className="flex justify-center items-center h-[80%]">
                {loading && (
                    <ActivityIndicator size="large" color="#fff" />
                )}
                <Image className={`w-[90%] h-[90%] ${loading ?? 'hidden'}`} source={{uri: image}} resizeMode='contain' onLoad={() => setLoading(false)} />
            </View>
        </View>
    )
}