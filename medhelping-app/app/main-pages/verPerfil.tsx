import { Image, ImageBackground, ScrollView, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Footer from "@components/footer";
import Header from "@components/header";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "expo-router";
import SidebarProvider from "@contexts/Sidebar";
import SideMenu from "@components/sideMenu";
import TouchableBlur from "@components/touchableBlur";

const doctoraliaImg = require('../../assets/images/doctoralia.png');

export default function VerPerfil() {
    const navigation = useNavigation();

    function handleEditProfile(){
        navigation.navigate("editProfile")
    }

    const styles = StyleSheet.create({
        imageBackground: {
            flex: 1,
            resizeMode: 'cover',
        }
    });

    return (
        <>
            <SidebarProvider>
                <TouchableBlur/>
                <Header/>
                <SideMenu/>
            </SidebarProvider>
            <ScrollView className="bg-[#00021C]">
                <ImageBackground blurRadius={10} className="w-full" style={styles.imageBackground} source={require("../../assets/images/avatar-template.jpg")}>
                <View className="w-full bg-[#505050b1]">
                    <View className="my-4 relative mx-auto">
                        <Image source={require("../../assets/images/avatar-template.jpg")} className="h-28 w-28 object-cover rounded-full" />
                        <TouchableOpacity
                            activeOpacity={0.7} 
                            className="bg-[#00021C] w-10 h-10 items-center justify-center rounded-full absolute z-10 right-0 bottom-0"
                        >
                            <FontAwesome name="gear" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text className="font-900 text-white text-center text-xl">Roland de Gilead</Text>
                    <Text className="font-500 text-white text-center text-base">Breve descrição</Text>
                    <TouchableOpacity
                        onPress={()=>handleEditProfile()} 
                        activeOpacity={0.8} 
                        className="w-1/2 mx-auto bg-[#07acf7] justify-center pt-2 pb-1 rounded-xl mt-3 mb-5 items-center"
                    >
                        <Text className="text-white font-600 text-sm ml-2">Editar Perfil</Text>
                    </TouchableOpacity>
                    <View className="flex-row mb-5 w-2/3 justify-between items-center mx-auto">
                        <TouchableOpacity
                            className="h-9 w-9 rounded-full justify-center items-center bg-[#3C5A99]"
                        >
                            <FontAwesome name="facebook-f" size={20} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="h-9 w-9 rounded-full justify-center items-center bg-[#E5535F]"
                        >
                            <FontAwesome name="instagram" size={22} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="h-9 w-9 rounded-full justify-center items-center bg-[#24A1F2]"
                        >
                            <FontAwesome name="twitter" size={20} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="h-9 w-9 rounded-full justify-center items-center bg-[#5DC4A5]"
                        >
                            <Image source={doctoraliaImg} className="w-5 h-5 object-cover"/>
                        </TouchableOpacity>
                    </View>
                    </View>
                </ImageBackground>
                <View className="px-6 flex-row justify-between py-3 border-b border-b-[#1F2935]">
                    <View>
                        <Text className="font-700 mb-1 text-white">Localização</Text>
                        <Text className="font-700 text-[#03DADB]">Brazil, Brazil</Text>
                    </View>
                    <View>
                        <Text className="font-700 mb-1 text-right text-white">CRM</Text>
                        <Text className="font-700 text-right text-[#03DADB]">123456-RJ</Text>
                    </View>
                </View>
                <View className="px-6 flex-row justify-between py-3 border-b border-b-[#1F2935]">
                    <View>
                        <Text className="font-700 mb-1 text-white">Área de ocupação</Text>
                        <Text className="font-700 text-[#03DADB]">Odontologia</Text>
                    </View>
                    <View>
                        <Text className="font-700 text-right mb-1 text-white">Especialidade</Text>
                        <Text className="font-700 text-right text-[#03DADB]">Hiperbárica</Text>
                    </View>
                </View>
                <View className="px-6 flex-row justify-between py-3 border-b border-b-[#1F2935]">
                    <View>
                        <Text className="font-700 mb-1 text-white">Faculdade</Text>
                        <Text className="font-700 text-[#03DADB]">USP</Text>
                    </View>
                    <View>
                        <Text className="font-700 text-right mb-1 text-white">Formado em</Text>
                        <Text className="font-700 text-right text-[#03DADB]">1975</Text>
                    </View>
                </View>
                
                <View className="px-6 mb-6 flex-row justify-between py-3 border-b border-b-[#1F2935]">
                    <View>
                        <Text className="font-700 my-1 text-sm text-white">2 publicações</Text>
                    </View>
                    <View>
                        <Text className="font-700 my-1 text-sm text-white">53 curtidas</Text>
                    </View>
                </View>
            </ScrollView>
            <Footer />
        </>
    )
}