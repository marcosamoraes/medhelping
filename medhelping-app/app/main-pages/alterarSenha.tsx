import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Header from "../../sources/components/header";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import Footer from "../../sources/components/footer";
import SidebarProvider from "../../sources/config/Provider";
import SideMenu from "../../sources/components/sideMenu";
import TouchableBlur from "../../sources/components/touchableBlur";
import { useState } from "react";
import { api } from "../../sources/services/api";

export default function AlterarSenha(){
    const [loading, setLoading] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirmada, setSenhaConfirmada] = useState('');

  const router = useRouter();

  function handleEditPassword() {
    if(senha !== senhaConfirmada){
        Alert.alert('Erro', 'Senhas diferentes', [{ text: 'OK' }])
      return
    }
    setLoading(true)
    const obj = {
      senhaAtual,
      senha
    }
    api.post('/forgot-password', obj).then(reqSuccess).catch(reqFailure)

  }
  function reqSuccess() {
    Alert.alert('Sucesso', 'Sua senha foi alterada com êxito', [{ text: 'OK' }])
    
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

    return (<>
    <SidebarProvider>
    <TouchableBlur/>
    <Header/>
    <SideMenu/>
        <View className="w-full h-screen px-6 bg-[#00021C]">
            <TextInput
                style={styles.input}
                placeholder='Senha atual'
                className='h-10 w-full rounded-xl text-sm font-400 mt-32 mb-3 px-4'
                placeholderTextColor={'white'}
                secureTextEntry={true}
                value={senhaAtual}
                onChangeText={setSenhaAtual}
                />
            
            <TextInput
                style={styles.input}
                placeholder='Nova senha'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                secureTextEntry={true}
                value={senha}
                onChangeText={setSenha}
            />
            <TextInput
                style={styles.input}
                placeholder='Confirmar nova senha'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                secureTextEntry={true}
                value={senhaConfirmada}
                onChangeText={setSenhaConfirmada}
            />
            <TouchableOpacity disabled={loading} onPress={()=> handleEditPassword()} activeOpacity={0.8} className="flex-row w-full bg-[#03dadbb2] justify-center pt-2 pb-1 rounded-xl my-3 items-center"><Text className="text-white font-700 text-sm ml-2">Alterar senha</Text></TouchableOpacity>
        
        </View>
        <Footer />
        </SidebarProvider>
    </>)
}