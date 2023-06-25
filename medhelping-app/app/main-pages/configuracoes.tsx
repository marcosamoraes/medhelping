import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Header from "@components/header";
import { useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import Footer from "@components/footer";
import SidebarProvider from "@contexts/Sidebar";
import SideMenu from "@components/sideMenu";
import TouchableBlur from "@components/touchableBlur";
import { useContext, useState } from "react";
import { api } from "@services/api";
import { AuthContext } from "@contexts/Auth";

export default function Configuracoes() {
    const [loading, setLoading] = useState(false);
    const [age, setAge] = useState('');
    const [faculty, setFaculty] = useState('');
    const [faculty_year, setFacultyYear] = useState('');
    const [crm, setCRM] = useState('');
    const [occupation_area, setOccupationArea] = useState('');
    const [specialties, setSpecialties] = useState('');
    const [link_facebook, setFacebook] = useState('');
    const [link_instagram, setInstagram] = useState('');
    const [link_twitter, setTwitter] = useState('');
    const [link_doctoralia, setDoctoralia] = useState('');
    const {user} = useContext(AuthContext)
    const id = user.id

    const navigation = useNavigation();

    function handleEditConfig() {
        setLoading(true)
        const obj = {
            age,
            faculty,
            faculty_year,
            crm,
            occupation_area,
            specialties,
            link_facebook,
            link_instagram,
            link_twitter,
            link_doctoralia
        }
        
        api.put(`/users/${id}/profile`, obj).then(reqSuccess).catch(reqFailure)
    }

    function reqSuccess() {
        Alert.alert('Sucesso', 'Informações alteradas com êxito', [{ text: 'OK' }])
        setLoading(false)
        navigation.navigate("viewProfile")
    }

    function reqFailure(e: any) {
        Alert.alert('Erro', 'Ocorreu um erro, tente novamente', [{ text: 'OK' }])
        console.log(e)
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
        <ScrollView className="w-screen px-6 bg-background">
            <TextInput
                style={styles.input}
                placeholder='Idade'
                className='h-10 w-full rounded-xl text-sm font-400 mt-5 mb-3 px-4'
                placeholderTextColor={'white'}
                value={age}
                onChangeText={setAge}
            />
            
            <TextInput
                style={styles.input}
                placeholder='Faculdade'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                value={faculty}
                onChangeText={setFaculty}
            />
            <TextInput
                style={styles.input}
                placeholder='Ano de conclusão'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                value={faculty_year}
                onChangeText={setFacultyYear}
            />
            <TextInput
                style={styles.input}
                placeholder='CRM'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                value={crm}
                onChangeText={setCRM}
            />
            <TextInput
                style={styles.input}
                placeholder='Área de atuação'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                value={occupation_area}
                onChangeText={setOccupationArea}
            />
            <TextInput
                style={styles.input}
                placeholder='Especialidades'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                value={specialties}
                onChangeText={setSpecialties}
            />
            <TextInput
                style={styles.input}
                placeholder='Link do Facebook'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                value={link_facebook}
                onChangeText={setFacebook}
            />
            <TextInput
                style={styles.input}
                placeholder='Link do Instagram'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                value={link_instagram}
                onChangeText={setInstagram}
            />
            <TextInput
                style={styles.input}
                placeholder='Link do Twitter'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                value={link_twitter}
                onChangeText={setTwitter}
            />
            <TextInput
                style={styles.input}
                placeholder='Link do Doctoralia'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                value={link_doctoralia}
                onChangeText={setDoctoralia}
            />
            <TouchableOpacity 
                disabled={loading} 
                onPress={()=> handleEditConfig()} 
                activeOpacity={0.8} 
                className="flex-row w-full bg-primary justify-center pt-2 pb-1 rounded-xl my-3 items-center"
            >
                <Text className="text-white font-700 text-sm ml-2">Atualizar</Text>
            </TouchableOpacity>
            <View className="h-4"></View>
        </ScrollView>
        <Footer />
    </>)
}