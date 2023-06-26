import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Header from "@components/header";
import { useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import Footer from "@components/footer";
import SidebarProvider from "@contexts/Sidebar";
import SideMenu from "@components/sideMenu";
import TouchableBlur from "@components/touchableBlur";
import { useContext, useEffect, useState } from "react";
import { api } from "@services/api";
import { AuthContext } from "@contexts/Auth";
import IUser from "@interfaces/IUser";

export default function Configuracoes() {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState<IUser>({} as IUser);

    const { user, updateUser } = useContext(AuthContext)

    useEffect(() => {
        setUserData(user)
    }, [])

    const navigation = useNavigation();

    const handleSubmit = async () => {
        setLoading(true)
        
        try {
            const response = await api.put(`/users/${userData.id}/profile`, { ...userData.infos })
            Alert.alert('Sucesso', response.data.message, [{ text: 'OK' }])
            console.log(response.data.user[1])
            const infos = response.data.user[1].infos ?? response.data.user[0].infos
            updateUser({
                ...response.data.user,
                infos
            })
        } catch (error: any) {
            console.error('configuracoes: ', error.response.data.error)
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

    return (
    <>
        <SidebarProvider>
            <TouchableBlur/>
            <Header/>
            <SideMenu/>
        </SidebarProvider>
        <ScrollView className="w-screen px-6 bg-background">
            <TextInput
                style={styles.input}
                placeholder='Idade'
                className='h-10 w-full rounded-xl text-sm font-400 mt-5 mb-3 px-4'
                placeholderTextColor={'white'}
                value={userData.infos?.age ? String(userData.infos?.age) : ''}
                onChangeText={(value) => setUserData({ ...userData, infos: { ...userData.infos, age: Number(value) } })}
            />
            
            <TextInput
                style={styles.input}
                placeholder='Faculdade'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                value={userData.infos?.faculty}
                onChangeText={(value) => setUserData({ ...userData, infos: { ...userData.infos, faculty: value } })}
            />
            <TextInput
                style={styles.input}
                placeholder='Ano de conclusão'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                value={userData.infos?.faculty_year ? String(userData.infos?.faculty_year) : ''}
                onChangeText={(value) => setUserData({ ...userData, infos: { ...userData.infos, faculty_year: Number(value) } })}
            />
            <TextInput
                style={styles.input}
                placeholder='CRM'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                value={userData.infos?.crm}
                onChangeText={(value) => setUserData({ ...userData, infos: { ...userData.infos, crm: value } })}
            />
            <TextInput
                style={styles.input}
                placeholder='Área de atuação'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                value={userData.infos?.occupation_area}
                onChangeText={(value) => setUserData({ ...userData, infos: { ...userData.infos, occupation_area: value } })}
            />
            <TextInput
                style={styles.input}
                placeholder='Especialidades'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                value={userData.infos?.specialties}
                onChangeText={(value) => setUserData({ ...userData, infos: { ...userData.infos, specialties: value } })}
            />
            <TextInput
                style={styles.input}
                placeholder='Link do Facebook'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                value={userData.infos?.link_facebook}
                onChangeText={(value) => setUserData({ ...userData, infos: { ...userData.infos, link_facebook: value } })}
            />
            <TextInput
                style={styles.input}
                placeholder='Link do Instagram'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                value={userData.infos?.link_instagram}
                onChangeText={(value) => setUserData({ ...userData, infos: { ...userData.infos, link_instagram: value } })}
            />
            <TextInput
                style={styles.input}
                placeholder='Link do Twitter'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                value={userData.infos?.link_twitter}
                onChangeText={(value) => setUserData({ ...userData, infos: { ...userData.infos, link_twitter: value } })}
            />
            <TextInput
                style={styles.input}
                placeholder='Link do Doctoralia'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                value={userData.infos?.link_doctoralia}
                onChangeText={(value) => setUserData({ ...userData, infos: { ...userData.infos, link_doctoralia: value } })}
            />
            <TouchableOpacity 
                disabled={loading} 
                onPress={handleSubmit} 
                activeOpacity={0.8} 
                className="flex-row w-full bg-primary justify-center pt-2 pb-1 rounded-xl my-3 items-center"
            >
                <Text className="text-white font-700 text-sm ml-2">
                    {loading ? <ActivityIndicator color="white" /> : 'Atualizar'}
                </Text>
            </TouchableOpacity>
            <View className="h-4"></View>
        </ScrollView>
        <Footer />
    </>)
}