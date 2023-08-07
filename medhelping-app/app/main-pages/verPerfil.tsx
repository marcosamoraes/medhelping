import { Image, ImageBackground, ScrollView, View, StyleSheet, TouchableOpacity, Text, Alert, Linking, ActivityIndicator } from "react-native";
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
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const doctoraliaImg = require('../../assets/images/doctoralia.png');
const avatarImg = require('../../assets/images/user.png');

export default function VerPerfil() {
    const route = useRoute();
    const { id }: any = route.params ?? { id: null }
    
    const { user, updateUser } = useContext(AuthContext)
    const [userData, setUserData] = useState<IUser>({} as IUser)
    const [preview, setPreview] = useState<string | null>(null)

    const navigation = useNavigation();

    const fetchUserData = async () => {
        try {
            const { data } = await api.get(`/users/${id}`)
            setUserData(data.user)
        } catch (error: any) {
            const message = error.response.data.message ?? 'Ocorreu um erro, tente novamente'
            Alert.alert('Erro', message, [{ text: 'OK' }])
            console.error('verPerfil->fetchUserData: ', error.response.data.error ?? error)
        }
    }

    const fetchUserLoggedData = async () => {
        try {
            const { data } = await api.get('/me')
            setUserData(data)
            updateUser(data)
        } catch (error: any) {
            const message = error.response.data.message ?? 'Ocorreu um erro, tente novamente'
            Alert.alert('Erro', message, [{ text: 'OK' }])
            console.error('verPerfil->fetchUserData: ', error.response.data.error ?? error)
        }
    }

    useEffect(() => {
        if (id) {
            fetchUserData()
        } else {
            fetchUserLoggedData()
        }
    }, [id])

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                quality: 1,
            });
        
            if (!result.canceled && result.assets[0]) {
                setPreview(result.assets[0].uri);
                handleChangeAvatar(result.assets[0].uri)
            }
        } catch (error: any) {
            console.error('verPerfil->pickImage: ', error);
        }
    };

    const handleChangeAvatar = async (preview: string) => {
        try {
            const uploadFormData = new FormData()

            uploadFormData.append('file', {
                uri: preview,
                name: 'image.jpg',
                type: 'image/jpg'
            } as any)

            const { data } = await api.post('/upload/users', uploadFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            const response = await api.put(`/users/${userData.id}/avatar`, { image: data })
            updateUser(response.data.user)
        } catch (error: any) {
            console.error('verPerfil->handleChangeAvatar: ', error.response.data.error)
            const message = error.response.data.message ?? 'Ocorreu um erro, tente novamente';
            Alert.alert('Erro', message, [{ text: 'OK' }])
        }
    }

    const handleEditProfile = () => {
        navigation.navigate("editProfile")
    }

    const styles = StyleSheet.create({
        imageBackground: {
            flex: 1,
            resizeMode: 'cover',
        }
    });

    const avatar = preview ? { uri: preview } : (userData.image ? { uri: userData.image } : avatarImg)

    console.log(userData)

    return (
        <>
            <SidebarProvider>
                <TouchableBlur/>
                <Header/>
                <SideMenu/>
            </SidebarProvider>
            <KeyboardAwareScrollView className="bg-background">
                {!userData ? (
                    <ActivityIndicator 
                        size="large" 
                        color="#07acf7" 
                        className="flex justify-center items-center h-[70vh]"
                    />
                ) : (
                    <>
                        <ImageBackground blurRadius={10} className="w-full" style={styles.imageBackground} source={avatar} defaultSource={avatarImg}>
                        <View className="w-full bg-[#505050b1]">
                            <View className="my-4 relative mx-auto">
                                <Image source={avatar} defaultSource={avatarImg} className="h-28 w-28 object-cover rounded-full" />
                                {(!id || id === user.id) && (
                                    <TouchableOpacity
                                        activeOpacity={0.7} 
                                        className="bg-background w-10 h-10 items-center justify-center rounded-full absolute z-10 right-0 bottom-0"
                                        onPress={pickImage}
                                    >
                                        <FontAwesome name="gear" size={20} color="white" />
                                    </TouchableOpacity>
                                )}
                            </View>
                            <Text className="font-900 text-white text-center text-xl">{userData.name}</Text>
                            {/* <Text className="font-500 text-white text-center text-base">Breve descrição</Text> */}
                            {(!id || id === user.id) && (
                                <TouchableOpacity
                                    onPress={()=>handleEditProfile()} 
                                    activeOpacity={0.8} 
                                    className="w-1/2 mx-auto bg-[#07acf7] justify-center pt-2 pb-1 rounded-xl mt-3 mb-2 items-center"
                                >
                                    <Text className="text-white font-600 text-sm ml-2">Editar Perfil</Text>
                                </TouchableOpacity>
                            )}
                            <View className="flex-row mb-5 mt-3 w-2/3 justify-evenly items-center mx-auto">
                                <TouchableOpacity
                                    className={`h-9 w-9 rounded-full justify-center items-center 
                                    ${userData.infos?.link_facebook ? 'bg-[#3C5A99]' : 'bg-[#505050]'}`}
                                    disabled={!userData.infos?.link_facebook}
                                    onPress={() => Linking.openURL(userData.infos.link_facebook) }
                                >
                                    <FontAwesome name="facebook-f" size={20} color="white"/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className={`h-9 w-9 rounded-full justify-center items-center 
                                    ${userData.infos?.link_instagram ? 'bg-[#E5535F]' : 'bg-[#505050]'}`}
                                    disabled={!userData.infos?.link_instagram}
                                    onPress={() => Linking.openURL(userData.infos.link_instagram) }
                                >
                                    <FontAwesome name="instagram" size={20} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className={`h-9 w-9 rounded-full justify-center items-center 
                                    ${userData.infos?.link_twitter ? 'bg-[#24A1F2]' : 'bg-[#505050]'}`}
                                    disabled={!userData.infos?.link_twitter}
                                    onPress={() => Linking.openURL(userData.infos.link_twitter) }
                                >
                                    <FontAwesome name="twitter" size={20} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className={`h-9 w-9 rounded-full justify-center items-center 
                                    ${userData.infos?.link_doctoralia ? 'bg-[#5DC4A5]' : 'bg-[#505050]'}`}
                                    disabled={!userData.infos?.link_doctoralia}
                                    onPress={() => Linking.openURL(userData.infos.link_doctoralia) }
                                >
                                    <Image source={doctoraliaImg} className="w-5 h-5 object-cover"/>
                                </TouchableOpacity>
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
                                    { userData.infos?.crm ?? 'Não informado' }
                                </Text>
                            </View>
                        </View>
                        <View className="px-6 flex-row justify-between py-3 border-b border-b-[#1F2935]">
                            <View>
                                <Text className="font-700 mb-1 text-white">Especialidade</Text>
                                <Text className="font-700 text-[#03DADB]">
                                    { userData.infos?.specialties ?? 'Não informado' }
                                </Text>
                            </View>
                            <View>
                                <Text className="font-700 mb-1 text-right text-white">Área de atuação</Text>
                                <Text className="font-700 text-right text-[#03DADB]">
                                    { userData.infos?.occupation_area ?? 'Não informado' }
                                </Text>
                            </View>
                        </View>
                        
                        <View className="px-6 mb-6 flex-row justify-between py-3 border-b border-b-[#1F2935]">
                            <View className="w-24">
                                <Text className="font-700 my-1 text-sm text-white">
                                    {userData.quantity_articles} {userData.quantity_articles > 1 ? 'publicações' : 'publicação'}
                                </Text>
                            </View>
                            <View className="flex-1">
                                <Text className="font-700 my-1 text-sm text-center text-white">
                                    {userData.articles_commented} {userData.articles_commented > 1 ? 'comentários' : 'comentário'}
                                </Text>
                            </View>
                            <View className="w-24">
                                <Text className="font-700 my-1 text-sm text-right text-white">
                                    {userData.likes} {userData.likes > 1 ? 'curtidas' : 'curtida'}
                                </Text>
                            </View>
                        </View>
                    </>
                )}
            </KeyboardAwareScrollView>
            <Footer />
        </>
    )
}