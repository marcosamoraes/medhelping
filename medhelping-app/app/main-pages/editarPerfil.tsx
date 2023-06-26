import { Image, ScrollView, StyleSheet, TextInput, Text, TouchableOpacity, View, Alert, ActivityIndicator } from "react-native";
import Footer from "@components/footer";
import Header from "@components/header";
import { useNavigation } from "expo-router";
import SidebarProvider from "@contexts/Sidebar";
import SideMenu from "@components/sideMenu";
import TouchableBlur from "@components/touchableBlur";
import { useContext, useEffect, useState } from "react";
import { api } from "@services/api";
import IUser from "@interfaces/IUser";
import { AuthContext } from "@contexts/Auth";

const avatarImg = require("../../assets/images/avatar-template.jpg")

export default function EditarPerfil() {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState<IUser>({} as IUser);

    const { user, updateUser } = useContext(AuthContext)

    useEffect(() => {
        setUserData(user)
    }, [])

    const navigation = useNavigation();

    const handleCepChanges = async (cep: string) => {
        cep = cep.replace(/\D/g, '')
        if (cep.length === 8) {
            try {
                const response = await api.get(`https://viacep.com.br/ws/${cep}/json/`)
                const { data } = response
                setUserData({ 
                    ...userData,
                    address: {
                        ...userData.address,
                        cep: data.cep,
                        address: data.logradouro,
                        district: data.bairro,
                        city: data.localidade,
                        state: data.uf
                    }  
                })
            } catch (error: any) {
                console.error('handleCepChanges: ', error.response.data.error)
            }
        }
    }

    const handleSubmit = async () => {
        setLoading(true)
        
        try {
            const response = await api.put(`/users/${userData.id}`, { ...userData })
            Alert.alert('Sucesso', response.data.message, [{ text: 'OK' }])
            const address = response.data.user[0] ? response.data.user[0].address : response.data.user.address
            updateUser({
                ...response.data.user,
                address
            })
        } catch (error: any) {
            console.error('editarPerfil: ', error.response.data.error)
            const message = error.response.data.message ?? 'Ocorreu um erro, tente novamente';
            Alert.alert('Erro', message, [{ text: 'OK' }])
        } finally {
            setLoading(false)
        }
    }

    const styles = StyleSheet.create({
        input: {
            borderColor: 'white',
            borderWidth: 1,
            color: 'white'
        },
        inputD: {
            borderColor: 'white',
            borderWidth: 1,
            color: 'white',
            textAlignVertical: 'top'
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
            <ScrollView className="w-screen px-6 bg-background">
                <Image className="w-28 mx-auto h-28 my-6 object-cover rounded-full" source={avatar} />
                <TextInput
                    style={styles.input}
                    placeholder='Nome'
                    className='h-10 w-full rounded-xl text-sm font-400 mb-3 px-4'
                    placeholderTextColor={'white'}
                    value={userData.name}
                    onChangeText={(value) => setUserData({ ...userData, name: value })}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                    placeholderTextColor={'white'}
                    value={userData.email}
                    onChangeText={(value) => setUserData({ ...userData, email: value })}
                />
                <TextInput
                    style={styles.input}
                    placeholder='WhatsApp'
                    className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                    placeholderTextColor={'white'}
                    value={userData.whatsapp}
                    onChangeText={(value) => setUserData({ ...userData, whatsapp: value })}
                />
                <TouchableOpacity 
                    onPress={()=> navigation.navigate("updatePassword")} 
                    activeOpacity={0.8} 
                    className="flex-row w-full bg-primary justify-center pt-2 pb-1 rounded-xl my-3 items-center"
                >
                    <Text className="text-white font-700 text-sm ml-2">Alterar senha</Text>
                </TouchableOpacity>
                <View className="px-2 pt-2 mt-3 border-t border-t-[#1F2935]">
                    <Text className="font-700 mt-2 text-base text-white">Localização</Text>
                    <TextInput
                    style={styles.input}
                    placeholder='CEP'
                    className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                    maxLength={9}
                    placeholderTextColor={'white'}
                    value={userData.address?.cep}
                    onEndEditing={(e) => handleCepChanges(e.nativeEvent.text)}
                />
                <View className="flex-row justify-between">
                <TextInput
                    style={styles.input}
                    placeholder='Endereço'
                    className='h-10 w-8/12 rounded-xl text-sm font-400 my-3 px-4'
                    placeholderTextColor={'white'}
                    value={userData.address?.address}
                    onChangeText={(value) => setUserData({ ...userData, address: { ...userData.address, address: value } })}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Nº'
                    className='h-10 w-3/12 rounded-xl text-sm font-400 my-3 px-4'
                    placeholderTextColor={'white'}
                    value={userData.address?.number}
                    onChangeText={(value) => setUserData({ ...userData, address: { ...userData.address, number: value } })}
                /></View>
                <TextInput
                    style={styles.input}
                    placeholder='Bairro'
                    className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                    placeholderTextColor={'white'}
                    value={userData.address?.district}
                    onChangeText={(value) => setUserData({ ...userData, address: { ...userData.address, district: value } })}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Cidade'
                    className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                    placeholderTextColor={'white'}
                    value={userData.address?.city}
                    onChangeText={(value) => setUserData({ ...userData, address: { ...userData.address, city: value } })}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Estado'
                    className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                    placeholderTextColor={'white'}
                    value={userData.address?.state}
                    onChangeText={(value) => setUserData({ ...userData, address: { ...userData.address, state: value } })}
                />
                </View>
                
                <TouchableOpacity 
                    disabled={loading} 
                    onPress={handleSubmit} 
                    activeOpacity={0.8} 
                    className="flex-row w-full bg-primary justify-center pt-2 pb-1 rounded-xl my-3 items-center"
                >
                    <Text className="text-white font-700 text-sm ml-2">
                        {loading ? <ActivityIndicator color="white" /> : 'Atualizar perfil'}
                    </Text>
                </TouchableOpacity>
                <View className="h-5"></View>
            </ScrollView>
            <Footer />
        </>
    )
}