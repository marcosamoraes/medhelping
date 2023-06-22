import { Image, ScrollView, StyleSheet, TextInput, Text, TouchableOpacity, View } from "react-native";
import Footer from "../../sources/components/footer";
import Header from "../../sources/components/header";
import { useRouter } from "expo-router";
import SidebarProvider from "../../sources/config/Provider";
import SideMenu from "../../sources/components/sideMenu";
import TouchableBlur from "../../sources/components/touchableBlur";

export default function EditarPerfil() {
    const router = useRouter();
    function handleEditProfile(){
        router.push('./verPerfil')
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
    return (<>
        <SidebarProvider>
        <TouchableBlur/>
    <Header/>
    <SideMenu/></SidebarProvider>
        <ScrollView className="w-screen px-6 bg-[#00021C]">
            <Image className="w-28 mx-auto h-28 my-6 object-cover rounded-full" source={require("../../assets/images/avatar-template.jpg")} />
            <TextInput
                style={styles.input}
                placeholder='Nome'
                className='h-10 w-full rounded-xl text-sm font-400 mb-3 px-4'
                placeholderTextColor={'white'}
            />
            <TextInput
                style={styles.input}
                placeholder='Email'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
            />
            <TextInput
                style={styles.input}
                placeholder='WhatsApp'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
            />
            <TouchableOpacity onPress={()=> router.push('./alterarSenha')} activeOpacity={0.8} className="flex-row w-full bg-[#03dadbb2] justify-center pt-2 pb-1 rounded-xl my-3 items-center"><Text className="text-white font-700 text-sm ml-2">Alterar senha</Text></TouchableOpacity>
            <View className="px-2 pt-2 mt-3 border-t border-t-[#1F2935]">
                <Text className="font-700 mt-2 text-base text-white">Localização</Text>
                <TextInput
                style={styles.input}
                placeholder='CEP'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
            />
            <View className="flex-row justify-between">
            <TextInput
                style={styles.input}
                placeholder='Endereço'
                className='h-10 w-8/12 rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
            />
            <TextInput
                style={styles.input}
                placeholder='Nº'
                className='h-10 w-3/12 rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
            /></View>
            <TextInput
                style={styles.input}
                placeholder='Bairro'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
            />
            <TextInput
                style={styles.input}
                placeholder='Cidade'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
            />
            <TextInput
                style={styles.input}
                placeholder='Estado'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
            />
            </View>
            
            <TouchableOpacity onPress={()=> handleEditProfile()} activeOpacity={0.8} className="flex-row w-full bg-[#03dadbb2] justify-center pt-2 pb-1 rounded-xl my-3 items-center"><Text className="text-white font-700 text-sm ml-2">Atualizar perfil</Text></TouchableOpacity>
        <View className="h-5"></View>
        </ScrollView>
        <Footer />
    </>)
}