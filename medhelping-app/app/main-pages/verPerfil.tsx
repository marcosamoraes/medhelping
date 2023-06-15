import { Image, ImageBackground, ScrollView, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Footer from "../../sources/components/footer";
import Header from "../../sources/components/header";
import { FontAwesome } from '@expo/vector-icons';

export default function VerPerfil() {
    const styles = StyleSheet.create({
        imageBackground: {
            flex: 1,
            resizeMode: 'cover',
        }
    });
    return (<>
        <Header />
        <ScrollView className="bg-[#00021C]">
            <ImageBackground blurRadius={10} className="w-full" style={styles.imageBackground} source={require("../../assets/images/avatar-template.jpg")}>
            <View className="w-full bg-[#505050b1]">
                <View className="my-4 relative mx-auto">
                    <Image source={require("../../assets/images/avatar-template.jpg")} className="h-28 w-28 object-cover rounded-full" />
                    <TouchableOpacity activeOpacity={0.7} className="bg-[#00021C] w-10 h-10 items-center justify-center rounded-full absolute z-10 right-0 bottom-0"><FontAwesome name="gear" size={20} color="white" /></TouchableOpacity>
                </View>
                <Text className="font-900 text-white text-center text-xl">Roland de Gilead</Text>
                <Text className="font-500 text-white text-center text-base">Breve descrição e tal</Text>
                <TouchableOpacity activeOpacity={0.8} className="w-1/2 mx-auto bg-[#07acf7] justify-center pt-2 pb-1 rounded-xl mt-3 mb-5 items-center"><Text className="text-white font-600 text-sm ml-2">Editar Perfil</Text></TouchableOpacity>
                <View className="flex-row mb-5 w-1/2 justify-between items-center mx-auto">
                    <TouchableOpacity className="h-9 w-9 rounded-full justify-center items-center bg-[#3C5A99]"><FontAwesome name="facebook-f" size={20} color="white" /></TouchableOpacity>
                    <TouchableOpacity className="h-9 w-9 rounded-full justify-center items-center bg-[#E5535F]"><FontAwesome name="instagram" size={22} color="white" /></TouchableOpacity>
                    <TouchableOpacity className="h-9 w-9 rounded-full justify-center items-center bg-[#24A1F2]"><FontAwesome name="twitter" size={20} color="white" /></TouchableOpacity>
                </View>
                </View>
            </ImageBackground>
            <View className="px-6 py-3 border-b border-b-[#1F2935]">
                <Text className="font-700 mb-1 text-white">Localização</Text>
                <Text className="font-700 text-[#03DADB]">Brazil, Brazil</Text>
            </View>
            <View className="px-6 py-3 border-b border-b-[#1F2935]">
                <Text className="font-700 mb-1 text-white">Quantidade de publicações</Text>
                <Text className="font-700 text-[#03DADB]">1 publicação</Text>
            </View>
            <View className="px-6 py-3 border-b border-b-[#1F2935]">
                <Text className="font-700 mb-1 text-white">Quantidade de curtidas</Text>
                <Text className="font-700 text-[#03DADB]">5 curtidas</Text>
            </View>
        </ScrollView>
        <Footer />
    </>)
}