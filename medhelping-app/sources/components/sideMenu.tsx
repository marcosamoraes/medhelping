import { Image, Text, TouchableOpacity, View, Animated, StyleSheet } from "react-native";
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, useNavigation } from "expo-router";
import { useContext } from "react";
import { SidebarContext } from "@contexts/Sidebar";
import { AuthContext } from "@contexts/Auth";

const avatarTemplate = require("../../assets/images/avatar-template.jpg")

export default function SideMenu() {
    const { logout, user } = useContext(AuthContext);

    const navigation = useNavigation();
    
    function handleExit() {
        logout()
    }
    
    const { isOpen } = useContext(SidebarContext);
    const { top, bottom } = useSafeAreaInsets();

    const styles = StyleSheet.create({
        sideMenu:{
            paddingBottom: bottom,
            paddingTop: top,
        }
    })

    

    return(
    <Animated.View style={styles.sideMenu} className={`w-4/5 z-50 ${isOpen ? 'left-0' : '-left-full'} absolute px-5 bg-[#00021C] h-full`}>
        <View className="w-full border-b pb-5 border-b-[#1F2935]">
            <Image source={user.image? user.image : avatarTemplate} className="h-20 w-20 object-cover rounded-full mx-auto my-4" />
            <Text className="font-900 text-white text-center text-xl">{user.name}</Text>
            {/* <Text className="font-500 text-white text-center text-base">Breve descrição</Text>             */}
        </View>
        <View className=" py-3">
            <TouchableOpacity onPress={() => navigation.navigate('home')}>
                <View className="flex-row py-2">
                    <FontAwesome name="home" size={26} color="white" />
                    <Text className="pt-1 pl-4 font-900 text-white text-xl">
                        Início
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('viewProfile', {id: 1})}>
                <View className="flex-row py-2">
                    <Ionicons name="person" size={26} color="white" />
                    <Text className="pt-1 pl-4 font-900 text-white text-xl">
                        Perfil
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('publishArticle')}>
                <View className="flex-row py-2">
                    <FontAwesome name="plus" size={26} color="white" />
                    <Text className="pt-1 pl-4 font-900 text-white text-xl">
                        Publicar Diagnóstico
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('publishShift')}>
                <View className="flex-row py-2">
                    <FontAwesome name="plus" size={26} color="white" />
                    <Text className="pt-1 pl-4 font-900 text-white text-xl">
                        Publicar Plantão
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('listCategories')}>
                <View className="flex-row py-2">
                    <FontAwesome name="list-ul" size={26} color="white" />
                    <Text className="pt-1 pl-4 font-900 text-white text-xl">
                        Categorias
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('settings')}>
                <View className="flex-row py-2">
                    <FontAwesome name="gear" size={26} color="white" />
                    <Text className="pt-1 pl-4 font-900 text-white text-xl">
                        Configurações
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
        <TouchableOpacity 
            onPress={handleExit} 
            activeOpacity={0.8} 
            className="w-full mt-auto mb-6 mx-auto bg-[#db0303b2] justify-center pt-2 pb-1 rounded-xl items-center"
        >
            <Text className="font-700 text-white text-base">Encerrar Sessão</Text>
        </TouchableOpacity>
    </Animated.View>
    )
}