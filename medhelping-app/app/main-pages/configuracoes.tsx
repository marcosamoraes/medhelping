import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Header from "@components/header";
import { useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import Footer from "@components/footer";
import SidebarProvider from "@contexts/Sidebar";
import SideMenu from "@components/sideMenu";
import TouchableBlur from "@components/touchableBlur";
import { useState } from "react";
import { api } from "@services/api";

export default function Configuracoes() {
    const [loading, setLoading] = useState(false);
    const [idade, setIdade] = useState('');
    const [faculdade, setFaculdade] = useState('');
    const [ano, setAno] = useState('');
    const [CRM, setCRM] = useState('');
    const [atuacao, setAtuacao] = useState('');
    const [especialidade, setEspecialidade] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [twitter, setTwitter] = useState('');
    const [doctoralia, setDoctoralia] = useState('');

    const navigation = useNavigation();

    function handleEditConfig() {
        setLoading(true)
        const obj = {
            idade,
            faculdade,
            ano,
            CRM,
            atuacao,
            especialidade,
            facebook,
            instagram,
            twitter,
            doctoralia
        }
        api.post('/', obj).then(reqSuccess).catch(reqFailure)
    }

    function reqSuccess() {
        Alert.alert('Sucesso', 'Informações alteradas com êxito', [{ text: 'OK' }])
        setLoading(false)
        navigation.navigate("viewProfile", { id: 1 })
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
            <TextInput
                style={styles.input}
                placeholder='Idade'
                className='h-10 w-full rounded-xl text-sm font-400 mt-5 mb-3 px-4'
                placeholderTextColor={'white'}
                value={idade}
                onChangeText={setIdade}
            />
            
            <TextInput
                style={styles.input}
                placeholder='Faculdade'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                value={faculdade}
                onChangeText={setFaculdade}
            />
            <TextInput
                style={styles.input}
                placeholder='Ano de conclusão'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                value={ano}
                onChangeText={setAno}
            />
            <TextInput
                style={styles.input}
                placeholder='CRM'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                value={CRM}
                onChangeText={setCRM}
            />
            <TextInput
                style={styles.input}
                placeholder='Área de atuação'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                value={atuacao}
                onChangeText={setAtuacao}
            />
            <TextInput
                style={styles.input}
                placeholder='Especialidades'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                value={especialidade}
                onChangeText={setEspecialidade}
            />
            <TextInput
                style={styles.input}
                placeholder='Link do Facebook'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                value={facebook}
                onChangeText={setFacebook}
            />
            <TextInput
                style={styles.input}
                placeholder='Link do Instagram'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                value={instagram}
                onChangeText={setInstagram}
            />
            <TextInput
                style={styles.input}
                placeholder='Link do Twitter'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                value={twitter}
                onChangeText={setTwitter}
            />
            <TextInput
                style={styles.input}
                placeholder='Link do Doctoralia'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                value={doctoralia}
                onChangeText={setDoctoralia}
            />
            <TouchableOpacity 
                disabled={loading} 
                onPress={()=> handleEditConfig()} 
                activeOpacity={0.8} 
                className="flex-row w-full bg-[#03dadbb2] justify-center pt-2 pb-1 rounded-xl my-3 items-center"
            >
                <Text className="text-white font-700 text-sm ml-2">Atualizar</Text>
            </TouchableOpacity>
            <View className="h-4"></View>
        </ScrollView>
        <Footer />
    </>)
}