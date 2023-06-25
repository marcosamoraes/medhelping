import { Image, ImageBackground, ScrollView, View, StyleSheet, TouchableOpacity, Text, Alert, Linking } from "react-native";
import Footer from "@components/footer";
import Header from "@components/header";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "expo-router";
import SidebarProvider from "@contexts/Sidebar";
import SideMenu from "@components/sideMenu";
import TouchableBlur from "@components/touchableBlur";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@contexts/Auth";
import { useRoute } from "@react-navigation/native";
import IUser from "@interfaces/IUser";
import { api } from "@services/api";

const doctoraliaImg = require('../../assets/images/doctoralia.png');
const avatarImg = require('../../assets/images/avatar-template.jpg');

export default function VerPerfil() {
    const route = useRoute();
    const { id }: any = route.params ?? { id: null }
    
    const { user, updateUser } = useContext(AuthContext)
    const [userData, setUserData] = useState<IUser>({} as IUser)

    const navigation = useNavigation();

    const fetchUserData = async () => {
        try {
            const response = await api.get(`/users/${id}`)
            setUserData(response.data)
        } catch (error: any) {
            const message = error.response.data.message ?? 'Ocorreu um erro, tente novamente'
            Alert.alert('Erro', message, [{ text: 'OK' }])
            console.error(error.response.data.error ?? error)
        }
    }

    useEffect(() => {
        if (id) {
            fetchUserData()
        } else {
            setUserData(user)
        }
    }, [id])


    const handleEditProfile = () => {
        navigation.navigate("editProfile")
    }

    const styles = StyleSheet.create({
        imageBackground: {
            flex: 1,
            resizeMode: 'cover',
        }
    });

    const avatar = userData.image ? { uri: userData.image } : avatarImg

    return (
        <>
            <SidebarProvider>
                <TouchableBlur/>
                <Header/>
                <SideMenu/>
            </SidebarProvider>
            <ScrollView className="bg-background">
                <ImageBackground blurRadius={10} className="w-full" style={styles.imageBackground} source={avatar}>
                <View className="w-full bg-[#505050b1]">
                    <View className="my-4 relative mx-auto">
                        <Image source={avatar} className="h-28 w-28 object-cover rounded-full" />
                        <TouchableOpacity
                            activeOpacity={0.7} 
                            className="bg-background w-10 h-10 items-center justify-center rounded-full absolute z-10 right-0 bottom-0"
                        >
                            <FontAwesome name="gear" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text className="font-900 text-white text-center text-xl">{user.name}</Text>
                    {/* <Text className="font-500 text-white text-center text-base">Breve descrição</Text> */}
                    <TouchableOpacity
                        onPress={()=>handleEditProfile()} 
                        activeOpacity={0.8} 
                        className="w-1/2 mx-auto bg-[#07acf7] justify-center pt-2 pb-1 rounded-xl mt-3 mb-5 items-center"
                    >
                        <Text className="text-white font-600 text-sm ml-2">Editar Perfil</Text>
                    </TouchableOpacity>
                    <View className="flex-row mb-5 w-2/3 justify-evenly items-center mx-auto">
                        {userData.infos?.link_facebook && (
                            <TouchableOpacity
                                className="h-9 w-9 rounded-full justify-center items-center bg-[#3C5A99]"
                                onPress={() => Linking.openURL(userData.infos.link_facebook) }
                            >
                                <FontAwesome name="facebook-f" size={20} color="white" />
                            </TouchableOpacity>
                        )}
                        {userData.infos?.link_instagram && (
                            <TouchableOpacity
                                className="h-9 w-9 rounded-full justify-center items-center bg-[#E5535F]"
                                onPress={() => Linking.openURL(userData.infos.link_instagram) }
                            >
                                <FontAwesome name="instagram" size={20} color="white" />
                            </TouchableOpacity>
                        )}
                        {userData.infos?.link_twitter && (
                            <TouchableOpacity
                                className="h-9 w-9 rounded-full justify-center items-center bg-[#24A1F2]"
                                onPress={() => Linking.openURL(userData.infos.link_twitter) }
                            >
                                <FontAwesome name="twitter" size={20} color="white" />
                            </TouchableOpacity>
                        )}
                        {userData.infos?.link_doctoralia && (
                            <TouchableOpacity
                                className="h-9 w-9 rounded-full justify-center items-center bg-[#5DC4A5]"
                                onPress={() => Linking.openURL(userData.infos.link_doctoralia) }
                            >
                                <Image source={doctoraliaImg} className="w-5 h-5 object-cover"/>
                            </TouchableOpacity>
                        )}
                    </View>
                    </View>
                </ImageBackground>
                <View className="px-6 flex-row justify-between py-3 border-b border-b-[#1F2935]">
                    <View>
                        <Text className="font-700 mb-1 text-white">Localização</Text>
                        <Text className="font-700 text-[#03DADB]">
                            { userData.address ? `${userData.address.city} - ${userData.address.state}` : 'Não informado' }
                        </Text>
                    </View>
                    <View>
                        <Text className="font-700 mb-1 text-right text-white">CRM</Text>
                        <Text className="font-700 text-right text-[#03DADB]">
                            { userData.infos ? userData.infos.crm : 'Não informado' }
                        </Text>
                    </View>
                </View>
                <View className="px-6 flex-row justify-between py-3 border-b border-b-[#1F2935]">
                    <View>
                        <Text className="font-700 mb-1 text-white">Área de ocupação</Text>
                        <Text className="font-700 text-[#03DADB]">
                            { userData.infos ? userData.infos.occupation_area : 'Não informado' }
                        </Text>
                    </View>
                    <View>
                        <Text className="font-700 text-right mb-1 text-white">Especialidade</Text>
                        <Text className="font-700 text-right text-[#03DADB]">
                            { userData.infos ? userData.infos.specialties : 'Não informado' }
                        </Text>
                    </View>
                </View>
                <View className="px-6 flex-row justify-between py-3 border-b border-b-[#1F2935]">
                    <View>
                        <Text className="font-700 mb-1 text-white">Faculdade</Text>
                        <Text className="font-700 text-[#03DADB]">
                            { userData.infos ? userData.infos.faculty : 'Não informado' }
                        </Text>
                    </View>
                    <View>
                        <Text className="font-700 text-right mb-1 text-white">Formado em</Text>
                        <Text className="font-700 text-right text-[#03DADB]">
                            { userData.infos ? userData.infos.faculty_year : 'Não informado' }
                        </Text>
                    </View>
                </View>
                
                <View className="px-6 mb-6 flex-row justify-between py-3 border-b border-b-[#1F2935]">
                    <View>
                        <Text className="font-700 my-1 text-sm text-white">
                            {user.quantity_articles} {user.quantity_articles > 1 ? 'publicações' : 'publicação'}
                        </Text>
                    </View>
                    <View>
                        <Text className="font-700 my-1 text-sm text-white">
                            {user.likes} {user.likes > 1 ? 'curtidas' : 'curtida'}
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <Footer />
        </>
    )
}