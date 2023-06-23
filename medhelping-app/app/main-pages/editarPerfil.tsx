import { Image, ScrollView, StyleSheet, TextInput, Text, TouchableOpacity, View, Alert } from "react-native";
import Footer from "@components/footer";
import Header from "@components/header";
import { useRouter } from "expo-router";
import SidebarProvider from "@contexts/Sidebar";
import SideMenu from "@components/sideMenu";
import TouchableBlur from "@components/touchableBlur";
import { useState } from "react";
import { api } from "@services/api";

export default function EditarPerfil() {
    const [loading, setLoading] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [CEP, setCEP] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [bairro, setBairro] = useState('');

    const router = useRouter();

    function handleEditProfile() {
        setLoading(true)

        api.post('/', 'objeto').then(reqSuccess).catch(reqFailure)
    }

    function reqSuccess() {
        Alert.alert('Sucesso', 'Informações alteradas com êxito', [{ text: 'OK' }])
        setLoading(false)
        router.push('./verPerfil')
    }

    function reqFailure() {
        Alert.alert('Erro', 'Ocorreu um erro, tente novamente', [{ text: 'OK' }])
        setLoading(false)
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
            <ScrollView className="w-screen px-6 bg-[#00021C]">
                <Image className="w-28 mx-auto h-28 my-6 object-cover rounded-full" source={require("../../assets/images/avatar-template.jpg")} />
                <TextInput
                    style={styles.input}
                    placeholder='Nome'
                    className='h-10 w-full rounded-xl text-sm font-400 mb-3 px-4'
                    placeholderTextColor={'white'}
                    value={nome}
                    onChangeText={setNome}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                    placeholderTextColor={'white'}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder='WhatsApp'
                    className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                    placeholderTextColor={'white'}
                    value={whatsapp}
                    onChangeText={setWhatsapp}
                />
                <TouchableOpacity onPress={()=> router.push('./alterarSenha')} activeOpacity={0.8} className="flex-row w-full bg-[#03dadbb2] justify-center pt-2 pb-1 rounded-xl my-3 items-center"><Text className="text-white font-700 text-sm ml-2">Alterar senha</Text></TouchableOpacity>
                <View className="px-2 pt-2 mt-3 border-t border-t-[#1F2935]">
                    <Text className="font-700 mt-2 text-base text-white">Localização</Text>
                    <TextInput
                    style={styles.input}
                    placeholder='CEP'
                    className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                    placeholderTextColor={'white'}
                    value={CEP}
                    onChangeText={setCEP}
                />
                <View className="flex-row justify-between">
                <TextInput
                    style={styles.input}
                    placeholder='Endereço'
                    className='h-10 w-8/12 rounded-xl text-sm font-400 my-3 px-4'
                    placeholderTextColor={'white'}
                    value={endereco}
                    onChangeText={setEndereco}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Nº'
                    className='h-10 w-3/12 rounded-xl text-sm font-400 my-3 px-4'
                    placeholderTextColor={'white'}
                    value={numero}
                    onChangeText={setNumero}
                /></View>
                <TextInput
                    style={styles.input}
                    placeholder='Bairro'
                    className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                    placeholderTextColor={'white'}
                    value={bairro}
                    onChangeText={setBairro}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Cidade'
                    className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                    placeholderTextColor={'white'}
                    value={cidade}
                    onChangeText={setCidade}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Estado'
                    className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                    placeholderTextColor={'white'}
                    value={estado}
                    onChangeText={setEstado}
                />
                </View>
                
                <TouchableOpacity 
                    disabled={loading} 
                    onPress={()=> handleEditProfile()} 
                    activeOpacity={0.8} 
                    className="flex-row w-full bg-[#03dadbb2] justify-center pt-2 pb-1 rounded-xl my-3 items-center"
                >
                    <Text className="text-white font-700 text-sm ml-2">Atualizar perfil</Text>
                </TouchableOpacity>
                <View className="h-5"></View>
            </ScrollView>
            <Footer />
        </>
    )
}